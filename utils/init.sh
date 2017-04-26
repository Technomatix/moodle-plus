#!/bin/bash

# Composer packages
printf "Installing Composer packages ...\n"
docker-compose run --rm -u $(id -u) php composer install
docker-compose run --rm -u $(id -u) -w //var/www/html/moodle php composer install

# moodledata directories
printf "\nCreating moodledata directories ...\n"
if [ ! -d moodledata ]; then
    mkdir moodledata
    mkdir moodledata/main
    mkdir moodledata/phpu
    mkdir moodledata/behat
    chmod -R 777 moodledata
fi;

# config.php
printf "\nProvisioning config.php ...\n"
if [ ! -f moodle/config.php ]; then
    cp docker/php/config.php moodle/
    chmod a+r moodle/config.php
fi;

# database
printf "\nInstalling and upgrading Moodle database ...\n"
docker-compose run --rm -u $(id -u) -w //var/www/html/moodle php php admin/cli/install_database.php --non-interactive --adminpass=Wibble123! --agree-license --fullname=Moodle --shortname=Moodle
docker-compose run --rm -u $(id -u) -w //var/www/html/moodle php php admin/cli/upgrade.php --non-interactive

# settings
printf "\nConfiguring settings in the database ...\n"
docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = '30719' where name = 'debug'"
docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = '0' where name in ('debugdisplay', 'cachejs')"
docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = '14400' where name = 'sessiontimeout'"
docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = 'plus' where name = 'theme'"

# PHPUnit
printf "\nConfiguring PHPUnit ...\n"
docker-compose run --rm -u $(id -u) -w //var/www/html/moodle php php admin/tool/phpunit/cli/util.php --buildcomponentconfigs
docker-compose run --rm -u $(id -u) -w //var/www/html/moodle php php admin/tool/phpunit/cli/init.php

# Behat
. "${BASH_SOURCE%/*}/behat.sh"

# purge caches
printf "\nPurging caches ...\n"
docker-compose run --rm -w /var/www/html/moodle php php admin/cli/purge_caches.php
docker-compose run --rm php php utils/rebuild_theme.php
