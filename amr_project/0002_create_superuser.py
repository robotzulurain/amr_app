from django.db import migrations
from django.contrib.auth import get_user_model

def create_superuser(apps, schema_editor):
    User = get_user_model()
    
    # Check if superuser already exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='robotzulurain@gmail.com',
            password='admin123'
        )
        print("Superuser created successfully!")
    else:
        print("Superuser already exists!")

def reverse_func(apps, schema_editor):
    # Reverse function - delete the superuser
    User = get_user_model()
    User.objects.filter(username='admin').delete()

class Migration(migrations.Migration):
    dependencies = [
        ('amr_reports', '0001_initial'),
    ]
    
    operations = [
        migrations.RunPython(create_superuser, reverse_func),
    ]
