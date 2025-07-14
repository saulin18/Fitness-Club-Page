from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("workoutplan/", include("workoutplan.urls")),
    path("api-auth/", include("workout_auth.urls")),
    # Spectacular Doc
    path("api-schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api-schema/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger",
    ),
    path(
        "api-schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
