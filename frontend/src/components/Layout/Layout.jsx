import { Box, Container, Toolbar } from "@mui/material";
import { Header, Sidebar } from "../index";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Layout = () => {
 const {user} = useAuth()
  return (
    <>
      <Box sx={{ display: "flex", minHeight:'100vh' }}>
        <Header />
        {user?.username&&<Sidebar />}

        <Box sx={{ overflow: "auto" , width:'100%'}}>
          <Toolbar />
          <Container maxWidth="xl" sx={{mt:5}}>
          <Outlet />
          </Container>
        </Box>
      </Box>

    </>
  );
};

export default Layout;
