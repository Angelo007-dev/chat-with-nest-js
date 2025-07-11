import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import { ISignIn } from '../model/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../../api/axios';
import { Avatar, Box, Button, Container, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { validateEmail, validatePassword } from '../../../utils/validate';

const INITIAL_STATE =  {
    email:"",
    password:"", 
};

export default function SignIn() {

    //Password visibility
    const [showPassword,setShowpassword] = useState(false);

    //states
    const [signInState,setSignInState] = useState<ISignIn>(INITIAL_STATE);
    const [errors,setErrors] = useState<Partial<ISignIn>>({});
    const navigate = useNavigate();
    //Validate Form
    const validateForm = useCallback(():boolean => {
        const newErrors: Partial<ISignIn> = {};
        if(!validateEmail(signInState.email)){
            newErrors.email="Invalid email";
        }
        if(!validatePassword(signInState.password)){
            newErrors.password="Password must be at least 8 characters, with uppercase, numbers, and special characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    },[signInState.email,signInState.password] );

    //Handler
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInState((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = useCallback(
    async (e: FormEvent) => {
    e.preventDefault();
    if(!validateForm()){
        toast.error("Please fix the error in form");
        return;
    }
    try {
      const response = await API.post("/auth/login", signInState);
      if(response){
        toast.success("Sign In successful!");
        // Stock the user token
        localStorage.setItem("token", response.data.access_token);
        navigate("/");
        setErrors({});
        
      }
      else{
        toast.error("Check the username or password wrong")
        setErrors({});
        
      }
      
    } catch (err: any) {
        const message = err.response?.data?.message || "Login failed";
        
        toast.error(message);
    }
  },[signInState]
  ) 
    return (
    <Container maxWidth="xs">
            <Paper elevation={10} sx={{marginTop:8, padding:2 }}>
                <Avatar sx={{
                        mx: "auto",
                        bgColor:"primary.main",
                        textAlign:"center",
                        mb:1
                    }}
                >
                 <MailLockOutlinedIcon></MailLockOutlinedIcon>   
                </Avatar>
                <Typography component={"h1"} variant='h5' sx={{textAlign:"center"}}>Sign Up</Typography>
                <Box component={"form"} noValidate sx={{mt:1}} onSubmit={handleSubmit}>
                    <TextField
                        placeholder='Enter your email'
                        name="email"
                        type='email'
                        fullWidth
                        required
                        sx={{mb:2}}
                        //value={email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        placeholder='Enter your password'
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        sx={{mb:2}}
                        //value={password}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" >
                                    <IconButton
                                        onClick={() => setShowpassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>)
                            }}
                    />
                    <Button type='submit' variant='contained' fullWidth sx={{mt:1}}>Sign Up</Button>
                </Box>
            </Paper>
        </Container>
  )
}
