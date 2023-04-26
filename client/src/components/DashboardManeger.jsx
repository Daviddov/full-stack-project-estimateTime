import { useState, useEffect } from 'react';
import TaskDetails from './TaskDetails';
import { fetchData } from './fetchData';
import UserDetails from './UserDetails';
import { Typography } from '@mui/material';

function DashboardManager() {
  const [allTasks, setAllTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


    const handleAllTasksClick = async () => {
      const url = 'http://localhost:3000/alltasks';
      const responseData = await fetchData(url, 'GET');
      if (responseData) {
        setAllTasks(responseData);
      }
    };
   
  const handleAllUsersClick = async () => {
    const url = 'http://localhost:3000/users';
    const responseData = await fetchData(url, 'GET');
    if (responseData) {
      setAllUsers(responseData);
    }
  };

  const calculateAverageEstimate = (task) => {
    console.log(task);
    const accuracy = Math.round(((task.estimateTime - task.timeElapsed) / task.estimateTime) * 100); 
    console.log(accuracy);
    return accuracy;
  }

  const calculateAll = () => {
    let averageAccuracy = 0;
    allTasks.forEach(task => {
      if (task.finishedTask) { 
        console.log(task);
        averageAccuracy += calculateAverageEstimate(task)
      }
    })
    averageAccuracy = Math.round(averageAccuracy / allTasks.filter(task => task.finishedTask).length);
    console.log(averageAccuracy);
    return averageAccuracy;
  }
  return (
    <>
          <button onClick={handleAllTasksClick}>all tasks</button>
      <h1>All Tasks</h1>
      <Typography variant="h5" align="center" color="primary">
        average Accuracy of all users: {calculateAll()}%
      </Typography>
      {allTasks.map((currentTask) => (
        <TaskDetails key={currentTask.id} currentTask={currentTask} />

      )
      )}
      <hr />
      <button onClick={handleAllUsersClick}>all users</button>
      <h1>All Users</h1>
      {allUsers.map((user) => (
        <UserDetails  key={user.id} user ={user}/>
      ))}


    </>
  );
}

export default DashboardManager;
