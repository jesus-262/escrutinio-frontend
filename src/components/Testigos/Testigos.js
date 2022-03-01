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

export default class Testigos extends Component {
  state = {
    nombre: '',
    telefono: 0,
    tipo:'',
    departamento:'',
    municipio:'',
    zona:0,
    puesto:0,
    mesa:0,
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
    
    
    

    let params ={
 
    nombre:this.state.nombre,
    telefono: this.state.telefono,
    tipo:this.state.tipo,
    departamento:this.state.departamento,
    municipio:this.state.municipio,
    zona:this.state.zona,
    puesto:this.state.puesto,
    mesa:this.state.mesa,
    file:this.state.file,
    estado:this.state.estado,
   
    } 
    if(params.nombre=='' || params.telefono=='' || params.tipo=='' 
    || params.departamento=='' || params.municipio=='' || params.zona==''
    || params.puesto=='' || params.mesa=='' || params.file==''
    ){ 
      this.setState({opacity: 1}); 
      this.setState({mensaje:"Por favor rellene todos los campos incluida la foto"});
      this.setState({titulo:"Error"});
       this.setState({modal:true});
    }else{
      formdata.append("img",this.state.file)
  
      
      const res = await axios.post(enviroments.backendUrl + '/testigos/crear',formdata, { params: {
        nombre:this.state.nombre,
        telefono: this.state.telefono,
        tipo:this.state.tipo,
        departamento:this.state.departamento,
        municipio:this.state.municipio,
        zona:this.state.zona,
        puesto:this.state.puesto,
        mesa:this.state.mesa,
        ip:this.token().ip
        
        
        } });
    
  
        console.log("res");
       console.log(res);
    
  
      this.setState({opacity: 1}); 
      this.setState({mensaje:"Imagen subida exitosamente!"});
      this.setState({titulo:"Éxito"});
       this.setState({modal:true});
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
  async componentDidMount() {

    this.mostrardepartamentos();
    this.unmunicipio();
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
  
 
      {this.rendermodal()}
     
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>Testigos</h3>
            <form className="form-horizontal " encType='multipart/form-data'  onSubmit={this.onSubmit}>
              <div className="card-body">
                <div className="col-xs-12">
                  <div className="form-group">
                    <input
                      type="text"
                      value={this.state.nombre}
                      name="userName"
                      id="userName"
                      onChange={this.nombreChange}
                      className="form-control input-lg"
                      placeholder="Nombre del testigo"
                    ></input>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="form-group">
                    <input
                      type="number"
                      name="cedula"
                      value={this.state.cedula}
                      onChange={this.telefonoChange}
                      className="form-control input-lg"
                      placeholder="Numero de telefono testigo"
                    ></input>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label>Tipo</label>
                      </div>
                    </div>
                    <select
                      className="browser-default custom-select"
                      type="onSubmit"
                      value={this.state.comuna}
                      onChange={this.tipoChange}
                    >
                      <option value="">SELECCIONAR</option>
                      <option>SENADO</option>
                      <option>CAMARA</option>
                      
                    </select>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label>Departamento</label>
                      </div>
                    </div>
                    <select
                      className="browser-default custom-select"
                      type="onSubmit"
                      value={this.state.comuna}
                      onChange={this.departamentoChange}
                    >
                    <option value="">SELECCIONAR</option>
                        
                        {
                         this.state.divipoldepartamento.map(divipol => 
                         <option key={divipol.departamento}>{divipol.departamento}</option>
                         )
                         }
                    </select>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label>Municipio</label>
                      </div>
                    </div>
                    <select className="browser-default custom-select"  type="onSubmit" name="municipio"  value={this.state.municipio} onChange={this.municipioChange}>
                        <option value="">SELECCIONAR</option>
                        {this.rendermunicipio()}
                    </select>
                  </div>
                </div>

               
                <div className="col-xs-12">
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label>Zona</label>
                      </div>
                    </div>
                    <select
                      className="browser-default custom-select"
                      type="onSubmit"
                      value={this.state.zona}
                      onChange={this.zonaChange}
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
                <div className="col-xs-12">
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label>Puesto</label>
                      </div>
                    </div>
                    <select
                      className="browser-default custom-select"
                      type="onSubmit"
                      value={this.state.puesto}
                      onChange={this.puestoChange}
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
                <div className="col-xs-12">
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
                <div className="col-xs-12">
                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      value={this.state.imagen}
                      onChange={this.imagenChange}
                      className="form-control input-lg"
                   
                    ></input>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-dark btn-block">Subir</button>
            </form>
          </div>
        </div>
      </div>
     
      
      </>
    );
  }
}

