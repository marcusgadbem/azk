<table width="100%" border="0">
  <tr>
    <td align="center">
      <a href="http://azk.io"><img src="http://docs.azk.io/en/resources/images/azk-logo-high.png" align="left" width="202px" ></a>
       </td>
    <td>
      <!--<strong>azk</strong> is an open source engine to orchestrate development and test environments. <br/>-->
      <strong>azk</strong> is a lightweight open source orchestration tool for development environments.  <br/>
    <br/>
    [ <a href="https://gitter.im/azukiapp/azk">Chat Support</a> - <a href="http://azk.io/">Website</a> - <a href="http://azk.io/">Documentation</a> - <a href="https://github.com/azukiapp/azk/releases/latest">Lastest Release Notes</a> ]
    </td>
  </tr>
</table>

![Usage of azk](https://github.com/azukiapp/azk/blob/master/src/pres/azk-screenflow-slow.gif?raw=true)

## Why azk?

`TODO`

## Main Features (*)

`TODO: 5 bullets on top`.

* Built-in load-balancer that distributes requests among containers
* Built-in DNS resolver;
* Stream system's logs in real-time;
* Map local source code and folders into containers dinamically;
* Support for system provisioning and startup commands and scripts;
* Generators for your chosen language;
* Curated list of [images][azk_images] for systems, languages, databases and tools;

## Quick Start

### Requirements
* 64-bit architecture machine
* one of the following OS running:
  * **Mac OS X 10.6 (Snow Leopard)** or later (requires [**VirtualBox**](https://www.virtualbox.org/wiki/Downloads))
  * **Ubuntu 12.04, 14.04** or **15.10**
  * **Fedora 21** or **22**
* bash, the command-line tool available on all unix systems
* internet connection (only needed while downloading [system images](http://docs.azk.io/en/images))

Don't worry about **Windows** support, it is [on the map](https://github.com/azukiapp/azk/issues/334#issuecomment-170603171).

### Install & Run

```sh
# 1. Installing azk

## Mac OS X:
$ curl -Ls http://azk.io/install.sh | bash

## Linux:
$ wget -qO- http://azk.io/install.sh | bash

# 2. Run Stringer, a sample project
## Run Stringer (an anti-social RSS reader) project directly from GitHub which has an Azkfile
## https://github.com/run-project/stringer
$ azk start run-project/stringer
```

See [installation docs](http://docs.azk.io/en/installation/) for more details.

## Setting up azk (*)

### Starting a new project

If you are starting a new application, you can use **azk** to obtain the proper runtime as well the corresponding generators for your chosen language and then generate the application's basic structure. An example in Node.js would look like this:

```sh
$ cd ~/projects
$ azk shell --image azukiapp/node # obtaining the runtime

# mkdir <my-app>
# npm init      # generate app's basic structure
...
# exit

$ cd <my-app>

# will detect to detect your app language and suggest and base Azkfile
$ azk init
azk: `node` system was detected at 'my-app'
azk: 'Azkfile' generated

$ azk start
```

### Using azk with an existing project

When you already have a codebase for your application and want to use **azk** to streamline the development environment, you can take advantage of the `generators`.
`Generators` will look at your codebase and do the heavy lifting of figuring out how your application is designed and suggest a base **Azkfile**.

All you have to do is:

```sh
$ cd <my-app>
$ azk init

# will detect to detect your app language and suggest and base Azkfile
...
azk: 'Azkfile' generated

$ azk start
```

## Writing a Azkfile

**Azkfile** is the cornerstone of how to use azk. This simple manifest file describe your application architecture, folders mapping and links between the specified systems.

It is expected that the **Azkfile** will be included within the application files in your version control. This allows other team members to use **azk** to quickly run and control the whole application environment on their own machines without further efforts.
The **azk cli** will look recursively for an **Azkfile** from the the directory you are browsing.

See [Azkfile docs][azkfile] for more details.

### Examples

  * [Ruby on Rails with MySQL](#ruby-on-rails-app-with-mysql)
  * [Node.js with MongoDB](#nodejs-app-with-mongodb)

## Usage

See [command-line docs](http://docs.azk.io) for a full summary.

#### start

Starts a single or a set of systems described in the manifest file (Azkfile.js).

```sh
# start app from local source
$ azk start -vvv -o [<system>] [--reprovision]

# start app directly from GitHub
$ azk start git@github.com:azukiapp/azkdemo.git        # clone and start (SSH)
$ azk start azukiapp/azkdemo --git-ref <master|0.0.1|880d01a>  # branch, tag or commit (relative to ./azkdemo folder)
```

See [azk start docs](http://docs.azk.io) for more details.

#### scale

Scales a system to a total number of containers.

```sh
$ azk scale <system> 2
```

See [azk scale docs](http://docs.azk.io) for more details.

#### logs

Streams a system's log in real-time

```sh
$ azk logs <system> [--follow]
```

See [azk logs docs](http://docs.azk.io) for more details.

#### status

Check all described system status.

```sh
$ azk status [add opção json?]
```

See [azk status docs](http://docs.azk.io) for more details.

#### deploy

`azk` knows how to deploy your application on [DigitalOcean](https://digitalocean.com/).

```sh
$ echo "DEPLOY_API_TOKEN=<YOUR-PERSONAL-ACCESS-TOKEN>" >> .env
$ azk deploy
```

See [azk deploy docs](http://docs.azk.io/en/deploy) for more details.

## FAQ / Troubleshooting

* FAQ: [http://docs.azk.io/en/faq/](http://docs.azk.io/en/faq/)
* Troubleshooting: [http://docs.azk.io/en/troubleshooting/](http://docs.azk.io/en/troubleshooting/)

## Contributing

See [Contributing Guide](CONTRIBUTING.md) for instructions on how to help the project!

Share the love and star us here on Github!

## License

"Azuki", "azk" and the Azuki logo are copyright (c) 2013-2015 Azuki Serviços de Internet LTDA.

**azk** source code is released under Apache 2 License.

Check LEGAL and LICENSE files for more information.

[docker]: http://docker.com
[azk_images]: http://images.azk.io
[azkfile]: http://docs.azk.io/en/azkfilejs/README.html
