import React, { useState, useRef } from "react";
import { fetchData } from "./fetchData";
import {
  Typography,
  Button,
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";




function TaskDetails({ currentTask }) {
  const { userId, id, title, details, estimateTime, finishedTask } =
    currentTask;
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(currentTask.timeElapsed || 0);
  const [finished, setFinished] = useState(finishedTask || false);
  const [deleted, setDeleted] = useState(false);
  const timerRef = useRef(null);
  const accuracy = Math.round(((estimateTime - timeElapsed) / estimateTime) * 100);

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
      accuracy
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
    return {
      progress: isNaN(progress) ? 0 : progress,
      accuracy: isNaN(accuracy) ? 0 : accuracy,
    };
  };
  return (
    <div style={{  alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      {deleted ? (
        <Typography variant="h4" align="center" color="secondary">
          Task {id} deleted
        </Typography>
      ) : (
        <>
          <Box sx={{ mt: 4 ,align:"center"}}>
            <Card>
              <Table sx={{ minWidth: 650 ,  align:"center"}}>
                <TableBody align="center">
                  <TableRow sx={{ margin: 40 }}>
                    <TableCell align="center">User ID</TableCell>
                    <TableCell align="center">Task ID</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Details</TableCell>
                    <TableCell align="center">Estimated Time (seconds)</TableCell>
                    {finished ? (
                      <>
                        <TableCell align="center">Accuracy</TableCell>
                        <TableCell align="center">Time Taken (seconds)</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="center">Time Elapsed (seconds)</TableCell>
                        <TableCell align="center">Time Left (seconds)</TableCell>
                        <TableCell align="center">Progress</TableCell>
                      </>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">{userId}</TableCell>
                    <TableCell align="center">{id}</TableCell>
                    <TableCell align="center">{title}</TableCell>
                    <TableCell align="center">{details}</TableCell>
                    <TableCell align="center">{estimateTime} seconds</TableCell>
                    {finished ? (
                      <>
                        <TableCell align="center">{calculateProgress().accuracy} %</TableCell>
                        <TableCell align="center">{timeElapsed} seconds</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="center">{timeElapsed} seconds</TableCell>
                        <TableCell align="center">{estimateTime - timeElapsed} seconds</TableCell>
                        <TableCell align="center">{calculateProgress().progress}%</TableCell>
                        <TableCell align="center" colSpan={2}>
                          <div style={{ display: 'flex', gap: '2rem' }}>
                            {timerRunning ? (
                              <Button variant="contained" size="small" color="secondary" onClick={stopTimer}>
                                Stop
                              </Button>
                            ) : (
                              <Button variant="contained" size="small" color="primary" onClick={startTimer}>
                                Start
                              </Button>
                            )}
                            <Button variant="contained" size="small" onClick={resetTimer}>
                              Reset
                            </Button>
                            <Button variant="contained" size="small" color="primary" onClick={finishTask}>
                              Finish
                            </Button>
                            <Button variant="contained" size="small" color="secondary" onClick={handleDeleteTask}>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Box>
        </>
      )}
    </div>
  );
  
  // return (


  //   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

  //     {deleted ? (
  //       <Typography variant="h4" align="center" color="secondary">
  //         Task {id} deleted
  //       </Typography>
  //     ) : (
  //       <>
  //         <Box sx={{ mt: 2 }}>
  //           <Card>
  //             <Table>
  //               <TableBody>
  //                 <TableRow>
  //                   <TableCell align="center">User ID</TableCell>
  //                   <TableCell align="center">task ID</TableCell>
  //                   <TableCell align="center">Title</TableCell>
  //                   <TableCell align="center">Details</TableCell>
  //                   <TableCell align="center">Estimate Time seconds</TableCell>
  //                   {finished ? (
  //                     <>
  //                       <TableCell align="center">Accuracy</TableCell>
  //                       <TableCell align="center">Time Taken</TableCell>
  //                     </>
                        
  //                   ) : (
  //                     <>
                      
  //                       <TableCell align="center">Time Elapsed</TableCell>
  //                       <TableCell align="center">Time Left</TableCell>
  //                       <TableCell align="center">Progress</TableCell>
  //                      </> 
  //                   )}
  //                   <TableRow>
  //                   <TableCell align="center">User ID:{userId}</TableCell>
  //                   <TableCell align="center">task ID:{id}</TableCell>
  //                   <TableCell align="center">Title:{title}</TableCell>
  //                   <TableCell align="center">Details:{details}</TableCell>
  //                   <TableCell align="center">Estimate Time:{estimateTime} seconds</TableCell>

  //                   {finished ? (
  //                     <>
  //                       <TableCell align="center">Accuracy:{calculateProgress().accuracy} %</TableCell>
  //                       <TableCell align="center">Time Taken:{timeElapsed} seconds</TableCell>
  //                     </>
  //                   ) : (
  //                     <>
                  
  //                       <TableCell align="center">Time Elapsed:{timeElapsed} seconds</TableCell>
  //                       <TableCell align="center">Time Left:{estimateTime - timeElapsed} seconds</TableCell>
  //                       <TableCell align="center">Progress:{calculateProgress().progress}%</TableCell>
  //                       <TableCell align="center" colSpan={2}>
  //                         <div style={{ display: 'flex', gap: '2rem' }}>
  //                           {timerRunning ? (

  //                             <Button variant="contained" size="small" color="secondary" onClick={stopTimer}>
  //                               Stop
  //                             </Button>
  //                           ) : (
  //                             <Button variant="contained" size="small" color="primary" onClick={startTimer}>
  //                               Start
  //                             </Button>
  //                           )}
  //                           <Button variant="contained" size="small" onClick={resetTimer}>
  //                             Reset
  //                           </Button>
  //                           <Button variant="contained" size="small" color="primary" onClick={finishTask}>
  //                             Finish
  //                           </Button>
  //                           <Button variant="contained" size="small" color="secondary" onClick={handleDeleteTask}>
  //                             Delete
  //                           </Button>

  //                         </div>
  //                       </TableCell>
  //                     </>
  //                   )}
  //                 </TableRow>
  //               </TableBody>
  //             </Table>
  //           </Card>
  //         </Box>

  //       </>
  //     )}
  //   </div>

  // );
}
export default TaskDetails;