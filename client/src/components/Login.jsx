import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';
import { Button, TextField} from '@mui/material';

function Login({currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const url = 'http://localhost:3000/user';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && password) {
      setIsLoading(true);
      try {
        const user = {
          name: name,
          password: password
        };
        const responseData = await fetchData(url, 'POST', user);
        setCurrentUser(responseData);
        navigate('/main');
      } catch (error) {
        console.error(error);
        // handle error here
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={handleNameChange} fullWidth margin="normal" />
        <TextField label="Password" type="password" value={password} onChange={handlePasswordChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </form>
      <NavLink to='/SignUp'>SignUp</NavLink>
    </>
  );
}

export default Login;
