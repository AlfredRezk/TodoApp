import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

const StatusItem = ({ status }) => {
  const { text, number, color, bgcolor } = status;
  return (
    <Card sx={{ bgcolor, color }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-around" alignItems="center">
          <Stack direction="column" justifyContent="space-between">
       
            <Typography variant="h4">{text}</Typography>
          </Stack>
          <Stack>
          <Typography variant="h2" sx={{fontWeight:'700'}}>{number}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatusItem;
