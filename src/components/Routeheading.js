import React from 'react';
import {Route,Switch,Link} from 'react-router-dom';
import Tourney from './Tourney';
import Satellite from './Satellite';
import Freeroll from './Freeroll';
import Series from './Series';


const Routeheading=()=>{
    return(
        <div className="row" style={{marginTop:"8rem"}}>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3" >
                        <Link to="/" className="btn btn-primary btn block ">Tourney</Link>
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
    )
}

export default Routeheading;