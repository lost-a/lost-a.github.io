import React, { useState } from 'react';
import axios from 'axios';
import "./form.css"
import "react-datepicker/dist/react-datepicker.css";
class Form extends React.Component {

    constructor () {
        super();
        this.state= {
            name:"Rishabh",
            website:"",
            tournament_type:"",
            rebuy_status:"",
            total_prize:"",
            buy_in:"",
            date:new Date(),
            time:'00:00',
            status:"",
            late_registration:"",
            starting_stack:"",
            rebuy:"",
            Addons:"",
            table_capacity:"",
            avg_duration:"",
            add_info:"",
            rating:"",
            blind_interval:"",
            blind_at_0min:"",
            blind_at_30min:"",
            blind_at_60min:"",
            blind_at_90min:"",
            blind_at_latereg:"",
            types:"",
            price_range:"",
    
        };
    }

   
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { name, website,tournament_type,rebuy_status,total_prize,buy_in,date,time,status,late_registration,starting_stack,rebuy,Addons
            ,table_capacity
        ,avg_duration,add_info,rating,blind_interval,blind_at_0min,blind_at_30min,blind_at_60min,blind_at_90min,blind_at_latereg,types,price_range} = this.state;
        axios.post('https://universalsnm.com/create_tourney/',{
            name:name,
            website:website,
            tournament_type:tournament_type,
            rebuy_status:rebuy_status,
            total_prize:total_prize,
            date:date,
            time:time,
            avg_duration:avg_duration,
            rating:rating,
            buy_in:buy_in,
            status:status,
            late_registration:late_registration,
            starting_stack:starting_stack,
            rebuy:rebuy,
            Addons:Addons,
            table_capacity:table_capacity,
            add_info:add_info,
            blind_interval:blind_interval,
            blind_at_0min:blind_at_0min,
            blind_at_30min:blind_at_30min,
            blind_at_60min:blind_at_60min,
            blind_at_90min:blind_at_90min,
            blind_at_latereg:blind_at_latereg,
            types:types,
            price_range:price_range,
        }).
        then((result)=>{console.log(result)});

    }
    render(){
        const { name, website,tournament_type,rebuy_status,total_prize,buy_in,date,time,status,late_registration,starting_stack,rebuy,Addons
            ,table_capacity
        ,avg_duration,add_info,rating,blind_interval,blind_at_0min,blind_at_30min,blind_at_60min,blind_at_90min,blind_at_latereg,types,price_range} = this.state;
        return (
            <div className="container">
                <h1>Tourney Details</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row mt-3">
                    <div className="form-group col-md-3 mb-0">
                        <label >Name</label>
                        <input type="text" className="form-control"  name="name" value={name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Website</label>
                        <select class="form-control" id="exampleFormControlSelect1"  name="website" value={website} onChange={this.onChange}>
                                      <option value="Pokerbaazi" >Pokerbaazi</option>
                                      <option value="Adda52" >Adda52</option>
                                      <option value="9stacks" > 9stacks</option>
                                      <option value="Calling Station" >Calling Station</option>
                                      <option value="Poker Dangal" >Poker Dangal</option>
                                      <option value="Poker Saints" >Poker Saints</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Date</label>
                        <input type="date" className="form-control"  name="date" value={date} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label>Time</label>
                        <input type="time" className="form-control"  name="time" value={time} onChange={this.onChange}/>
                    </div>
                    </div>
                    <div className="form-row mt-3">
                    <div className="form-group col-md-3 mb-0">
                        <label >Tournament-Type</label>
                        <select class="form-control" id="exampleFormControlSelect1"  name="tournament_type" value={tournament_type} onChange={this.onChange}>
                            <option value="NLH">NLH</option>
                            <option value="PLO">PLO</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Rebuy Status</label>
                        <select class="form-control" id="exampleFormControlSelect1"  name="rebuy_status" value={rebuy_status} onChange={this.onChange}>
                            <option value="RE">RE</option>
                            <option value="R+A">R+A</option>
                        </select>
                     
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Total Prize</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="total_prize" value={total_prize} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Rating</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="rating" value={rating} onChange={this.onChange}/>
                    </div>
                    </div>
                    <div className="form-row mt-3">
                    <div className="form-group col-md-3 mb-0">
                        <label >Average Duration</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="avg_duration" value={avg_duration} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Buy-in</label>
                        <select class="form-control" id="exampleFormControlSelect1"  name="buy_in" value={buy_in} onChange={this.onChange}>
                            <option value="Macro">Macro</option>
                            <option value="Low">Low</option>
                            <option value="Mid">Mid</option>
                            <option value="High">High</option>
                        </select>
                       
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >late_registration</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="late_registration" value={late_registration} onChange={this.onChange}/>
                    </div>

                    <div className="form-group col-md-3 mb-0">
                        <label >starting_stack</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="starting_stack" value={starting_stack} onChange={this.onChange}/>
                    </div>
                    </div>
                    <div className="form-row ">
                    <div className="form-group col-md-3 mb-0">
                        <label >rebuy</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="rebuy" value={rebuy} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Addons</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="Addons" value={Addons} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >table_capacity</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="table_capacity" value={table_capacity} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Additonal Info</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="add_info" value={add_info} onChange={this.onChange}/>
                    </div>
                    </div>
                    <div className="form-row mt-3">
                    <div className="form-group col-md-3 mb-0">
                        <label >Blind Interval</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="blind_interval" value={blind_interval} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >blind_at_0min</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="blind_at_0min" value={blind_at_0min} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >blind_at_30min</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="blind_at_30min" value={blind_at_30min} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >blind_at_60min</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="blind_at_60min" value={blind_at_60min} onChange={this.onChange}/>
                    </div>
                    </div>
                    <div className="form-row mt-3">
                    <div className="form-group col-md-3 mb-0">
                        <label >blind_at_90min</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="blind_at_90min" value={blind_at_90min} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >blind_at_latereg</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="blind_at_latereg" value={blind_at_latereg} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Types</label>
                        <select class="form-control" id="exampleFormControlSelect1"  name="types" value={types} onChange={this.onChange}>
                            <option value="Tourney">Tourney</option>
                            <option value="Series">Series</option>
                            <option value="Satellite">Satellite</option>
                            <option value="Freeroll">Freeroll</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3 mb-0">
                        <label >Price_Range</label>
                        <select class="form-control" id="exampleFormControlSelect1" name="price_range" value={price_range} onChange={this.onChange}>
                            <option value="Below Rs 5k">Below Rs 5k</option>
                            <option value="Rs 5k to 30k">Rs 5k to 30k</option>
                            <option value="Rs 30k to 150k">Rs 30k to 150k</option>
                            <option value="Rs 150k to 750k">Rs 150k to 750k</option>
                            <option value="Rs 750k to 2M">Rs 750k to 2M</option>
                            <option value="Above 2M">Above 2M</option>
                        </select>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
            
            
        );
    }

}
export default Form;
