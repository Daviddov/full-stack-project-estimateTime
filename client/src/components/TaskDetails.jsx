import React, { useState, useRef } from "react";
import { fetchData } from "./fetchData";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Grid,
} from "@mui/material";



function TaskDetails({ currentTask }) {
  const { userId, id, title, details, estimateTime, finishedTask } =
    currentTask;
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(currentTask.timeElapsed || 0);
  const [finished, setFinished] = useState(finishedTask || false);
  const [deleted, setDeleted] = useState(false);
  const timerRef = useRef(null);


  const startTimer = () => {
    setTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    clearInterval(timerRef.current);
    updateTask(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeElapsed(0);
    clearInterval(timerRef.current);
    setFinished(false);
  };

  const finishTask = () => {
    setFinished(true);
    stopTimer();
    updateTask(true);
  };

  const handleDeleteTask = async () => {
    const url = "http://localhost:3000/task/" + id;
    try {
      const responseData = await fetchData(url, "DELETE");
      // handle success
      console.log(responseData + "deleted");
      setDeleted(true);
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const updateTask = async (finished) => {
    const url = `http://localhost:3000/updateTask/${id}`;
    const updateTask = {
      id,
      timeElapsed,
      finishedTask: finished,
    };
    try {
      const responseData = await fetchData(url, "PUT", updateTask);
      // handle success
      console.log(responseData + " updated");
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const calculateProgress = () => {
    const progress = Math.round((timeElapsed / estimateTime) * 100);
    const accuracy = Math.round(((estimateTime - timeElapsed) / estimateTime) * 100);
    return {
      progress: isNaN(progress) ? 0 : progress,
      accuracy: isNaN(accuracy) ? 0 : accuracy,
    };
  };

  return (

    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {deleted ? (
        <Typography variant="h4" align="center" color="secondary">
          Task {id} deleted
        </Typography>
      ) : (
        <>
        <Card>
          <Typography variant="h5" align="center" color="primary">
            User ID: {userId}
          </Typography>
          <Typography variant="h6" align="center">
            ID: {id}
          </Typography>
          <Typography variant="h6" align="center">
            Title: {title}
          </Typography>
          <Typography variant="subtitle1" align="center">
            Details: {details}
          </Typography>
          <Typography variant="subtitle1" align="center">
            Estimate Time: {estimateTime} seconds
          </Typography>
          {finished && (
            <Typography variant="subtitle1" align="center">
              Accuracy: {calculateProgress().accuracy} %
            </Typography>
          )}
          {finished ? (
            <Typography variant="subtitle1" align="center">
              Time Taken: {timeElapsed} seconds
            </Typography>
          ) : (
            <>
              <Typography variant="subtitle1" align="center">
                Time Elapsed: {timeElapsed} seconds
              </Typography>
              <Typography variant="subtitle1" align="center">
                Time Left: {estimateTime - timeElapsed} seconds
              </Typography>
              <Typography variant="subtitle1" align="center">
                Progress: {calculateProgress().progress}%
              </Typography>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {timerRunning ? (
                  <Button variant="contained" color="secondary" onClick={stopTimer}>
                    Stop Timer
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={startTimer}>
                    Start Timer
                  </Button>
                )}
                <Button variant="contained" onClick={resetTimer}>
                  Reset Timer
                </Button>
                <Button variant="contained" color="primary" onClick={finishTask}>
                  Finish Task
                </Button>
                <Button variant="contained" color="secondary" onClick={handleDeleteTask}>
                  Delete Task
                </Button>
              </div>
            </>
          )}
          </Card>
        </>
      )}
    </div>

  );
}
export default TaskDetails;