import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';




function AddTask({currentUser, setCurrentTask} ) {
  const [time, setTime] = useState('10:00');
    const navigate = useNavigate();

    const url = 'http://localhost:3000/addTask';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newTask = {
          userId: currentUser.id,
          title: formData.get('title'),
          details: formData.get('details'),
          estimateTime: formData.get('estimateTime')
        };
        console.log(newTask);
        try {
          const responseData = await fetchData(url, 'POST', newTask);
          if (responseData) {
            setCurrentTask(responseData);
            console.log(responseData);
            const taskId =responseData.id;
            navigate('/TaskDetails/'+taskId); 
          }
        } catch (error) {
          console.error(error);
        }
      };
      

    return (

      <form onSubmit={handleSubmit}>
        <TextField label="Title" name="title" />
        <TextField label="Details" name="details" />
        <TextField label="Estimate time for the task" name="estimateTime" type="number" />
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
      
    );
}

export default AddTask;
