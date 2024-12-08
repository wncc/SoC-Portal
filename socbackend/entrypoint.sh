#!/bin/bash

# Exit on errors
set -e

if [ -f ".env" ]; then
  echo "Loading environment variables from .env file"
  export $(grep -v '^#' .env | xargs)
fi

echo "Running database migrations..."

python manage.py makemigrations
python manage.py migrate

# Collect static files (optional, for production)
# echo "Collecting static files..."
# python manage.py collectstatic --noinput

# Start the Django server
exec "$@"
