FROM php:5.6-cli
LABEL name="builtin"
LABEL version="0.0.1"

# APT packages and PHP extensions
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

# run built-in web server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html/moodle"]
