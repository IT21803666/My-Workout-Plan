import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditWorkout() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    const onInputChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/workouts/${id}`);
                setWorkout(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching workout:', error);
            }
        };

        fetchWorkout();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/workouts/${id}`, workout);
            navigate("/");
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Want to change your routine?</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='exercise' className='form-label'>
                                    Exercise
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Type your exercise here'
                                    name='exercise'
                                    value={workout.exercise}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='reps' className='form-label'>
                                    Reps
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Type the number of reps here'
                                    name='reps'
                                    value={workout.reps}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='sets' className='form-label'>
                                    Sets
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Type the number of sets here'
                                    name='sets'
                                    value={workout.sets}
                                    onChange={onInputChange}
                                />
                            </div>
                            <button type='submit' className='btn btn-outline-primary'>
                                Save
                            </button>
                            <Link className='btn btn-outline-danger mx-2' to='/'>
                                Cancel
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
