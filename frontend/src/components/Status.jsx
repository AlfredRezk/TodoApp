import { Card, CardContent, Grid,  Typography } from "@mui/material";
import React from "react";
import StatusItem from "./StatusItem";

const Status = ({ todos }) => {
  console.log(todos)
  const stats = [
    {
      id: "s1",
      text: "Total",
      number: todos?.length,
      bgcolor: "dodgerblue",
      color: "white",
    },
    {
      id: "s2",
      text: "Completed",
      number: todos?.filter((t) => t.isCompleted).length,
      bgcolor: "red",
      color: "white",
    },
    {
      id: "s3",
      text: "Not Completed",
      number: todos?.filter((t) => !t.isCompleted).length,
      bgcolor: "green",
      color: "white",
    },
  ];
  return (
    <Card>
      <CardContent>
        <Typography align="center" variant="h4">Status</Typography>
        <Grid container>
          {stats.map((st) => (
            <Grid item xs={12} md={4} p={2} key={st.id}>
              <StatusItem key={st.id} status={st} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Status;
