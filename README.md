# Moodle Plus

Moodle 3.2.1 (blastoff!) plus:

- [Vagrant](https://www.vagrantup.com/) environment (Ubuntu Trusty, nginx, PostgreSQL)
- [Bootstrap 4](https://v4-alpha.getbootstrap.com/) based theme
- JavaScript and Sass with Webpack 2 and npm scripts

## TODO

- [x] Setup Moodle to run its own PHPUnit test suite
- [x] Install Moodle's Composer packages defined in its own `composer.json` file into its own `vendor/` directory
- [ ] Check can diff `moodle/` subdirectory against Moodle tag
- [ ] Provision [Slim 3](https://www.slimframework.com/)
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
* [Moodle's 'Boost' theme guide](https://docs.moodle.org/dev/Creating_a_theme_based_on_boost)
