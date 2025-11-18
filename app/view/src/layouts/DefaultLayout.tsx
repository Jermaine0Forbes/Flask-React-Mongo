import React, { useState, useEffect } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useForm, SubmitHandler } from "react-hook-form"
import { FormGroup, TextField } from '@mui/material';

type DialogStatus = true | false;
type Inputs = {
    username: string
    password: string
};


export default function DefaultLayout() {

    const [open, setOpen] = useState<DialogStatus>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    const handleClose = (): void => {
        setOpen(false);
    }

    const toggleOpen = (): void => {
        setOpen(!open);
    }


    return (

 <>
 
 <Dialog onClose={handleClose} open={open}>
     <DialogTitle>log into your account</DialogTitle>
     <DialogContent>
         <Box
             component="form"
             onSubmit={handleSubmit(onSubmit)}
         >
             <FormGroup>
                 <FormControl>

                     <TextField
                         variant='standard'
                         label="username"
                         id="username"
                         {...register('username', { required: true })}
                     />
                 </FormControl>

             </FormGroup>

             <FormGroup>
                 <FormControl>

                     <TextField
                         variant='standard'
                         label="password"
                         id="password"
                         {...register('password', { required: true })}
                     />
                 </FormControl>

             </FormGroup>
             <Button type="submit">Submit</Button>
         </Box>
     </DialogContent>
 </Dialog>
 <AppBar position="static" id="app-bar">
     <Grid
         container
         maxWidth={"xl"}
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
 </>
    );
}