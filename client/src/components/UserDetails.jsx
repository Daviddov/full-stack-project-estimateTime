import { useState } from "react";
import { fetchData } from "./fetchData";

function UserDetails({ user }) {
    const [deleted, setDeleted] = useState(false);

    const deleteUser = async () => {
        const url = 'http://localhost:3000/users/' + user.id;
        try {
            const responseData = await fetchData(url, 'DELETE');
            // handle success
            console.log(responseData + "deleted");
            setDeleted(true);
        } catch (error) {
            // handle error
            console.error(error);
        }
        setDeleted(true)
    };


    return (<>
        {deleted ? (<h1>User deleted</h1>) : (
            <>
                <p>id: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
                <button onClick={deleteUser}>Delete User</button>
            </>
        )}
    </>);
}

export default UserDetails;