import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate('/AddTask');
  };
  const handleAllTasks = () => {
    navigate('/allTasks');
  };

  return (
    <div>
      <button onClick={handleAddTask} type="button" aria-label="Add Task">
        Add Task
      </button>
      <button onClick={handleAllTasks} type="button" aria-label="All Tasks">
        All Tasks
      </button>
    </div>
  );
}

export default Main;
