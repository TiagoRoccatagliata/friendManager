import { Card, CardContent, CardActions, Typography, Avatar, Button } from "@mui/material";
import api from "../utils/api.js";

const UserCard = ({ user, setUsers }) => {
  const handleDelete = async () => {
  if (!user.id) {
    console.error("User ID is undefined");
    return;
  }

  try {
    const response = await api.delete(`/friends/${user.id}`);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};

  return (
    <Card sx={{ bgcolor: "background.paper", color: "text.primary" }}>
      <CardContent>
        <Avatar src={user.img_url} alt={user.name} sx={{ width: 64, height: 64, mb: 2 }} />
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.role}
        </Typography>
        <Typography variant="body1">{user.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;