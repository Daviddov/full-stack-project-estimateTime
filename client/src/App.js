import Login from './components/Login';
import Main from './components/Main';
import ErrorPage from './components/Error';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';
import TaskDetails from './components/TaskDetails';
import { useState } from 'react';
import Profile from './components/Profile';

import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentTask, setCurrentTask] = useState("null");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/" element={<HomePage currentUser={currentUser} />}>
          <Route path="/main" element={<Main currentUser={currentUser}/>}/>
          <Route path="/addTask" element={<AddTask currentUser={currentUser} setCurrentTask={setCurrentTask} />} />
          <Route path="/TaskDetails/:taskId" element={<TaskDetails currentTask={currentTask} />} />
          <Route path="/allTasks" element={<AllTasks currentUser={currentUser} />}>
            <Route path=":taskId" element={<TaskDetails currentTask={currentTask} />} />
          </Route>
          <Route path="/profile" element={<Profile currentUser={currentUser} />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
