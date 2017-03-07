# Moodle Plus

A dockerized Moodle 3.2 development environment with three containers:

* nginx
* PostgreSQL
* PHP-FPM 5.6

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

### Docker

- [x] PHP Code Sniffer with Docker
- [ ] Behat with Docker

### local/todolist plugin

- [ ] Continue building example `local/todolist` plugin
- [ ] Clicking on an item toggles its 'done' status
- [ ] Don't show 'done' items for which the due date is in the past
- [ ] Add new item

## Build Docker images and run Docker containers

```
docker-compose build
docker-compose up -d
```

## Install Moodle

Set the password for the `postgres` user and create an empty database for Moodle:

```
docker-compose exec pgsql bash
psql -Upostgres
\password postgres
create database moodle;
```

(Either set the `postgres` password to `Wibble123!` or change Moodle's `config.php` by hand.)

Run the install script:

```
. docker/install.sh
```

## Commands

### PHP shell

```
docker-compose exec php bash
php -a
```

### PostgreSQL shell

```
docker-compose exec pgsql bash
psql -Upostgres
```

### View logs

```
docker-compose logs -f
```

### Run Moodle cron

```
docker-compose run -w /var/www/html/moodle php php admin/cli/cron.php
```

### Run PHPUnits for a particular plugin

```
docker-compose run -w /var/www/html/moodle php vendor/bin/phpunit -c path/to/moodle/plugin
```

### Purge Moodle caches

```
docker-compose run -w /var/www/html/moodle php php admin/cli/purge_caches.php
```

### See available Moodle plugin types

```
docker-compose run php php utils/plugin_types.php
```

### Lint PHP code with CodeSniffer

```
docker-compose exec php bash
cd /path/to/moodle/plugin
phpcs
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

### XDebug

Remote debugging with [XDebug](https://xdebug.org/) is possible in [PHPStorm](https://www.jetbrains.com/phpstorm/) and [Visual Studio Code](https://code.visualstudio.com/Docs/languages/php).

Debugging in VSCode requires the [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) extension.

To set up source code mapping, add the lines below to the "Listen for XDebug" configuration of a VSCode debugger `launch.json` file:

```
"port": 10000,
"localSourceRoot": "${workspaceRoot}/moodle",
"serverSourceRoot": "/var/www/html/moodle"
```
