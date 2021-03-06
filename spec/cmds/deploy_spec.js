import h from 'spec/spec_helper';
import { Cli } from 'azk/cli';
import { SystemNotFoundError, InvalidCommandError } from 'azk/utils/errors';
import Deploy from 'azk/cmds/deploy';

class DeployTest extends Deploy {
  runShellInternally(cmd) {
    this.ui.output(cmd.join(" "));
    return 0;
  }
}

describe('Azk cli, deploy controller run command', function () {
  var outputs = [];
  var ui      = h.mockUI(beforeEach, outputs);

  var cli_options = {};
  var doc_opts = { exit: false };

  var run_options = { ui: ui, cwd: h.fixture_path('slim-app'), just_parse: true };
  var cli = new Cli(cli_options)
    .route('deploy', null, function() {
      return (new (DeployTest)(this)).index();
    });

  it("`deploy`", function() {
    doc_opts.argv = ['deploy'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy')));
    });
  });

  it("`deploy clear-cache`", function() {
    doc_opts.argv = ['deploy', 'clear-cache'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('clear-cache', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- clear-cache')));
    });
  });

  it("`deploy fast`", function() {
    doc_opts.argv = ['deploy', 'fast'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('fast', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- fast')));
    });
  });

  it("`deploy full`", function() {
    doc_opts.argv = ['deploy', 'full'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('full', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- full')));
    });
  });

  it("`deploy restart`", function() {
    doc_opts.argv = ['deploy', 'restart'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('restart', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- restart')));
    });
  });

  it("`deploy ssh`", function() {
    doc_opts.argv = ['deploy', 'ssh'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('ssh', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy --tty -- ssh')));
    });
  });

  it("`deploy ssh -- echo data`", function() {
    doc_opts.argv = ['deploy', 'ssh', '--', "-c 'echo data'"];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('ssh', true);
      h.expect(options).to.have.property('__doubledash', true);
      h.expect(options.args).to.deep.eql(["-c 'echo data'"]);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp("shell deploy -- ssh -c 'echo data'")));
    });
  });

  it("`deploy shell`", function() {
    doc_opts.argv = ['deploy', 'shell'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('shell', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy --tty -- shell')));
    });
  });

  it("`deploy shell -- echo data`", function() {
    doc_opts.argv = ['deploy', 'shell', '--', 'echo data'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('shell', true);
      h.expect(options).to.have.property('__doubledash', true);
      h.expect(options.args).to.deep.eql(['echo data']);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- shell echo data')));
    });
  });

  it("`deploy versions`", function() {
    doc_opts.argv = ['deploy', 'versions'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('versions', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- versions')));
    });
  });

  it("`deploy rollback`", function() {
    doc_opts.argv = ['deploy', 'rollback'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('rollback', true);
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- rollback')));
    });
  });

  it("`deploy rollback <ref>`", function() {
    doc_opts.argv = ['deploy', 'rollback', 'v2'];
    var options = cli.router.cleanParams(cli.docopt(doc_opts));

    return cli.run(doc_opts, run_options).then((code) => {
      h.expect(code).to.equal(0);
      h.expect(options).to.have.property('deploy', true);
      h.expect(options).to.have.property('rollback', true);
      h.expect(options).to.have.property('ref', "v2");
      h.expect(outputs[0]).to.match(RegExp(h.escapeRegExp('shell deploy -- rollback v2')));
    });
  });

  it("`invalid` and should error", function() {
    doc_opts.argv = ['deploy', 'invalid'];

    var func = () => cli.docopt(doc_opts);
    h.expect(func).to.throw(InvalidCommandError, /deploy invalid/);
  });

  describe("without deploy system", function() {
    var manifest;
    var cli = new Cli(cli_options)
      .route('deploy');

    before(() => {
      var data = { };
      return h.mockManifest(data).then((mf) => {
        manifest = mf;
      });
    });

    it("should raise error if no get deploy system", function() {
      var func = () => manifest.getSystemsByName("deploy");
      h.expect(func).to.throw(SystemNotFoundError, /deploy/);
    });

    it("should no deploy system", function() {
      doc_opts.argv = ['deploy'];
      var run_options = { ui: ui, cwd: manifest.cwd, just_parse: true };

      var result = cli.run(doc_opts, run_options);
      return h.expect(result).to.be.rejectedWith(SystemNotFoundError, /deploy/);
    });
  });
});
