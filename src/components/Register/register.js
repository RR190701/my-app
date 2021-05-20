import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import axios from "axios";
import "./style.css";

const Register = ({history}) => {    
     
const [username, setUsername] =useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [address, setAddress] = useState("")
const [error, setError]=useState("")


const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }


const HandleSubmit = async(e) =>{
e.preventDefault();

if(password.trim() !== confirmPassword.trim()){

  setError("*passwords should match")
  return;
}
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      "/api/register",
      { username, email, password, address },
      config
    );
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userID", data.id);
    history.push(`/profile/${data.id}`);
  } catch (error) {
    popError(error.response.data.error);
    setTimeout(() => {
      setError("");
    }, 5000);
  }


}

    return ( 
        <div className ="register-div">
            <Paper className ="register-paper" elevation ={3}>
            <>
      
      <ToastContainer
      draggable ={false}
      autoClose={3000}
      ></ToastContainer>

      </>
                <h1 className="create-account">Create Account</h1>
    <form className ="register-form" onSubmit={HandleSubmit}>
<div className= "half-width-input">
<TextField 
className = "text-field"
      type="text"
      onChange = {(e) => {setUsername(e.target.value)}}
      label="Username" 
      value = {username}
      required
   variant="outlined" 
   size="small"/>

</div>
   <div className= "half-width-input">
   <TextField 
   className = "text-field"
   onChange = {(e) => {setEmail(e.target.value)}}
        type ="email" 
      label="Email" 
      value = {email}
      required
      variant="outlined"
      size="small" />
   </div>

<div className= "half-width-input">
<TextField  
className = "text-field"
    type="password"
      label="Password" 
      onChange = {(e) => {setPassword(e.target.value)}}
      value = {password}
      required
      variant="outlined" 
      size="small"/>

</div>

<div className= "half-width-input">
<TextField 
className = "text-field" 
    type="password"
      label="Confirm Password" 
      onChange = {(e) => {setConfirmPassword(e.target.value)}}
      value = {confirmPassword}
      required
      variant="outlined"
      size="small" />
      {error&&<span className ="password-match-error">{error}</span>}

</div>

<div className="full-width-input">
<TextField 

      label="Address" 
      className = "text-field"
      value = {address}
      onChange = {(e) => {setAddress(e.target.value)}}
      required
      variant="outlined"
      size="small" />

</div>
<div className ="register-button-div">
<Button 
className = "register-button"
type="submit"
onSubmit={HandleSubmit}
variant="contained">SIGN UP</Button>
</div>

      
                </form>
            </Paper>
           
        </div>
     );
}
 
export default Register;