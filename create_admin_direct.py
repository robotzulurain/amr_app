import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'amr_project.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
username = 'amradmin'
email = 'admin@amrthabo.com'
password = 'admin123'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'✅ Superuser {username} created successfully')
else:
    user = User.objects.get(username=username)
    user.set_password(password)
    user.save()
    print(f'✅ Superuser {username} password reset to {password}')
