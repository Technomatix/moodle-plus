#!/bin/bash

# Composer packages
printf "Installing and updating Composer packages ...\n"
docker-compose run --rm -u $(id -u) php composer install
docker-compose run --rm -u $(id -u) php composer update
docker-compose run --rm -u $(id -u) -w //var/www/html/vendor/moodle/moodle php composer install

# symlink plugins
printf "\nSymlinking plugins ...\n"
if [ ! -L vendor/moodle/moodle/local/todolist ]; then
    cd vendor/moodle/moodle/local; ln -s ../../../../plugins/local/todolist; cd ../../../..
fi
if [ ! -L vendor/moodle/moodle/theme/plus ]; then
    cd vendor/moodle/moodle/theme; ln -s ../../../../plugins/theme/plus; cd ../../../..
fi

# apply patches
printf "\nApplying patches...\n"
cd vendor/moodle/moodle
patch -p1 --silent < ../../../patches/minify.patch
cd ../../..

# moodledata directories
printf "\nCreating moodledata directories ...\n"
if [ ! -d moodledata ]; then
    mkdir moodledata
    mkdir moodledata/main
    mkdir moodledata/phpu
    mkdir moodledata/behat
    chmod -R 777 moodledata
fi

# config.php
printf "\nProvisioning config.php ...\n"
if [ ! -f vendor/moodle/moodle/config.php ]; then
    cp utils/config.php vendor/moodle/moodle/config.php
    chmod a+r vendor/moodle/moodle/config.php
    cd plugins; ln -s ../vendor/moodle/moodle/config.php; cd ..
fi

# database creation
printf "\nCreating database ...\n"
moodle_db_exists=`docker-compose exec pgsql psql -Upostgres -l | grep -o moodle`
if [ "$moodle_db_exists" != "moodle" ]; then
    docker-compose exec pgsql createdb -Upostgres moodle
fi

# database installation
printf "\nInstalling and upgrading Moodle database ...\n"
docker-compose run --rm -u $(id -u) -w //var/www/html/vendor/moodle/moodle php php admin/cli/install_database.php --non-interactive --adminpass=Wibble123! --agree-license --fullname=Moodle --shortname=Moodle
docker-compose run --rm -u $(id -u) -w //var/www/html/vendor/moodle/moodle php php admin/cli/upgrade.php --non-interactive

# settings
printf "\nConfiguring settings in the database ...\n"
declare -a db_statements=(
    "'30719' where name = 'debug'"
    "'0' where name in ('debugdisplay', 'cachejs')"
    "'14400' where name = 'sessiontimeout'"
    "'plus' where name = 'theme'"
)
for i in "${db_statements[@]}"
do
    docker-compose exec pgsql psql -Upostgres -dmoodle -c "update mdl_config set value = $i"
done

# PHPUnit
printf "\nConfiguring PHPUnit ...\n"
docker-compose run --rm -u $(id -u) -w //var/www/html/vendor/moodle/moodle php php admin/tool/phpunit/cli/util.php --buildcomponentconfigs
docker-compose run --rm -u $(id -u) -w //var/www/html/vendor/moodle/moodle php php admin/tool/phpunit/cli/init.php

# Behat
. "${BASH_SOURCE%/*}/behat.sh"

# purge caches
printf "\nPurging caches ...\n"
docker-compose run --rm -w //var/www/html/vendor/moodle/moodle php php admin/cli/purge_caches.php
