package com.fitnessapp.workoutplan.repository;

import com.fitnessapp.workoutplan.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
