import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import ContactsIcon from '@mui/icons-material/Contacts';
import ReportIcon from '@mui/icons-material/Report';
import { Grid, Typography, Stack, Toolbar, Button, Skeleton } from '@mui/material';
import { getUserProfile } from '../services/user';
import { useQuery } from '@tanstack/react-query';
import { UserProfile } from '../definitions/interfaces';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export default function Profile() {

    const [profile, setProfile] = useState<UserProfile | null>(null)

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-profile'],
        queryFn: getUserProfile,
        staleTime: Infinity,
        refetchOnMount: false,

    });

    useEffect(() => {
        if (data !== undefined && "uuid" in data) {
            console.log('data')
            console.log(data)
            setProfile({ ...profile, ...data })
        }
        if (error) {
            console.error(error)
        }
    }, [data, error])

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
                <Grid size={{ xs: 12, md: 4 }}
                    id="profile-img"
                >
                    {
                        profile && !isLoading ?
                            <div className="img" >
                                <AccountCircleIcon />
                            </div>

                            :

                            <Skeleton style={{ maxHeight: '400px', maxWidth: '400px', width: '100%' }} />
                    }
                </Grid>
                <Grid id="profile-info" size="auto">

                    {
                        profile && !isLoading ?
                            <>
                                <Stack direction="row" className="group group-1">
                                    <Typography variant="h1">{profile?.username}</Typography>

                                </Stack>
                                <div className="group group-2">
                                    <div className={profile?.location ? "group location" : "group location missing"}>
                                        <LocationOnIcon />
                                        {profile?.location ? profile?.location : "Missing location information"}
                                    </div>
                                    <div className={profile?.position ? "group position" : "group position missing"}>
                                        <AssignmentIndIcon />
                                        <Typography variant="h3">{profile?.position ? profile.position : "missing position "}</Typography>

                                    </div>
                                </div>
                                <Toolbar className="group group-3">
                                    <Button startIcon={<MailIcon />}>send message</Button>
                                    <Button startIcon={<ContactsIcon />}>contacts</Button>
                                    <Button startIcon={<ReportIcon />}>report user</Button>
                                </Toolbar>

                            </>

                            :

                            <Skeleton style={{ height: '400px', width: '80%' }} />

                    }

                </Grid>
            </Container>
        </Box>
    )
}