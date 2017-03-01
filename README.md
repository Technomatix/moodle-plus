# Moodle Plus

A Dockerized Moodle development environment

* Moodle 3.2
* nginx
* PHP-FPM 5.6
* PostgreSQL

## Including

* [XDebug](https://xdebug.org/)
* [Composer](https://getcomposer.org/)
* [PHPUnit](https://docs.moodle.org/dev/PHPUnit)
* [Behat](https://docs.moodle.org/dev/Acceptance_testing)
* [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer)
* [Slim 3 micro-framework](https://www.slimframework.com/docs/)

## Requirements

* Docker Engine 1.13.1
* Docker Compose 1.11.2

## TODO

- [ ] Replace Vagrant with Docker (and Docker Compose)
- [ ] Fix problem with `local/todolist` and the timestamped RequireJS
- [ ] Continue building example `local/todolist` plugin
- [ ] Theme based on [Boost](https://docs.moodle.org/32/en/Boost_theme)

## Moodle plugin types

To see which [Moodle plugin types](https://docs.moodle.org/dev/Plugin_types) are available:

```
docker exec moodleplus_php_1 php utils/plugin_types.php
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

TODO

### XDebug

Remote debugging with [XDebug](https://xdebug.org/) is possible in [PHPStorm](https://www.jetbrains.com/phpstorm/) and [Visual Studio Code](https://code.visualstudio.com/Docs/languages/php).

Debugging in VSCode requires the [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) extension.

To set up source code mapping, add the two lines below to the "Listen for XDebug" configuration of a VSCode debugger `launch.json` file:

```
"localSourceRoot": "${workspaceRoot}/moodle",
"serverSourceRoot": "/vagrant/moodle"
```

(Since the XDebug `remote_autostart` setting is provisioned, [bookmarklets](https://www.jetbrains.com/phpstorm/marklets/) shouldn't be necessary.)

### Behat

TODO
