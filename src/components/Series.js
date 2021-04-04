import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SatelliteCard from './SatelliteCard ';
import DatePicker from '@bit/nexxtway.react-rainbow.date-picker';
import  $ from 'jquery'

// Remember to include timepicker.css
// If you can import CSS in JS:
function Series() {
    var d=new Date();
    const [Data,setData] = useState([]);
    const [remind,setremind]=useState(new Map());
    const [website,setwebsite]=useState("");
    const [tournament_type,settournament_type]=useState("");
    const [rebuy_status,setrebuy_status]=useState("");
    const [price_range,setprice_range]=useState("");
    const [late_registration,setlate_registration]=useState("");
    const [buy_in,setbuy_in]=useState("");
    const [date,setdate]=useState(`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`);
    const [starttime,setstarttime]=useState("");
    const [endtime,setendtime]=useState("");
    const [criteria,setcriteria]=useState("");
    const [original,setoriginal]=useState([]);
    const [size,setSize]= useState([window.innerWidth]);

    useEffect(() => {
        const handleresize=()=>{
            setSize([window.innerWidth]);
        };
        window.addEventListener("resize",handleresize);
        const fetchData = async ()=>{
        try {
            let data=[];
            let m= new Map();
            const res = await axios.get(`https://pokerfilt.com/get_all/Series/`);
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
      }
      if (size > 576) {
        $('#filter').css('display','block')
        $("#cards").attr('class', 'col-8 ');
        $('#open').css('display','none');
      }


    fetchData();
    return ()=>{
        window.removeEventListener("resize",handleresize);
    };
  
    }, [size]);
    console.log(original);
    function Filter(){
        var newdata=[];
        for(const dataobj of original){
            if((website==="" || website===dataobj.website) && (tournament_type==="" || tournament_type===dataobj.tournament_type) && (buy_in==="" || buy_in===dataobj.buy_in) && (price_range==="" || price_range===dataobj.price_range) && (date===`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}` || date===dataobj.date) ){
                newdata.push(dataobj);
            }
        }
        setData(newdata);
       

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
        setData(original)
        setwebsite("");
        settournament_type("");
        setcriteria("");
        setprice_range("");
        setstarttime("");
        setendtime("");
        setrebuy_status("");

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
                            <option value="Pocket52">Pocket52</option>
                            <option value="CallingStation">Calling Status</option>
                        </select>
                     </div>
                     <div className="col-md-6">
                     <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Game Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="rebuy_status" value={rebuy_status} onChange={e=>setrebuy_status(e.target.value)}>
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
                            <option value="NLH">NLH</option>
                            <option value="PLO">PLO</option>
                        </select>
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Price_Range</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="price_range" value={price_range} onChange={e=>setprice_range(e.target.value)}>
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
                        onChange={value => setdate(`${value.getMonth()+1}/${value.getDate()}/${value.getFullYear()}`)} />
                    </div>
                    <div className="form-group">
                        <div class="row">
                        <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Start Time</label>
                        <input className="form-control" id="exampleFormControlSelect1" type="time"  onChange={e=>setstarttime(`${e.target.value}`)}></input>
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>End Time</label>
                        <input className="form-control" id="exampleFormControlSelect1" type="time" onChange={e=>setendtime(`${e.target.value}`)} ></input>
                        </div>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Sort By</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="sort_by" value={criteria} onChange={e=>setcriteria(e.target.value)}>
                            <option value="Total Prize">Total Prize</option>
                            <option value="Buy In">Buy In</option>
                        </select>
                        
                    </div>
                    <button className="btn btn-success" onClick={Filter}>Submit</button>
                    <button className="btn btn-danger ml-2" onClick={Reset}>Reset</button>
                    </div>
                </div>
                <div className="col-8 mt-5" id="cards">
                <div className="row mt-5">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                        <Link to="/" className="btn btn-primary btn block ">Tourney</Link>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                        <Link to="/Satellite" className="btn btn-primary btn block ">Satellites</Link>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                        <Link to="/freeroll" className="btn btn-primary btn block ml-1">FreeRoll</Link>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                        <Link to="/series" className="btn btn-warning btn block ml-1">Series</Link>
                        </div>
                    </div>
                   
                    <div className="mt-5">
                    {
                        Data.map((item,i) => (
                            <SatelliteCard  data={item} remind={remind}/>
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
            <div className="form-row p-0">
                    <div className=" form-group col-lg-6 col-md-6 col-sm-6 col-6 p-0" >
                   <button className="btn btn-danger btn-block" onClick={tou2}>Filters</button> 
                    </div>
                    <div className=" form-group col-lg-6 col-md-6 col-sm-6 col-6 p-0" >
                    <button className="btn btn-info btn-block" onClick={bli2}>Sort By</button> 
                    </div>
                </div>
                <div className="m-0 p-0 d-block"  id={tour2} >
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
                        <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Website</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="website" value={website} onChange={e=>setwebsite(e.target.value)}>
                            <option value="Pocket52">Pocket52</option>
                            <option value="CallingStation">Calling Status</option>
                        </select>
                     </div>
                     <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                     <label>Game Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="rebuy_status" value={rebuy_status} onChange={e=>setrebuy_status(e.target.value)}>
                            <option value="RE">RE</option>
                            <option value="R+A">R+A</option>
                        </select>
                     </div>
                     <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Tournament-Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="tournament_type" value={tournament_type} onChange={e=>settournament_type(e.target.value)}>
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
                        <select className="form-control" id="exampleFormControlSelect1"  name="website" value={website} onChange={e=>setwebsite(e.target.value)}>
                            <option value="Pocket52">Pocket52</option>
                            <option value="CallingStation">Calling Status</option>
                        </select>
                     </div>
                     <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                     <label>Price Money</label>
                     <select className="form-control" id="exampleFormControlSelect1" name="price_range" value={price_range} onChange={e=>setprice_range(e.target.value)}>
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
                        onChange={value => setdate(`${value.getMonth()+1}/${value.getDate()}/${value.getFullYear()}`)} />
                    </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Start Time</label>
                        <input className="form-control" id="exampleFormControlSelect1" type="time"  onChange={e=>setstarttime(`${e.target.value}`)}></input>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>End Time</label>
                        <input className="form-control" id="exampleFormControlSelect1" type="time" onChange={e=>setendtime(`${e.target.value}`)} ></input>
                        </div>
                 </div>
                 </div>
                    </div>
                 <div style={{display:"none"}} id={blind2}>
              
                <div class="form-row">
                        <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <label>Sort By</label>
    <div class="custom-control custom-switch">
  <input type="radio" class="custom-control-input" id="customSwitch1" name="sort_by" value={criteria} onChange={e=>setcriteria(e.target.value)}/>
  <label class="custom-control-label" for="customSwitch1">Buy In Asc</label>
</div>
<div class="custom-control custom-switch">
  <input type="radio" class="custom-control-input" id="customSwitch2" name="sort_by" value={criteria} onChange={e=>setcriteria(e.target.value)}/>
  <label class="custom-control-label" for="customSwitch2">Buy In Desc</label>
</div>
<div class="custom-control custom-switch">
  <input type="radio" class="custom-control-input" id="customSwitch3" name="sort_by" value={criteria} onChange={e=>setcriteria(e.target.value)}/>
  <label class="custom-control-label" for="customSwitch3">Price Asc</label>
</div>
<div class="custom-control custom-switch">
  <input type="radio" class="custom-control-input" id="customSwitch4" name="sort_by" value={criteria} onChange={e=>setcriteria(e.target.value)}/>
  <label class="custom-control-label" for="customSwitch4">Price Desc</label>
</div>
                     </div>
                     <div className=" form-group col-lg-12 col-md-12 col-sm-12 col-12" style={{visibility:"hidden"}}>
                     <label>Game Type</label>
                        <select className="form-control" id="exampleFormControlSelect1"  name="rebuy_status" value={rebuy_status} onChange={e=>setrebuy_status(e.target.value)}>
                            <option value="RE">RE</option>
                            <option value="R+A">R+A</option>
                        </select>
                     </div>
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
export default Series;
