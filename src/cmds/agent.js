import { _, t, log, config, lazy_require } from 'azk';
import { defer, subscribe, asyncUnsubscribe } from 'azk';
import { InteractiveCmds } from 'azk/cli/interactive_cmds';
import { Helpers } from 'azk/cli/command';

var lazy = lazy_require({
  Client : [ 'azk/agent/client' ],
  spawn  : ['child-process-promise'],
  net    : 'net',
});

class Cmd extends InteractiveCmds {

  get docker() {
    return require('azk/docker').default;
  }

  action(opts) {
    return this
      .callAgent(opts)
      .fin((result) => {
        process.stdin.pause();
        return result;
      });
  }

  callAgent(opts) {
    // Create a progress output
    var _subscription = subscribe('#.status', (data) => {
      Helpers.vmStartProgress(this)(data);
    });

    return asyncUnsubscribe(this, _subscription, function* () {
      switch (opts.action) {
        case 'startchild':
          opts.configs = yield this.getConfig(true, opts);
          opts.action  = "start";
          break;

        case 'start':
          // And no running
          var status = yield lazy.Client.status(opts.action);
          if (!status.agent) {
            // Check and load configures
            this.warning('status.agent.wait');
            opts.configs = yield this.getConfig(false, opts);

            // Remove and adding vm (to refresh vm configs)
            if (config('agent:requires_vm') && opts['reload-vm']) {
              var cmd_vm = this.parent.commands.vm;
              yield cmd_vm.action({ action: 'remove', fail: () => {} });
            }

            // Generate a new tracker agent session id
            this.tracker.generateNewAgentSessionId();

            // Spaw daemon
            if (opts.daemon) {
              return this.spawChild(opts);
            }
          }
      }

      // Changing directory for security
      process.chdir(config('paths:azk_root'));

      // use VM?
      var _agent_started_subscription = subscribe("agent.agent.started.event", (/* data, envelope */) => {

        // auto-unsubscribe
        _agent_started_subscription.unsubscribe();

        var vm_data = {};

        if (config("agent:requires_vm")) {
          vm_data = {
            cpus: config("agent:vm:cpus"),
            memory: config("agent:vm:memory")
          };
        }

        // Track agent start
        this.docker.version().then((result) => {
          this.trackerEvent.addData({
            vm: vm_data,
            docker: {
              version: result
            }
          });

          return this.sendTrackerData();
        });
      });

      // Call action in agent
      var promise = lazy.Client[opts.action](opts);
      return promise.then((result) => {
        if (opts.action != "status") {
          return result;
        }
        return (result.agent) ? 0 : 1;
      });
    });
  }

  spawChild(cmd_options) {
    var args = ["agent", "startchild", ..._.rest(process.argv, 4)];
    var opts = {
      detached: true,
      stdio   : [null, null, null, 'pipe'],
      cwd     : config('paths:azk_root'),
      env     : _.extend({}, process.env),
    };

    return defer((resolve) => {
      this.installSignals(resolve);
      log.debug('fork process to start agent in daemon');
      lazy.spawn("azk", args, opts)
        .progress((child) => {
          this.child = child;

          // Conect outputs
          child.stderr.pipe(process.stderr);
          child.stdout.pipe(process.stdout);

          // Capture agent sucess
          var started = new RegExp(t('status.agent.started'));
          child.stderr.on('data', (data) => {
            data = data.toString('utf8');
            if (data.match(started)) {
              child.stderr.unpipe(process.stderr);
              child.stdout.unpipe(process.stdout);
              process.kill(child.pid, 'SIGUSR2');
              resolve(0);
            }
          });

          // Send configs to child
          var pipe = child.stdio[3];
          var buff = Buffer(JSON.stringify(cmd_options.configs));
          pipe.write(buff);
        })
        .then(() => { return 0; })
        .fail(() => { process.stdin.pause(); });
    });
  }

  installSignals(done) {
    var stopping = false;
    var gracefullExit = () => {
      if (!stopping) {
        stopping = true;
        if (this.child) {
          this.child.kill('SIGTERM');
        } else {
          done(1);
        }
      }
    };

    process.on('SIGTERM', gracefullExit);
    process.on('SIGINT' , gracefullExit);
    process.on('SIGQUIT', gracefullExit);
  }

  getConfig(waitpipe) {
    return defer((resolve, reject) => {
      if (waitpipe) {
        try {
          var pipe = new lazy.net.Socket({ fd: 3 });
          pipe.on('data', (buf) => {
            var configs = JSON.parse(buf.toString('utf8'));
            pipe.end();
            resolve(configs);
          });
        } catch (err) {
          reject(err);
        }
      } else {
        return Helpers.configure(this);
      }
    });
  }
}

export function init(cli) {
  cli = (new Cmd('agent {action}', cli))
    .setOptions('action', { options: ['start', 'status', 'stop', 'startchild'], hidden: ['startchild'] })
    .addOption(['--daemon'], { default: true });

  if (config('agent:requires_vm')) {
    cli.addOption(['--reload-vm'], { default: true });
  }
}
