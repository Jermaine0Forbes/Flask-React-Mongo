import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, FormGroup, TextField } from '@mui/material';

type Inputs = {
    username: string
    password: string
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
        <main>
                    <section>
            this is the signup page
        </section>
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


        </main>
    )
}