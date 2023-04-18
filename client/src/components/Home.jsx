import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './NavBar';
function Home({ user }) {
 console.log(user);
    return (
        <div>
          {} 
            <NavBar />
            <h1>{user}</h1>
            {/* { user ? <h1>{`wellcome ${user}`}</h1> : <Navigate to={'/Login'} /> } */}
            <Outlet />

        </div>
    );

}

export default Home;