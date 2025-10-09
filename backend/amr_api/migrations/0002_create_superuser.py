from django.db import migrations
from django.contrib.auth import get_user_model

def create_superuser(apps, schema_editor):
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='robotzulurain@gmail.com',
            password='admin123'
        )
        print("Superuser created: admin/admin123")
    else:
        print("Superuser already exists")

class Migration(migrations.Migration):
    dependencies = [
        ('amr_api', '0001_initial'),
    ]
    
    operations = [
        migrations.RunPython(create_superuser),
    ]
