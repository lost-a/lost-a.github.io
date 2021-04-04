import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import  $, { timers } from 'jquery'
import { Button } from 'bootstrap';
import Alert_off from "./alert_off.png";
import Alert_on from "./alert_on.png";
function TournamentCard({data,remind}) {
    const [taken,settaken] = useState(remind.get(data.id));
    const [timer,settimer] = useState("Loading...");
    const [timercolor,settimercolor]=useState("none");
   const [t,sett]=useState(true);
  
   useEffect(()=>{
       settaken(remind.get(data.id))
       if(data.tournament_type!="PLO")
       {
           sett(false);
        //    console.log(`The value of t is ${t}`);
       }
       if(!data.add_info)
       {
           document.getElementById(addinfocheck).style.display="none";
       }
       var date=data.date+' ' +data.time
       var countDownDate = date;
      
//        function time_convert(num)
//  { 
//   var hours = Math.floor(num / 60);  
//   var minutes = num % 60;
//   return hours + ":" + minutes;         
// }
// var end= data.date+' '+time_convert(data.avg_duration)
           var x = setInterval(function() {
               // Get today's date and time
               var now = new Date();

               var distance = Date.parse(countDownDate) - Date.parse(now);   
               // Time calculations for days, hours, minutes and seconds
               var days = Math.floor(distance / (1000 * 60 * 60 * 24));
               var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
               var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
               var seconds = Math.floor((distance % (1000 * 60)) / 1000);
               // Output the result in an element with id="demo"
               if (days<1 && hours <12){
              settimer("Starts in:"+hours + "h "+ minutes + "m ");
              settimercolor("badge bg-success");
             // document.getElementById("mytiming").style.fontSize="18px";
             // if(size<576)
               //  document.getElementById("mytiming").style.fontSize="12px";
               }
               else{
               settimer("Registering");
               settimercolor("badge bg-success");
               }
             if (days<0){
                   clearInterval(x);
                   settimer("Ended");
                   settimercolor("badge bg-secondary");
                    }
               if (days<0){
                   clearInterval(x);
                   settimer("Ended");
                   settimercolor("badge bg-secondary");
                    }
               // If the count down is over, write some text 
             }, 1000);
   },[remind.get(data.id)]) 
    const register = async ()=> {
        try{
            var token=localStorage.getItem('access_token');
            var url=`https://pokerfilt.com/create_remark/${data.id}/`
           await axios
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
            await  axios
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
    function sayHello() {
        var acc = document.getElementById(accordion);
        //var ac = document.getElementById(l);
        var a = document.getElementById(g);
        acc.classList.toggle("active");
        //ac.classList.toggle("active");
       
       if (acc.style.display === "block") {
        acc.style.display = "none";
        } else {
        acc.style.display = "block";
        }
       /* if (ac.style.display === "block") {
            ac.style.display = "none";
            } else {
            ac.style.display = "block";
        } */

       /* if (a.style.display === "flex") {
            a.style.display = "none";
            } else {
            a.style.display = "flex";
        } */

        
    
    }        
    function tou(){
        var toure = document.getElementById(tour);
        var blinde = document.getElementById(blind);
        var button1=document.getElementById(btn1);
        var button2=document.getElementById(btn2);
       
        if (blinde.style.display === "block") {
            blinde.style.display = "none";
        }
        if (toure.style.display === "none") {
            toure.style.display = "block";
            button1.style.backgroundColor="red";
            button2.style.backgroundColor="#03569e";
          
        }
    }
    function bli(){
        var toure = document.getElementById(tour);
        var blinde = document.getElementById(blind);
        var button1=document.getElementById(btn1);
        var button2=document.getElementById(btn2);
       
        if (toure.style.display === "block") {
            toure.style.display = "none";
           
        }
        if (blinde.style.display === "none") {
            blinde.style.display = "block";
            button2.style.backgroundColor="red";
        button1.style.backgroundColor="#03569e";
        }
    }
    const accordion= uuidv4();
    const l= uuidv4();
    const g= uuidv4();
    const tour=uuidv4();
    const blind=uuidv4();
    const btn1=uuidv4();
    const btn2=uuidv4();
    const timerset=uuidv4();
    const addinfocheck=uuidv4();

    return (
        <div style={{marginBlockStart:"1rem",borderColor:"#0694"}}>
            
        <div className="accordion" id={data.name} onClick={sayHello} style={{paddingTop:"0px",borderRadius:"10px"}}>
            <div className="row" style={{backgroundColor:"#dadee6"}}>
                <div className="col-6" id="cardheadingheight"  style={{backgroundColor:"#BE2026",color:"white",borderBottomRightRadius:"20px",borderTopLeftRadius:"10px"}}>
                    <p className="website mt-1" id="cardheadingheight"><b>{data.website}</b></p>
                </div>
                <div className="col-4" id="cardheadingheight" style={{backgroundColor:"#dadee6",textAlign:"right"}}>
                    <p className="Date font-weight-bold mt-1" id="cardheadingheight" ><span>{data.date2} </span></p>
                </div>
                <div className="col-2" id="cardheadingheight" style={{backgroundColor:"#dadee6",textAlign:"right"}}>
                <p className="Date font-weight-bold mt-1" ><span>{data.time}</span></p>
                 </div>
            </div>
           
            <div className="row" >
                <div className="col-6">
                <p className="website font-weight-bold mt-2" >{data.name}</p>
                </div>
                <div className="col-6" style={{textAlign:"right"}}>
                    <h5 className="Date" ><span className="badge badge-warning" style={{marginRight:"1rem"}}>{data.rebuy_status}</span>&nbsp;
                  {!t? <span  className="badge badge-info">{data.tournament_type} </span>:<span  className="badge badge-warning">{data.tournament_type} </span> }
                    <span className="badge badge-pill badge-info">{data.status}</span></h5>
                </div>
            </div>
            <div className="row" id={g} style={{display:"flex",marginBottom:"-2rem",marginTop:"-1rem"}}>
                <div className="col-4">
                    <p className="website" ><p className="Date" ><span className="font-weight-bold" style={{marginRight:"2rem"}}><span style={{color:'gold'}}><b>&#8377;</b></span> {data.buy_in_price}</span>
                    <br/><span className="font-weight-bold" >	&#127942;{data.total_prize}</span></p></p>
                 {/* hello */}
                </div>
                <div className="col-5" style={{textAlign:"right"}}>
                <h5 className="Date" id={timerset}>
    {/* <span style={{marginRight:"1rem"}} className="badge badge-info">{data.status}</span> */}
           
          <span className={timercolor} style={{color:'white'}}>{timer}</span></h5>
             </div>
           <div className="col-3">
         <h3 style={{textAlign:"right"}}> {!taken ?<span style={{backgroundColor:"none",border:"3px solid black",borderRadius:"5px"}} onClick={() => { register();}}><img src={Alert_off} /></span>:<span  style={{backgroundColor:"none",border:"1px solid black"}}  onClick={deregister}><img src={Alert_on} /></span>}</h3>
                </div>
            </div>
        </div>
       
        
        <div className="panel container" id={accordion}>
        <div className="row">
            <div className="col-6 buttoncss" id={btn1} style={{backgroundColor:"red"}} onClick={tou}>
                Tournament Info
            </div>
            <div className="col-6 button2css" id={btn2} style={{backgroundColor:"#03569e"}} onClick={bli}>
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
            <div className="row text-center" id={addinfocheck} style={{display:"block"}}>
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
                <div className="col-6 font-weight-bold " style={{backgroundColor:"#d5e0d8"}}>
                    Blind After
                </div>
                <div className="col-6 font-weight-bold" style={{backgroundColor:"#d5e0d8"}}>
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
    </div>
    
        
        
    );
}

export default TournamentCard;
