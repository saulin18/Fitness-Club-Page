from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, Token


class IsUserOrAdmin(BasePermission):
    def has_permission(self, request: Request, view: APIView) -> bool:  # type: ignore
        try:
            refresh_token: Token | None = request.data.get("refresh")  # type: ignore
            user = get_user_model().objects.get(pk=request.user.pk)
            user_id = RefreshToken(refresh_token).get("user_id")

            if not user_id:
                return user.is_staff

            return bool(
                (user.is_authenticated and user.pk == int(user_id)) or user.is_staff,
            )
        except User.DoesNotExist:
            return False
        except ValueError:
            return False
