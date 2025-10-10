#!/bin/bash

set -e  # Exit on any error

echo "🔧 AMR Application Startup"

echo "📦 1. Running migrations..."
python manage.py migrate

echo "👤 2. Creating admin user..."
python3 -c "
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'amr_project.settings')
import django
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='amradmin').exists():
    User.objects.create_superuser('amradmin', 'admin@amrthabo.com', 'admin123')
    print('✅ Admin user created')
else:
    print('✅ Admin user already exists')
"

echo "🎨 3. Collecting static files..."
python manage.py collectstatic --noinput

echo "🚀 4. Starting server..."
exec gunicorn amr_project.wsgi:application --bind 0.0.0.0:10000
