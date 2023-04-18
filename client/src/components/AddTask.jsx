import { useNavigate } from 'react-router-dom';

function AddTask({ task, setTask }) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
          id: task.id + 1,
          title: formData.get('title'),
          details: formData.get('details'),
          estimateTime: formData.get('estimateTime')
        };
        try {
          const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
          });
          if (!response.ok) {
            throw new Error('Failed to add task');
          }
          setTask(newTask);
          console.log(newTask);
          navigate('/Task');
        } catch (error) {
          console.error(error);
        }
      };
      

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" name="title" />
            <input type="text" placeholder="Details" name="details" />
            <input type="number" placeholder="Estimate time for the task" name="estimateTime" />
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddTask;
