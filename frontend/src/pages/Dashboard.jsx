import { useTodo } from "../context/todo";
import React, { useEffect } from "react";
import { Status, TodosTable } from "../components";
import { Divider } from "@mui/material";

const Dashboard = () => {
  const { todos, list } = useTodo();

  useEffect(() => {
    list();
  }, []);

  return (
    <>
      <Status todos={todos} />

      <TodosTable/>
    </>
  );
};

export default Dashboard;
