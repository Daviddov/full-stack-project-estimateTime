import {
    createTheme,
    Link,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Box,
    Typography,
    Avatar,
    CssBaseline,
    Container,
    ThemeProvider
} from "@mui/material";

import { fetchData } from "./fetchData";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn({ setCurrentUser }) {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        const email = data.get('email')
        const password = data.get('password')

        const url = 'http://localhost:3000/user';
        if (email && password) {
            try {
                const user = {
                    email,
                    password
                };
                const responseData = await fetchData(url, 'POST', user);
                setCurrentUser(responseData);
                navigate('/main');
            } catch (error) {
                console.error(error);
                // handle error here
            } finally {
                //   setIsLoading(false);
            }
        }


    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/SignUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}