import React,{useEffect,useState} from 'react';
import axios from 'axios';

function Day({Data}) {
    console.log(Data)
	if(Data.length===1){
		Data.push({start: "23:59", title: "..", end: "24:00", description: ".."})
	}
    useEffect(() => {
    window. $(function () {
		window.$('#timelineClock').timespace({
			
			// Set the time suffix function for displaying as '12 A.M.'
			timeSuffixFunction: s => ' ' + s[0].toUpperCase() + '.' + s[1].toUpperCase() + '.',
			selectedEvent: -1,
			data: {
				headings: [
					{start: 0, end: 6, title: 'Night'},
					{start: 6, end: 12, title: 'Morning'},
					{start: 12, end: 18, title: 'Afternoon'},
					{start: 18, end: 24, title: 'Evening'},
				],
                
				events: Data
			},
			
		});
		
	})}); 
   
    return (
        <div> 
        <div id="timelineClock" ></div>
        </div>
    );
}
export default Day;
