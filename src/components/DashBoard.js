import React,{useState,useEffect} from 'react';
import TournamentCard from './TournamentCard';
import axios from 'axios';
import Day from './Day';
import DatePicker from '@bit/nexxtway.react-rainbow.date-picker';
function DashBoard() {
    var d=new Date();
    const [date,setdate]=useState(`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`);
    const [Data,setData] = useState([]);
    useEffect(() => {
        setData([])
        const fetchData = async ()=>{
        try {
            var token=localStorage.getItem('access_token');
            let data=[];
            axios
            .get('https://pokerfilt.com/user_info/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
              
                for(const dataobj of res.data.remarks){
                    console.log(date)
                    if(date===dataobj.Tourney.date){
                        var stime= dataobj.Tourney.time.split(':')
                        var time=Number(stime[0])+Number(stime[1]/60)
                        data.push( {start: `${time}`, title: `${dataobj.Tourney.name}(${dataobj.Tourney.website})`, end: `${dataobj.Tourney.time_end}`, description: '25 K GTD'})  
                }
                }
                setData(data);
                
            });
           
        }
        catch(err){

        }
    }
     
    fetchData();    
    }, [date]);
    return (
        <div>
            <div className="container mt-5">
                <div className="rainbow-p-vertical_large rainbow-p-horizontal_xx-large rainbow-m-horizontal_xx-large">
				    <DatePicker
                        value={date}
                        label="Select Date to see reminder"
                        minDate={d}
                        onChange={value => setdate(`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`)} />
			    </div>
                {Data.length ? <Day Data={Data}/> :  <h1 style={{color:'white'}}>No Remaider Set </h1>}
               
                
            </div>
        </div>
        
        
    );
}
export default DashBoard;
