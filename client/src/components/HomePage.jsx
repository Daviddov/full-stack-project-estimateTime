import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './NavBar';
function HomePage({ currentUser }) {
 console.log(currentUser);
    return (
        <div>
            <NavBar />
           
            <h1>{currentUser.name}</h1>
            { currentUser ? <h1>{`wellcome ${currentUser.name}`}</h1> : <Navigate to={'/login'} /> }
            <Outlet />

        </div>
    );

}

export default HomePage;