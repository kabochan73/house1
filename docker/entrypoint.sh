#!/bin/sh
set -e

if [ "$#" -gt 0 ]; then
    exec "$@"
fi

php artisan migrate --force

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
