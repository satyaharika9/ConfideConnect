import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Lottie from 'lottie-react';

import ImageSlider from '../components/home/ImageSlider';
import animationData from '../assets/anim/doctorAnim.json';
import image0 from '../assets/anim/aids-microbe.jpg';
import image1 from '../assets/anim/aids-support.jpg';
import image2 from '../assets/anim/aids-protection.jpg';
import globe from '../assets/anim/globe1.json';
import ribbonImage4 from '../assets/images/ribbon7.png';


const Home = () => {
  // const images = [image0, image1, image2];
  const images = [image2];

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
        <Typography variant="h4" component="h1" sx={{
          marginTop: '15px',
          backgroundImage: 'linear-gradient(45deg, #FFFFFF, #CCCCCC)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 10px rgba(0,0,0,0.6)',
          fontSize: '3rem',
          }}>
          ConfideConnect
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'black', paddingRight: '100px', paddingLeft: '100px', height: 'calc(100vh - 64px)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '200px' }}>
          <Box>
            <Typography variant="h2" sx={{ color: 'white', marginTop: '10px'  }}>
              Accessible Healthcare: Anonymous Support for AIDS Patients
            </Typography>
            <Typography sx={{ color: 'white' }}>
              Break barriers to healthcare for AIDS patients with our platform. Connect anonymously with doctors for free, ensuring access to crucial medical advice and support, all from the comfort of your home.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/login" sx={{ marginTop: '20px' }}>
              Login
            </Button>
          </Box>
          <Box>
            <Lottie animationData={animationData} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'black', paddingRight: '100px', paddingLeft: '100px', height: 'calc(100vh - 64px)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '100px' }}>
          <Box sx={{width: '85vw'}}>
            <Lottie animationData={globe} />
          </Box>
          <Box>
            <Typography variant="h2" sx={{ color: 'white', marginTop: '10px'  }}>
              Empowering Awareness: Stay Informed about HIV/AIDS Events
            </Typography>
            <Typography>
              Explore our platform for comprehensive information on upcoming HIV/AIDS awareness events, including dates, locations, and timings. Join us in spreading awareness and making a difference in the fight against HIV/AIDS.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/events" sx={{ marginTop: '20px' }}>
              Explore Events
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'black', paddingRight: '100px', paddingLeft: '100px', height: 'calc(100vh - 64px)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '200px' }}>
          <Box sx={{ width: '700px' }}>
            <Typography variant="h2" sx={{ color: 'white' }}>
              Hope in Unity: Supporting Lives Affected by AIDS
            </Typography>
            <Typography sx={{ color: 'white', marginTop: '10px'  }}>
              Empowering lives affected by AIDS, our platform offers comprehensive support and resources to navigate the challenges of living with HIV/AIDS. From access to medical care to community support networks, we're here to ensure no one faces the journey alone.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/blogs" sx={{ marginTop: '20px' }}>
              View Blogs
            </Button>
          </Box>
          <Box>
            <ImageSlider images={images} interval={3000} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ 
          backgroundColor: '#212121', 
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '50px'
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={ribbonImage4} alt="HTML" style={{ width: '30px', height: '55px', marginRight: '10px' }} />
          <Typography >
            Connecting Patients with Specialist Care: <br />
            Your Health, Our Priority.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/home" style={{ color: '#ffffff', textDecoration: 'none', margin: '15px' }}>
            <Typography >
              HOME
            </Typography>
          </Link>
          <Link to="/events" style={{ color: '#ffffff', textDecoration: 'none', margin: '15px' }}>
            <Typography >
              EVENTS
            </Typography>
          </Link>
          <Link to="/blogs" style={{ color: '#ffffff', textDecoration: 'none', margin: '15px' }}>
            <Typography >
              BLOGS
            </Typography>
          </Link>
          <Link to="/donations" style={{ color: '#ffffff', textDecoration: 'none', margin: '15px' }}>
            <Typography >
              DONATION
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">Inquiries? Contact us </Typography>
          <Typography variant="body2">
            Email: <a href="mailto:confideconnect.com" style={{ color: '#1976d2' }}>confideconnect.com</a>
          </Typography>
          <Typography variant="body2">Phone no: +1 617-442-5178</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;