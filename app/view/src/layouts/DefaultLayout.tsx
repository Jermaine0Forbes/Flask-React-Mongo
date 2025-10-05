import React from 'react';
import {
    Outlet,
    Link,

    // useNavigate
} from "react-router";
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function DefaultLayout() {

    return (
        <Container
            component={"main"}
            maxWidth="xl"
            id="layout-container"
        >
            <AppBar position="static" id="app-bar">
                <Toolbar
                    id="toolbar"
                    component="section"
                >
                    <Grid 
                    container
                    >
                     <Grid size={3}>
                        
                        <Brightness7Icon />    
                    
                    </Grid>   
                     <Grid size={6}>
                        <Stack
                            direction={'row'}
                            spacing={2}
                            component="nav"
                        >
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/"
                            >
                                Home
                            </Typography>
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Typography>
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/profile"
                            >
                                Profile
                            </Typography>
                        </Stack>
                        
                    </Grid>   
                     <Grid size={3}></Grid>   
                        
                    </Grid> 
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
}