import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import {
    Outlet,
    Link,
    useNavigate
} from "react-router";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Menu, MenuItem } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import LoginDialog from '../components/dialogs/LoginDialog';
import DefaultFooter from '../partials/DefaultFooter';
import { DialogStatus } from "../definitions/types";
import { AuthContext } from '../contexts';
import { CurrentUser } from '../definitions/interfaces';
import { hasProps, isObject, isX } from '../utils';
// import { isInterface } from '../definitions/types';



export default function DefaultLayout() {

    const [open, setOpen] = useState<DialogStatus>(false);
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { state, dispatch } = useContext(AuthContext);
    const redirect = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        localStorage.removeItem('_t')
        dispatch({
            type: "LOGGING_OUT"
        });

        redirect('/');
    }


    useEffect(() => {

        // need to refactor to add proper typescript checking
        if (typeof state === "object" && state !== null) {

            if ("uuid" in state && "currentUser" in state) {

                const { uuid, currentUser } = state;
                let isObj = isObject(currentUser);
                if (isObj && isX(['username'], currentUser) && !user) {
                    console.log('current user')
                    console.log(currentUser)
                    setUser(currentUser);
                }

            }


        }
    }, [state])

    const toggleOpen = (): void => {
        setOpen(!open);
    }


    return (

        <>

            <LoginDialog open={open} setOpen={setOpen} />
            <AppBar position="static" id="app-bar">
                <Grid
                    container
                    maxWidth={"xl"}
                >
                    <Grid size={3} className="app-bar-grid">
                        <Box
                            id="logo-section"
                        >
                            <ScienceIcon />
                            <Typography
                                component={Link}
                                to="/"
                                variant='h5'>

                                flaskRM
                            </Typography>

                        </Box>
                    </Grid>
                    <Grid
                        className="app-bar-grid"
                        size={3}
                        offset={6}
                    >
                        <Toolbar
                            id="toolbar"
                        >
                            <Button
                                onClick={toggleOpen}
                                className="links"
                            >
                                Login
                            </Button>

                            <Button
                                className="links"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>

                            {

                                user && hasProps(user, ["uuid", "username"]) && (

                                    <>
                                        <Button
                                            className="links"
                                            component={Link}
                                            to={"/profile/" + user?.uuid}
                                        >
                                            {user?.username}
                                        </Button>
                                        <Menu
                                            id="user-menu"
                                            slotProps={{
                                                list: {
                                                    'aria-labelledby': 'user-menu-btn'
                                                }
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                        >
                                            <MenuItem
                                             onClick={handleLogout}
                                            >
                                                Logout
                                            </MenuItem>
                                        </Menu>


                                    </>


                                )

                            }

                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
            <Outlet />
            <DefaultFooter />
        </>
    );
}