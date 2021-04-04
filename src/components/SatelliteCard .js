import React,{useEffect,useState} from 'react';
import axios from 'axios';
import TournamentCard from './TournamentCard';
import { v4 as uuidv4 } from 'uuid';
import { Accordion,Card,Button } from "react-bootstrap";

function playSound() {
    var sound = document.getElementById("audio");
    sound.play();
 }
function SatelliteCard({data,remind}) {
    const [taken,settaken] = useState(remind.get(data.id));
    const [data2, setdata] = useState([]);
    console.log(remind.get(data.id));
    console.log(data)
    const register = async ()=> {
        try{
            var token=localStorage.getItem('access_token');
            var url=`https://pokerfilt.com/create_remark/${data.id}/`
            axios
            .get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                console.log(res);
                settaken(true);
            });
        }
        catch (err){

        }
    }

    const deregister = async ()=> {
        try{
            var token=localStorage.getItem('access_token');
            var url=`https://pokerfilt.com/delete_Remark/${data.id}/`
            axios
            .get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                console.log(res);
                settaken(false);
            });
        }
        catch (err){

        }
    }
    const satty=async(u)=>{
            const fetchData = async ()=>{
                let slug=u;
            try {
                
                let data2=[];
                let m= new Map();
                const article = { slugy: `${slug}` };
                const res = await axios.post('https://pokerfilt.com/satty2/', article, {
                    headers: {
                    'Content-Type': 'application/json',
                },     
             });
                for(const dataobj of res.data){
                    data2.push(dataobj);
                    m.set(dataobj.id,false);
                }    
                console.log(data2)            
                setdata(data2)
            }
            catch(err){
    
            }
        }
    
        fetchData();
      
        }
    function sayHello() {
        var acc = document.getElementById(accordion);
        var ac = document.getElementById(l);
        var a = document.getElementById(g);
        acc.classList.toggle("active");
        ac.classList.toggle("active");
       
        if (acc.style.display === "block") {
        acc.style.display = "none";
        } else {
        acc.style.display = "block";
        }
        if (ac.style.display === "block") {
            ac.style.display = "none";
            } else {
            ac.style.display = "block";
        }

        if (a.style.display === "flex") {
            a.style.display = "none";
            } else {
            a.style.display = "flex";
        }

        
    
    }
    function tou(){
        var toure = document.getElementById(tour);
        var blinde = document.getElementById(blind);
        if (blinde.style.display === "block") {
            blinde.style.display = "none";
        }
        if (toure.style.display === "none") {
            toure.style.display = "block";
        }
    }
    function bli(){
        var toure = document.getElementById(tour);
        var blinde = document.getElementById(blind);
        if (toure.style.display === "block") {
            toure.style.display = "none";
        }
        if (blinde.style.display === "none") {
            blinde.style.display = "block";
        }
    }
    const accordion= uuidv4();
    const l= uuidv4();
    const g= uuidv4();
    const t= uuidv4();
    const tour=uuidv4();
    const blind=uuidv4();
    return (
        <div style={{marginBlockStart:"1rem",borderColor:"#0694"}}>
            
            <div className="accordion" onClick={sayHello} style={{paddingTop:"0px",borderTopRightRadius:"10px",borderTopLeftRadius:"10px",}}>
                <div className="row">
                    <div className="col-4" style={{backgroundColor:"#BE2026",color:"white",borderBottomRightRadius:"20px",borderTopLeftRadius:"10px"}}>
                        <p className="website mt-1" ><b>{data.website}</b></p>
                    </div>
                    <div className="col-8" style={{textAlign:"right"}}>
                        <p className="Date" ><span style={{marginRight:"1rem"}}>&#128197;{data.date2} </span><span >&#8986;{data.time}</span></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                    <p className="website" >{data.name}</p>
                    </div>
                    <div className="col-6" style={{textAlign:"right"}}>
                        <h5 className="Date" ><span style={{marginRight:"1rem"}} className="badge badge-success">{data.tournament_type} </span><span className="badge badge-warning">{data.rebuy_status}</span><span style={{marginRight:"1rem"}} className="badge badge-pill badge-info">{data.status}</span></h5>
                    </div>
                </div>
                <div className="row" id={g} style={{display:"flex"}}>
                    <div className="col-6">
                        <p className="website" ><p className="Date" ><span style={{marginRight:"2rem"}}><span style={{color:'gold'}}><b>&#8377;</b></span> {data.buy_in_price}</span><span >	&#127942;{data.total_prize}</span></p></p>
                    </div>
                    <div className="col-6" style={{textAlign:"right"}}>
                    <h3 className="Date" >
        {/* <span style={{marginRight:"1rem"}} className="badge badge-info">{data.status}</span> */}

        {!taken ?<span className="badge badge-info" onClick={() => { register(); playSound();}}>Reminder&#128276;</span>:<span className="badge badge-danger" onClick={deregister}>Reminded&#128276;</span>}</h3>
                    </div>
                </div>
            </div>
            <div className="panel container" id={accordion}>
                <div className="row">
                    <div className="col-6 btn btn-danger" onClick={tou}>
                        Tournament Info
                    </div>
                    <div className="col-6 btn btn-info" onClick={bli}>
                    Blind Structure
                    </div>
                </div>
                <div style={{display:"block"}} id={tour} >
                    <div className="row text-center"  >
                        <div className="col-6 ">
                            Late Reg
                        </div>
                        <div className="col-6">
                        {data.late_registration}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                            Starting Stack
                        </div>
                        <div className="col-6">
                        {data.starting_stack}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        Re-entry/Rebuy
                        </div>
                        <div className="col-6">
                        {data.rebuy}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        Add on
                        </div>
                        <div className="col-6">
                        {data.Addons}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        Table Capacity
                        </div>
                        <div className="col-6">
                        {data.table_capacity}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        Avg Duration
                        </div>
                        <div className="col-6">
                        {data.avg_duration} minutes
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        Additonal Info
                        </div>
                        <div className="col-6">
                        {data.add_info}
                        </div>
                    </div>
                </div>
                <div style={{display:"none"}} id={blind}>
                    <div className="row text-center"  >
                        <div className="col-6 ">
                            Blind Interval
                        </div>
                        <div className="col-6">
                        {data.blind_interval}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                            Blind After
                        </div>
                        <div className="col-6">
                        Blind
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        0 Min
                        </div>
                        <div className="col-6">
                        {data.blind_at_0min}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        30 Min
                        </div>
                        <div className="col-6">
                        {data.blind_at_30min}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                        60 Min
                        </div>
                        <div className="col-6">
                        {data.blind_at_60min}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                       90 Min
                        </div>
                        <div className="col-6">
                        {data.blind_at_90min}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 ">
                       Late Registration
                        </div>
                        <div className="col-6">
                        {data.blind_at_latereg}
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion" id={l} style={{display:"none"}}>
                <div className="row">
                    <div className="col-6">
                        <p className="website" ><p className="Date" ><span style={{marginRight:"2rem"}}>&#8377; {data.buy_in}</span><span >	&#127942;{data.total_prize}</span></p></p>
                    </div>
                    <div className="col-6" style={{textAlign:"right"}}>
                    <h3 className="Date" >
        {/* <span style={{marginRight:"1rem"}} className="badge badge-info">{data.status}</span> */}

        {!taken ?<span className="badge badge-info" onClick={() => { register(); playSound();}}>Reminder&#128276;</span>:<span className="badge badge-danger" onClick={deregister}>Reminded&#128276;</span>}</h3>
                    </div>
                </div>
            </div>
            <div className="accordion p-0" id={l} style={{borderBottomRightRadius:"10px",borderBottomLeftRadius:"10px",}}>
        
                    <Accordion style={{padding:'0'}}>
                    <Card>
          <Card.Header>
         <Accordion.Toggle as={Button} className="btn btn-secondary" variant="button" eventKey="0" onClick={() => { satty(data.parents[0].parent)}}>
          Satellite To
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      {
       data2.map((item,i) => (
                            <TournamentCard  data={item} remind={remind}/>
                        ))
                    }</Card.Body>
    </Accordion.Collapse>
  </Card></Accordion>
  <Accordion style={{padding:'0'}}>
                    <Card>
          <Card.Header>
          No of Satellites:<Accordion.Toggle as={Button} className="btn btn-secondary" variant="button" eventKey="0" onClick={() => { satty(data.parents[0].parent)}}>
          {data.sattellites.length} 
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      {
       data2.map((item,i) => (
                            <TournamentCard  data={item} remind={remind}/>
                        ))
                    }</Card.Body>
    </Accordion.Collapse>
  </Card></Accordion>
                    {/* <p className="website">No of Satellites:{data.sattellites.length}</p> */}
        
      </div>
        </div>
        
        
    );
}
export default SatelliteCard;
