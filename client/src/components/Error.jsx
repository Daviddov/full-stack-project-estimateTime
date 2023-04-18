import { Link } from "react-router-dom";

function Error() {
    return ( <div>
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <Link to='/' >go home</Link>
    </div> );
}

export default Error;