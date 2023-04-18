import Login from './components/Login';
import Main from './components/Main';
import Error from './components/Error';
import Home from './components/Home';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';
import Task from './components/Task';
import { useState } from 'react';
import Profile from './components/Profile';


function App() {
  const [user, setUser] = useState();
  const [task, setTask] = useState({
    "id": 0
  });



  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login setUser={setUser} />} />
        <Route path='/' element={<Home user={user} />}>
          <Route path='main' element={<Main />} />
          <Route path='profile' element={<Profile />} />
          <Route path='addTask' element={<AddTask task={task} setTask={setTask} />} />
          <Route path='Task' element={<Task task={task}/>} />
          <Route path='allTasks' element={<AllTasks />}>
            <Route path=':TasksId' element={<Task />} />
          </Route>

        </Route>

        <Route path='*' element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
