# noqa: INP001
import logging
from collections.abc import Callable
from typing import Any
from unittest.mock import MagicMock

import pytest
from django.contrib.auth.models import User

from common.exceptions import UserDoesntExistException
from workoutplan.models import Category, Exercise, MuscleGroup, Workout, WorkoutPlan
from workoutplan.repositories.workout_plan_repository import (
    UserRepository,
    WorkoutPlanRepository,
)

logger = logging.getLogger(__name__)


@pytest.mark.django_db
class TestWorkoutPlanRepository:
    @pytest.fixture(autouse=True)
    def setup_fixtures(
        self,
        request: pytest.FixtureRequest,
    ) -> None:
        self.user: User = request.getfixturevalue("user_fixture")
        self.category: Category = request.getfixturevalue("category_fixture")
        self.muscle_group: MuscleGroup = request.getfixturevalue("muscle_group_fixture")
        self.exercise: Exercise = request.getfixturevalue("exercise_fixture")
        self.workout: Workout = request.getfixturevalue("workout_fixture")
        self.workouts: list[Workout] = request.getfixturevalue("workouts_fixture")
        self.workout_plan: WorkoutPlan = request.getfixturevalue("workout_plan_fixture")

    def setup_method(self, method: Callable[..., Any]) -> None:
        logger.info("Test %s initialized", method.__name__)

    def teardown_method(self, method: Callable[..., Any]) -> None:
        logger.info("Test %s ended", method.__name__)

    def test_create_user(self) -> None:
        assert self.user.pk is not None
        assert self.user.pk == 1
        logger.info("User %s created with password %s", self.user, self.user.password)

    # Searching
    def test_get_all(self) -> None:
        UserRepository.user_exist = MagicMock(return_value=MagicMock(spec=True))
        WorkoutPlan.objects.filter = MagicMock(
            return_value=MagicMock(spec=list[WorkoutPlan]),
        )
        logger.info("Test get_all method")

        user_workout_plans = WorkoutPlanRepository.get_all(user=self.user)
        all_workout_plans = WorkoutPlanRepository.get_all()

        assert user_workout_plans is not None
        assert all_workout_plans is not None

        for workout_plan in user_workout_plans:
            assert workout_plan.user == self.user

        WorkoutPlan.objects.filter.assert_called_once_with(user=self.user)

    def test_get_workoutplan(self) -> None:
        WorkoutPlan.objects.filter = MagicMock(return_value=MagicMock())
        WorkoutPlan.objects.get = MagicMock(
            return_value=MagicMock(spec=WorkoutPlan),
        )

        workout_plan = WorkoutPlanRepository.get_workoutplan(pk=1, user=self.user)

        assert workout_plan is not None
        logger.info("Getting the Workout Plan %s", workout_plan)
        WorkoutPlan.objects.filter.assert_called_once_with(user=self.user)
        WorkoutPlan.objects.get.assert_called_with(pk=1, user=self.user)

    def test_filter_by_status(self) -> None:
        WorkoutPlan.objects.filter = MagicMock(return_value=MagicMock())
        WorkoutPlanRepository.get_all = MagicMock(return_value=MagicMock())

        workout_plans = WorkoutPlanRepository.filter_by_status(
            user=self.user,
            status="ACTIVE",
        )

        assert workout_plans is not None
        logger.info("Workout plans filter by status %s", workout_plans)

        WorkoutPlan.objects.filter.assert_called_once_with(
            user=self.user,
            status="ACTIVE",
        )

    # Create, Update, Patch
    # @pytest.mark.skip
    def test_update_workouts(self) -> None:
        Workout.objects.bulk_update = MagicMock()
        logger.info("Updating workouts %s", self.workouts)

        # Negative case: no existing workouts
        no_id_workouts = [
            Workout(exercise=workout_data.exercise) for workout_data in self.workouts
        ]

        # with pytest.raises(Workout.DoesNotExist):
        new_workouts = WorkoutPlanRepository.update_workouts(no_id_workouts)

        # Positive case: existing workouts
        Workout.objects.filter = MagicMock(
            return_value=MagicMock(
                exists=MagicMock(return_value=True),
                __iter__=MagicMock(return_value=iter(self.workouts)),
            ),
        )
        existing_workouts = WorkoutPlanRepository.update_workouts(self.workouts)

        assert new_workouts == []
        assert existing_workouts != []
        Workout.objects.bulk_update.assert_called_once_with(
            self.workouts,
            ["exercise", "repetitions", "sets", "weight"],
        )

    def test_create_workout_plan(self) -> None:
        assert self.workout_plan is not None
        WorkoutPlan.objects.create = MagicMock(return_value=MagicMock(spec=WorkoutPlan))
        Workout.objects.bulk_create = MagicMock()
        workout_plan = WorkoutPlanRepository.create(
            user=self.user,
            workouts=self.workouts,
            schedule_date=None,
            status=None,
        )

        assert workout_plan is not None
        logger.info("Workout Plan create %s", workout_plan)
        WorkoutPlan.objects.create.assert_called_once()
        Workout.objects.bulk_create.assert_called_once_with(self.workouts)

    @pytest.mark.parametrize(
        ("method", "expected_log_message"),
        [
            (WorkoutPlanRepository.update, "Updated Workout Plan %s"),
            (WorkoutPlanRepository.partial_update, "Partial Updated Workout Plan %s"),
        ],
    )
    def test_update_and_partial_methods(
        self,
        method: Callable[..., WorkoutPlan],
        expected_log_message: str,
    ) -> None:
        Workout.objects.bulk_create = MagicMock()
        self.workout_plan.workouts.clear = MagicMock()
        self.workout_plan.workouts.add = MagicMock()
        self.workout_plan.save = MagicMock()
        WorkoutPlanRepository.update_workouts = MagicMock(
            return_value=MagicMock(
                exists=MagicMock(return_value=True),
                # return_value=
                __iter__=MagicMock(return_value=iter(self.workouts)),
            ),
        )

        updated_plan = method(
            workout_plan=self.workout_plan,
            workouts=self.workouts,
            schedule_date=None,
            status=None,
        )

        assert updated_plan is not None
        logger.info(expected_log_message, updated_plan)
        self.workout_plan.workouts.clear.assert_called_once()
        self.workout_plan.workouts.add.assert_called_once()
        self.workout_plan.save.assert_called_once()


@pytest.mark.django_db
class TestUserRepository:
    @pytest.fixture(autouse=True)
    def setup_fixtures(
        self,
        request: pytest.FixtureRequest,
    ) -> None:
        self.user: User = request.getfixturevalue("user_fixture")

    # @pytest.mark.skip(reason="In develop")
    def test_user_exist(self) -> None:
        logger.info("Test user_exist method")

        # Positive case: user exists
        User.objects.get = MagicMock(return_value=MagicMock(spec=User))
        UserRepository.user_exist(self.user.pk)
        logger.info("User %s exists", self.user.pk)

        # Negative case: user does not exist
        User.objects.get = MagicMock(side_effect=User.DoesNotExist)
        with pytest.raises(UserDoesntExistException):
            UserRepository.user_exist(2)
