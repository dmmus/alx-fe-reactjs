import { useContext } from "react";
import UserContext from "../UserContext";

const UserProfile = () => {
  const userData = useContext(UserContext);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h2>{userData.name}</h2>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserProfile;