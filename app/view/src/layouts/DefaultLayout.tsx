import React, {useState, useEffect} from 'react';
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import ScienceIcon from '@mui/icons-material/Science';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function DefaultLayout() {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const toggleOpen = () => {
        setOpen(!open);
    }


    return (
        <Container
            component={"main"}
            maxWidth="xl"
            id="layout-container"
        >

                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Set backup account</DialogTitle>

                </Dialog>
            <AppBar position="static" id="app-bar">
                <Grid
                    container
                >
                    <Grid size={3} className="app-bar-grid">
                        <Box 
                        id="logo-section"
                        >
                            <ScienceIcon />
                            <Typography 
                            component={Link}
                            to="/"
                            variant='h5'>

                                flaskRM
                            </Typography>

                        </Box>
                    </Grid>
                    <Grid
                        className="app-bar-grid"
                        size={3}
                        offset={6}
                    >
                        <Toolbar
                            id="toolbar"
                        >
                            <Button
                               onClick={toggleOpen}
                               className="links"
                            >
                                Login
                            </Button>

                            <Button
                            className="links"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>
                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
            <Outlet />
        </Container>
    );
}