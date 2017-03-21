#!/bin/bash

docker-compose stop
docker-compose rm -f

rm -f composer.lock
rm -rf vendor
rm -rf moodle/vendor
rm -rf moodledata
rm -f config.php

docker volume rm moodleplus_pgdata
docker network rm moodleplus_default
