import React  from 'react';
import {
    Link,
} from "react-router";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function DefaultFooter() {


    return(
        <Box
            component="footer"
            id="footer"
        >
            <Container
                maxWidth="lg"
            >

       flaskRM { new Date().getFullYear()}, created by <Link to="https://github.com/Jermaine0Forbes">Jermaine Forbes</Link>
            </Container>

        </Box>
    );
}