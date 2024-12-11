import { Grid, Typography } from "@mui/material";
import UserCard from "./UserCard";

const UserGrid = ({ users, setUsers }) => {
  return (
    <Grid container spacing={3}>
      {users.map((user, index) => (
        <Grid item xs={12} sm={6} md={4} key={user.id || index}> {/* Agregar key única */}
          <UserCard user={user} setUsers={setUsers} />
        </Grid>
      ))}
      {users.length === 0 && (
        <Typography variant="h6" align="center" style={{ width: "100%" }}>
          No friends found.
        </Typography>
      )}
    </Grid>
  );
};

export default UserGrid;