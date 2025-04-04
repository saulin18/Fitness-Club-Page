# noqa: INP001
import pytest
from django.contrib.auth.models import User

from workoutplan.models import Category, Exercise, MuscleGroup, Workout, WorkoutPlan


@pytest.fixture
def user_fixture() -> User:
    return User.objects.create(username="testuser", password="testpassword")


@pytest.fixture
def category_fixture() -> Category:
    return Category.objects.create(name="testcategory")


@pytest.fixture
def muscle_group_fixture() -> MuscleGroup:
    return MuscleGroup.objects.create(name="testmusclegroup")


@pytest.fixture
def exercise_fixture(
    category_fixture: Category,
    muscle_group_fixture: MuscleGroup,
) -> Exercise:
    return Exercise.objects.create(
        name="testexercise",
        category=category_fixture,
        muscle_group=muscle_group_fixture,
    )


@pytest.fixture
def workout_fixture(exercise_fixture: Exercise) -> Workout:
    return Workout.objects.create(exercise=exercise_fixture)


@pytest.fixture
def workouts_fixture(workout_fixture: Workout) -> list[Workout]:
    return [workout_fixture]


@pytest.fixture
def workout_plan_fixture(workout_fixture: Workout, user_fixture: User) -> WorkoutPlan:
    workout_plan = WorkoutPlan.objects.create(user=user_fixture)
    workout_plan.workouts.add(workout_fixture)
    return workout_plan
