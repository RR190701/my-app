import React ,{useState, useEffect} from 'react';
import axios from "axios";
import ProfileCredentials from './../profileCredentials/ProfileCredentials';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Modal from '@material-ui/core/Modal';
import "./style.css"

const Profile = ({history,match}) => {


  const [_id,setID]=useState("")
  const [account, setAccount] = useState({
    email:"",
    username:"",
    address:""
  })


  const [updatingfeild, setUpdatingFeild] = useState("")
  const [newValue, setNewValue] = useState("")

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 48 + rand();
    const left = 51 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  //modal variables
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
    
const feildUpdator =(e)=>{
  setNewValue(e.target.value)
  
}  

const popSuccess = (Message) => {

  toast.success(Message, {
    className :"success-toast",
    position:toast.POSITION.TOP_RIGHT
  });
}

const popError = (errorMessage) => {

  toast.error(errorMessage, {
    className :"error-toast",
    position:toast.POSITION.TOP_RIGHT
  });
}


  const updateHandler =async(e)=>{
    e.preventDefault();

    const obj ={...account,[updatingfeild]:newValue}
  

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
  
      try {
  
        const { data } = await axios.put("/api/updateProfile",{feild:updatingfeild, _id, value:newValue}, config);
        popSuccess(data.data);
  
  
  
      } catch (error) {
        popError(error.response.data.error)
  
      }
    
    setAccount(obj);
    setOpen(false);
    setNewValue("");

  }

  const body = (
  <Paper elevation={3} style={modalStyle} className="modal-paper">
    <form onSubmit={updateHandler}>
    <div className="modal-haeding">
    Enter new {updatingfeild} :
    </div>
    <div className="modal-input-div">

<TextField id="outlined-basic" 
type={(updatingfeild=="email")?"email":"text"}
label={`new ${updatingfeild}`} variant="outlined"
required
className="modal-input" 
value={newValue}
onChange={(e)=>feildUpdator(e)}
size="small"

/>
    </div>
    <div style={{textAlign:"right"}}>
    <Button variant="contained" onClick={()=>setOpen(false)} style={{marginRight:".5rem"}}>Cancel</Button>
<Button type= "submit" variant="contained" 
color="primary">
  Save
</Button>
</div>
    </form>    
  </Paper>)



useEffect(() => {
        if (!localStorage.getItem("authToken")) {
          history.push("/log-in");
        }
    
        const fetchPrivateData = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          
          
    
          try {

            const { data } = await axios.get(`/api/profile/${match.params.id}`, config);
           
            const obj ={...data.user}
            setAccount(obj);
            setID(data.user._id);


          } catch (error) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userID");
         }
        };
        fetchPrivateData();
      }, [history]);


      const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userID");
        history.push("/log-in");
      };

  
  const deleteDetail = async(feild) =>{

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    
    

    try {
      const { data } = await axios.put("/api/deleteFeild",{feild,_id} ,config);
      const obj ={...account,[feild]:""}
      setAccount(obj)
      popSuccess(data.data);
    } catch (error) {
  popError(error.response.data.error)
   }

      }

  const deleteHandler =({feild})=>{
deleteDetail(feild);
      }

const editHandler =({feild})=>{
setUpdatingFeild(feild);
setOpen(true);

  } 


    return ( 
      <div className ="profile-container">
            <>
      
      <ToastContainer
      draggable ={false}
      autoClose={3000}
      ></ToastContainer>

      </>
<Paper className="profile-div">
          <div className ="logout-div">
             <h1>Profile</h1>
             <div>
             <Button className="logout-buttton" variant="contained" color="secondary"
             onClick={logoutHandler}>
  Log Out
</Button>
             </div>
           
          </div>
      
          {(account.username)?          
          <ProfileCredentials
          feild = "username"
          data = {account.username}
          onDelete = {deleteHandler}
          onEdit ={editHandler}
          >
          </ProfileCredentials>:""}
          {(account.address)?          
            <ProfileCredentials
            feild = "address"
            data = {account.address}
            onDelete = {deleteHandler}
            onEdit ={editHandler}>
              </ProfileCredentials>:""}

          {(account.email)?          
<ProfileCredentials
feild = "email"
data = {account.email}
onDelete = {deleteHandler}
onEdit ={editHandler}>
  </ProfileCredentials>:""}



                    {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
        </Paper>
      </div>
        
     );
}
 
export default Profile;