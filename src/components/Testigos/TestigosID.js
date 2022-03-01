import React, { Component } from 'react';
import axios from 'axios';
import {Link}from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Button}from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'jquery/dist/jquery.min.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";

import { enviroments } from '../../env';

export default class TestigosID extends Component {
  state = {
    nombre: '',
    telefono: 0,
    tipo:'',
    departamento:'',
    municipio:'',
    zona:0,
    puesto:0,
    mesa:'',
    estado:0,
    dato:'',
    file:[],
    divipoldepartamento:[],
    divipolmunicipio:[],
    modal:false,
    opacity:1,
    navegacion:[],
   
    mensaje:'',
    titulo:'',
   
  };


  
  token = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    return token;
  };
  modalabrir= async (e) => {  

    this.setState({modal: !this.state.modal}); 
    this.setState({opacity: 1}); 
  }
  modalcerrar= async (e) => {  
     console.log("click")
    this.setState({modal: false}); 
 
    this.setState({opacity: 0}); 
  
   
  }
  onSubmit = async e => {  
    e.preventDefault();
  console.log("enviar")
  
  this.subir();
  
  }
  subir= async()=>{  
    const formdata =new FormData();
    
    console.log("subir")
    

    let params ={
 
  
    mesa:this.state.mesa,
    file:this.state.file,
   
   
    } 
    if(  params.file=='' ){ 
      console.log("error")
      this.setState({opacity: 1}); 
      this.setState({mensaje:"Por favor tome la foto"});
      this.setState({titulo:"Error"});
       this.setState({modal:true});
    }else{
      formdata.append("img",this.state.file)
  
      
      const res = await axios.post(enviroments.backendUrl + '/testigos/crear',formdata, { params: {
        url:this.state.id,
        mesa:this.state.mesa
       
        
        
        } });
    
  
       
    
  if(res.data=="no existe"){
    this.setState({opacity: 1}); 
    this.setState({mensaje:"Esta persona no esta registrada"});
    this.setState({titulo:"Intente con otra url"});
     this.setState({modal:true});

  }else{
    this.setState({opacity: 1}); 
    this.setState({mensaje:"Imagen subida exitosamente!"});
    this.setState({titulo:"Éxito"});
     this.setState({modal:true});

  }
 
    }
   
  
   
  }
  nombreChange= async (e) => {  
    this.setState({nombre: e.target.value});
    console.log(e.target.value);
  
  }
  telefonoChange= async (e) => {  
    this.setState({telefono: e.target.value});
    console.log(e.target.value);
  
  }
  tipoChange= async (e) => {  
    this.setState({tipo: e.target.value});
    console.log(e.target.value);
  
  }
  zonaChange= async (e) => {  
    this.setState({zona: e.target.value});
    console.log(e.target.value);
  
  }
  puestoChange= async (e) => {  
    this.setState({puesto: e.target.value});
    console.log(e.target.value);
  
  }
  mesaChange= async (e) => {  
    this.setState({mesa: e.target.value});
    console.log(e.target.value);
  
  }
  imagenChange= async (e) => {  
    this.setState({file:e.target.files[0]});

  if(e.target.files[0]){
   
    var extencion1= "image/png"  ;
    var extencion2= "image/jpeg" ;
    var extencion3= "image/jpg" ;
    if(e.target.files[0].size> 5242880){ 

      console.log("no son iguales")
     
      this.setState({opacity: 1}); 
      this.setState({mensaje:"Solo imagenes menores a 5mb"});
      this.setState({titulo:"Error"});
      e.target.value = null;
      this.setState({file: e.target.value});
      
      this.setState({modal:true});
     }else if(e.target.files[0].type==extencion1){ 
      console.log("son iguales")
      this.setState({extencion:true});
      
      
     }else if(e.target.files[0].type==extencion2){ 
      console.log("son iguales")
      
     }else if(e.target.files[0].type==extencion3){ 
      console.log("son iguales")
     
     }else{ 
      console.log("no son iguales")
     
      this.setState({opacity: 1}); 
      this.setState({mensaje:"Solo imagenes PNG, JPG y JPEG"});
      this.setState({titulo:"Error"});
      e.target.value = null;
      this.setState({file: e.target.value});
      this.setState({modal:true});
     
     }
    }
  }
  departamentoChange= async (e) => {  
    this.setState({departamento: e.target.value}); 
    console.log(e.target.value);
    this.setState({municipio: ''}); 
     var params = {  departamento: e.target.value, 
      municipio:null,
   
      }
    const res = await axios.post(enviroments.backendUrl + '/divipol/unmunicipio', params);
    this.setState({divipolmunicipio: res.data});
    this.setState({valguardarmuni:true});
   

}
municipioChange= async (e) => {  
  this.setState({municipio: e.target.value}); 
  console.log(e.target.value);

  

}
rendermunicipio= () => {
            
  if(this.state.valguardarmuni===true){
      
      
    return this.state.divipolmunicipio.map(divipol => 
    <option key={divipol.municipio}>{divipol.municipio}</option>
    )

  }

}
  mostrardepartamentos=async()=>{

    const res = await axios.get(enviroments.backendUrl + '/divipol/departamento');
    this.setState({divipoldepartamento: res.data});
   
  }
  unmunicipio=async () =>{

    const departamento="valle";
  
    const res = await axios.get(enviroments.backendUrl + '/divipol/unmunicipio',departamento,departamento,departamento);
    
    this.setState({divipolmunicipio: res.data});
   
  
  }
  regresarChange= async (e) => {  
    this.setState({modal: !this.state.modal}); 
  
  }
  esBASE64=(parametro) =>{
    var expresion=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if(expresion.test(parametro)){
      return true;
    }else{
      return false;
    }
  }
  async componentDidMount() {

   
   
    await this.setState({id:this.props.match.params.id})
    
   
  
   
   
  }

  
  rendermodal=()=>{
  
      return <Modal  size="sm" aria-labelledby="example-modal-sizes-title-sm" style={{opacity:this.state.opacity}} show={this.state.modal} >
      <Modal.Header >
        <Modal.Title>{this.state.titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{this.state.mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>this.modalcerrar()} >
          Close
        </Button>
      
      </Modal.Footer>
    </Modal>
    
  }
  render() {
    return (
     <>
      <div className="abs-center2">
      <div className="container">
     {this.rendermodal()}
  <div className="d-flex justify-content-center">
  <div className="card" style={{ width: "80%", height: "400px" }}>
  <div className="card-body">
    <h5 className="card-title">Foto</h5>
    
    <div className="col-xs-12" >
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label>Mesa</label>
                      </div>
                    </div>
                    <select
                      className="browser-default custom-select"
                      type="onSubmit"
                      value={this.state.mesa}
                      onChange={this.mesaChange}
                    >
                      <option value="">SELECCIONAR</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option>28</option>
                      <option>29</option>
                      <option>30</option>
                      <option>31</option>
                      <option>32</option>
                      <option>33</option>
                      <option>34</option>
                      <option>35</option>
                      <option>36</option>
                      <option>37</option>
                      <option>38</option>
                      <option>39</option>
                      <option>40</option>
                      <option>41</option>
                      <option>42</option>
                      <option>43</option>
                      <option>44</option>
                      <option>45</option>
                      <option>46</option>
                      <option>47</option>
                      <option>48</option>
                      <option>49</option>
                      <option>50</option>
                      <option>51</option>
                      <option>52</option>
                      <option>53</option>
                      <option>54</option>
                      <option>55</option>
                      <option>56</option>
                      <option>57</option>
                      <option>58</option>
                      <option>59</option>
                      <option>60</option>
                      <option>61</option>
                      <option>62</option>
                      <option>63</option>
                      <option>64</option>
                      <option>65</option>
                      <option>66</option>
                      <option>67</option>
                      <option>68</option>
                      <option>69</option>
                      <option>70</option>
                      <option>71</option>
                      <option>72</option>
                      <option>73</option>
                      <option>74</option>
                      <option>75</option>
                      <option>76</option>
                      <option>77</option>
                      <option>78</option>
                      <option>79</option>
                      <option>80</option>
                      <option>81</option>
                      <option>82</option>
                      <option>83</option>
                      <option>84</option>
                      <option>85</option>
                      <option>86</option>
                      <option>87</option>
                      <option>88</option>
                      <option>89</option>
                      <option>90</option>
                      <option>91</option>
                      <option>92</option>
                      <option>93</option>
                      <option>94</option>
                      <option>95</option>
                      <option>96</option>
                      <option>97</option>
                      <option>98</option>
                      <option>99</option>
                      <option>100</option>
                      <option>101</option>
                    </select>
                  </div>
                </div>

                <div className="col-xs-12 " >
                <div className="container-input">
<input tyle={{ width: "200px", height: "600px"  }}
type="file" 

name="image"
value={this.state.imagen}
onChange={this.imagenChange}
name="file-5" 
id="file-5" 
className="inputfile inputfile-5" 
data-multiple-caption="{count} archivos seleccionados" multiple />
<label htmlFor="file-5" >
<figure>
<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16">
  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
</svg>
</figure>
<span className="iborrainputfile">Seleccionar archivo</span>
</label>
</div>
</div>
{/*
                  <div className="custom-input-file ">
                    <input className="input-file "
                      type="file"
                      name="image"
                      value={this.state.imagen}
                      onChange={this.imagenChange}
                      className="form-control input-lg"
                   
                    ></input>
                  </div>
               */ }
                <form className="form-horizontal"  onSubmit={this.onSubmit}>
                <div className="centrarCajasubir" >
             <button type="submit" className="btn btn-dark btn-block centrarCajasubir" style={{ width: "50%", height: "100%"  }}>Subir</button>
             </div>
             </form>
  </div>
</div>
</div>
</div> 
</div>    
      </>
    );
  }
}

