# Moodle Plus

A dockerized Moodle 3.2 development environment with containers:

* nginx
* PostgreSQL
* PHP-FPM 5.6
* Selenium (for Behat)
* Built-in web server (for Behat)

## Requirements

* Docker 17.03.0 (CE)
* Docker Compose 1.11.2

## Build Docker images and run Docker containers

```
docker-compose build
docker-compose up -d
```

## Install Moodle

### Environments with bash

Run the bash initialization script:

```
. utils/init.sh
```

### Environments without bash

The above bash initialization script should work on Windows environments that have bash ("Docker Quickstart Terminal" for "Docker Toolbox") however it won't work in PowerShell (obviously) if using (the newer) "Docker for Windows" (instead of the older "Docker Toolbox"). If using "Docker for Windows", the individual commands in `utils/init.sh` should be performed manually.

## Commands

In some Windows environments ("Docker Quickstart Terminal" for "Docker Toolbox") commands that specify a working directory (e.g. `-w /var/www/html/moodle`) may need an [initial double slash](http://stackoverflow.com/questions/16344985/how-do-i-pass-an-absolute-path-to-the-adb-command-via-git-bash-for-windows) (e.g. `-w //var/www/html/moodle`).

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
docker-compose run --rm -w /var/www/html/moodle php php admin/cli/cron.php
```

### Run PHPUnits for a particular plugin

```
docker-compose run --rm -w /var/www/html/moodle php vendor/bin/phpunit --colors=always -c path/to/plugin
```

### Run Behat tests for a particular feature

```
docker-compose run --rm -w /var/www/html/moodle php vendor/bin/behat -c ../moodledata/behat/behatrun/behat/behat.yml path/to/feature
```

### Initialize Behat

```
. utils/behat.sh
```

### Purge Moodle caches

```
docker-compose run --rm -w /var/www/html/moodle php php admin/cli/purge_caches.php
```

### See available Moodle plugin types

```
docker-compose run --rm php php utils/plugin_types.php
```

### Lint Moodle PHP code

```
docker-compose exec php bash
cd /path/to/moodle/plugin
phpcs version.php
```

## Moodle source code

### git subtree

The Moodle source code is managed as a [git subtree](https://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/) under `moodle/`.

```
git remote add moodle https://github.com/moodle/moodle
git subtree add  --squash --prefix=moodle/ moodle v3.2.0
git subtree pull --squash --prefix=moodle/ moodle v3.2.1
git subtree pull --squash --prefix=moodle/ moodle v3.2.2
```

### Diff

Moodle source code files (i.e. those under `moodle/`) that've been added, modified or deleted can be determined as below (replacing `v3.2.2` with a Moodle tag as appropriate).

```
git diff --name-status v3.2.2 HEAD:moodle/
```

## XDebug

Remote debugging with [XDebug](https://xdebug.org/) is possible in [PHPStorm](https://www.jetbrains.com/phpstorm/) and [Visual Studio Code](https://code.visualstudio.com/Docs/languages/php).

Debugging in VSCode requires the [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) extension.

To set up source code mapping, add the lines below to the "Listen for XDebug" configuration of a VSCode debugger `launch.json` file:

```
"port": 10000,
"localSourceRoot": "${workspaceRoot}/moodle",
"serverSourceRoot": "/var/www/html/moodle"
```

## PostgreSQL query logging

Inspect the `moodleplus_pgdata` Docker volume to determine the mountpoint:

```
docker volume inspect moodleplus_pgdata
```

Edit the `postgresql.conf` file to set `log_statement = 'all'`.

Restart the `pgsql` container:

```
docker-compose restart pgsql
```

View the logs:

```
docker-compose logs -f
```

## Stop and remove Docker containers

The below will not remove the `pgdata` Docker volume (thereby ensuring the PostgreSQL database is persisted):

```
docker-compose stop
docker-compose rm -f
```

## Uninstall Moodle

The below *will* remove the `pgdata` Docker volume (thereby removing the Moodle database):

```
. utils/uninit.sh
```
