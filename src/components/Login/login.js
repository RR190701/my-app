import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import { Link } from 'react-router-dom';

const Login = ({history}) => {    
    
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.TOP_RIGHT
    });
  }


const HandleSubmit = async(e) =>{
e.preventDefault();
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      "/api/login",
      { email, password },
      config
    );
    
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userID", data.id);
    history.push(`/profile/${data.id}`);
  } catch (error) {
    popError(error.response.data.error);
 
  }


}

    return ( 
        <div className ="login-div">
                      <>
      
      <ToastContainer
      draggable ={false}
      autoClose={3000}
      ></ToastContainer>

      </>
            <Paper className ="login-paper" elevation ={3}>
  
                <h1 className="login-heading">Sign In To Nemesis</h1>
                <Link to="/register" className ="link-to-signin">Don't have an account?</Link>
    <form className ="login-form" onSubmit={HandleSubmit}>

   <div className= "full-width-input">
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

<div className= "full-width-input">
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

<div className ="login-button-div">
<Button 
className = "login-button"
type="submit"
variant="contained">LOG IN</Button>
</div>

      
                </form>
            </Paper>
           
        </div>
     );
}
 
export default Login;