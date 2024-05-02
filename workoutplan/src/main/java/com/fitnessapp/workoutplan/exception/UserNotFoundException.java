package com.fitnessapp.workoutplan.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(Long id){
        super("could not find the exercise with id " +id);
    }

}
