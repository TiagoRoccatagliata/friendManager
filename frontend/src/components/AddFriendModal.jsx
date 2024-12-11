import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import api from "../utils/api";
import { useTheme } from "@mui/material/styles";

const CreateUserModal = ({ open, onClose, setUsers }) => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    gender: "male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.role || !formData.description || !formData.gender) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await api.post("/friends", formData);
      setUsers((prev) => [...prev, response.data]);
      onClose();
      setFormData({ name: "", role: "", description: "", gender: "male" });
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          color: "text.primary",
          mx: "auto",
          mt: "20vh",
          width: 400,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add a New Friend
        </Typography>
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Role"
          name="role"
          fullWidth
          value={formData.role}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          value={formData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <RadioGroup
          name="gender"
          value={formData.gender}
          onChange={handleRadioChange}
          row
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            sx={{ color: theme.palette.text.primary }}
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
            sx={{ color: theme.palette.text.primary }}
          />
        </RadioGroup>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Add Friend
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;