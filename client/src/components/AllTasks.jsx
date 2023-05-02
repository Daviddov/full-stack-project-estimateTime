import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';
import TaskDetails from './TaskDetails';
import { Typography, Grid, Box } from '@mui/material';

function AllTasks({ currentUser }) {
  const userId = currentUser.id;
  const url = `http://localhost:3000/tasks/${userId}`;
  const [allTasks, setAllTasks] = useState([]);

  const calculateAll = () => {
    let averageAccuracy = 0;
    allTasks.forEach(task => {
      if (task.finishedTask) { 
        console.log(task);
        averageAccuracy += task.Accuracy;
      }
    })

    averageAccuracy = Math.round(averageAccuracy / allTasks.filter(task => task.finishedTask).length);
    console.log(averageAccuracy);

    return averageAccuracy;
  }
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const responseData = await fetchData(url, 'GET');
        if (responseData) {
          setAllTasks(responseData);
          console.log(responseData);
        }
      } catch (error) {
        navigate('/error');
      }
    };
    fetchReq();
  }, [url, navigate]);

  return (
    <>
      <Typography variant="h5" align="center" color="primary">
        your average Accuracy: {calculateAll()}%
      </Typography>
      <Typography variant="h4" align="center">All Tasks</Typography>
      
        {allTasks.map(currentTask => (
          <Grid item key={currentTask.id} xs={12} sm={6} md={4} lg={3}>
            <TaskDetails currentTask={currentTask} />
          </Grid>
        ))}
    </>
  );
}

export default AllTasks;
