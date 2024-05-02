package com.fitnessapp.workoutplan.controller;

import com.fitnessapp.workoutplan.exception.UserNotFoundException;
import com.fitnessapp.workoutplan.model.Workout;
import com.fitnessapp.workoutplan.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepository;

    @PostMapping("/workout")
    Workout newWorkout(@RequestBody Workout workout){
        return workoutRepository.save(workout);
    }

    @GetMapping("/workouts")
    List<Workout> getAllWorkouts(){
        return workoutRepository.findAll();
    }

    @GetMapping("/workouts/{id}")              //get the workout by ID
    Workout getWorkoutById (@PathVariable Long id){
        return workoutRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @PutMapping("/workouts/{id}")                //update the workout by ID
    Workout updateWorkout(@RequestBody Workout newWorkout,@PathVariable Long id){
        return workoutRepository.findById(id)
                .map(workout -> {
                    workout.setExercise(newWorkout.getExercise());
                    workout.setReps(newWorkout.getReps());
                    workout.setSets(newWorkout.getSets());
                    return workoutRepository.save(workout);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/workouts/{id}")
    String deleteWorkout(@PathVariable Long id){
        if (!workoutRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        workoutRepository.deleteById(id);
        return "Exercise with id "+id+" has been successfully deleted";
    }



}
