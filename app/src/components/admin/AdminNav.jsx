import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { ListItem, Box } from "@mui/material";

    const link = [
        {
            title: 'Users',
        },
        {
            title:'Patients',
        },
        {
            title:'Doctors',
        },
        {
            title:'Medical Requests',
        },
        {
            title:'Lab Requests',
        },
        {
            title: 'Labs',
        },
        {
            title: 'Donations',
        },
        {
            title: 'Blogs',
        },
        {
            title: 'Events',
        }
    ]
     
const AdminNavbar = ({setTabClicked}) => {

    const handleTabClick = (e) => {
        if(e.target.innerText == 'Users'){
            setTabClicked('user');
        }
        if(e.target.innerText =='Patients'){
            setTabClicked('patient');
        }
        if(e.target.innerText == 'Doctors'){
            setTabClicked('doctor');
        }
        if(e.target.innerText == 'Medical Requests'){
            setTabClicked('medicalRequest');
        }
        if(e.target.innerText == 'Lab Requests'){
            setTabClicked('labRequest');
        }
        if(e.target.innerText == 'Labs'){
            setTabClicked('lab');
        }
        if(e.target.innerText == 'Donations'){
            setTabClicked('donation');
        }
        if(e.target.innerText == 'Blogs'){
            setTabClicked('blog');
        }
        if(e.target.innerText == 'Events'){
            setTabClicked('event');
        }
    }

    return (
        <Box sx={{
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            height: 'calc(100vh - 64px)',
            width: '15vw',
          }}>
            { link.map(link=> (
            <Link className="link" to={link.linkTo} key ={link.title}>
                <ListItem sx={{
                    color: 'white',
                    fontSize: '20px',
                    fontFamily: 'Roboto, sans-serif',
                    padding: '1rem',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                   
                }} onClick={(e)=>handleTabClick(e)}>
                   {link.title}
                </ListItem>
            </Link>
        ))}
        </Box>
       
    );
}

export default AdminNavbar;