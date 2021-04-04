  
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TournamentCard from './TournamentCard';
import DatePicker from '@bit/nexxtway.react-rainbow.date-picker';
import  $ from 'jquery'
import { connectAdvanced } from 'react-redux';

// Remember to include timepicker.css
// If you can import CSS in JS:
function Tourney() {
    var d=new Date();
    const [Data,setData] = useState([]);
    const [remind,setremind]=useState(new Map());
    const [website,setwebsite]=useState("");
    const [tournament_type,settournament_type]=useState("");
    const [rebuy_status,setrebuy_status]=useState("");
    const [price_range,setprice_range]=useState("");
    const [late_registration,setlate_registration]=useState("");
    const [buy_in,setbuy_in]=useState("");
    const [date,setdate]=useState(`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`);
    const [starttime,setstarttime]=useState("");
    const [starttime2,setstarttime2]=useState("");
    const [starttime3,setstarttime3]=useState("");
     //  start time only filter till 12 am midnight 
    const [endtime,setendtime]=useState("23:59");
    const [endtime2,setendtime2]=useState("");
    const [endtime3,setendtime3]=useState("");
    //  end time only filter from 12 am midnight to the time selected. 
    const [criteria,setcriteria]=useState("");
    const [original,setoriginal]=useState([]);
    const [size,setSize]= useState([window.innerWidth]);

    useEffect(() => {
        const handleresize=()=>{
            setSize([window.innerWidth]);
        };
        $("#customSwitch0").prop("checked",true);
        window.addEventListener("resize",handleresize);
        const fetchData = async ()=>{
        try {
            let data=[];
            let m= new Map();
            const res = await axios.get(`https://pokerfilt.com/get/`);
            for(const dataobj of res.data){
                data.push(dataobj);
                m.set(dataobj.id,false);
            }
            var token=localStorage.getItem('access_token');
            setremind(m);
            axios
            .get('https://pokerfilt.com/user_info/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
              
                for(const dataobj of res.data.remarks){
                    m.set(dataobj.Tourney.id,true);
                }
                setremind(m);
                
            });
            setData(data);
            setoriginal(data);
        }
        catch(err){

        }
    }
    if (size < 576) {
        $('#filter').css('display','none')
        $("#cards").attr('class', 'col-12 ');
        $('#open').css('display','block');
        $("#cardmargin").css("marginTop","18vw");
        $("#heading2adjust").css("marginTop","20vw");
        $("#headingadjust").addClass("w-100");
        $("#heading2adjust").addClass("w-100");
      }
      if (size > 576) {
        $('#filter').css('display','block')
        $("#cards").attr('class', 'col-8 ');
        $('#open').css('display','none');
        $("#headingadjust").addClass("w-50");
        $("#heading2adjust").addClass("w-50");
      }

    fetchData();
    return ()=>{
        window.removeEventListener("resize",handleresize);
    };
  
    }, []);
    function Filter(){
       
        if (starttime.length!==0){
            
            $('#range').css('display','block');
            if(size>576)
            {
            $('#cardmargin').css('marginTop','6vw');
            $('#range').addClass('w-100');
            }
            if(size<576)
            {
                $('#range').css('marginTop','-7.8vw');
                $('#cardmargin').css('marginTop','33vw');
            }

        }
        setData([]);
        let newdata=[];
        for(const dataobj of original){
            if((website==="" || website===dataobj.website) && (tournament_type==="" || tournament_type===dataobj.tournament_type) && (buy_in==="" || buy_in===dataobj.buy_in)&&(starttime==="" || starttime<=dataobj.time)&&(endtime==="" || endtime>=dataobj.time) && (price_range==="" || price_range===dataobj.price_range) && (date===dataobj.date) ){
                newdata.push(dataobj);
            }
        }
        setData(newdata);
        var arr=starttime.split(':')
        var emin=starttime
        var smin=arr[0]-1
        var  smin3=smin+':'+arr[1]
        setstarttime2(smin3)
        setendtime2(emin)
        if (endtime!=="23:59"){
        var arr2=endtime.split(':')
        var smin2=Number(arr2[0])+1
        var  smin32=smin2+':'+arr2[1]
        setstarttime3(endtime)
        setendtime3(smin32)
        }
        if (endtime==="23:59"){
            setstarttime3("23:58")
            setendtime3("23:59")
            }
        if(criteria!="")
        {
            sortdataby();
        }

    }
    function sortdataby()
    {
        console.log(original);
        const datatochange=[...original];
        for(const i of datatochange)
        {
            i["total_prize"]=Number(i["total_prize"]);
            if(i["buy_in_price"]==null)
               i["buy_in_price"]=0;
            else
              i["buy_in_price"]=Number(i["buy_in_price"]);
        }
        if(criteria=="Total Prize Asc")
        {
            console.log("Ascending order running");
       datatochange.sort(function(a,b){
            if(a["total_prize"]>=b["total_prize"])
              return 1;
            if(a["total_prize"]<b["total_prize"])
              return -1;
            return 0;
        });
         } 
        else if(criteria=="Total Prize Dcs")
        {
            console.log("Descending order running");
       datatochange.sort(function(a,b){
            if(a["total_prize"]>=b["total_prize"])
              return -1;
            if(a["total_prize"]<b["total_prize"])
              return 1;
            return 0;
        });
        }
        else if(criteria=="Buy In Asc")
        {
            datatochange.sort(function(a,b){
                if(a["buy_in_price"]>=b["buy_in_price"])
                  return 1;
                if(a["buy_in_price"]<b["buy_in_price"])
                  return -1;
                return 0;
            });
            } 
            else if(criteria=="Buy In Dsc")
            {
                datatochange.sort(function(a,b){
                    if(a["buy_in_price"]>=b["buy_in_price"])
                      return -1;
                    if(a["buy_in_price"]<b["buy_in_price"])
                      return 1;
                    return 0;
                });
                } 
        setData(datatochange);
        
    }

    function Filter2(){ 
           let newdata2=[];
           for(const dataobj of original){
               if((website==="" || website===dataobj.website) && (tournament_type==="" || tournament_type===dataobj.tournament_type) && (buy_in==="" || buy_in===dataobj.buy_in)&&(starttime2==="" || starttime2<=dataobj.time)&&(endtime2==="" || endtime2>=dataobj.time) && (price_range==="" || price_range===dataobj.price_range) && ( date===dataobj.date) ){
                   newdata2.push(dataobj);
               }
           }
           setData(newdata2);
          
   
       }
       function Filter3(){ 
        let newdata3=[];
        for(const dataobj of original){
            if((website==="" || website===dataobj.website) && (tournament_type==="" || tournament_type===dataobj.tournament_type) && (buy_in==="" || buy_in===dataobj.buy_in)&&(starttime3==="" || starttime3<=dataobj.time)&&(endtime3==="" || endtime3>=dataobj.time) && (price_range==="" || price_range===dataobj.price_range) && ( date===dataobj.date) ){
                newdata3.push(dataobj);
            }
        }
        setData(newdata3);
       

    }
    function tou2(){
        var toure2 = document.getElementById(tour2);
        var blinde2 = document.getElementById(blind2);
        if (blinde2.style.display === "block") {
            blinde2.style.display = "none";
        }
        if (toure2.style.display === "none") {
            toure2.style.display = "block";
        }
    }
    function tou3(){
        var toure3 = document.getElementById(tour3);
        var blinde3 = document.getElementById(blind3);
        var toure4=document.getElementById(tour4);
        document.getElementById("btngame").style.backgroundColor="red";
        document.getElementById("btnmoney").style.backgroundColor="#008CBA";
        document.getElementById("btntime").style.backgroundColor="#008CBA";
        if (toure4.style.display === "block") {
            toure4.style.display = "none";
        }
        if (blinde3.style.display === "block") {
            blinde3.style.display = "none";
        }
        if (toure3.style.display === "none") {
            toure3.style.display = "block";
        }
    }
    function bli2(){
        var toure2 = document.getElementById(tour2);
        var blinde2 = document.getElementById(blind2);
        if (toure2.style.display === "block") {
            toure2.style.display = "none";
        }
        if (blinde2.style.display === "none") {
            blinde2.style.display = "block";
        }
    }
    function bli3(){
        var toure3 = document.getElementById(tour3);
        var blinde3 = document.getElementById(blind3);
        var toure4=document.getElementById(tour4);
        document.getElementById("btngame").style.backgroundColor="#008CBA";
        document.getElementById("btnmoney").style.backgroundColor="#008CBA";
        document.getElementById("btntime").style.backgroundColor="red";
        if (toure4.style.display === "block") {
            toure4.style.display = "none";
        }
        if (toure3.style.display === "block") {
            toure3.style.display = "none";
        }
        if (blinde3.style.display === "none") {
            blinde3.style.display = "block";
        }
    }
    function touri4(){
        var toure3 = document.getElementById(tour3);
        var blinde3 = document.getElementById(blind3);
        var toure4=document.getElementById(tour4);
        document.getElementById("btngame").style.backgroundColor="#008CBA";
        document.getElementById("btnmoney").style.backgroundColor="red";
        document.getElementById("btntime").style.backgroundColor="#008CBA";
        if (toure4.style.display === "none") {
            toure4.style.display = "block";
        }
        if (toure3.style.display === "block") {
            toure3.style.display = "none";
        }
        if (blinde3.style.display === "block") {
            blinde3.style.display = "none";
        }
    }
    const tour2="tour2";
    const blind2="blind2";
    const tour3="tour3";
    const blind3="blind3";
    const tour4="tour4";
    function Reset(){
        setData(original);
        setwebsite("");
        settournament_type("");
        setcriteria("");
        setprice_range("");
        $("#customSwitch0").prop("checked",true);
        setstarttime("");
        setstarttime2("");
        setstarttime3("");
        setendtime("");
        setendtime2("");
        setendtime3("");
        setdate(`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`);
        setrebuy_status("");
        $('#cardmargin').css('marginTop','25vw');
        $('#range').css('display','none');

    }
    return (
        <div className="container mt-5">
            <div className="row mt-5">
                <div className="col-4 mt-5" id="filter" style={{borderRadius:"25px"}}>
                    <div style={{position:"fixed"}}>
                    <h3 style={{color:"white"}}><b>FILTER</b></h3>
                    <div className="form-group">
                    <div class="row">
                        <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Website</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="website" value={website} onChange={e=>setwebsite(e.target.value)}>
                                  <option  >Select Website</option>
                                  <option value="Pokerbaazi" >Pokerbaazi</option>
                                  <option value="Adda52" >Adda52</option>
                                  <option value="9stacks" > 9stacks</option>
                                  <option value="Calling Station" >Calling Station</option>
                                  <option value="Poker Dangal" >Poker Dangal</option>
                                  <option value="Poker Saints" >Poker Saints</option>
                        </select>
                     </div>
                     <div className="col-md-6">
                     <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Game Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="rebuy_status" value={rebuy_status} onChange={e=>setrebuy_status(e.target.value)}>
                        <option  >Select</option>
                            <option value="RE">RE</option>
                            <option value="R+A">R+A</option>
                        </select>
                     </div>
                     </div>
                    </div>
                    <div className="form-group">
                    <div class="row">
                        <div className="col-md-6">
                        <label for="exampleInputEmail1" style={{color:"white"}}>Tournament-Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="tournament_type" value={tournament_type} onChange={e=>settournament_type(e.target.value)}>
                        <option  >Select</option>
                            <option value="NLH">NLH</option>
                            <option value="PLO">PLO</option>
                        </select>
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Price_Range</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="price_range" value={price_range} onChange={e=>setprice_range(e.target.value)}>
                        <option  >Select</option>
                            <option value="Below Rs 5k">Below Rs 5k</option>
                            <option value="Rs 5k to 30k">Rs 5k to 30k</option>
                            <option value="Rs 30k to 150k">Rs 30k to 150k</option>
                            <option value="Rs 150k to 750k">Rs 150k to 750k</option>
                            <option value="Rs 750k to 2M">Rs 750k to 2M</option>
                            <option value="Above 2M">Above 2M</option>
                        </select>
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Date</label>
                        <DatePicker
                        value={date}
                        minDate={d}
                        onChange={value => setdate(`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`)} />
                    </div>
                    <div className="form-group">
                        <div class="row">
                        <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Start Time</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="starttime" value={starttime}  onChange={e=>setstarttime(`${e.target.value}`)}>
                        <option>Select</option>
                            <option value="10:00">10:00</option>
                            <option value="10:15">10:15</option>
                            <option value="10:30">10:30</option>
                            <option value="10:45">10:45</option>
                            <option value="11:00">11:00</option>
                            <option value="11:15">11:15</option>
                            <option value="11:30">11:30</option>
                            <option value="11:45">11:45</option>
                            <option value="12:00">12:00</option>
                            <option value="12:15">12:15</option>
                            <option value="12:30">12:30</option>
                            <option value="12:45">12:45</option>
                            <option value="13:00">13:00</option>
                            <option value="13:15">13:15</option>
                            <option value="13:30">13:30</option>
                            <option value="13:45">13:45</option>
                            <option value="14:00">14:00</option>
                            <option value="14:15">14:15</option>
                            <option value="14:30">14:30</option>
                            <option value="14:45">14:45</option>
                            <option value="15:00">15:00</option>
                            <option value="15:15">15:15</option>
                            <option value="15:30">15:30</option>
                            <option value="15:45">15:45</option>
                            <option value="16:00">16:00</option>
                            <option value="16:15">16:00</option>
                            <option value="16:30">16:00</option>
                            <option value="16:45">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="17:15">17:15</option>
                            <option value="17:30">17:30</option>
                            <option value="17:45">17:45</option>
                            <option value="18:00">18:00</option>
                            <option value="18:15">18:15</option>
                            <option value="18:30">18:30</option>
                            <option value="18:45">18:45</option>
                            <option value="19:00">19:00</option>
                            <option value="19:15">19:15</option>
                            <option value="19:30">19:30</option>
                            <option value="19:45">19:45</option>
                            <option value="20:00">20:00</option>
                            <option value="20:15">20:15</option>
                            <option value="20:30">20:30</option>
                            <option value="20:45">20:45</option>
                            <option value="21:00">21:00</option>
                            <option value="21:15">21:15</option>
                            <option value="21:30">21:30</option>
                            <option value="21:45">21:45</option>
                            <option value="22:00">22:00</option>
                            <option value="22:15">22:15</option>
                            <option value="22:30">22:30</option>
                            <option value="22:45">22:45</option>
                            <option value="23:00">23:00</option>
                            <option value="23:15">23:15</option>
                            <option value="23:30">23:30</option>
                            <option value="23:45">23:45</option>
                            <option value="00:00">00:00</option>
                            <option value="00:15">00:15</option>
                            <option value="00:30">00:30</option>
                            <option value="00:45">00:45</option>
                            <option value="01:00">01:00</option>
                            <option value="01:15">01:15</option>
                            <option value="01:30">01:30</option>
                            <option value="01:45">01:45</option>
                            <option value="02:00">02:00</option>
                            <option value="02:15">02:15</option>
                            <option value="02:30">02:30</option>
                            <option value="02:45">02:45</option>
                            <option value="03:00">03:00</option>
                            <option value="03:15">03:15</option>
                            <option value="03:30">03:30</option>
                            <option value="03:45">03:45</option>
                            <option value="04:00">04:00</option>
                            <option value="04:15">04:15</option>
                            <option value="04:30">04:30</option>
                            <option value="04:45">04:45</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>End Time</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="starttime" value={endtime}  onChange={e=>setendtime(`${e.target.value}`)}>
                            <option value="23:59" selected>23:59</option>
                            <option value="10:00">10:00</option>
                            <option value="10:15">10:15</option>
                            <option value="10:30">10:30</option>
                            <option value="10:45">10:45</option>
                            <option value="11:00">11:00</option>
                            <option value="11:15">11:15</option>
                            <option value="11:30">11:30</option>
                            <option value="11:45">11:45</option>
                            <option value="12:00">12:00</option>
                            <option value="12:15">12:15</option>
                            <option value="12:30">12:30</option>
                            <option value="12:45">12:45</option>
                            <option value="13:00">13:00</option>
                            <option value="13:15">13:15</option>
                            <option value="13:30">13:30</option>
                            <option value="13:45">13:45</option>
                            <option value="14:00">14:00</option>
                            <option value="14:15">14:15</option>
                            <option value="14:30">14:30</option>
                            <option value="14:45">14:45</option>
                            <option value="15:00">15:00</option>
                            <option value="15:15">15:15</option>
                            <option value="15:30">15:30</option>
                            <option value="15:45">15:45</option>
                            <option value="16:00">16:00</option>
                            <option value="16:15">16:00</option>
                            <option value="16:30">16:00</option>
                            <option value="16:45">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="17:15">17:15</option>
                            <option value="17:30">17:30</option>
                            <option value="17:45">17:45</option>
                            <option value="18:00">18:00</option>
                            <option value="18:15">18:15</option>
                            <option value="18:30">18:30</option>
                            <option value="18:45">18:45</option>
                            <option value="19:00">19:00</option>
                            <option value="19:15">19:15</option>
                            <option value="19:30">19:30</option>
                            <option value="19:45">19:45</option>
                            <option value="20:00">20:00</option>
                            <option value="20:15">20:15</option>
                            <option value="20:30">20:30</option>
                            <option value="20:45">20:45</option>
                            <option value="21:00">21:00</option>
                            <option value="21:15">21:15</option>
                            <option value="21:30">21:30</option>
                            <option value="21:45">21:45</option>
                            <option value="22:00">22:00</option>
                            <option value="22:15">22:15</option>
                            <option value="22:30">22:30</option>
                            <option value="22:45">22:45</option>
                            <option value="23:00">23:00</option>
                            <option value="23:15">23:15</option>
                            <option value="23:30">23:30</option>
                            <option value="23:45">23:45</option>
                            <option value="00:00">00:00</option>
                            <option value="00:15">00:15</option>
                            <option value="00:30">00:30</option>
                            <option value="00:45">00:45</option>
                            <option value="01:00">01:00</option>
                            <option value="01:15">01:15</option>
                            <option value="01:30">01:30</option>
                            <option value="01:45">01:45</option>
                            <option value="02:00">02:00</option>
                            <option value="02:15">02:15</option>
                            <option value="02:30">02:30</option>
                            <option value="02:45">02:45</option>
                            <option value="03:00">03:00</option>
                            <option value="03:15">03:15</option>
                            <option value="03:30">03:30</option>
                            <option value="03:45">03:45</option>
                            <option value="04:00">04:00</option>
                            <option value="04:15">04:15</option>
                            <option value="04:30">04:30</option>
                            <option value="04:45">04:45</option>
                        </select>
                    </div>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Sort By</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="sort_by" value={criteria} onChange={e=>setcriteria(e.target.value)}>
                        <option  >Select</option>
                            <option value="" selected>Time</option>
                            <option value="Total Prize Asc">Total Prize Asc</option>
                            <option value="Total Prize Dcs">Total Prize Dcs</option>
                            <option value="Buy In Asc">Buy In Asc</option>
                            <option value="Buy In Dsc">Buy In Dsc</option>
                        </select>
                        
                    </div>
                    <button className="btn btn-success" onClick={Filter}>Submit</button>
                    <button className="btn btn-danger ml-2" onClick={Reset}>Reset</button>
                    </div>
                </div>
                <div className="col-8 mt-5" id="cards">
                    <div className="row mt-2" id="headingadjust" style={{backgroundColor:"gray",position:"fixed",zIndex:"999"}}>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3" >
                        <Link to="/" className="btn btn-warning btn block ">Tourney</Link>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                        <Link to="/Satellite" className="btn btn-primary btn block ">Satellites</Link>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                        <Link to="/freeroll" className="btn btn-primary btn block ml-1">FreeRoll</Link>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                        <Link to="/series" className="btn btn-primary btn block ml-1">Series</Link>
                        </div>
                    </div>
                    <div className="form-group mt-6" id="range" style={{display:'none',marginTop:"2.5vw"}}>
                    <div class="row" id="heading2adjust" style={{backgroundColor:"lightgray",position:"fixed",zIndex:"999"}}>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                        <p className="btn btn-warning" style={{marginBottom:"0"}} onClick={Filter2}>1hr pre</p>
                     </div>
                     <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                     <p className="btn btn-warning" style={{marginBottom:"0"}} onClick={Filter}>In Range</p>
                     </div>
                     <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                     <p className="btn btn-warning" style={{marginBottom:"0"}} onClick={Filter3}>1hr post</p>
                     </div>
                     </div>
                    </div>   
                    <div className="mt-6" id="cardmargin" style={{marginTop:"4vw"}}>
                    {
                        Data.map((item,i) => (
                            <TournamentCard  data={item} remind={remind}/>
                        ))
                    }
                    </div>
                    
                </div>
            </div>
            <div>
            <p class="open-button" id="open" onClick={() => { $("#myForm").css("display", "block")}}>
            <i class="fas fa-filter fa-lg" style={{color:"black"}}></i></p>
    
    <div class="chat-popup" id="myForm">
        <div  class="form-container" id='formg' name="google-sheet">
            <div className="form-row p-0 m-0">
                    <div className=" form-group col-lg-6 col-md-6 col-sm-6 col-6 p-0" >
                   <button className="btn btn-danger btn-block" onClick={tou2}>Filters</button> 
                    </div>
                    <div className=" form-group col-lg-6 col-md-6 col-sm-6 col-6 p-0" >
                    <button className="btn btn-info btn-block"  onClick={bli2}>Sort By</button> 
                    </div>
                </div>
                <div className="m-0 p-0" style={{display:"block"}}   id={tour2} >
                <div className="form-row" style={{marginTop:"-15px"}}>
                    <div className=" form-group col-lg-4 col-md-4 col-sm-4 col-4 p-0" >
                   <button className="button3css" style={{backgroundColor:"red"}} id="btngame" onClick={tou3}>Game</button> 
                    </div>
                    <div className=" form-group col-lg-4 col-md-4 col-sm-4 col-4 p-0" >
                    <button className="button3css" style={{backgroundColor:"#008CBA"}} id="btnmoney" onClick={touri4}>Money</button> 
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-sm-4 col-4 p-0" >
                    <button className="button3css" style={{backgroundColor:"#008CBA"}} id="btntime" onClick={bli3}>Time</button> 
                    </div>
                </div>
                <div style={{display:"block"}} id={tour3} >
             <div class="form-row">
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Website</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="website" value={website} onChange={e=>setwebsite(e.target.value)}>
                        <option  >Select Website</option>
                                  <option value="Pokerbaazi" >Pokerbaazi</option>
                                  <option value="Adda52" >Adda52</option>
                                  <option value="9stacks" > 9stacks</option>
                                  <option value="Calling Station" >Calling Station</option>
                                  <option value="Poker Dangal" >Poker Dangal</option>
                                  <option value="Poker Saints" >Poker Saints</option>
                        </select>
                     </div>
                     <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                     <label>Game Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="rebuy_status" value={rebuy_status} onChange={e=>setrebuy_status(e.target.value)}>
                        <option  >Select</option>
                            <option value="RE">RE</option>
                            <option value="R+A">R+A</option>
                        </select>
                     </div>
                     <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Tournament-Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="tournament_type" value={tournament_type} onChange={e=>settournament_type(e.target.value)}>
                        <option  >Select</option>
                            <option value="NLH">NLH</option>
                            <option value="PLO">PLO</option>
                        </select>
                        </div>
                 </div>
                        </div>
                        <div style={{display:"none"}} id={tour4} >
             <div class="form-row">
                        <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Buy In</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="buy_in" value={buy_in} onChange={e=>setbuy_in(e.target.value)}>
                        <option  >Select</option>
                                  <option value="Micro">Micro</option>
                                  <option value="Low">Low</option>
                                  <option value="Mid">Mid</option>
                                  <option value="High">High</option>
                                  <option value="Ticket">Ticket</option>
                        </select>
                     </div>
                     <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                     <label>Price Money</label>
                     <select className="form-control" id="exampleFormControlSelect1" name="price_range" value={price_range} onChange={e=>setprice_range(e.target.value)}>
                     <option  >Select</option>
                            <option value="Below Rs 5k">Below Rs 5k</option>
                            <option value="Rs 5k to 30k">Rs 5k to 30k</option>
                            <option value="Rs 30k to 150k">Rs 30k to 150k</option>
                            <option value="Rs 150k to 750k">Rs 150k to 750k</option>
                            <option value="Rs 750k to 2M">Rs 750k to 2M</option>
                            <option value="Above 2M">Above 2M</option>
                        </select>
                     </div>
                     <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12" style={{visibility:"hidden"}}>
                        <label>Tournament-Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="tournament_type" value={tournament_type} onChange={e=>settournament_type(e.target.value)}>
                        <option  >Select</option>
                            <option value="NLH">NLH</option>
                            <option value="PLO">PLO</option>
                        </select>
                        </div>
                 </div>
                        </div>
                 <div style={{display:"none"}} id={blind3} >
                        <div className="form-row">
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Date</label>
                        <DatePicker
                        value={date}
                        minDate={d}
                        onChange={value => 
                            setdate(`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`)} />
                    </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label htmlFor="exampleInputEmail1">Start Time</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="starttime" value={starttime}  onChange={e=>setstarttime(`${e.target.value}`)}>
                        <option>Select</option>
                            <option value="10:00">10:00</option>
                            <option value="10:15">10:15</option>
                            <option value="10:30">10:30</option>
                            <option value="10:45">10:45</option>
                            <option value="11:00">11:00</option>
                            <option value="11:15">11:15</option>
                            <option value="11:30">11:30</option>
                            <option value="11:45">11:45</option>
                            <option value="12:00">12:00</option>
                            <option value="12:15">12:15</option>
                            <option value="12:30">12:30</option>
                            <option value="12:45">12:45</option>
                            <option value="13:00">13:00</option>
                            <option value="13:15">13:15</option>
                            <option value="13:30">13:30</option>
                            <option value="13:45">13:45</option>
                            <option value="14:00">14:00</option>
                            <option value="14:15">14:15</option>
                            <option value="14:30">14:30</option>
                            <option value="14:45">14:45</option>
                            <option value="15:00">15:00</option>
                            <option value="15:15">15:15</option>
                            <option value="15:30">15:30</option>
                            <option value="15:45">15:45</option>
                            <option value="16:00">16:00</option>
                            <option value="16:15">16:00</option>
                            <option value="16:30">16:00</option>
                            <option value="16:45">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="17:15">17:15</option>
                            <option value="17:30">17:30</option>
                            <option value="17:45">17:45</option>
                            <option value="18:00">18:00</option>
                            <option value="18:15">18:15</option>
                            <option value="18:30">18:30</option>
                            <option value="18:45">18:45</option>
                            <option value="19:00">19:00</option>
                            <option value="19:15">19:15</option>
                            <option value="19:30">19:30</option>
                            <option value="19:45">19:45</option>
                            <option value="20:00">20:00</option>
                            <option value="20:15">20:15</option>
                            <option value="20:30">20:30</option>
                            <option value="20:45">20:45</option>
                            <option value="21:00">21:00</option>
                            <option value="21:15">21:15</option>
                            <option value="21:30">21:30</option>
                            <option value="21:45">21:45</option>
                            <option value="22:00">22:00</option>
                            <option value="22:15">22:15</option>
                            <option value="22:30">22:30</option>
                            <option value="22:45">22:45</option>
                            <option value="23:00">23:00</option>
                            <option value="23:15">23:15</option>
                            <option value="23:30">23:30</option>
                            <option value="23:45">23:45</option>
                            <option value="00:00">00:00</option>
                            <option value="00:15">00:15</option>
                            <option value="00:30">00:30</option>
                            <option value="00:45">00:45</option>
                            <option value="01:00">01:00</option>
                            <option value="01:15">01:15</option>
                            <option value="01:30">01:30</option>
                            <option value="01:45">01:45</option>
                            <option value="02:00">02:00</option>
                            <option value="02:15">02:15</option>
                            <option value="02:30">02:30</option>
                            <option value="02:45">02:45</option>
                            <option value="03:00">03:00</option>
                            <option value="03:15">03:15</option>
                            <option value="03:30">03:30</option>
                            <option value="03:45">03:45</option>
                            <option value="04:00">04:00</option>
                            <option value="04:15">04:15</option>
                            <option value="04:30">04:30</option>
                            <option value="04:45">04:45</option>
                        </select>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label htmlFor="exampleInputEmail1">End Time</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="starttime" value={endtime}  onChange={e=>setendtime(`${e.target.value}`)}>
                        <option value="23:59" selected>23:59</option>
                            <option value="10:00">10:00</option>
                            <option value="10:15">10:15</option>
                            <option value="10:30">10:30</option>
                            <option value="10:45">10:45</option>
                            <option value="11:00">11:00</option>
                            <option value="11:15">11:15</option>
                            <option value="11:30">11:30</option>
                            <option value="11:45">11:45</option>
                            <option value="12:00">12:00</option>
                            <option value="12:15">12:15</option>
                            <option value="12:30">12:30</option>
                            <option value="12:45">12:45</option>
                            <option value="13:00">13:00</option>
                            <option value="13:15">13:15</option>
                            <option value="13:30">13:30</option>
                            <option value="13:45">13:45</option>
                            <option value="14:00">14:00</option>
                            <option value="14:15">14:15</option>
                            <option value="14:30">14:30</option>
                            <option value="14:45">14:45</option>
                            <option value="15:00">15:00</option>
                            <option value="15:15">15:15</option>
                            <option value="15:30">15:30</option>
                            <option value="15:45">15:45</option>
                            <option value="16:00">16:00</option>
                            <option value="16:15">16:00</option>
                            <option value="16:30">16:00</option>
                            <option value="16:45">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="17:15">17:15</option>
                            <option value="17:30">17:30</option>
                            <option value="17:45">17:45</option>
                            <option value="18:00">18:00</option>
                            <option value="18:15">18:15</option>
                            <option value="18:30">18:30</option>
                            <option value="18:45">18:45</option>
                            <option value="19:00">19:00</option>
                            <option value="19:15">19:15</option>
                            <option value="19:30">19:30</option>
                            <option value="19:45">19:45</option>
                            <option value="20:00">20:00</option>
                            <option value="20:15">20:15</option>
                            <option value="20:30">20:30</option>
                            <option value="20:45">20:45</option>
                            <option value="21:00">21:00</option>
                            <option value="21:15">21:15</option>
                            <option value="21:30">21:30</option>
                            <option value="21:45">21:45</option>
                            <option value="22:00">22:00</option>
                            <option value="22:15">22:15</option>
                            <option value="22:30">22:30</option>
                            <option value="22:45">22:45</option>
                            <option value="23:00">23:00</option>
                            <option value="23:15">23:15</option>
                            <option value="23:30">23:30</option>
                            <option value="23:45">23:45</option>
                            <option value="00:00">00:00</option>
                            <option value="00:15">00:15</option>
                            <option value="00:30">00:30</option>
                            <option value="00:45">00:45</option>
                            <option value="01:00">01:00</option>
                            <option value="01:15">01:15</option>
                            <option value="01:30">01:30</option>
                            <option value="01:45">01:45</option>
                            <option value="02:00">02:00</option>
                            <option value="02:15">02:15</option>
                            <option value="02:30">02:30</option>
                            <option value="02:45">02:45</option>
                            <option value="03:00">03:00</option>
                            <option value="03:15">03:15</option>
                            <option value="03:30">03:30</option>
                            <option value="03:45">03:45</option>
                            <option value="04:00">04:00</option>
                            <option value="04:15">04:15</option>
                            <option value="04:30">04:30</option>
                            <option value="04:45">04:45</option>
                        </select>
                        </div>
                 </div>
                 </div>
                    </div>
                 <div style={{display:"none"}} id={blind2}>
              
                <div class="form-row">
                <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Sort By</label>
                        <div className="row">
                          <div className="col-6">
                            <p>Time</p>
                          </div>
                          <div className="col-6" style={{textAlign:"right"}}>
                           <div class="custom-control custom-switch">
                            <input type="radio" class="custom-control-input" id="customSwitch0" name="sort_by" value={criteria} onChange={()=>setcriteria("")}  />
                            <label class="custom-control-label" for="customSwitch0"></label>
                          </div>
                          </div>   
                      </div>
                      <div className="row" style={{marginTop:"-1rem"}}>
                      <div className="col-6">
                        <p>Buy In Asc</p>
                      </div>
                      <div className="col-6" style={{textAlign:"right"}}>                      
                          <div class="custom-control custom-switch">
                        <input type="radio" class="custom-control-input" id="customSwitch1" name="sort_by" value={criteria} onChange={()=>setcriteria("Buy In Asc")}/>
                   <label class="custom-control-label" for="customSwitch1"></label>
                       </div>
                      </div>
                      </div>
                      <div className="row" style={{marginTop:"-1rem"}}>
                      <div className="col-6">
                        <p>Buy In Dsc</p>
                      </div>
                      <div className="col-6" style={{textAlign:"right"}}> 
                   <div class="custom-control custom-switch">
                   <input type="radio" class="custom-control-input" id="customSwitch2" name="sort_by" value={criteria} onChange={()=>setcriteria("Buy In Dsc")}/>
                  <label class="custom-control-label" for="customSwitch2"></label>
                   </div>
                   </div>
                  </div>
                  <div className="row" style={{marginTop:"-1rem"}}>
                  <div className="col-6">
                    <p>Total Prize Asc</p>
                  </div>
                  <div className="col-6" style={{textAlign:"right"}}>  
                   <div class="custom-control custom-switch">
                  <input type="radio" class="custom-control-input" id="customSwitch3" name="sort_by" value={criteria} onChange={()=>setcriteria("Total Prize Asc")}/>
                  <label class="custom-control-label" for="customSwitch3"></label>
                   </div>
                   </div>
                   </div>
                   <div className="row" style={{marginTop:"-1rem"}}>
                   <div className="col-6">
                     <p>Total Prize Dsc</p>
                   </div>
                   <div className="col-6" style={{textAlign:"right"}}>
                    <div class="custom-control custom-switch">
                  <input type="radio" class="custom-control-input" id="customSwitch4" name="sort_by" value={criteria} onChange={()=>setcriteria("Total Prize Dcs")}/>
                  <label class="custom-control-label" for="customSwitch4"></label>
                    </div>
                    </div>
                    </div>
                     </div>
                     {/* <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12" style={{visibility:"hidden"}}>
                     <label>Game Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="rebuy_status" value={rebuy_status} onChange={e=>setrebuy_status(e.target.value)}>
                            <option value="RE">RE</option>
                            <option value="R+A">R+A</option>
                        </select>
                     </div> */}
                     <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12" style={{visibility:"hidden"}}>
                        <label>Tournament-Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="tournament_type" value={tournament_type} onChange={e=>settournament_type(e.target.value)}>
                            <option value="NLH">NLH</option>
                            <option value="PLO">PLO</option>
                        </select>
                        </div>
                 </div>
               
                 </div>
                 <div className="form-row">
                    <div className=" form-group col-lg-5 col-md-5 col-sm-5 col-5" >
                   <button className="btn btn-success btn-block" onClick={Filter}>Submit</button> 
                    </div>
                    <div className=" form-group col-lg-5 col-md-5 col-sm-5 col-5" >
                    <button className="btn btn-danger ml-2 btn-block" onClick={Reset}>Reset</button> 
                    </div>
                    <div className=" form-group col-lg-2 col-md-2 col-sm-2 col-2" >
                    <button className="btn btn-danger ml-2" onClick={() => { $("#myForm").css("display", "none")}}><i class="fa fa-times" style={{float:'right',cursor: 'pointer'}}></i></button> 
                    </div>
                    
                </div>
                   
                    
        </div>
      </div>
        </div>
        </div>
        
        
    );
}
export default Tourney;
