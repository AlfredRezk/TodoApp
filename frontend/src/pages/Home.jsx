import { Container, Typography, Button, Grid, Divider } from "@mui/material";
import bannerGif from "../assets/images/banner.gif";
import bannerGif2 from "../assets/images/banner2.gif";


const Home = () => {
  return (

    <Container maxWidth="lg" sx={{ mt: 10 ,}} >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <img src={bannerGif} width="100%" />
        </Grid>

        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Do more and manage less !</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae sint iusto, culpa neque natus maxime cupiditate sequi et
            optio, provident quas temporibus tenetur aspernatur nemo magni
            possimus dolorum. Voluptatum, nemo?
          </Typography>

          <Button variant="contained" sx={{ bgcolor: "black", my: 3 }}>
            Learn More
          </Button>
        </Grid>
      </Grid>
      <Divider/>
      <Grid container alignItems="center" justifyContent="space-between" >
        <Grid item xs={12} md={6} sx={{ textAlign: "center" , mt:{xs:5}}}>
          <Typography variant="h4">Work smarter Not harder</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae sint iusto, culpa neque natus maxime cupiditate sequi et
            optio, provident quas temporibus tenetur aspernatur nemo magni
            possimus dolorum. Voluptatum, nemo?
          </Typography>

          <Button variant="contained" sx={{ bgcolor: "black", my: 3 }}>
            Learn More
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <img src={bannerGif2} width="100%" />
        </Grid>
      </Grid>
    
    </Container>

    
   

  );
};

export default Home;
