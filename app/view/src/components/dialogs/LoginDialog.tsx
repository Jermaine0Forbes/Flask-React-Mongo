import React, { 
    // useState, 
    // useEffect, 
    Dispatch  } from 'react';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import { useForm, SubmitHandler } from "react-hook-form"
import { FormGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {LoginInputs, DialogStatus} from "../../types/index";
import { userLogin } from '../../services/user';



interface LoginDialogProps  {

    open: boolean,
    setOpen: Dispatch<DialogStatus>,
}

export default function LoginDialog ( {open, setOpen}: LoginDialogProps) {
    
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
    } = useForm<LoginInputs>();

    const refresh = useNavigate();

    const form = useMutation({
        mutationFn: userLogin,
        onSuccess: async (resp) => {
            const data = await resp;
            if(data?.ok) {
                console.log("response is ...")
                console.log(data)
                refresh(0);
            }
        }
    })

    const onSubmit: SubmitHandler<LoginInputs> = async (input) => {
        console.log(input)
        form.mutate(input);

    };
    const handleClose = (): void => {
        setOpen(false);
    }


    return (
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
    )
}