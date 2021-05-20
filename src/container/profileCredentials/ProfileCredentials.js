import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import "./style.css";

const ProfileCredentials = ({feild, data, onEdit, onDelete}) => {
    return (<div className ="profile-data" >
        <div style={{display:"flex"}}>
        <div className ="user-feild">
            {feild}
        </div>
        <div className="user-data">
            {data}
        </div>
            
        </div>

        <div>
        <Tooltip title="Edit">
             <IconButton aria-label="delete" 
             onClick={()=>onEdit({feild})}
             color="default">
        < EditIcon  />
      </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
      <IconButton aria-label="delete" 
       onClick={()=>onDelete({feild})}
       color="secondary">
        <DeleteIcon />
      </IconButton>
      </Tooltip>
        </div>

    </div>  );
}
 
export default ProfileCredentials;