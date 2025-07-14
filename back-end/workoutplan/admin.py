from django.contrib import admin

from workoutplan.models import Category, Exercise, MuscleGroup, Workout, WorkoutPlan


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(MuscleGroup)
class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "muscle_group"]
    list_filter = ["category", "muscle_group"]
    search_fields = ["name"]


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ["id", "exercise", "repetitions", "sets", "weight"]
    list_filter = ["exercise"]
    search_fields = ["exercise"]


@admin.register(WorkoutPlan)
class WorkoutPlanAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "status", "schedule_date"]
    list_filter = ["status"]
    search_fields = ["workouts"]
    readonly_fields = ["created", "updated"]
