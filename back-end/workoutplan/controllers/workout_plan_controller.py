from typing import Any

from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.exceptions import KwargIntException
from workoutplan.serializers import WorkoutPlanSerializer
from workoutplan.services.workout_plan_service import (
    WorkoutPlanService,
)


class WorkoutPlanViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutPlanSerializer
    queryset = WorkoutPlanService.get_all_workout_plans()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request: Request) -> Response:
        user = get_user_model().objects.get(pk=request.user.pk)
        status_filter = request.query_params.get("status")
        workout_plans = WorkoutPlanService.workout_plans_by_status(
            status_filter,
            user,
        )

        serializer = self.get_serializer(workout_plans, many=True)

        return Response(serializer.data)

    def retrieve(self, request: Request, **kwargs: dict[str, str]) -> Response:
        user = get_user_model().objects.get(pk=request.user.pk)

        try:
            pk = int(kwargs["pk"])  # type: ignore[]
        except ValueError as error:
            raise KwargIntException from error

        workoutplan = WorkoutPlanService.get_workout_plan_of_user(
            user,
            pk,
        )
        serializer = self.get_serializer(workoutplan)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request: Request) -> Response:
        data = request.data

        # Serializer Validation
        self.get_serializer(data=data).is_valid(raise_exception=True)

        user = get_user_model().objects.get(pk=request.user.pk)

        response = WorkoutPlanService.create(
            data,
            user,
        )

        serializer = self.get_serializer(response)

        return Response(serializer.data, status.HTTP_201_CREATED)

    def update(self, request: Request, **kwargs: dict[str, Any]) -> Response:
        data = request.data

        try:
            pk = int(kwargs["pk"])  # type: ignore[]
        except ValueError as error:
            raise KwargIntException from error

        # Serializer Validation
        self.get_serializer(data=data).is_valid(raise_exception=True)

        user = get_user_model().objects.get(pk=request.user.pk)

        response = WorkoutPlanService.update(
            data,
            user,
            pk,
        )

        serializer = self.get_serializer(response)

        return Response(serializer.data, status.HTTP_200_OK)

    def partial_update(self, request: Request, **kwargs: dict[str, Any]) -> Response:
        data = request.data

        try:
            pk = int(kwargs["pk"])  # type: ignore[]
        except ValueError as error:
            raise KwargIntException from error

        # Serializer Validation
        self.get_serializer(data=data).is_valid(raise_exception=True)

        user = get_user_model().objects.get(pk=request.user.pk)

        response = WorkoutPlanService.partial_update(
            data,
            user,
            pk,
        )

        serializer = self.get_serializer(response)

        return Response(serializer.data, status.HTTP_200_OK)
