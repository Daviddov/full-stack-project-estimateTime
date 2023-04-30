import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";

function UserInfo({ currentUser }) {
  const [allTasks, setAllTasks] = useState([]);
  const userId = currentUser.id;
  const url = `http://localhost:3000/tasks/${userId}`;

  const calculateAll = () => {
    let averageAccuracy = 0;
    allTasks.forEach((task) => {
      if (task.finishedTask) {
        averageAccuracy += task.Accuracy;
      }
    });

    averageAccuracy = Math.round(
      averageAccuracy / allTasks.filter((task) => task.finishedTask).length
    );

    return averageAccuracy;
  };

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const responseData = await fetchData(url, "GET");
        setAllTasks(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReq();
  }, [url]);


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
    </>
  );
}

export default UserInfo;
