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

# PHPUnit
docker-compose run --rm -u 1000 -w //var/www/html/moodle php php admin/tool/phpunit/cli/util.php --buildcomponentconfigs
docker-compose run --rm -u 1000 -w //var/www/html/moodle php php admin/tool/phpunit/cli/init.php

# Behat
. "${BASH_SOURCE%/*}/behat.sh"
