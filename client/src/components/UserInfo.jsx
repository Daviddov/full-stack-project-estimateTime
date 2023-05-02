import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import ChartData from "./ChartData";
import { fetchUserTasks } from "./fetchUserTasks";


function UserInfo({ currentUser }) {
  const [allTasks, setAllTasks] = useState([]);

  const userId = currentUser.id;
  const url = `http://localhost:3000/tasks/${userId}`;

  const calculateAll = () => {
    let averageAccuracy = 0;
    const finishedTasks = allTasks.filter((task) => task.finishedTask);
    if (finishedTasks.length > 0) {
      finishedTasks.forEach((task) => {
        averageAccuracy += task.Accuracy;
      });
      averageAccuracy = Math.round(averageAccuracy / finishedTasks.length);
    }
    return averageAccuracy;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await fetchUserTasks(userId);
        setAllTasks(tasks);
      } catch (error) {
        setAllTasks({ error: error.message });
      }
    };
    fetchTasks();
  }, [url, fetchUserTasks]);

  if (allTasks.error) {
    return <p>Error: {allTasks.error}</p>;
  }

  return (
    <>
      <TableCell>{currentUser.id}</TableCell>
      <TableCell>{currentUser.name}</TableCell>
      <TableCell>{currentUser.email}</TableCell>
      <TableCell>{currentUser.password}</TableCell>
      <TableCell>{calculateAll()}</TableCell> 
      {<ChartData allTasks={allTasks} />}
    </>
  );
}

export default UserInfo;

