
import { Paper,Container, Avatar, Typography, Box, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import API from '../../../api/axios';
import { IRegister } from '../model/auth';
import { useNavigate } from 'react-router-dom';
import { validateEmail,validatePassword } from '../../../utils/validate';
import { toast } from 'react-toastify';


const INITIAL_STATE:IRegister ={ 
        email:"",
        firstname:"",
        password:"",
};
function Register(){
    const navigate = useNavigate();    
    /*const [form,setForm]=useState( {
        
    });*/
    //state
    const [registerState, setRegisterState] = useState<IRegister>(INITIAL_STATE);
    const[errors,setErrors] = useState<Partial<IRegister>>({});

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordHelperText,setConfirmpasswordHelperText] = useState('');

    //Validate Form
    const validateForm = useCallback(():boolean => {
        const newErrors: Partial<IRegister> = {};
        if(!validateEmail(registerState.email)){
            newErrors.email="Invalid email";
        }
        if(!validatePassword(registerState.password)){
            newErrors.password="Password must be at least 8 characters, with uppercase, numbers, and special characters";
        }
        if(registerState.password !== confirmPassword )
        {
            newErrors.password="Password not matching";      
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    },[registerState.email,registerState.password,confirmPassword] );


    //Password visibility
    const [showPassword,setShowpassword] = useState(false);
    const [showConfirmPass,setShowConfirmPassword] = useState(false);

    /**Error form */
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText,setEmailHelperText] = useState('');

    const [firstnameError, setFirstnameError] = useState(false);
    const [firstnameHelperText,setFirstnameHelperText] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText,setpasswordHelperText] = useState('');

    
    
    /**Hanlers** */

    /*const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({ ...form,[e.target.name]:e.target.value});
    }*/
    const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      if (name === "confirmPass") {
      setConfirmPassword(value);
    }else{              
        setRegisterState((prev) => ({ ...prev, [name]: value }));
    }
      
    },
    []
  );

    /*const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response = await API.post('auth/register',form);
            alert('Inscription réussi');
            console.log(response.data);
        }catch(err:any){   
            alert('Error: '+err.response?.data?.message || 'Probleme');            
        }
    }*/
   const handleSubmit = useCallback(
    async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!validateForm()){
            toast.error("Please fix the error in form");
            return;
        }
        try{
            const response = await API.post('auth/register',registerState);
            if(response){
                toast.success("Regisration successful !");
                navigate("/login");
                setErrors({});
            }else{
                throw new Error("Registration failed");
            }
            
        }
        catch(error){
                toast.error((error as Error).message);
        }

    },[validateForm,registerState,navigate]
   );
    return(
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
                        placeholder='Enter your firstname'
                        name="firstname"
                        type='text'
                        fullWidth
                        required
                        sx={{mb:2}}
                        //value={firstname}
                        onChange={handleInputChange}
                        error={firstnameError}
                        helperText={firstnameHelperText}
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
                    <TextField
                        placeholder='Confirm your password'
                        name="confirmPass"
                        type={showConfirmPass ? 'text' : 'password'}
                        fullWidth
                        required
                        sx={{mb:2}}
                        //value={confirmPassword}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" >
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPass)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showConfirmPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>)
                        }}          
                    />
                    <Button type='submit' variant='contained' fullWidth sx={{mt:1}}>Sign Up</Button>
                </Box>
            </Paper>
        </Container>     
    );
}
export default Register;