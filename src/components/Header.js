import React, { Component } from 'react'
import {Link}from 'react-router-dom';
import axios from 'axios';
import { enviroments } from '../env';
export default class Header extends Component {
  token=()=>{
    const token = JSON.parse(localStorage.getItem('user'));
    
      return token;
  
   
  }
  Salir=async()=>{
    
    //const user =await axios.post(enviroments.backendUrl + '/login/user',usuario,{withCredentials: true});
    localStorage.removeItem('user');
    if(this.token()){
    var params={
      ip:this.token().ip
    }}
    
    const salio =await axios.post(enviroments.backendUrl + '/login/salir',params);
  
    
   
  }
  autenticacion=()=>{
    const token = JSON.parse(localStorage.getItem('user'));
    var validar;
    if(token){
      console.log("hay token")
      validar=true;
    }else{
      console.log("no hay token")
      validar=false;
    }
   
    
     return validar;
    
  }



  

   
   

  

   
  
  renderbienvenido=()=>{
    if(this.token()){
    if(this.autenticacion()){
      return <>
      <li className="nav-item mx-auto">
        <a className="navbar-brand" href="/">Bienvenido {this.token().tipo.toLowerCase()} {this.token().nombre} {this.token().apellido}</a>
        </li></>
    }
  }
  }
    render() {
      
        return (
         
          
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
            <Link className="nav-link" to="/">Escrutinio</Link>
                    <div className="d-flex justify-content-start">
                   
                     
                    <div className=" d-flex justify-content-end" >
                    <ul className="navbar-nav d-flex ">
                   
                    {this.renderbienvenido()}
                    </ul>
                    </div>
                    </div>
                      
                    <div className=" d-flex justify-content-end" >
                    <ul className="navbar-nav d-flex ">
                      <li className="nav-item ">
                      
                      </li>
                    
                        
                
                      
                     
                      
                      <li className="nav-item">
    
  
     
       
      </li>
                     
                      
                    
                    </ul>
                  </div>
         
         
         
       
         </nav>
        )
    }
}

