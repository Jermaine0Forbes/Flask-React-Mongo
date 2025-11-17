import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function Home() {
    return (
        <>
            <section
                id="home-banner"
            >
                <div
                    className="group"
                >
                    <Typography

                        variant="h1"
                        className="title"
                    >
                        home page
                    </Typography>

                    <Typography
                        className="subtitle"
                        variant='subtitle1'>

                        Sign in to access your user</Typography>
                    <Button variant="outlined"> Sign In</Button>

                </div>
            </section>
            <section
                id="home-features"
            >
                <Container maxWidth="md" className="group-container">

                    <Grid className="group" container spacing={2}>
                        <Grid
                            size={{ md: 4 }} className="item item-1">
                            <div className="icon">
                                <AcUnitIcon />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            </p>
                        </Grid>
                        <Grid
                            size={{ md: 4 }} className="item item-1">
                            <div className="icon">
                                <WhatshotIcon />
                            </div>
                            <p>
                               Sed velit sapien, lacinia vel nibh sit amet, elementum tristique arcu.
                            </p>
                        </Grid>
                        <Grid
                            size={{ md: 4 }} className="item item-1">
                            <div className="icon">
                                <FlashOnIcon />
                            </div>
                            <p>
                                 Vestibulum mollis sem sagittis, rutrum tellus sit amet, dapibus urna.
                            </p>
                        </Grid>

                    </Grid>

                </Container>
            </section>

        </>

    )
}