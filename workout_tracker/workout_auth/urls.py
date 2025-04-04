from django.urls import URLPattern, URLResolver, include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from workout_auth.views import LoginView, LogoutView, SignUpView, UserViewSet

router = DefaultRouter()

router.register(r"user", UserViewSet, "userviewset")

urlpatterns: list[URLPattern | URLResolver] = [
    path("", include(router.urls)),
    path(
        "token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "token/refresh",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path(
        "login/",
        LoginView.as_view(),
    ),
    path(
        "signup/",
        SignUpView.as_view(),
    ),
    path(
        "logout/",
        LogoutView.as_view(),
    ),
]
