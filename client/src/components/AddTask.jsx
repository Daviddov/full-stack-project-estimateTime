import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';
function AddTask({currentUser, setCurrentTask} ) {
    const navigate = useNavigate();

    const url = 'http://localhost:3000/addTask';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newTask = {
          userId: currentUser.id,
          title: formData.get('title'),
          details: formData.get('details'),
          estimateTime: formData.get('estimateTime')
        };
        console.log(newTask);
        try {
          const responseData = await fetchData(url, 'POST', newTask);
          if (responseData) {
            setCurrentTask(responseData);
            console.log(responseData);
            const taskId =responseData.id;
            navigate('/TaskDetails/'+taskId); 
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
