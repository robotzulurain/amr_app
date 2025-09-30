from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

from amr_api.views_public import (
    OptionsView,
    CountsSummaryView, TimeTrendsView, AntibiogramView, SexAgeView,
    GeoFacilitiesView,
    ReportSummaryView, ReportFacilityLeagueView, ReportAntibiogramView,
    AlertsView,
)
from amr_api.open_views import CSVUploadOpenView, ManualEntryOpenView

# --- API root ---
def api_root(request):
    endpoints = {
        "options": "/api/options",
        "counts_summary": "/api/summary/counts-summary",
        "time_trends": "/api/summary/time-trends",
        "antibiogram": "/api/summary/antibiogram",
        "sex_age": "/api/summary/sex-age",
        "geo_facilities": "/api/geo/facilities",
        "upload_csv_open": "/api/upload/csv-open",
        "entry_open": "/api/entry-open",
        "reports_summary": "/api/reports/summary",
        "reports_facility_league": "/api/reports/facility-league",
        "reports_antibiogram": "/api/reports/antibiogram",
        "alerts": "/api/alerts",
    }
    return JsonResponse(endpoints)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API root
    path('api/', api_root),

    # auth (placeholders)
    path('api/auth/token', AlertsView.as_view()),
    path('api/auth/whoami', AlertsView.as_view()),

    # options
    path('api/options', OptionsView.as_view()),

    # summaries
    path('api/summary/counts-summary', CountsSummaryView.as_view()),
    path('api/summary/time-trends', TimeTrendsView.as_view()),
    path('api/summary/antibiogram', AntibiogramView.as_view()),
    path('api/summary/sex-age', SexAgeView.as_view()),

    # geo
    path('api/geo/facilities', GeoFacilitiesView.as_view()),

    # data entry (open)
    path('api/upload/csv-open', CSVUploadOpenView.as_view()),
    path('api/entry-open', ManualEntryOpenView.as_view()),

    # legacy
    path('api/entry', ManualEntryOpenView.as_view()),
    path('api/upload/csv', CSVUploadOpenView.as_view()),

    # reports
    path('api/reports/summary', ReportSummaryView.as_view()),
    path('api/reports/facility-league', ReportFacilityLeagueView.as_view()),
    path('api/reports/antibiogram', ReportAntibiogramView.as_view()),

    # alerts
    path('api/alerts', AlertsView.as_view()),
]
