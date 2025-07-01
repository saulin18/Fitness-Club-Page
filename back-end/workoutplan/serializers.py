from rest_framework import serializers

from workoutplan.models import Workout, WorkoutPlan


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:  # type: ignore[]
        model = Workout
        fields = "__all__"


class WorkoutPlanSerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(many=True, allow_empty=False)

    class Meta:  # type: ignore[]
        model = WorkoutPlan
        fields = ["workouts", "schedule_date", "status"]
