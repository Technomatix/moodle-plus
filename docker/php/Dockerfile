FROM php:5.6-fpm
LABEL name="php"
LABEL version="0.0.1"

# PHP extension requires APT package
# curl          -------> libcurl4-nss-dev
# gd            -------> libpng12-dev
# intl          -------> libicu-dev
# mbstring      -------> none
# soap          -------> libxml2-dev
# xml           -------> libxml2-dev
# xmlrpc        -------> libxml2-dev
# zip           -------> zlib1g-dev
# pdo_pgsql     -------> libpq-dev
# pgsql         -------> libpq-dev
RUN aptPackages=" \
        wget \
        git \
        vim \
        libpng12-dev \
        libicu-dev \
        libxml2-dev \
        libcurl4-nss-dev \
        libpq-dev \
        zlib1g-dev \
    " \
    phpExtensions=" \
        curl \
        gd \
        intl \
        mbstring \
        soap \
        xml \
        xmlrpc \
        zip \
        pdo_pgsql \
        pgsql \
    " \
    && DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends $aptPackages \
    && docker-php-ext-install $phpExtensions \
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
    && phpcs --config-set colors 1 \
    && phpcs --config-set report_width 120 \
    && phpcs --config-set default_standard "/usr/code/codechecker/moodle/ruleset.xml"
