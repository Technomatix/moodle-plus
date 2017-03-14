#!/bin/bash

# Composer packages
docker-compose run --rm -u 1000 php composer install
docker-compose run --rm -u 1000 -w //var/www/html/moodle php composer install

# moodledata directories
if [ ! -d moodledata ]; then
    mkdir moodledata
    mkdir moodledata/main
    mkdir moodledata/phpu
    mkdir moodledata/behat
    chmod -R 777 moodledata
fi;

# config.php
if [ ! -f moodle/config.php ]; then
    cp docker/php/config.php moodle/
    chmod a+r moodle/config.php
fi;

# database
docker-compose run --rm -u 1000 -w //var/www/html/moodle php php admin/cli/install_database.php --non-interactive --adminpass=Wibble123! --agree-license --fullname=Moodle --shortname=Moodle
docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = '30719' where name = 'debug'"
docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = '0' where name in ('debugdisplay', 'cachejs')"
docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = '14400' where name = 'sessiontimeout'"

# PHPUnit and Behat
docker-compose run --rm -u 1000 -w //var/www/html/moodle php php admin/tool/phpunit/cli/util.php --buildcomponentconfigs
docker-compose run --rm -u 1000 -w //var/www/html/moodle php php admin/tool/phpunit/cli/init.php
docker-compose run --rm -u 1000 -w //var/www/html/moodle php php admin/tool/behat/cli/init.php

# get IP address of built-in web server and Selenium
builtin=`docker inspect --format "{{ .NetworkSettings.Networks.moodleplus_default.IPAddress }}" $(docker ps -a | grep builtin | grep -Po "^[a-z0-9]+")`
selenium=`docker inspect --format "{{ .NetworkSettings.Networks.moodleplus_default.IPAddress }}" $(docker ps -a | grep selenium | grep -Po "^[a-z0-9]+")`

# correct IP addresses in configuration files
sed -i "s/behat_wwwroot\s*=\s*'http:\/\/[0-9\.\?]\+:8000/behat_wwwroot  = 'http:\/\/$builtin:8000/" moodle/config.php
sed -i "s/base_url:\s*'http:\/\/[0-9\.\?]\+:8000/base_url: 'http:\/\/$builtin:8000/" moodledata/behat/behatrun/behat/behat.yml
sed -i "s/wd_host:\s*'http:\/\/localhost:4444/wd_host: 'http:\/\/$selenium:4444/" moodledata/behat/behatrun/behat/behat.yml
