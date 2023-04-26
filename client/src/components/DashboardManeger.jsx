import { useState, useEffect } from 'react';
import TaskDetails from './TaskDetails';
import { fetchData } from './fetchData';
import UserDetails from './UserDetails';

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




  return (
    <>
          <button onClick={handleAllTasksClick}>all tasks</button>
      <h1>All Tasks</h1>
      {allTasks.map((currentTask) => (
        <>
        <p>{currentTask.userId}</p> 
        <TaskDetails key={currentTask.id} currentTask={currentTask} />
        </>
      ))}
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
