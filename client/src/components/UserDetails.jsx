import { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
// import { Delete } from "@mui/icons-material";
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

  return (
    <>
      {deleted ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">User deleted</Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">User Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>ID: {user.id}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Name: {user.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Email: {user.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Password: {user.password}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
               
                onClick={deleteUser}
              >
                Delete User
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default UserDetails;
