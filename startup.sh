#!/bin/bash

set -o errexit

echo "=== Starting AMR Application ==="

# Run migrations
echo "1. Running migrations..."
python manage.py migrate

# Create admin user directly
echo "2. Creating admin user..."
python create_admin_direct.py

# Seed initial data
echo "3. Seeding initial data..."
python manage.py seed_data

# Collect static files
echo "4. Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
echo "5. Starting Gunicorn..."
exec gunicorn amr_project.wsgi:application --bind 0.0.0.0:10000
