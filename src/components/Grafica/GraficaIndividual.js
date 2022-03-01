import React, { Component } from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
//import ReactDOM from 'react-dom';
//import {Link}from 'react-router-dom';
import { enviroments } from '../../env';

export default class GraficaIndividual extends Component {
 
    state = {
        numerocomunas:[],
        nombrecomunas:[],
        conteocomunas:[],
        total:0,
        cedula:'',
        nombre:'',
        apellido:'',
        telefono:'',
        correo:'',
        direccion:'',
        tipo:'',
        departamento:'',
        municipio:'',
        comuna:'',
        contrasena:'',
        ValGuardado:false,
        divipoldepartamento:[],
        divipolmunicipio:[],
        valguardarmuni:false,
        verificacedula:null
    };
    token=()=>{
        const token = JSON.parse(localStorage.getItem('user'));
        
          return token;
      
       
      }
      grafica=async()=>{
        var params={
          id:this.props.match.params.id
        }
        console.log("id de grafica")
        console.log(params.id)
        
        const res = await axios.get(enviroments.backendUrl + '/graficas/ver/'+this.props.match.params.id);
        console.log(res.data.numerocomunas)
        console.log(res.data.nombrecomunas)
        this.setState({conteocomunas: res.data.conteocomunas});
        this.setState({nombrecomunas: res.data.nombrecomunas});
        this.setState({total: res.data.total});
        console.log("nombrecomunas");
        console.log(this.state.nombrecomunas)
       
    }

    async componentDidMount(){  
        this.grafica();
       

    }
    
  
      
    render() {
        return (
           
            
          
            
            <div className="container">
               <h1>Grafica individual</h1>
               <h4>Numero de votantes en la lista: {this.state.total}</h4>
               <Bar
                data={{
                    labels: this.state.nombrecomunas,
                    datasets: [
                        {
                            label: 'Votos ',
                            data: this.state.conteocomunas,
                          
                            backgroundColor: 'rgba(54, 162, 235, 0.8)',
                            borderColor: 'rgba(100,255,218,1)',

                        }
                        ],

                }}

                height={20}
                width={50}
                options={{ 
                    maintainAspectRatio:true,


                }}
                /> 

                    
               
            </div>
         
   )
    
}
}
  //ReactDOM.render(<p>Hello</p>, document.getElementById('roop'));