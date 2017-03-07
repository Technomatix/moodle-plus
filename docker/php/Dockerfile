FROM php:5.6-fpm

# basics
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y wget git vim

# install PostgreSQL
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql-server-dev-9.5 \
    && docker-php-ext-install pgsql

# other PHP extensions required by Moodle
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libpng12-dev libpng12-dev libicu-dev libxml2 libxml2-dev libcurl4-nss-dev zlib1g-dev \
    && docker-php-ext-install curl gd intl mbstring soap xml xmlrpc zip

# opcache
RUN docker-php-ext-configure opcache --enable-opcache \
    && docker-php-ext-install opcache
COPY opcache.ini /usr/local/etc/php/conf.d/

# Xdebug
RUN pecl install xdebug
COPY xdebug.ini /usr/local/etc/php/conf.d/

# Composer
RUN curl -L -O https://getcomposer.org/composer.phar && chmod +x composer.phar && mv composer.phar /usr/local/bin/composer

# AU locale for PHPUnit
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y locales \
    && sed -i 's/# en_AU.UTF-8 UTF-8/en_AU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen

# CodeSniffer
RUN mkdir -p /usr/code/codesniffer \
    && git clone https://github.com/squizlabs/PHP_CodeSniffer.git /usr/code/codesniffer \
    && cd /usr/code/codesniffer \
    && git checkout 2.8.1

# Codechecker (essentially, Moodle rules for CodeSniffer)
COPY codechecker.diff /tmp/
RUN mkdir -p /usr/code/codechecker \
    && git clone https://github.com/moodlehq/moodle-local_codechecker /usr/code/codechecker \
    && cd /usr/code/codechecker \
    && git checkout v2.5.4 \
    && git apply /tmp/codechecker.diff \
    && echo 'alias phpcs="find -type f -name \"*.php\" | xargs /usr/code/codesniffer/scripts/phpcs --standard=/usr/code/codechecker/moodle/ruleset.xml"' >> ~/.bashrc
