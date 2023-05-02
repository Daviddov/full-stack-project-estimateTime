import { useState } from "react";
import { Box, Button, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { fetchData } from "./fetchData";
import UserInfo from "./UserInfo";

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

  return (
    <>
    {deleted ? (
    <Typography variant="h5">User has been deleted.</Typography>
    ) : (
      <Grid item xs={12} sm={6} md={4} lg={3}>
    <TableRow>
    <TableCell >
    <UserInfo currentUser={user} />
    </TableCell>
    <TableCell>
    <Button
      variant="contained"
      color="error"
      onClick={deleteUser}
    >
    Delete User
    </Button>
    </TableCell>
    </TableRow>
 </Grid>
    )}
    </>
  );
}

export default UserDetails;
