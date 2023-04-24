import { useState, useEffect } from 'react';
import TaskDetails from './TaskDetails';
import fetchData from './fetchData';

function DashboardManager() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      const url = 'http://localhost:3000/alltasks';
      const responseData = await fetchData(url, 'GET');
      if (responseData) {
        setAllTasks(responseData);
      }
    };
    fetchAllTasks();
  }, []);

  return (
    <>
      <h1>All Tasks</h1>
      {allTasks.map((currentTask) => (
        <TaskDetails key={currentTask.id} currentTask={currentTask} />
      ))}
      <button>all users</button>
      <button>add table</button>
      <button>add column</button>
      <button>delete column</button>
    </>
  );
}

export default DashboardManager;
