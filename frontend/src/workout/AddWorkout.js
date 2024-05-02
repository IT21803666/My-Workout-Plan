import React, {useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddWorkout() {

    let navigate=useNavigate();

    const [workout, setWorkout] = useState({
        exercise: "",
        reps: "",
        sets: ""
    });

    const{exercise, reps, sets} = workout;

    const onInputChange = (e) => {
        setWorkout({...workout, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/workout", workout);
        navigate("/");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Want To Share Your Routine?</h2>
                <form onSubmit={(e) => onSubmit(e)}>


                <div className='mb-3'>
                    <label htmlFor='exercise' className='form-label'>
                        Exercise
                    </label>
                    <input
                        type={"text"}
                        className='form-control'
                        placeholder='Type your exercise here'
                        name='exercise'
                        value={exercise}
                        onChange={(e)=>onInputChange(e)}
                        />
                </div>

                <div className='mb-3'>
                    <label htmlFor='reps' className='form-label'>
                        Reps
                    </label>
                    <input
                        type={"text"}
                        className='form-control'
                        placeholder='Type the number of reps here'
                        name='reps'
                        value={reps}
                        onChange={(e)=>onInputChange(e)}
                        />
                </div>


                <div className='mb-3'>
                    <label htmlFor='sets' className='form-label'>
                        Sets
                    </label>
                    <input
                        type={"text"}
                        className='form-control'
                        placeholder='Type the number of sets here'
                        name='sets'
                        value={sets}
                        onChange={(e)=>onInputChange(e)}
                        />
                </div>

                <button type='submit' className='btn btn-outline-primary'>
                    Save
                    </button>

                    <Link className='btn btn-outline-danger mx-2' to="/">
                    Cancel
                    </Link>
                    </form>
            </div>
        </div>
    </div>
  )
}
