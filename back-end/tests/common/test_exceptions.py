# noqa: INP001
from _collections_abc import Callable
from typing import Any
from unittest.mock import MagicMock

import pytest
from django.db.models.manager import BaseManager

from common.exceptions import (
    ExerciseDoesntExistException,
    KwargIntException,
    NoStatusPlansException,
    NoWorkoutsInPlanException,
    NoWorkoutsWithExerciseException,
    PlanDoesntExistException,
)
from tests.workoutplan.repositories.test_workout_plan_repository import logger
from workoutplan.models import Exercise, Workout, WorkoutPlan
from workoutplan.repositories.workout_plan_repository import (
    ExerciseRepository,
    UserRepository,  # noqa: F401 # type: ignore
    WorkoutPlanRepository,
    WorkoutRepository,
)


@pytest.mark.django_db
@pytest.mark.parametrize(
    ("mock_method", "exception", "repository_method", "args"),
    [
        # Exercise Doesnt Exist Test
        (
            lambda: MagicMock(side_effect=Exercise.DoesNotExist),  # Mock Method
            ExerciseDoesntExistException,  # Exception
            ExerciseRepository.exercise_exist,  # Repository Method
            {"pk": 1},  # Args
        ),
        (
            lambda: MagicMock(side_effect=KwargIntException),  # Mock Method
            KwargIntException,  # Exception
            int,  # Repository Method
            {"pk": "invalid_pk"},  # Args
        ),
        (
            lambda: MagicMock(
                return_value=MagicMock(exists=MagicMock(return_value=False)),
            ),  # Mock Method
            NoStatusPlansException,  # Exception
            WorkoutPlanRepository.filter_by_status,  # Repository Method
            {"status": "ACTIVE", "user": MagicMock()},  # Args
        ),
        (
            lambda: MagicMock(
                return_value=MagicMock(exists=MagicMock(return_value=False)),
            ),  # Mock Method
            NoWorkoutsInPlanException,  # Exception
            WorkoutRepository.filter_by_plan,  # Repository Method
            {"workout_plan": MagicMock(spec=BaseManager[WorkoutPlan])},  # Args
        ),
        (
            lambda: MagicMock(
                side_effect=NoWorkoutsWithExerciseException,
            ),  # Mock Method
            NoWorkoutsWithExerciseException,  # Exception
            WorkoutRepository.filter_by_exercise,  # Repository Method
            {"pk": 1},  # Args
        ),
        (
            lambda: MagicMock(side_effect=PlanDoesntExistException),  # Mock Method
            PlanDoesntExistException,  # Exception
            WorkoutPlanRepository.get_workoutplan,  # Repository Method
            {"pk": 1, "user": MagicMock()},  # Args
        ),
    ],
)
def test_exceptions(
    mock_method: Callable[[], MagicMock],
    exception: type[Exception],
    repository_method: Callable[..., Any],
    args: dict[str, Any],
) -> None:
    # Mock the required method
    if "Exercise" in repository_method.__qualname__:
        Exercise.objects.get = mock_method()
    if exception == KwargIntException:
        repository_method = mock_method()
    elif "WorkoutPlan" in repository_method.__qualname__:
        if repository_method.__name__ == "filter_by_status":
            WorkoutPlan.objects.filter = mock_method()
        elif repository_method.__name__ == "get_workoutplan":
            WorkoutPlan.objects.filter().get = mock_method()
    elif "Workout" in repository_method.__qualname__:
        if repository_method.__name__ == "filter_by_plan":
            Workout.objects.filter = mock_method()
        elif repository_method.__name__ == "filter_by_exercise":
            Exercise.objects.get = MagicMock(return_value=MagicMock(spec=Exercise))
            Workout.objects.filter = mock_method()

    # Assert the exception is raised
    with pytest.raises(exception):
        repository_method(**args)

    logger.info(f"The exception {exception.__name__} raises correctly")
