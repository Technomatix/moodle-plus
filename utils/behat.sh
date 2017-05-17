#!/bin/bash

# Behat
printf "Configurating Behat ...\n"
docker-compose run --rm -u $(id -u) -w //var/www/html/vendor/moodle/moodle php php admin/tool/behat/cli/init.php

# get IP address of built-in web server and Selenium
builtin=`docker inspect --format "{{ .NetworkSettings.Networks.moodleplus_default.IPAddress }}" $(docker ps -a | grep builtin | grep -Po "^[a-z0-9]+")`
selenium=`docker inspect --format "{{ .NetworkSettings.Networks.moodleplus_default.IPAddress }}" $(docker ps -a | grep selenium | grep -Po "^[a-z0-9]+")`

# correct IP addresses in configuration files
sed -i "s/behat_wwwroot\s*=\s*'http:\/\/[0-9\.\?]\+:8000/behat_wwwroot  = 'http:\/\/$builtin:8000/" vendor/moodle/moodle/config.php
sed -i "s/base_url:\s*'http:\/\/[0-9\.\?]\+:8000/base_url: 'http:\/\/$builtin:8000/" moodledata/behat/behatrun/behat/behat.yml
sed -i "s/wd_host:\s*'http:\/\/localhost:4444/wd_host: 'http:\/\/$selenium:4444/" moodledata/behat/behatrun/behat/behat.yml

# alter Behat suite name from 'default' to 'plus' (so it runs against the 'plus' theme that has the Webpack vendor bundle)
sed -i "s/    default:/    plus:/" moodledata/behat/behatrun/behat/behat.yml
