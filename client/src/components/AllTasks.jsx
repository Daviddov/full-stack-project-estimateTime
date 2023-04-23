import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';
import TaskDetails from './TaskDetails';
import { useMemo, useState, useEffect } from 'react';

function AllTasks({currentUser}) {
  const [allTasks, setAllTasks] = useState([]);
  const userId = currentUser.id;

  const url = `http://localhost:3000/tasks/${userId}`;

  useEffect(() => {
    const fetchReq = async () => {
      const responseData = await fetchData(url, 'GET');
      if (responseData) {
        setAllTasks(responseData);
        console.log(responseData);
      }
    };
    fetchReq();
  }, [url]);

  return (
    <div>
      <h1>All Tasks</h1>
      {allTasks.map((currentTask) => (
        <TaskDetails currentTask = {currentTask} />
      ))}
    </div>
  );
}

export default AllTasks;
