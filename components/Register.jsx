import { Modal,Box,TextField,Button,Stack,Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';

const UserKeys =['firstName','lastName','email','birthday','password'];
export default function RegisterModal(props) {
    const[userInfo,setUserInfo] = useState({});
    const [errors, setErrors] = useState({});

    const checkErrors = () => {
        const errorsObj = {};
        let success = true;
      for (const key of UserKeys) {
        if (!userInfo[key]) {
          errorsObj[key] = 'This field is required';
          success = false;
        }
      }
      if(!errorsObj.email && !userInfo.email.match(/^[\w-.]+@[\w-.]+\.[\w.]+$/)){
        errorsObj.email = 'Invalid email format';
        success = false;
      }
      if (!errorsObj.password && userInfo.password != userInfo.confirmPassword) {
        errorsObj.confirmPassword = 'Passwords do not match';
        success = false;
      }
        setErrors(errorsObj);
        console.log(errorsObj);
        return success
    }
    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo({...userInfo,[name]:value});
    }
    const onRegisterClick = () => {
        const noErrors = checkErrors();
        if(!noErrors)
            return;
       console.log(userInfo);
       
    }
    return (
        <Modal open={props.open}
            onClose={props.onClose}>
            <Box sx={{  bgcolor: 'background.paper', borderRadius: 5, p: 3, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <Stack spacing={2}>
                    <Typography variant="h4" align="center">Register</Typography>
                    <TextField required label="Name" variant="standard" size="small" name="firstName" value={userInfo.firstName || ''} onChange={handelChange} 
                    error={!!errors.firstName}
                    helperText={errors.firstName||null} 
                    />
                    <TextField required label="Last Name" variant="standard" size="small" name="lastName" value={userInfo.lastName || ''} onChange={handelChange} 
                     error={!!errors.lastName}
                     helperText={errors.lastName||null} />
                    <TextField required label="Email" variant="standard" size="small" name="email" value={userInfo.email || ''} onChange={handelChange}  error={!!errors.email}
                    helperText={errors.email||null}  />

                    <BirthdayPicker onChange={handelChange} 
                    birthday={props.birthday} error={!!errors.birthday} />

                    <TextField required label="Password" variant="standard" type="password" size="small" name="password" 
                    value={userInfo.password || ''} onChange={handelChange} 
                    error={!!errors.password}
                    helperText={errors.password||null} />
                    <TextField required name='confirmPassword' label="Confirm Password" variant="standard" type="password" size="small" value={userInfo.confirmPassword || ''} 
                    onChange={handelChange}  error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword||null} />
                    <Button variant="contained" size="small"
                    onClick={onRegisterClick}>Register</Button>
                </Stack>
            </Box>
        </Modal>
    )
};


function BirthdayPicker(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
             label="Birthday" 
             value={props.birthday}
             onChange={(value) => props.onChange({target: {name: 'birthday',value}})}
             name='birthday'
             error = {!!props.error}
             helperText = {props.error||null}/>
        </LocalizationProvider>
    )
}
