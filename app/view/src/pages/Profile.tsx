import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import ContactsIcon from '@mui/icons-material/Contacts';
import ReportIcon from '@mui/icons-material/Report';
import { Grid, Typography, Stack, Toolbar, Button } from '@mui/material';
import { getUserProfile } from '../services/user';
import { useQuery } from '@tanstack/react-query';
import { UserProfile } from '../definitions/interfaces';

export default function Profile() {

    const [profile, setProfile] = useState<UserProfile|null>(null)

    const { data, isLoading, error} = useQuery({
        queryKey:['get-profile'],
        queryFn: getUserProfile,
        // staleTime: Infinity,
        // refetchOnMount: false,

    });

    useEffect(() => {
        if(data !== undefined && "uuid" in data) {
            console.log('data')
            console.log(data)
            setProfile({...profile, ...data})
        }
        if(error) {
            console.error(error)
        }
    }, [data,error])

    return (
        <Box
            component="main"
            id="profile"
        >
            <Container
                component={Grid}
                container
                maxWidth="xl"
                id="profile-grid"
            >
                <Grid size={{xs: 12, md:4}}

                    id="profile-img"
                >
                    <div className="img" >
                        <AccountCircleIcon />
                    </div>
                </Grid>
                <Grid id="profile-info" size="auto">
                    <Stack direction="row" className="group group-1">
                        <Typography variant="h1">profile name</Typography>
                        <div className="group location">
                            <LocationOnIcon />
                            location
                        </div>
                    </Stack>
                    <div className="group group-2">
                        <Typography variant="h3"> profile position</Typography>
                    </div>
                    <Toolbar className="group group-3">
                        <Button startIcon={<MailIcon />}>send message</Button>
                        <Button startIcon={<ContactsIcon />}>contacts</Button>
                        <Button startIcon={<ReportIcon />}>report user</Button>
                    </Toolbar>

                </Grid>
            </Container>
        </Box>
    )
}