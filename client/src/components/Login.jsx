
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');

  const url = 'http://localhost:3000/user';

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.status == 200) {
      return response.json();
  
    }else{
    console.log(response.status);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && password) {
      const user = {
        name: name,
        password: password
      };
      const responseData = await postData(url, user);
      setData(responseData);
      console.log(responseData);
      if (responseData && responseData.name === name && responseData.password === password) {
        setUser(name);
        navigate('/main'); 
      };
    }
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} minLength={2} maxLength={4} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
