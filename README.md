<a href="http://azk.io"><img src="https://azk-landapage-stage.s3.amazonaws.com/readme-logo.png" ></a>
<br/>
<strong>azk</strong> is a lightweight open source orchestration tool for development environments.
<br/>

--

<table>
  <thead>
    <tr>
      <td align="center">
        <a href="#"><img src="http://azk-landapage-stage.s3.amazonaws.com/install.png"></a>
      </td>
      <td align="center">
        <a href="#"><img src="http://azk-landapage-stage.s3.amazonaws.com/chat-support.png"></a>
      </td>
      <td align="center">
        <a href="#"><img src="http://azk-landapage-stage.s3.amazonaws.com/website.png"></a>
      </td>
      <td align="center">
        <a href="#"><img src="http://azk-landapage-stage.s3.amazonaws.com/documentation.png"></a>
      </td>
      <td align="center">
        <a href="#"><img src="http://azk-landapage-stage.s3.amazonaws.com/latest-release-notes.png"></a>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="http://azk.io/">Install</a>
      </td>
      <td align="center">
        <a href="http://azk.io/">Chat Support</a>
      </td>
      <td align="center">
        <a href="http://azk.io/">Website</a>
      </td>
      <td align="center">
        <a href="http://azk.io/">Documentation</a>
      </td>
      <td align="center">
        <a href="http://azk.io/">Latest Release Notes</a>
      </td>
    </tr>
  </tbody>
</table>

--

<table>
    <tr>
      <td align="center">
        <a href="http://azk.io">
          <img src="http://azk-landapage-stage.s3.amazonaws.com/install.png">
          <br/>
          Install
          </a>
      </td>
      <td align="center">
        <a href="http://azk.io">
          <img src="http://azk-landapage-stage.s3.amazonaws.com/chat-support.png">
          <br/>
          Chat Support
        </a>
      </td>
      <td align="center">
        <a href="http://azk.io">
          <img src="http://azk-landapage-stage.s3.amazonaws.com/website.png">
          <br/>
          Website
        </a>
      </td>
      <td align="center">
        <a href="http://azk.io">
          <img src="http://azk-landapage-stage.s3.amazonaws.com/documentation.png">
          <br/>
          Documentation
        </a>
      </td>
      <td align="center">
        <a href="http://azk.io">
          <img src="http://azk-landapage-stage.s3.amazonaws.com/latest-release-notes.png">
          <br/>
          Latest Release Notes
        </a>
      </td>
    </tr>
</table>

--


![Usage of azk](https://github.com/azukiapp/azk/blob/master/src/pres/azk-screenflow-slow.gif?raw=true)

## Why azk?

`TODO`

* **Freedom**: never been so easy to switch stacks. Add, remove and re-config system's language, database or components in a few minutes.
* **Parity**: Azkfile will guarantee systems will work exactly the same no matter where. Anyone, with azk, can streamline the application with the a proper Azkfile so precisely and quickly that the focus can remain on what interests: coding.
* **Automation**:
* **Isolation**:

`Keywords: Paridade(dev/prod, workmates), liberdade, automação, isolamento`

Have you ever gotten an application running on your local workstation, only to find the setup is completely different when you deploy it to a production server?

azk makes it quick and easy to run not just the application but all of its dependencies, including the required OS, languages, frameworks, databases and other dependencies ~~(an otherwise labor-intensive, repetitive, long, and thus error-prone task)~~, whether you're on your local environment or a server.

azk takes care of many steps behind the scenes to make orchestration easier. So, this tutorial contains a few optional steps which are not strictly necessary to set up the sample app, but explain what azk is doing.

## Main Features (*)

`TODO: 5 bullets on top`.

* Built-in load-balancer that distributes requests among containers
* Built-in DNS resolver;
* Stream system's logs in real-time;
* Map local source code and folders into containers dinamically;
* Support for system provisioning and startup commands and scripts;
* Suggestions for your chosen language;
* Curated list of [images][azk_images] for systems, languages, databases and tools;

## Quick Start

### Requirements
* 64-bit architecture machine
* one of the following OS running:
  * **Mac OS X 10.6 (Snow Leopard)** or later (requires [**VirtualBox**](https://www.virtualbox.org/wiki/Downloads))
  * **Ubuntu 12.04, 14.04** or **15.10**
  * **Fedora 21** or **22**

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
$ mkdir my-app && cd my-app # or whatever you want to name the new project
$ azk shell --image azukiapp/node
# `azk shell` will spin up a container with the Node.js runtime
# in this new context, the `npm` command will be available

> npm init # generates the package.json file for your app
> exit

# azk will detect your app stack (Node.js in this case) and suggest a base Azkfile
$ azk init
azk: [my-app] `node` system was detected at 'my-app'
...
azk: [my-app] 'Azkfile.js' generated

# now we have an Azkfile, let's start the systems
$ azk start
```

### Using azk with an existing project

When you already have a codebase for your application and want to use **azk** to streamline the development environment, you can take advantage of the `suggestions`.
`Suggestions` will look at your codebase and do the heavy lifting of figuring out what is your application's stack and suggest a base **Azkfile** for it.

All you have to do is:

```sh
# navigate into your app folder
$ cd my-app

# azk will detect your app stack and suggest a base Azkfile
$ azk init
...
azk: [my-app] 'Azkfile.js' generated
```

Check the generated Azkfile. You may need to make couple adjustments to it such as:
* Verify the env vars (`.env` file, `envs` and `export_envs` properties)
* Check `provision` and `command` properties
* Adjust your app to connect to the database using the `DATABASE_URL` env var

```sh
# now we have an ready Azkfile, let's start the systems
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

## Command-line reference

See [command-line docs](http://docs.azk.io/en/reference/cli) for a full summary of commands.

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
