from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return f"Category: {self.name}"


class MuscleGroup(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f"Muscle Group: {self.name}"


class Exercise(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category,
        related_name="exercises",
        on_delete=models.PROTECT,
    )
    muscle_group = models.ForeignKey(
        MuscleGroup,
        related_name="exercises",
        on_delete=models.PROTECT,
    )
    description = models.TextField(blank=True, default="No description")

    class Meta:
        ordering = ["name"]
        indexes = [
            models.Index(fields=["name"]),
            models.Index(fields=["category", "muscle_group"]),
        ]

    def __str__(self) -> str:
        return f"Exercise id and name: {self.pk, self.name}"


class Workout(models.Model):
    exercise = models.ForeignKey(
        Exercise,
        related_name="workouts",
        on_delete=models.PROTECT,
    )
    repetitions = models.IntegerField(default=1, verbose_name="reps")
    sets = models.IntegerField(default=1)
    weight = models.FloatField(default=0, verbose_name="weight(kg)")

    class Meta:
        ordering = ["exercise"]
        indexes = [
            models.Index(fields=["exercise"]),
            models.Index(fields=["repetitions", "sets", "weight"]),
        ]

    def __str__(self) -> str:
        return f"Workout id and exercise: {self.pk, self.exercise.name}"


class WorkoutPlan(models.Model):
    STATUS = [
        ("ACTIVE", "Active"),
        ("PENDING", "Pending"),
        ("ENDED", "Ended"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    workouts = models.ManyToManyField(Workout, related_name="workout_plans")
    description = models.TextField(blank=True, default="No description")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    schedule_date = models.DateTimeField(blank=True, null=True, default=timezone.now)
    status = models.CharField(
        max_length=10,
        choices=STATUS,
        default="ACTIVE",
        blank=True,
    )

    class Meta:
        ordering = ["created"]
        indexes = [
            models.Index(fields=["schedule_date"]),
            models.Index(fields=["created", "updated"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self) -> str:
        return f"Plan Id: {self.pk}, Workouts: {self.workouts.all()}"
