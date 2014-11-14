import { _ } from 'azk';
import { UIProxy } from 'azk/cli/ui';
import { example_system } from 'azk/generator/rules';

export class Suggestion extends UIProxy {
  constructor(...args) {
    super(...args);

    // Readable name for this suggestion
    this.name = 'mysql';

    // Which rules they suggestion is valid
    this.ruleNamesList = ['mysql56'];

    // Initial Azkfile.js suggestion
    this.suggestion = _.extend({}, example_system, {
      __type  : 'mysql',
      image   : 'mysql:5.6', //https://registry.hub.docker.com/u/library/mysql/
      ports:{
        portA: "3306/tcp",
      },
      balancer: false,
      http: false,
      command: null,
      workdir: null,
      mounts  : null,
      shell   : '/bin/bash',
      wait: {
        retry: 1000,
        timeout: 25
      },
      envs: {
        // set instances variables
        MYSQL_ROOT_PASSWORD: "mysecretpassword",
        MYSQL_USER: "azk",
        MYSQL_PASSWORD: "password",
        MYSQL_DATABASE: "my_database",
      },
      export_envs: {
        DATABASE_URL: "mysql://#{envs.MYSQL_USER}:#{envs.MYSQL_PASSWORD}@#{net.host}:#{net.port.portA}/${envs.MYSQL_DATABASE}",
      },
    });
  }

  suggest() {
    var suggestion = this.suggestion;
    return suggestion;
  }
}
