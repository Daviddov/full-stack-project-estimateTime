import { TableCell, TableRow } from "@mui/material";
import UserInfo from "./UserInfo";

function Profile({currentUser}) {


   return (
     <>
     <TableRow>
    <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Accuracy</TableCell>
              </TableRow>
   <UserInfo currentUser={currentUser} />
              

     </>
   );
 }
 
 export default Profile;
 