import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import UserGrid from "./components/UserGrid";
import api from "./utils/api.js";

function App() {
  const [users, setUsers] = useState([]);

  // Obtener usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const response = await api.get("/friends");
      setUsers(response.data); // Almacenar los usuarios en el estado
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers(); // Llamar a la API al cargar la página
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar fetchUsers={fetchUsers} setUsers={setUsers} />
      <Container>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mt: 4, color: "text.primary" }}
        >
          My Friends! 🚀
        </Typography>
        <UserGrid users={users} setUsers={setUsers} />
      </Container>
    </Box>
  );
}

export default App;