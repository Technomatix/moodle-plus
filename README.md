# Moodle Plus

Moodle 3.2.1 (blastoff!) plus:

- [ ] [Vagrant](https://www.vagrantup.com/) environment (Ubuntu Xenial, nginx, PostgreSQL)
- [ ] Bootstrap 4 based theme
- [ ] JavaScript and Sass with Webpack 2 and npm scripts

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
