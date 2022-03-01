import React, { Component } from 'react'
import axios from 'axios';
import { enviroments } from '../../env';

export default class session extends Component {


    state={
        legeo:false,
       
      
        cedula:'',
       
        contrasena:'',
       
        
        //valguardarmuni:false
        }

        login= async()=>{  
            let usuario ={
            cedula:this.state.cedula,
            contrasena:this.state.contrasena,
            }
            
            //ruta passport desactivada

           //await axios.post(enviroments.backendUrl + '/login',usuario,{withCredentials: true});
            //console.log(user);
            //login normal
            const user =await axios.post(enviroments.backendUrl + '/login/user',usuario,{withCredentials: true});
            
            //const user =await axios.get(enviroments.backendUrl + '/login',{withCredentials: true});
           
            if(user){
              //  console.log("existe")
              //  console.log(user.data)
               
                localStorage.setItem('user', JSON.stringify(user.data))
                console.log("localStorage")
                console.log(JSON.parse(localStorage.getItem('user')));
                const token=JSON.parse(localStorage.getItem('user'));
                if(token.tipo=="ADMINISTRADOR"){
                    window.location.href = "/votos";
                }
                if(token.tipo=="TESTIGOS"){
                    window.location.href = "/testigos";
                }

                if(token.tipo=="FUNCIONARIO" || token.tipo=="LIDER ESTRUCTURA" || token.tipo=="LIDER INDEPENDIENTE"){
                    window.location.href = "/listado";
                }
               

            }else{
                console.log("ni idea")
            }
           
                //dejar en blanco el formulario
               
            
        }
        onSubmit = async e => {  
            e.preventDefault();
          console.log("enviar")
          
          this.login();
         
          }
          cedulaChange= async (e) => {  
            // this.setState({tipo: e.target.value});
          console.log("cambiocedula")
           this.setState({cedula: e.target.value}); 
        
           //console.log(this.state.cedula)
           
           
           }
           contrasenaChange= async (e) => {  
            // this.setState({tipo: e.target.value});
          console.log("cambiocontrasena")
           this.setState({contrasena: e.target.value}); 
           
           //console.log(this.state.contrasena)
           
           
           }
          
    render() {
        return (
        
        
                <div className="login">
                     
                     <h1>{this.user}</h1>
                     <div className="container">
                    <div className="abs-center ">
                         <div className="col-md-4 mx-auto  ">
                            <div className="card text-center iluminarlogin">
                                <div className="card-header">
                                <h1>Bienvenido</h1>
                                </div>
                                {/* <img src="/img/logo.png" alt="Logo" className="card-img-top mx-auto m-2 rounded-circle w-50"></img> */}
                                  
                              
                                    <div className="card-body">
                                    <form className="form-horizontal"  onSubmit={this.onSubmit}>
                                    <div class="col-xs-12">
                                            <div className="form-group">
                                            <input type="text"  onChange={this.cedulaChange} className="form-control input-lg" 
                                            placeholder="cedula"></input>
                    
                                            </div>
                                    </div>
                                    <div class="col-xs-12">
                                        <div className="form-group">
                                        <input type="password"  onChange={this.contrasenaChange} className="form-control input-lg" 
                                        placeholder="contrasena"></input>
                                        
                                        </div>
                                    </div>
                                        <button type="submit" className="btn btn-dark btn-block">Iniciar</button>
                                    </form>
                                    </div>
                              </div>
                        </div>
                    </div>
                    </div>
                </div>

           
        )
    }
}
