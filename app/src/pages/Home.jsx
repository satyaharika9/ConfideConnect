import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ribbonImage4 from '../assets/images/ribbon7.png'; 
import Lottie from 'lottie-react';
import animationData from '../assets/anim/doctorAnim.json';
import aidsAnim from '../assets/anim/aidsAnim.json';
import { red } from "@mui/material/colors";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ImageSlider from '../components/home/ImageSlider'
import image0 from '../assets/anim/aids-microbe.jpg';
import image1 from '../assets/anim/aids-support.jpg';
import image2 from '../assets/anim/aids-protection.jpg';
import globe from '../assets/anim/globe1.json';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import "../../src/App.css";





const Home = () => {

  

  const images = [image0, image1, image2]; 
  const interval = 3000;

  const indexToImage = {
    0: image0,
    1: image1,
    2: image2
    
  };
  return (
    <>
    
    <Box  
    sx={{
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
      
    }}
    >   
      <img
        src={ribbonImage4}
        alt="AIDS Ribbon"
        style={{
          maxWidth: '350px',
          maxHeight: '350px',
         
          
        }}
      />
     
      
      <Typography variant="h4" component="h1" sx={{ color: 'white', marginTop: '30px' }}>
      ConfideConnect
      </Typography>
      </Box>
      
    <section class="sectionBackground">
     
     <div class="sectionDiv">
          <div class="divMargin">  
         
            <h1 class="width2 regFont whitetext" >Hope in Unity: Supporting Lives Affected by AIDS</h1>
            <p class="width2 regFont whitetext">Empowering lives affected by AIDS, our platform offers comprehensive support and resources to navigate the challenges of living with HIV/AIDS. From access to medical care to community support networks, we're here to ensure no one faces the journey alone.
            </p>
            
            <Button variant="contained" color="primary" component={Link} to="/blogs">
              View Blogs
            </Button>
            
        </div>
        <div class="divMargin">
    <ImageSlider images={images} interval={3000} /></div></div>
    </section>
    <section class="sectionBackground">
     
     <div class="sectionDiv">
     <div class="divMargin">
          <Lottie  class="globeAnim" animationData={globe} /></div>
        <div class="divMargin">  
        
            <h1 class="width2 regFont whitetext" >Empowering Awareness: Stay Informed about HIV/AIDS Events</h1>
            <p class="width2 regFont whitetext">Explore our platform for comprehensive information on upcoming HIV/AIDS awareness events, including dates, locations, and timings. Join us in spreading awareness and making a difference in the fight against HIV/AIDS.
            </p>
            
            <Button variant="contained" color="primary" component={Link} to="/events">
            Explore Events
            </Button>
            
        </div>
         
        </div>
    </section>
    <section class="sectionBackground">
     
     <div class="sectionDiv">
          
          <div style={{marginTop: '280px'}}>  
          
            <h1 class="width2 regFont whitetext">Accessible Healthcare: Anonymous Support for AIDS Patients</h1>
            <p class="width2 regFont whitetext">Break barriers to healthcare for AIDS patients with our platform. Connect anonymously with doctors for free, ensuring access to crucial medical advice and support, all from the comfort of your home.
            </p>
           
            <Button variant="contained" color="primary" component={Link} to="/login">
            Login
            </Button>
            
        </div>

     
    <div> <Lottie  class="docAnim" animationData={animationData} /></div>
    </div>
    </section>
    <section class="flex-container sectionBackground">
  <div class="flex-container footerDiv" >
    <div >
            <img class="footerImage" src={ribbonImage4} alt="HTML"></img>
            <p class="width2 black regFont footerCaption"  >Connecting Patients with Specialist Care: Your Health, Our Priority.</p>
           
        </div>
        <ul>
            <li>
                <p class="black regFont"><b>CONFIDE CONNECT</b></p>
            </li>
            <li><a class="black regFont" href="confideconnect/home">HOME</a></li>
            <li><a class="black regFont" href="confideconnect/events">EVENTS</a></li>
            <li><a class="black regFont" href="confideconnect/blogs">BLOGS</a></li>
            <li><a class="black regFont" href="confideconnect/donations">DONATION</a></li>
        </ul>
        
        <ul>
            <p class="black regFont"><b>Inquiries? Contact us at</b></p>
            
            <p class="width2 black regFont">Email: contactteam@confideconnect.com </p>
            
            <p class="width2 black regFont">Phone no: +1 617-442-5178</p>
        </ul>
        </div>
    </section>
    
    

      </>
  );

};

export default Home;
