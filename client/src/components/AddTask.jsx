import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';
function AddTask({ task, setTask }) {
    const navigate = useNavigate();

    const url = 'http://localhost:3000/addTask';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
          userId: "userId",
          title: formData.get('title'),
          details: formData.get('details'),
          estimateTime: formData.get('estimateTime')
        };
        try {
          const responseData = await fetchData(url, newTask, 'POST');
          if (responseData) {
            setTask(newTask);
            console.log(newTask);
            navigate('/Task'); 
          }
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
