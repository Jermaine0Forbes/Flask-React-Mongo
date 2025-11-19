import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormGroup, TextField } from '@mui/material';

type Inputs = {
    username: string
    password: string
    password2: string
};

export default function Signup()
{

        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
        } = useForm<Inputs>();
    
        const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    return (
        <main
         id="signup"
        >
        <section
            id="signup-header"
        >
                <Typography
                variant="h1"
                >

            this is the signup page
                </Typography>
        </section>
        <section
        
            id="signup-form"
        >
            <Container
               maxWidth="md"
            >

         <Box
             component="form"
             onSubmit={handleSubmit(onSubmit)}
         >
             <FormGroup 
             className="form-group"
             >
                 <FormControl>
                    <FormLabel>username</FormLabel>
                     <TextField
                         variant='standard'
                         id="username"
                         className="form-field"
                         {...register('username', { required: true })}
                     />
                 </FormControl>

             </FormGroup>

             <FormGroup
                 className="form-group"
             >
                 <FormControl>
                    <FormLabel>password</FormLabel>
                     <TextField
                         variant='standard'
                         id="password"
                          className="form-field"
                         {...register('password', { required: true })}
                     />
                 </FormControl>

             </FormGroup>

                          <FormGroup
                 className="form-group"
             >
                <FormControl>
                    <FormLabel>re-enter password</FormLabel>
                     <TextField
                         variant='standard'
                         id="password"
                          className="form-field"
                         {...register('password2', { required: true })}
                     />
                 </FormControl>

             </FormGroup>
             <Button type="submit">signup</Button>
         </Box>

            </Container>

            
        </section>


        </main>
    )
}