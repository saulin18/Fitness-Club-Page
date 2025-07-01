from rest_framework import status
from rest_framework.exceptions import APIException


class KwargIntException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Pls input a correct pk ej: 1, 2, 3"
    default_code = "invalid_kwarg"


# Workout Plans
class NoStatusPlansException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "No workout plans with this status"
    default_code = "no_plans_status"


class PlanDoesntExistException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "This workout plan doesn't exist"
    default_code = "no_plans_status"


# Workouts
class NoWorkoutsWithExerciseException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "No workouts with this exercise"
    default_code = "no_workouts_exercise"


class NoWorkoutsInPlanException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "No workouts in this plan"
    default_code = "no_workouts_plan"


# Exercises
class ExerciseDoesntExistException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "This Exercise doesn't exist"
    default_code = "invalid_pk"


# User
class UserDoesntExistException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "This User doesn't exist"
    default_code = "invalid_user"


class UserIsntOwnerException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "This User isn't owner of this workout plan"
    default_code = "invalid_user"
