from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
import datetime

@api_view(['GET'])
def check_persistence(request):
    """Check if database is persisting data"""
    try:
        engine = connection.settings_dict['ENGINE']
        
        if 'sqlite' in engine:
            db_type = 'SQLite'
            persistent = False
            with connection.cursor() as cursor:
                cursor.execute("SELECT datetime('now')")
                db_info = cursor.fetchone()
            db_name = 'SQLite (file-based)'
        elif 'postgres' in engine:
            db_type = 'PostgreSQL'
            persistent = True
            with connection.cursor() as cursor:
                cursor.execute("SELECT current_database(), now()")
                db_info = cursor.fetchone()
            db_name = db_info[0]
        else:
            db_type = 'Unknown'
            persistent = False
            db_name = 'Unknown'
            db_info = [datetime.datetime.now()]
        
        return Response({
            'database_name': db_name,
            'server_time': db_info[0],
            'database_type': db_type,
            'persistent': persistent,
            'status': 'OK',
            'engine': engine
        })
    except Exception as e:
        return Response({
            'error': str(e),
            'database_type': 'Unknown',
            'persistent': False,
            'status': 'ERROR'
        })
