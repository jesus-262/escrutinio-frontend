import React, { Component } from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { enviroments } from '../../env';
//import ReactDOM from 'react-dom';
//import {Link}from 'react-router-dom';

export default class GraficaGeneral extends Component {
 
    state = {
        numerocomunas:[],
        nombrecomunas:[],
        conteocomunas:[],
        selectcomunas:0,
        total:0,
        porcomunas:[],
        
     
    };
    token=()=>{
        const token = JSON.parse(localStorage.getItem('user'));
        
          return token;
      
       
      }
      grafica=async()=>{
        var params={
          id:this.props.match.params.id,
          comuna:this.state.selectcomunas
        }

        
        const res = await axios.post(enviroments.backendUrl + '/graficas/general',params);
        console.log("res.data.conteocomunas")
        console.log(res.data.conteocomunas)
        console.log(res.data.nombrecomunas)
        this.setState({conteocomunas: res.data.conteocomunas});
        this.setState({nombrecomunas: res.data.nombrecomunas});
        this.setState({total: res.data.total});
       // console.log("nombrecomunas");
      //  console.log(this.state.nombrecomunas)
       
    }

    async componentDidMount(){  
        this.grafica();
       

    }
    comunaChange= async (e) => {  
      this.setState({selectcomunas: e.target.value}); 
     
      var params={
  
        comuna: e.target.value
      }
      console.log("params.comuna")
      console.log(params.comuna)
      const res = await axios.post(enviroments.backendUrl + '/graficas/general',params);
      console.log("res.data.comunas")
      console.log(res.data.graficacomuna)
      this.setState({porcomunas: res.data.graficacomuna});
       
    }
      
    render() {
        return (
           
            
          
            
          <div className="container">
          <h1>Graficas Generales</h1>
          <h4>Numero de votantes en Cali: {this.state.total}</h4>
          <Bar
           data={{
               labels: this.state.nombrecomunas.map(nombrecomunas =>("Comuna "+nombrecomunas.comuna) ),
               datasets: [
                   {
                       label: 'Votos ',
                       data: this.state.conteocomunas.map(conteocomunas =>(conteocomunas.total) ),
                     
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
           <div className="container">
              <select className="browser-default custom-select" type="onSubmit" value={this.state.comuna} onChange={this.comunaChange} 
                           >
                  <option value="">Comuna</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>18</option>
                  <option>16</option>
                </select>
               
                </div>
                <Bar
           data={{
               labels: this.state.porcomunas.map(porcomunas =>("Nombre "+porcomunas.nombre +" "+ porcomunas.apellido) ),
               datasets: [
                   {
                       label: 'Votos ',
                       data: this.state.porcomunas.map(porcomunas =>(porcomunas.conteo) ),
                     
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