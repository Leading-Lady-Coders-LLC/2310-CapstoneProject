import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Container, CardContent, CardMedia} from "@mui/material";




const AboutMe = () => {

    const navigate = useNavigate();
    
    return(
 
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              sx={{ p: "1rem", width: "400px", height: "700px" }}
              image={"/public/assets/Beth's About Me page pic.jpg"}
              component="img"
             
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
              <Typography gutterBottom variant="caption" component="span">
                <h1> Hello </h1>
              </Typography>
              <Typography variant="body1" color="text.secondary">
              Welcome to my page! My name is Beth, and I am a cake baker and proud mother who also has a passion for coding. I have always loved baking, and have been doing it for as long as I can remember. However, in recent years, I have also developed an interest in coding and pursued it as a career.
            <br></br>
            <br></br>
As a mother, I understand the importance of creating special moments and memories with loved ones. That's why I specialize in creating beautiful and delicious cakes for all occasions - from birthdays to weddings, and everything in between. I love experimenting with unique flavors and designs, and working with my clients to create something truly special and unique.

When it comes to coding, I enjoy the challenge of problem-solving and creating something from scratch.
            <br></br>
            <br></br>
 My background in coding has also allowed me to create a seamless and user-friendly online ordering system for my clients, making the process of ordering a cake as easy and stress-free as possible.

I take pride in my work and strive to create cakes that not only look amazing but taste delicious too. Whether you need a cake for a special occasion or just want to treat yourself, I am here to help make your cake dreams a reality.

Thank you for considering me for your cake needs, and I look forward to working with you!
              </Typography>
              <Typography variant="body2" color="text.secondary">
               
              </Typography>
             
              </CardContent>
              </Card>
        </Container>

    )



}

export default AboutMe