# Moodle Plus

Moodle 3.2.1 (blastoff!) plus:

- [Vagrant](https://www.vagrantup.com/) environment (Ubuntu Trusty, nginx, PostgreSQL)
- Bootstrap 4 based theme
- JavaScript and Sass with Webpack 2 and npm scripts

## TODO

- [*] Provision at least PHP 5.6.5 (as Moodle 3.2 requires it)
- [ ] Check Xdebug works in PHPStorm
- [ ] Fix file sessions (workaround is to use database sessions by setting `$CFG->session_handler_class = '\core\session\database';` in `config.php`)
- [ ] Theme based on Bootstrap 4 with JavaScript and Sass compiled by Webpack

## Requirements

* git
* [Vagrant](https://www.vagrantup.com/) 1.8.7 or later
* Node 7.4.0 or later (ideally managed with [nvm](https://github.com/creationix/nvm))

## Moodle source code

The Moodle source code is managed as a [git subtree](https://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/) under `moodle/`.

```
git remote add moodle https://github.com/moodle/moodle
git subtree add  --squash --prefix=moodle/ moodle v3.2.0
git subtree pull --squash --prefix=moodle/ moodle v3.2.1
```

## Notes

* [Moodle's nginx guide](https://docs.moodle.org/32/en/Nginx)
* [Digital Ocean's nginx guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts)
* [Digital Ocean's LEMP stack guide](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-14-04)
