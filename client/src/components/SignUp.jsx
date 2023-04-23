import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';

function SingUp({currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const url = 'http://localhost:3000/addUser';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      const responseData = await fetchData(url, 'POST', newUser);
        setCurrentUser(responseData);
        console.log(currentUser);
        navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" name="name" />
      <input type="text" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SingUp;
