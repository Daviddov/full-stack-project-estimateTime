function Profile({currentUser}) {
   return (
     <div>
       <h2>My Profile</h2>
       <p>Name: {currentUser.name}</p>
       <p>Email: {currentUser.email}</p>
       <p>My estimate time is: {}</p>


     </div>
   );
 }
 
 export default Profile;
 