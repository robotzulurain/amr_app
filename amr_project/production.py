import os
import dj_database_url

# Security
DEBUG = False
ALLOWED_HOSTS = ['.onrender.com', 'localhost', '127.0.0.1']

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# CORS settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Static files
STATIC_ROOT = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Whitenoise middleware - insert after SecurityMiddleware
MIDDLEWARE = list(MIDDLEWARE)
if 'whitenoise.middleware.WhiteNoiseMiddleware' not in MIDDLEWARE:
    middleware_index = MIDDLEWARE.index('django.middleware.security.SecurityMiddleware') + 1
    MIDDLEWARE.insert(middleware_index, 'whitenoise.middleware.WhiteNoiseMiddleware')
