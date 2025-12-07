import React, { 
    // useState, 
    // useEffect, 
    Dispatch  } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import { useForm, SubmitHandler } from "react-hook-form"
import { FormGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Inputs, DialogStatus} from "../../types/index";



interface LoginDialogProps  {

    open: boolean,
    setOpen: Dispatch<DialogStatus>,
}

export default function LoginDialog ( {open, setOpen}: LoginDialogProps) {
    
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    const handleClose = (): void => {
        setOpen(false);
    }

    // const toggleOpen = (): void => {
    //     setOpen(!open);
    // }

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