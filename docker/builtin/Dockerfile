FROM php:5.6-cli

# basics
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y wget

# install PostgreSQL
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql-server-dev-9.5 \
    && docker-php-ext-install pgsql

# other PHP extensions required by Moodle
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libpng12-dev libpng12-dev libicu-dev libxml2 libxml2-dev libcurl4-nss-dev zlib1g-dev \
    && docker-php-ext-install curl gd intl mbstring soap xml xmlrpc zip

# run built-in web server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html/moodle"]
