import './App.css';
import React from 'react';
import {Route,Switch,Link} from 'react-router-dom';
import {useLocalStorage} from 'react-use';
import Navbaar from './components/Navbar';
import Tourney from './components/Tourney';
import Satellite from './components/Satellite';
import Freeroll from './components/Freeroll';
import Series from './components/Series';
import DashBoard from './components/DashBoard';
import Routeheading from "./components/Routeheading";

function App() {
  const [Signed,SetSigned] = useLocalStorage('Signed', false); 
  return (
    <div className="">
        
    
      <main>
        <Navbaar sign={Signed} setsign={SetSigned}/>     
        <Switch>
                <Route path='/' component={Tourney} exact/>
                <Route path='/freeroll' component={Freeroll} exact/>
                <Route path='/series' component={Series} exact/>
                <Route path='/user-info/' component={DashBoard} exact/>
                <Route path='/Satellite/' component={Satellite} exact/>
          </Switch>
      </main>
      
    </div>
  );
}

export default App;
