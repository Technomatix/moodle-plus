# Moodle Plus

Moodle 3.2.1 (blastoff!) plus:

- [Vagrant](https://www.vagrantup.com/) environment (Ubuntu Trusty, nginx, PostgreSQL)
- [Bootstrap 4](https://v4-alpha.getbootstrap.com/) based theme
- JavaScript and Sass with Webpack 2 and npm scripts

## TODO

- [ ] Build [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) blogpost as a Moodle `local` plugin
- [ ] Theme based on 'Boost' with JavaScript and Sass compiled by Webpack
- [ ] Look into Behat

## Requirements

* git
* [Vagrant](https://www.vagrantup.com/) 1.8.7 or later
* Node 7.4.0 or later (ideally managed with [nvm](https://github.com/creationix/nvm))

## Moodle plugin types

To see which [Moodle plugin types](https://docs.moodle.org/dev/Plugin_types) are available, run the below in the Vagrant VM:

```
cd /vagrant
php utils/plugin_types.php
```

## Moodle source code

### git subtree

The Moodle source code is managed as a [git subtree](https://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/) under `moodle/`.

```
git remote add moodle https://github.com/moodle/moodle
git subtree add  --squash --prefix=moodle/ moodle v3.2.0
git subtree pull --squash --prefix=moodle/ moodle v3.2.1
```

### Diff

Moodle source code files (i.e. those under `moodle/`) that've been added, modified or deleted can be determined as below (replacing `v3.2.1` with a Moodle tag as appropriate).

```
git diff --name-status v3.2.1 HEAD:moodle/
```

### Lint

One or more PHP files can be linted (in the Vagrant VM, against the [Moodle coding style](https://docs.moodle.org/dev/Coding_style)) with [phpcs](https://github.com/squizlabs/PHP_CodeSniffer):

```
+vagrant@vagrant-ubuntu-trusty-64:/vagrant/moodle$ phpcs index.php

FILE: /vagrant/moodle/index.php
----------------------------------------------------------------------
FOUND 0 ERRORS AND 1 WARNING AFFECTING 1 LINE
----------------------------------------------------------------------
 25 | WARNING | Expected MOODLE_INTERNAL check or config.php inclusion
----------------------------------------------------------------------
```

(Much of Moodle's own code doesn't lint according to its own rules.)

### Debug

Remote debugging with [Xdebug](https://xdebug.org/) is possible in [PHPStorm](https://www.jetbrains.com/phpstorm/) and [Visual Studio Code](https://code.visualstudio.com/Docs/languages/php).

Debugging in VSCode requires the [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) extension.

To set up source code mapping, add the two lines below to the "Listen for XDebug" configuration of a VSCode debugger `launch.json` file:

```
"localSourceRoot": "${workspaceRoot}/moodle",
"serverSourceRoot": "/vagrant/moodle"
```

(Since the XDebug `remote_autostart` setting is provisioned, [Bookmarklets](https://www.jetbrains.com/phpstorm/marklets/) shouldn't be necessary.)

## Notes

* [Moodle's nginx guide](https://docs.moodle.org/32/en/Nginx)
* [Digital Ocean's nginx guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts)
* [Digital Ocean's LEMP stack guide](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-14-04)
* [Moodle's 'Boost' theme guide](https://docs.moodle.org/dev/Creating_a_theme_based_on_boost)
