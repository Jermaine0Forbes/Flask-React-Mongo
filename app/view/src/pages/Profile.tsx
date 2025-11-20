import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import ContactsIcon from '@mui/icons-material/Contacts';
import ReportIcon from '@mui/icons-material/Report';
import { Grid, Typography, Stack, Toolbar, Button } from '@mui/material';

export default function Profile() {
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
                <Grid size={4}

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