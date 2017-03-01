#!/bin/bash

# Composer packages
docker-compose run -u 1000 php composer install
docker-compose run -u 1000 -w /var/www/html/moodle php composer install

# moodledata directories
mkdir moodledata
mkdir moodledata/main
mkdir moodledata/phpunit
mkdir moodledata/behat
chmod -R 777 moodledata

# database
cp docker/php/config.php moodle/
chmod a+r moodle/config.php
docker-compose run -u 1000 -w /var/www/html/moodle php php admin/cli/install_database.php --non-interactive --adminpass=Wibble123! --agree-license --fullname=Moodle --shortname=Moodle

# PHPUnit
docker-compose run -u 1000 -w /var/www/html/moodle php php admin/tool/phpunit/cli/util.php --buildcomponentconfigs
docker-compose run -u 1000 -w /var/www/html/moodle php php admin/tool/phpunit/cli/init.php
