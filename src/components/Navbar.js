import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { Navbar,Nav } from "react-bootstrap";
import axios from 'axios';
import $ from 'jquery';
function Navbaar({sign, setsign}) {
    // const [name] = useState(localStorage.getItem('name'));
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const responseGoogle = async (response) => {
      setsign(true);
      const facebookLogin =  
       await axios
          .post('https://pokerfilt.com/auth/convert-token', {
            token: response.accessToken,
            backend: 'google-oauth2',
            grant_type: 'convert_token',
            client_id: '979827163971-gomdk1v7aiekl8kdlcrre8r778de2vsr.apps.googleusercontent.com',
            client_secret:
              'rk5KuEWOlg6JP2N21NGZC1vF',
          })
          .then((res) => {
            console.log(res)
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            setemail(response.profileObj.email);
            setname(response.profileObj.name)
          });
        // setname(response.profileObj.givenName);
        console.log(response.profileObj);

        // localStorage.setItem('name',response.profileObj.givenName)
    };
  
    function logout(){
        setsign(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
    }
    function showmodel(){
      $("#examplemodel").slideDown("slow");
    }
    function closemodel(){
      $("#examplemodel").slideUp("slow");
    }
    var imageName = require('./main.png');
    return (
        <div>
<Navbar bg="light" expand="lg" fixed="top">
  <Navbar.Brand  ><img src={imageName.default} style={{width:"30px",height:"30px",color:"white"}} className="d-inline-block align-top"/> FILTPOKER</Navbar.Brand>
   <Link className="navlink" to= "/"><i class="fas fa-home"></i></Link>
  {!sign ?   <Nav.Link to="/user-info/"></Nav.Link> : <Nav.Link><i class="fas fa-user" onClick={showmodel}></i></Nav.Link>}
      {!sign ?   <Link to="/user-info/"></Link> : <Link className="navlink" to= "/user-info/"><i class="fas fa-bell"></i></Link>}
      {!sign ?                     
                        <GoogleLogin
                                clientId="979827163971-gomdk1v7aiekl8kdlcrre8r778de2vsr.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />

                       :  <Nav.Link onClick={logout} ><i class="fas fa-sign-out-alt"></i>
                        </Nav.Link>
                         }

</Navbar>
<div class="modal" tabindex="-1" id="examplemodel">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Your details </h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={closemodel}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>First Name:{name}</p>
      <p>Family Name:</p>
      <p>Email Id:{email}</p>
      <input type="text" placeholder="Enter contact details"   />
    </div>
    <div class="modal-footer">
      <button type="button" className="btn btn-primary" onClick={closemodel}>Submit</button>
    </div>
  </div>
</div>
</div>
        </div>
        
        
    );
}
export default Navbaar;
