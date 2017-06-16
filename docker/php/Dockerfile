FROM php:5.6-fpm
LABEL name="php"
LABEL version="0.0.1"

COPY limits.ini /usr/local/etc/php/conf.d/
COPY opcache.ini /usr/local/etc/php/conf.d/
COPY sendmail.ini /usr/local/etc/php/conf.d/
COPY xdebug.ini /usr/local/etc/php/conf.d/

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
# opcache       -------> none
RUN aptPackages=" \
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
        opcache \
    " \
    && DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends $aptPackages locales ssmtp \
    && docker-php-ext-configure opcache --enable-opcache \
    && docker-php-ext-install $phpExtensions \
    && pecl install xdebug \
    && echo "mailhub=mailcatcher:1025\nUseTLS=NO\nFromLineOverride=YES" > /etc/ssmtp/ssmtp.conf \
    && sed -i 's/# en_AU.UTF-8 UTF-8/en_AU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen \
    && DEBIAN_FRONTEND=noninteractive apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/composer \
    && curl -L -O https://getcomposer.org/composer.phar \
    && chmod +x composer.phar \
    && mv composer.phar /usr/local/bin/composer
COPY composer.json /opt/composer/
ENV COMPOSER_HOME /opt/composer
RUN composer global update
ENV PATH /opt/composer/vendor/bin:$PATH
RUN phpcs --config-set colors 1 \
    && phpcs --config-set report_width 120 \
    && phpcs --config-set default_standard "/opt/composer/vendor/moodlerooms/moodle-coding-standard/moodle" \
    && chmod -R 777 /opt/composer

ADD umask.sh /usr/local/bin/umask.sh
RUN chmod +x /usr/local/bin/umask.sh

ENTRYPOINT ["/usr/local/bin/umask.sh"]
CMD ["php-fpm"]
