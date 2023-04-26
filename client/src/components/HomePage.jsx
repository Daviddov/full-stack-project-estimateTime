import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './NavBar';
import DashboardManager from './DashboardManeger';
function HomePage({ currentUser }) {
 console.log(currentUser);
    return (
        <div>
            <NavBar />
           
       
           { currentUser ? <h1>{`wellcome ${currentUser.name}`}</h1> : <Navigate to={'/login'} />}
            {currentUser.name === "admin" ? <DashboardManager /> : 
             
            <Outlet />
    }
        </div>
    );

}

export default HomePage;