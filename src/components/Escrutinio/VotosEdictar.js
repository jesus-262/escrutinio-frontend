import React, { Component, useState } from "react";
import axios from "axios";
import { enviroments } from '../../env';
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, OffcanvasHeader } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "jquery/dist/jquery.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";
import { Prev } from "react-bootstrap/esm/PageItem";


var statesenado = {};

export default class VotosEdictar extends Component {
  state = {
    votos: [],
    estadovotos:false,
    nombre: "",
    telefono: 0,
    tipo: "",
    departamento: "",
    municipio: "",
    zona: 0,
    puesto: 0,
    mesa: 0,
    dato: "",
    estado: "",
    imagen: "",
    divipoldepartamento: [],
    divipolmunicipio: [],
    modal: false,
    opacity: 1,

    mensaje: "",
    titulo: "",
    reclamos: [],
    duplicados: [],

    navegacion: [],
    //armar el senado
    senado1: [],
    senado2: [],
    senado3: [],
    senado4: [],
    senado5: [],
    senado6: [],
    senado7: [],
    senado8: [],
    senado9: [],
    senado10: [],
    senado11: [],
    senado12: [],
    senado13: [],
    senado14: [],
    senado15: [],
    senado16: [],
    senado17: [],
    camara1: [],
    camara2: [],
    camara3: [],
    camara4: [],
    camara5: [],
    camara6: [],
    camara7: [],
    camara8: [],
    camara9: [],
    camara10: [],
    camara11: [],
    camara12: [],
    camara13: [],
    
    partido1: "",
    partido2: "",
    partido3: "",
    partido4: "",
    partido5: "",
    partido6: "",
    partido7: "",
    partido8: "",
    partido9: "",
    partido10: "",
    partido11: "",
    partido12: "",
    partido13: "",
    partido14: "",
    partido15: "",
    partido16: "",
    partido17: "",
    tipo2: "",
  };

  //const [show, setShow] = useState(false);

  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  token = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    return token;
  };
  modalabrir = async (e) => {
    this.setState({ modal: !this.state.modal });
    this.setState({ opacity: 1 });
  };
  modalcerrar = async (e) => {
   
    this.setState({ modal: false });

    this.setState({ opacity: 0 });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    
  };

  zonaChange = async (e) => {
    this.setState({ zona: e.target.value });
    
    var params = {
      zona: e.target.value,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
      puesto: this.state.puesto,
      mesa: this.state.mesa,
      estado: this.state.estado,
    };
    const res = await axios.post(enviroments.backendUrl + "/votos", params);

    this.setState({ reclamos: res.data.reclamos });
    this.setState({ navegacion: res.data.navegacion });
  };
  puestoChange = async (e) => {
    this.setState({ puesto: e.target.value });
    
    var params = {
      puesto: e.target.value,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
      zona: this.state.zona,
      mesa: this.state.mesa,
      estado: this.state.estado,
    };
    const res = await axios.post(enviroments.backendUrl + "/votos", params);

    this.setState({ reclamos: res.data.reclamos });
    this.setState({ navegacion: res.data.navegacion });
  };
  mesaChange = async (e) => {
    this.setState({ mesa: e.target.value });
   
    var params = {
      mesa: e.target.value,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
      zona: this.state.zona,
      puesto: this.state.puesto,
      estado: this.state.estado,
    };
    const res = await axios.post(enviroments.backendUrl + "/votos", params);

    this.setState({ reclamos: res.data.reclamos });
    this.setState({ navegacion: res.data.navegacion });
  };
  estadoChange = async (e) => {
    this.setState({ estado: e.target.value });

    var params = {
      estado: e.target.value,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: this.state.mesa,
    };
    const res = await axios.post(enviroments.backendUrl + "/votos", params);

    this.setState({ reclamos: res.data.reclamos });
    this.setState({ navegacion: res.data.navegacion });
  };
  tipoChange = async (e) => {
    this.setState({ tipo: e.target.value });
/*
    var params = {
      tipo: e.target.value,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      estado: this.state.estado,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: this.state.mesa,
    };
   // const res = await axios.post(enviroments.backendUrl + "/votos", params);*/



  };
  departamentoChange = async (e) => {
    this.setState({ departamento: e.target.value });

    this.setState({ municipio: "" });
    var params = { departamento: e.target.value, municipio: null };
    const res = await axios.post(
      enviroments.backendUrl + "/divipol/unmunicipio",
      params
    );
    this.setState({ divipolmunicipio: res.data });
    this.setState({ valguardarmuni: true });

    var paramss = {
      departamento: this.state.departamento,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      estado: this.state.estado,
      municipio: this.state.municipio,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: this.state.mesa,
    };

    const ress = await axios.post(enviroments.backendUrl + "/votos", paramss);

    this.setState({ reclamos: ress.data.reclamos });
    this.setState({ navegacion: ress.data.navegacion });
  };
  municipioChange = async (e) => {
    this.setState({ municipio: e.target.value });
  

    var paramss = {
      municipio: e.target.value,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      estado: this.state.estado,
      departamento: this.state.departamento,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: this.state.mesa,
    };
    

    const ress = await axios.post(enviroments.backendUrl + "/votos", paramss);

    this.setState({ reclamos: ress.data.reclamos });
    this.setState({ navegacion: ress.data.navegacion });
  };
  rendermunicipio = () => {
    if (this.state.valguardarmuni === true) {
      return this.state.divipolmunicipio.map((divipol) => (
        <option key={divipol.municipio}>{divipol.municipio}</option>
      ));
    }
  };
  mostrardepartamentos = async () => {
    const res = await axios.get(enviroments.backendUrl + "/divipol/departamento");
    this.setState({ divipoldepartamento: res.data });
  };
  unmunicipio = async () => {
    const departamento = "valle";

    const res = await axios.get(
      enviroments.backendUrl + "/divipol/unmunicipio",
      departamento,
      departamento,
      departamento
    );

    this.setState({ divipolmunicipio: res.data });
  };
  regresarChange = async (e) => {
    this.setState({ modal: !this.state.modal });
  };
  async componentDidMount() {
    
    this.mostrardepartamentos();
    this.unmunicipio();
    this.reclamos();
   
   
    
    
  }
  Guardar = async (e) => {
    

    
    var params = {
      id: this.props.match.params.id,
      municipio: this.state.municipio,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      estado: this.state.estado,
      departamento: this.state.departamento,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: this.state.mesa,
      senadores:this.state.votos
    };
    console.log("antes del favor")
    const dato = await axios.post(enviroments.backendUrl + "/votos/ver/edictar/senado", params);
    console.log("sigue por favor")
    window.location.reload();
  
  
    
  };
  reload = async () => {
    console.log("reload")
    window.location.href = "/votos";
    
  };

  Guardar2= async (e) => {
   
    var params = {
      id: this.props.match.params.id,
      municipio: this.state.municipio,
      nombre: this.state.nombre,
      telefono: this.state.telefono,
      tipo: this.state.tipo,
      estado: this.state.estado,
      departamento: this.state.departamento,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: this.state.mesa,
      camaras:this.state.votos
    };
  //  console.log(camara);
  console.log("antes del favor")
   const res = await axios.post(enviroments.backendUrl + "/votos/ver/edictar/camara", params);
   console.log("sigue por favor")
   window.location.reload();
   
  };
  
  votosChange = async (e) => {
    const { name, value } = e.target;
  
 
    var details = "senador" + [e.target.name];
     //para llenar el arreglo unavez
    if(this.state.estadovotos==false){
      this.state.votos.push({id_postulante:name,votos:value});
    }
    
    
     //para iterar el arreglo con ese dato
     var push=true;
     if(this.state.estadovotos==true){
     for(var i=0; i<this.state.votos.length;i++){
      
      
      
       if(this.state.votos[i].id_postulante==name){
  
        this.state.votos[i].id_postulante=name;
        this.state.votos[i].votos=value;
        push=false;
       // this.state.votos.splice(i,1);
       }
       if (this.state.votos[i].id_postulante==name && this.state.votos[i].votos==''){
         //borrar dato si el voto es cero
         console.log("entro a 0")
         var index = i;
         this.state.votos.splice(index,1);
       }

    
       // this.state.votos.push({id_postulante:name,votos:value});
        
      
     
        
       }
      //if(this.state.votos.concat)
     }

     
     
     //para un push


     if(push==true && this.state.estadovotos==true){
      this.state.votos.push({id_postulante:name,votos:value});
     }
     this.setState({estadovotos: true});
    
     console.log("data");
     console.log(this.state.votos);
    
    this.setState((pre) => ({
      ...pre,
      [details]: {
        ...pre.details,
        ["id_postulante"]: name,
        ["votos"]: value,
      },
    }));
    //console.log(this.state.senador1);
    //console.log(this.state.senador2);
    //console.log(this.state.senador3);
    
  };
  votosChange2 = async (e) => {
    console.log("entro")
    
    const { name, value } = e.target;

 
 
    var details = "camarar" + [e.target.name];
     //para llenar el arreglo unavez
    if(this.state.estadovotos==false){
      this.state.votos.push({id_postulante:name,votos:value});
    }
    
    
     //para iterar el arreglo con ese dato
     var push=true;
     if(this.state.estadovotos==true){
     for(var i=0; i<this.state.votos.length;i++){
      
      
      
       if(this.state.votos[i].id_postulante==name){
  
        this.state.votos[i].id_postulante=name;
        this.state.votos[i].votos=value;
        push=false;
       // this.state.votos.splice(i,1);
       }
       if (this.state.votos[i].id_postulante==name && this.state.votos[i].votos==''){
         //borrar dato si el voto es cero
         console.log("entro a 0")
         var index = i;
         this.state.votos.splice(index,1);
       }

    
       // this.state.votos.push({id_postulante:name,votos:value});
        
      
     
        
       }
      //if(this.state.votos.concat)
     }

     
     
     //para un push


     if(push==true && this.state.estadovotos==true){
      this.state.votos.push({id_postulante:name,votos:value});
     }
     this.setState({estadovotos: true});
    
     console.log("data");
     console.log(this.state.votos);
    
    this.setState((pre) => ({
      ...pre,
      [details]: {
        ...pre.details,
        ["id_postulante"]: name,
        ["votos"]: value,
      },
    }));

    
  };
  senado = async () => {
    var params = {
      id: this.props.match.params.id,
    };
    const res = await axios.post(enviroments.backendUrl + "/votos/ver/senado",params);
    this.setState({ senado1: res.data[0] });
    this.setState({ senado2: res.data[1] });
    this.setState({ senado3: res.data[2] });
    this.setState({ senado4: res.data[3] });
    this.setState({ senado5: res.data[4] });
    this.setState({ senado6: res.data[5] });
    this.setState({ senado7: res.data[6] });
    this.setState({ senado8: res.data[7] });
    this.setState({ senado9: res.data[8] });
    this.setState({ senado10: res.data[9] });
    this.setState({ senado11: res.data[10] });
    this.setState({ senado12: res.data[11] });
    this.setState({ senado13: res.data[12] });
    this.setState({ senado14: res.data[13] });
    this.setState({ senado15: res.data[14] });
    this.setState({ senado16: res.data[15] });
    this.setState({ senado17: res.data[16] });



    this.setState({ partido1: this.state.senado1[0].partidos });
    this.setState({ partido2: this.state.senado2[0].partidos });
    this.setState({ partido3: this.state.senado3[0].partidos });
    this.setState({ partido4: this.state.senado4[0].partidos });
    this.setState({ partido5: this.state.senado5[0].partidos });
    this.setState({ partido6: this.state.senado6[0].partidos });
    this.setState({ partido7: this.state.senado7[0].partidos });
    this.setState({ partido8: this.state.senado8[0].partidos });
    this.setState({ partido9: this.state.senado9[0].partidos });
    this.setState({ partido10: this.state.senado10[0].partidos });
    this.setState({ partido11: this.state.senado11[0].partidos });
    this.setState({ partido12: this.state.senado12[0].partidos });
    this.setState({ partido13: this.state.senado13[0].partidos });
    this.setState({ partido14: this.state.senado14[0].partidos });
    this.setState({ partido15: this.state.senado15[0].partidos });
    this.setState({ partido15: this.state.senado16[0].partidos });
    this.setState({ partido17: this.state.senado17[0].partidos });
  };
  camara = async () => {
    var params = {
      id: this.props.match.params.id,
    };
    const res = await axios.post(enviroments.backendUrl + "/votos/ver/camara",params);
   console.log(res);
    this.setState({ camara1: res.data[0] });
    this.setState({ camara2: res.data[1] });
    this.setState({ camara3: res.data[2] });
    this.setState({ camara4: res.data[3] });
    this.setState({ camara5: res.data[4] });
    this.setState({ camara6: res.data[5] });
    this.setState({ camara7: res.data[6] });
    this.setState({ camara8: res.data[7] });
    this.setState({ camara9: res.data[8] });
    this.setState({ camara10: res.data[9] });
    this.setState({ camara11: res.data[10] });
    this.setState({ camara12: res.data[11] });
    this.setState({ camara13: res.data[12] });
 



    this.setState({ partido1: this.state.camara1[0].partidos });
    this.setState({ partido2: this.state.camara2[0].partidos });
    this.setState({ partido3: this.state.camara3[0].partidos });
    this.setState({ partido4: this.state.camara4[0].partidos });
    this.setState({ partido5: this.state.camara5[0].partidos });
    this.setState({ partido6: this.state.camara6[0].partidos });
    this.setState({ partido7: this.state.camara7[0].partidos });
    this.setState({ partido8: this.state.camara8[0].partidos });
    this.setState({ partido9: this.state.camara9[0].partidos });
    this.setState({ partido10: this.state.camara10[0].partidos });
    this.setState({ partido11: this.state.camara11[0].partidos });
    this.setState({ partido12: this.state.camara12[0].partidos });
    this.setState({ partido13: this.state.camara13[0].partidos });

  };
  reclamos = async () => {
    var params = {
      id: this.props.match.params.id,
    };

    const res = await axios.post(enviroments.backendUrl + "/votos/ver", params);
    this.setState({ duplicados: res.data});
    this.setState({ nombre: res.data[0].nombre });
    this.setState({ telefono: res.data[0].telefono });
    this.setState({ tipo: res.data[0].tipo });
    this.setState({ departamento: res.data[0].departamento });
    this.setState({ municipio: res.data[0].municipio });
    this.setState({ zona: res.data[0].zona });
    this.setState({ puesto: res.data[0].puesto });
    this.setState({ mesa: res.data[0].mesa });
    this.setState({ imagen: res.data[0].foto_url });
   
    if(res.data[0].tipo=="SENADO"){
      this.senado();
    }else{
      this.camara();
    }
  };
  partido = async (senado) => {};

  sena = (Detalles) => {
    return (
      <div>
        {this.state.Detalles.map((Detalles, d) => (
          <h2>{Detalles.partidos}</h2>
        ))}
      </div>
    );
  };

  rendersena = (senado, partido) => {
    // const  Detalles = this.state.senado;
  
    return (
      <>
        <div class="card" style={{ width: "260px", height: "100%" }}>
          <div class="card-body">
            <h5 class="card-title">{partido}</h5>{" "}
            {senado.map(({ id_postulante, partidos, numero, votos }) => (
              <div key={id_postulante}>
                <div
                  style={{ width: "10%", height: "5%" }}
                  class="float-sm-left"
                >
                  <input type="number"
                    style={{ width: "90%", height: "5%" }}
                   
                    placeholder={numero}
                    name={id_postulante}
                    
                    onChange={this.votosChange}
                  />{votos}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  rendercama = (camara, partido) => {
    // const  Detalles = this.state.senado;

    return (
      <>
        <div class="card" style={{width: "260px", height: "100%" }}>
          <div class="card-body">
            <h5 class="card-title">{partido}</h5>{" "}
            {camara.map(({ id_postulante, partidos, numero, votos }) => (
              <div key={id_postulante}>
                <div
                  style={{ width: "20%", height: "20%" }}
                  class="float-sm-left"
                >
                  <input type="number"
                    style={{ width: "90%", height: "5%" }}
                    
                    placeholder={numero}
                    name={id_postulante}
                    
                    onChange={this.votosChange2}
                  />{votos}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  rendermodal = () => {
    return (
      <Modal
        size="sm"
        aria-labelledby="example-modal-sizes-title-sm"
        style={{ opacity: this.state.opacity }}
        show={this.state.modal}
      >
        <Modal.Header>
          <Modal.Title>{this.state.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.state.mensaje}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.modalcerrar()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  renderestado = (estado) => {
    if (estado == 1) {
      return <i class="glyphicon glyphicon-ok"></i>;
    } else {
      return <i class="glyphicon glyphicon-remove"></i>;
    }
  };
  rendertestigo = () => {
    return (
      <>
       
        <div class="card " style={{ width: "80%", height: "40%" }}>
          <img
            class="card-img-top"
            src={this.state.imagen}
            alt="Card image cap"
          ></img>
          <div class="card-body">
            <h1 class="card-title">Nombre : {this.state.nombre}</h1>
            <h3 class="card-title">Telefono : {this.state.telefono}</h3>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              DEPARTAMENTO
              <select
                className="browser-default custom-select"
                type="onSubmit"
                name="departamento"
                value={this.state.departamento}
                onChange={this.departamentoChange}
              >
                <option value={this.state.departamento}>
                  {this.state.departamento}
                </option>

                {this.state.divipoldepartamento.map((divipol) => (
                  <option key={divipol.departamento}>
                    {divipol.departamento}
                  </option>
                ))}
              </select>
            </li>
            <li class="list-group-item">
              MUNICIPIO
              <select
                className="browser-default custom-select"
                type="onSubmit"
                name="municipio"
                value={this.state.municipio}
                onChange={this.municipioChange}
              >
                <option value={this.state.municipio}>
                  {this.state.municipio}
                </option>
                {this.rendermunicipio()}
              </select>
            </li>
          </ul>
          <div class="card-body">
            <li class="list-group-item">
          <select className="browser-default custom-select"  type="onSubmit" name="tipo" value={this.state.tipo2} onChange={this.tipoChange}>
                    <option value={this.state.tipo}>TIPO</option>
                    <option>SENADO</option>
                    <option>CAMARA</option>
                
                </select>
                </li>
                </div>
          <div class="card-body">
            <li class="list-group-item">
              {" "}
              ZONA
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
            </li>
            <li class="list-group-item">
              {" "}
              PUESTO
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
            </li>
            <li class="list-group-item">
              {" "}
              MESA
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
            </li>
          </div>
        </div>
      </>
    );
  };
  renderduplicados = () => {
    return (
      <>
      {
        
               this.state.duplicados.map(duplicados => 
                
                <div class=" d-flex justify-content-center  dupli" >
                  
               <div class="card" style={{ width: "80%", height: "40%" }} key={duplicados.id}>
         <img
           class="card-img-top"
           src={duplicados.foto_url}
           alt="Card image cap"
         ></img>
         <div class="card-body">
           <h1 class="card-title">Nombre : {duplicados.nombre}</h1>
           <h3 class="card-title">Telefono : {duplicados.telefono}</h3>
         </div>

               </div>   
               </div>          
               )
             }</>
    )
  }
  render() {
    
    if(this.state.tipo=="SENADO"){
    return (
      <>
        <div class="container">
        <div class="d-flex justify-content-around">
        
        
       
                        <div class="container">
                  <div class="row">
                  
                    {this.rendertestigo()}
                  
                
                    {this.renderduplicados()}
                

                  </div>
                </div>
          
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
            <button
          className="btn btn-primary btn-lg  position-relative" 
          style={{ width: "100%", height: "5%" }}
          value=""
          type="submit"
          name="guardar"
          onClick={() => this.Guardar()}
        >
          Guardar
        </button>
              <div class="d-flex justify-content-between">
        
                {this.rendersena(this.state.senado1, this.state.partido1)}
                {this.rendersena(this.state.senado2, this.state.partido2)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado3, this.state.partido3)}
                {this.rendersena(this.state.senado4, this.state.partido4)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado5, this.state.partido5)}
                {this.rendersena(this.state.senado6, this.state.partido6)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado7, this.state.partido7)}
                {this.rendersena(this.state.senado8, this.state.partido8)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado9, this.state.partido9)}
                {this.rendersena(this.state.senado10, this.state.partido10)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado11, this.state.partido11)}
                {this.rendersena(this.state.senado12, this.state.partido12)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado13, this.state.partido13)}
                {this.rendersena(this.state.senado14, this.state.partido14)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado15, this.state.partido15)}
                {this.rendersena(this.state.senado16, this.state.partido16)}
              </div>
              <div class="d-flex justify-content-between">
                {this.rendersena(this.state.senado17, this.state.partido17)}
              </div>
            </div>
          </div>
        </div>
        
        </div>
      </>
    );
  }else{
    return ( <>
         <div class="container">
      <div class="d-flex justify-content-around">
          
 
      
        
        
       
                        <div class="container">
                  <div class="row">
                  
                    {this.rendertestigo()}
                  
                
                    {this.renderduplicados()}
                

                  </div>
                </div>
                
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column">
        <button
      className="btn btn-primary btn-lg  position-relative" 
      style={{ width: "100%", height: "4%" }}
      value=""
      type="submit"
      name="guardar2"
      onClick={() => this.Guardar2()}
    >
      Guardar
    </button>
          <div class="d-flex justify-content-between">
          
          {this.rendercama(this.state.camara1, this.state.partido1)}
          {this.rendercama(this.state.camara2, this.state.partido2)}
          </div>
          <div class="d-flex justify-content-between">
          {this.rendercama(this.state.camara3, this.state.partido3)}
          {this.rendercama(this.state.camara4, this.state.partido4)}
          </div>
          <div class="d-flex justify-content-between">
          {this.rendercama(this.state.camara5, this.state.partido5)}
          {this.rendercama(this.state.camara6, this.state.partido6)}
          </div>
          <div class="d-flex justify-content-between">
          {this.rendercama(this.state.camara7, this.state.partido7)}
          {this.rendercama(this.state.camara8, this.state.partido8)}
          </div>
          <div class="d-flex justify-content-between">
          {this.rendercama(this.state.camara9, this.state.partido9)}
          {this.rendercama(this.state.camara10, this.state.partido10)}
          </div>
          <div class="d-flex justify-content-between">
          {this.rendercama(this.state.camara11, this.state.partido11)}
          {this.rendercama(this.state.camara12, this.state.partido12)}
          </div>
          <div class="d-flex justify-content-between">
          {this.rendercama(this.state.camara13, this.state.partido13)}
         
          </div>
         
        </div>
      </div>
    </div>
    
    </div>
  </>
    );
  }
}

}

