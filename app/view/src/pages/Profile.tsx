import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

export default function Profile()
{
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
         <Grid size={4}></Grid>
         <Grid size="auto">
            <section>
                this is the profile page
            </section>


         </Grid>
         </Container>
        </Box>
    )
}