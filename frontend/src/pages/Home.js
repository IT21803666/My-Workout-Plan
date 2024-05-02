import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
const [users, setUsers] = useState([]);

useEffect(() => {
   loadUsers();
}, []);

const loadUsers=async()=>{
    const result =await axios.get("http://localhost:8080/workouts");
    setUsers(result.data);
};

  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Exercise</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Sets</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
             <tbody>
                {
                    users.map((user ,index) => (
                        <tr key={user.id}>  
                        <th scope="row">{index + 1}
                        </th>
                        <td>{user.exercise}</td>
                        <td>{user.reps}</td>
                        <td>{user.sets}</td>
                        <td>
                      
                            <Link
                             className="btn btn-primary mx-2"
                             to={`/editworkout/${user.id}`}
                             >    
                              Edit
                            </Link>

                            <button 
                            className="btn btn-danger mx-2">
                              Delete
                            </button>

                        </td>
                      </tr>        
                    )) }

             </tbody>
            </table>


    </div>
    </div>
  )
}
