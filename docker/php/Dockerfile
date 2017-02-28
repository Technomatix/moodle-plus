FROM php:5.6-fpm

# basics
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y wget

# install PostgreSQL
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql-server-dev-9.5
RUN docker-php-ext-install pgsql

# other PHP extensions required by Moodle
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libpng12-dev libpng12-dev libicu-dev libxml2 libxml2-dev libcurl4-nss-dev zlib1g-dev
RUN docker-php-ext-install curl gd intl mbstring soap xml xmlrpc zip

# opcache
RUN docker-php-ext-configure opcache --enable-opcache
RUN docker-php-ext-install opcache
COPY opcache.ini /usr/local/etc/php/conf.d/

# xdebug
RUN pecl install xdebug
COPY xdebug.ini /usr/local/etc/php/conf.d/
