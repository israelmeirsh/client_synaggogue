import { Modal,Box,TextField,Button,Stack,Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { registerUser } from '../src/api/users';

const UserKeys =['firstName','lastName','birthday','phone','fatherName','password'];
export default function RegisterModal(props) {
    const[userInfo,setUserInfo] = useState({});
    const [errors, setErrors] = useState({});
    const [serverError,setServerError] = useState();
    const [loading,setLoading] = useState(false);


    const checkErrors = () => {
        const errorsObj = {};
        let success = true;
      for (const key of UserKeys) {
        if (!userInfo[key]) {
          errorsObj[key] = 'This field is required';
          success = false;
        }
      }
      if(!errorsObj.phone&&userInfo.phone.length<10){
        errorsObj.phone = 'Phone number must be 10 digits';
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
        if(loading) return;
        setServerError();
        setLoading(true);
        const noErrors = checkErrors();
        if(!noErrors){
            setLoading(false);
            return;
        }
       const user = {};
       for (const key of UserKeys)
            user[key] = userInfo[key];
       registerUser(userInfo)
        .then(() => 
            props.onClose())
        .catch(err =>{ 
            console.error(err);
            setServerError(err.message)
        })
        .finally(() => 
            setLoading(false));
    }

    return (
        <Modal open={props.open}
            onClose={props.onClose}>

            <Box sx={{  bgcolor: 'background.paper',
                 borderRadius: 5, 
                 p: 3, 
                 position: 'absolute', 
                 top: '50%', left: '50%', 
                 transform: 'translate(-50%, -50%)'}}>

                <Stack spacing={2}>

                    <Typography variant="h4" align="center">Register</Typography>

                    <TextField required 
                    label="firstName" 
                    variant="standard" 
                    size="small" 
                    disabled ={loading} 
                    name="firstName" 
                    value={userInfo.firstName || ''} 
                    onChange={handelChange} 
                    error={!!errors.firstName}
                    helperText={errors.firstName||null} 
                    />

                    <TextField required 
                    label="lastName" 
                    disabled ={loading}
                    variant="standard" 
                    size="small" 
                    name="lastName" 
                    value={userInfo.lastName || ''} 
                    onChange={handelChange} 
                     error={!!errors.lastName}
                     helperText={errors.lastName||null} />

                     <TextField required 
                    label="fatherName" 
                    variant="standard" 
                    size="small" 
                    disabled ={loading} 
                    name="fatherName" 
                    value={userInfo.fatherName || ''} 
                    onChange={handelChange} 
                    error={!!errors.fatherName}
                    helperText={errors.fatherName||null} 
                    />

                    <TextField required 
                    label="phone" 
                    variant="standard" 
                    size="small" 
                    disabled ={loading} 
                    name="phone" 
                    value={userInfo.phone || ''} 
                    onChange={handelChange} 
                    error={!!errors.phone}
                    helperText={errors.phone||null} 
                    />

                    <TextField required 
                    label="Password" 
                    disabled ={loading}
                    variant="standard" 
                    type="password" 
                    size="small" 
                    name="password" 
                    value={userInfo.password || ''} 
                    onChange={handelChange} 
                    error={!!errors.password}
                    helperText={errors.password||null} />

                    <TextField 
                    required 
                    name='confirmPassword' 
                    disabled ={loading} 
                    label="Confirm Password" 
                    variant="standard" 
                    type="password" 
                    size="small" 
                    value={userInfo.confirmPassword || ''} 
                    onChange={handelChange}  
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword||null} />

                    <BirthdayPicker 
                    onChange={handelChange} 
                    birthday={props.birthday} 
                    error={!!errors.birthday}
                    disabled ={loading} />

                    <Button 
                    variant="contained" 
                    size="small" 
                    disabled ={loading}
                    onClick={onRegisterClick}
                    >Register</Button>

                    {serverError && <Typography variant='h6' color="error">{serverError}
                        </Typography>}
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
             onChange={(value) => 
                props.onChange({target: 
                    {name: 'birthday',value}})}
             name='birthday' 
             error = {!!props.error}
             helperText = {props.error||null}/>
        </LocalizationProvider>
    )
}
