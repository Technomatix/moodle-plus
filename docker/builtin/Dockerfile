FROM php:5.6-cli
LABEL name="builtin"
LABEL version="0.0.1"

# basics
RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends wget \
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
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends libpng12-dev libicu-dev libxml2 libxml2-dev libcurl4-nss-dev zlib1g-dev \
    && docker-php-ext-install curl gd intl mbstring soap xml xmlrpc zip \
    && DEBIAN_FRONTEND=noninteractive apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# run built-in web server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html/moodle"]
