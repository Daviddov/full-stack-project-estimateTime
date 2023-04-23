import { NavLink } from "react-router-dom";

function NavBar() {
    return ( <nav>

 <NavLink to='/'> Home </NavLink>
 <NavLink to='/profile'> Profile </NavLink>
 <NavLink to='/main'> Main </NavLink>
 <NavLink to='/Login'> Login </NavLink>
 <NavLink to='/SignUp'> SignUp </NavLink>
    </nav>
     );
}

export default NavBar;
