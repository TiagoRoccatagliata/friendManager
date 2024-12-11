import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AddFriendModal from "../components/AddFriendModal.jsx";
import { useState } from "react";
import { useThemeContext } from "../components/ThemeProvider.jsx";

const Navbar = ({ setUsers }) => {
  const [open, setOpen] = useState(false);
  const { toggleTheme } = useThemeContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "background.paper", color: "text.primary" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            My Friends App 🚀
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ textTransform: "none", marginRight: 2 }}
            >
              Add Friend
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={toggleTheme}
              sx={{ textTransform: "none" }}
            >
              Ligth or Dark
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <AddFriendModal open={open} onClose={handleClose} setUsers={setUsers} />
    </>
  );
};

export default Navbar;