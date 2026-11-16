#!/bin/sh
set -e

if [ "$#" -gt 0 ]; then
    exec "$@"
fi

php artisan migrate --force

if [ ! -e public/storage ]; then
    php artisan storage:link
fi

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
