from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
import datetime

@api_view(['GET'])
def check_persistence(request):
    """Check if database is persisting data"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT current_database(), now()")
            db_info = cursor.fetchone()
        
        return Response({
            'database_name': db_info[0],
            'server_time': db_info[1],
            'database_type': 'PostgreSQL' if 'postgres' in db_info[0] else 'SQLite',
            'persistent': 'postgres' in db_info[0].lower(),
            'status': 'OK'
        })
    except Exception as e:
        return Response({
            'error': str(e),
            'database_type': 'Unknown',
            'persistent': False,
            'status': 'ERROR'
        })
