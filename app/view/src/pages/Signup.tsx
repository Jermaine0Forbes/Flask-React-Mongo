import React, {EventHandler, useState} from 'react';
import { useForm, SubmitHandler, FormProvider} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Button, FormGroup, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { userSignup } from '../services/user';
import { SignupInputs } from "../types";
import { updateInputState } from '../utils';

export default function Signup()
{
        const redirect = useNavigate();
        const [name, setName] = useState<string>('user1');
        const [pass, setPass] = useState<string>('password');

        const handleName = (e: Event) :void  => ( updateInputState(e, setName));

        const handlePass = (e: Event): void => (updateInputState(e, setPass));

        const {
            register,
            handleSubmit,
            getValues,
            // watch,
            formState: { errors },
        } = useForm<SignupInputs>({ defaultValues : {
                username: 'user1',
                password: 'password',
                password2: 'password'
            },});
    
        const form = useMutation({
            mutationFn: userSignup,
            onSuccess: async (resp) => {
                const data = await resp;
                if(data?.ok) {
                    console.log("response is ...")
                    console.log(data)
                    const json = await data.json()
                    localStorage.setItem("_t", json.jwt);
                    redirect("/profile/"+json.uuid);
                }
            }
        })
    
        const onSubmit: SubmitHandler<SignupInputs> = async (input) => {
            // if(!errors){
                console.log(input)
                form.mutate(input);

            // }
            // console.log(errors)
    
        };

        const comparePasswd = (value:string): boolean | string  => {
           const {password} = getValues();
           if ( password !== value) {
            console.error("passwords don't match")
             return  "the passwords do not match";
           }
          return true;

        }

        console.log('errors')
        console.log(errors)
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
                            // value={name}
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
                            id="password2"
                            className="form-field"
                            {...register('password2', { required: true, validate: {
                                comparePasswd
                            } })}
                        />
                        <div>
                            {errors?.password2 && " the passwords do not match"}
                        </div>
                    </FormControl>
                </FormGroup>
                <Button type="submit">signup</Button>
            </Box>


            </Container>
        </section>
        </main>
    )
}