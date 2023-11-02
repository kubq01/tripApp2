import './App.css';
// @ts-ignore
import LoginForm from "./auth/LoginForm.tsx";
import RegisterForm from "./auth/RegisterForm.tsx";
import UserProfile from "./user/UserProfile.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import HomeScreen from "./core/HomeScreen.tsx";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true;
        desktop: true;
    }
    interface Theme {
        radius: {
            sm: number;
            md: number;
            lg: number;
            circle: string;
        };
    }
    interface ThemeOptions {
        radius?: {
            sm: number;
            md: number;
            lg: number;
            circle: string;
        };
    }
}


function App() {

    const theme = createTheme({
        breakpoints: {
            values: {
                mobile: 0,
                desktop: 1024,
            },
        },
        radius: {
            sm: 4,
            md: 8,
            lg: 16,
            circle: '50%',
        },
        palette: {
            primary: {
                main: '#292e28',
                light: '#739072',
                dark: '#2C3333',
            },
            secondary: {
                main: '#ECE3CE',
            },
            text: {
                primary: '#bbbbbd',
                secondary: '#000000',
                disabled: '#bdbdbd',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route index element={<LoginForm/>}/>
                <Route path="register" element={<RegisterForm/>}/>
                <Route path="homescreen" element={<HomeScreen/>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
