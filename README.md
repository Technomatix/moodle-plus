# Moodle Plus

A Moodle [Vagrant](https://www.vagrantup.com/) environment provisioned with [Ansible local](https://www.vagrantup.com/docs/provisioning/ansible_local.html):

* Ubuntu Trusty
* nginx
* PostgreSQL
* PHP 5.6
* [XDebug](https://xdebug.org/)
* [Composer](https://getcomposer.org/)
* [PHPUnit](https://docs.moodle.org/dev/PHPUnit)
* [Behat](https://docs.moodle.org/dev/Acceptance_testing)
* [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer)
* [Slim 3 micro-framework](https://www.slimframework.com/docs/)

## TODO

- [ ] Only run Ansible task for initializing test environments if db tables don't exist
- [ ] Build example TODOs app (as a `local` plugin) with a Slim REST API and React/Redux front-end
- [ ] Theme based on [Boost](https://docs.moodle.org/32/en/Boost_theme)

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

Remote debugging with [XDebug](https://xdebug.org/) is possible in [PHPStorm](https://www.jetbrains.com/phpstorm/) and [Visual Studio Code](https://code.visualstudio.com/Docs/languages/php).

Debugging in VSCode requires the [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) extension.

To set up source code mapping, add the two lines below to the "Listen for XDebug" configuration of a VSCode debugger `launch.json` file:

```
"localSourceRoot": "${workspaceRoot}/moodle",
"serverSourceRoot": "/vagrant/moodle"
```

(Since the XDebug `remote_autostart` setting is provisioned, [bookmarklets](https://www.jetbrains.com/phpstorm/marklets/) shouldn't be necessary.)

### Behat

This requires three ssh sessions in the Vagrant VM.

In the first ssh session, run the PHP built-in web server:

```
cd /vagrant/moodle
php -S localhost:8000
```

In the second ssh session, run Selenium:

```
java -jar /vagrant/utils/selenium-server-standalone-2.53.1.jar
```

In the third ssh session, run the Behat test suite (in headless Firefox):

```
cd /vagrant/moodle
Xvfb :99 -ac &
vendor/bin/behat --config ../behat_moodledata/behat/behat.yml /path/to/some/behat/feature/files/
```

## Guides

* [nginx with Moodle](https://docs.moodle.org/32/en/Nginx)
* ['Boost' theme](https://docs.moodle.org/dev/Creating_a_theme_based_on_boost)
* [Behat with Moodle](https://docs.moodle.org/dev/Acceptance_testing)
* [Digital Ocean r.e. nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts)
* [Digital Ocean r.e. LEMP stack](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-14-04)
* [Headless Firefox with Selenium](https://medium.com/@griggheo/running-selenium-webdriver-tests-using-firefox-headless-mode-on-ubuntu-d32500bb6af2#.txv9ubupd)
