import React from 'react';
import  "../node_modules/jquery/dist/jquery";
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css';



//session
import Login from './components/session/session';

import Header from './components/Header';
import Escritinio from './components/Escrutinio/Escritinio';
import Votos from './components/Escrutinio/Votos';




function App() {
  const autenticacion=()=>{
    const token = JSON.parse(localStorage.getItem('user'));
    var validar;
    if(token){
      console.log("hay token")
      validar=true;
    }else{
      console.log("no hay token")
      validar=false;
    }
   
    //lol =true;
    //console.log(JSON.parse(localStorage.getItem('user')).tipo)
     return validar;
    
  }
  const token=()=>{
    const token = JSON.parse(localStorage.getItem('user'));
    
    return token;
  }

  
  return (
    
    
    <Router>
    

    {/*TESTIGOS ID*/}
    <Route exact path="/" render={() => (     
          <> <Header></Header>
     <Route  path="/" exact component={Escritinio}/>   </>) 
        
      }/>

    <Route exact path="/escrutinio/mesas/:tipo/:departamento/:municipio/:coddepartamento/:codmunicipio/:zona/:puesto/:mesa" render={() => (     
          <> <Header></Header>
     <Route  path="/escrutinio/mesas/:tipo/:departamento/:municipio/:coddepartamento/:codmunicipio/:zona/:puesto/:mesa" exact component={Votos}/>   </>) 
        
      }/>
    

    </Router>
   
  );
}

export default App;
