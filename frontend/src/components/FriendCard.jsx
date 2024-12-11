import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

const FriendCard = ({ friend }) => {
  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={friend.img_url}
            alt={friend.name}
            sx={{ width: 56, height: 56, mr: 2, bgcolor: "primary.main" }}
          />
          <Box>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              {friend.name}
            </Typography>
            <Typography variant="body2">{friend.role}</Typography>
          </Box>
        </Box>
        <Typography variant="body1">{friend.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default FriendCard;