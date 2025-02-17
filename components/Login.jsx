import { useState } from "react";
import { TextField, Stack, Box, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Login(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = () => {
        console.log(email,password);
        
    }

    return (
        <Box sx={{ padding: '7px' }}>
            <Stack spacing={1}>
                <TextField 
                label="Email" 
                variant="standard" 
                size="small" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
                <TextField 
                label="Password" 
                variant="standard" 
                type="password" 
                size="small" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                <Button startIcon={<LoginIcon />} 
                variant="contained" 
                size="small"
                onClick={handleLogin}>
                    Login
                </Button>
                <Button 
                startIcon={<PersonAddIcon />} 
                variant="outlined" 
                size="small"
                onClick={props.openRegister}>
                    Registr
                </Button>
            </Stack>
        </Box>
    );
}
