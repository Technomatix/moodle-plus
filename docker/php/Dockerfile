FROM php:5.6-fpm
LABEL name="php"
LABEL version="0.0.1"

# basics
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends wget git vim \
    && DEBIAN_FRONTEND=noninteractive apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# install PostgreSQL
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends postgresql-server-dev-9.5 \
    && docker-php-ext-install pgsql \
    && DEBIAN_FRONTEND=noninteractive apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# other PHP extensions required by Moodle
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends libpng12-dev libpng12-dev libicu-dev libxml2 libxml2-dev libcurl4-nss-dev zlib1g-dev \
    && docker-php-ext-install curl gd intl mbstring soap xml xmlrpc zip \
    && DEBIAN_FRONTEND=noninteractive apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# opcache
RUN docker-php-ext-configure opcache --enable-opcache \
    && docker-php-ext-install opcache
COPY opcache.ini /usr/local/etc/php/conf.d/

# Xdebug
RUN pecl install xdebug
COPY xdebug.ini /usr/local/etc/php/conf.d/

# Limits
COPY limits.ini /usr/local/etc/php/conf.d/

# Composer
ENV COMPOSER_HOME /opt/.composer
RUN mkdir -p /opt/.composer \
    && chmod 777 /opt/.composer \
    && curl -L -O https://getcomposer.org/composer.phar && chmod +x composer.phar && mv composer.phar /usr/local/bin/composer

# AU locale for PHPUnit
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends locales \
    && sed -i 's/# en_AU.UTF-8 UTF-8/en_AU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen \
    && DEBIAN_FRONTEND=noninteractive apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# CodeSniffer
RUN curl -L -O https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar && chmod +x phpcs.phar && mv phpcs.phar /usr/local/bin/phpcs \
    && curl -L -O https://squizlabs.github.io/PHP_CodeSniffer/phpcbf.phar && chmod +x phpcbf.phar && mv phpcbf.phar /usr/local/bin/phpcbf

# Codechecker (essentially, Moodle rules for CodeSniffer)
COPY codechecker.diff /tmp/
RUN mkdir -p /usr/code/codechecker \
    && git clone https://github.com/moodlehq/moodle-local_codechecker /usr/code/codechecker \
    && cd /usr/code/codechecker \
    && git checkout v2.5.4 \
    && git apply --whitespace=fix /tmp/codechecker.diff \
    && echo 'alias lmc="find -type f -name \"*.php\" | xargs phpcs --colors --standard=/usr/code/codechecker/moodle/ruleset.xml"' >> ~/.bashrc
