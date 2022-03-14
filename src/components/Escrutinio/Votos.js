import React, { Component } from "react";
import axios from "axios";
import { enviroments } from "../../env";
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "jquery/dist/jquery.min.js";
import { PDFViewer } from "@react-pdf/renderer";
//import PDFViewer from 'pdf-viewer-reactjs'
import { Document, pdfjs, Page, View } from "react-pdf";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";
//import { json2xls } from "json2xls";
//import { fs } from "fs";
//import { CSVLink } from "react-csv";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default class Votos extends Component {
  state = {
    votos: [],
    estadovotos:false,
    page: 1,
    numPages: 0,
    succes: true,
    modal: false,
    opacity: 1,
    mensaje: "",
    titulo: "",
    url: "",
    urlbase: "",
    iframe: "https://cors-imagen.herokuapp.com/https://divulgacione14.registraduria.gov.co",
  
    partido: [],
    partido1: [],
    partido2: [],
    partido3: [],
    partido4: [],
    partido5: [],
    partido6: [],
    partido7: [],
    partido8: [],
    partido9: [],
    partido10: [],
    partido11: [],
    partido12: [],
    partido13: [],
    partido14: [],
    partido15: [],
    partido16: [],
    partido17: [],
   
    nombre1: "",
    nombre2: "",
    nombre3: "",
    nombre4: "",
    nombre5: "",
    nombre6: "",
    nombre7: "",
    nombre8: "",
    nombre9: "",
    nombre10: "",
    nombre11: "",
    nombre12: "",
    nombre13: "",
    nombre14: "",
    nombre15: "",
    nombre16: "",
    nombre17: "",
  
  
  };
  async componentDidMount() {
    console.log("iniciando");
    //"/escrutinio/mesas/:tipo/:departamento/:minucipio/:zona/:puesto/:mesa"
   
    if (this.props.match.params.tipo == "SENADO") {
      this.generarmesassenado();
      this.senado();
    } else {
      this.generarmesascamara();
      this.camara();
     
    }
    this.urlbase();
    
  }
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

 

 

  
  
  generarmesassenado = () => {
    /*console.log(this.props.match.params.tipo);
    console.log(this.props.match.params.departamento);
    console.log(this.props.match.params.municipio);
    console.log(this.props.match.params.zona);
    console.log(this.props.match.params.puesto);
    console.log(this.props.match.params.mesa);
    console.log("this.props.match.params.mesa.length")*/
    
    // CONVERSION
    var codmunicipio = this.conversion(this.props.match.params.codmunicipio);
    var zona = this.conversion(this.props.match.params.zona);
    var mesa = this.conversion(this.props.match.params.mesa);
    // SIN CONVERSION
    var puesto = this.props.match.params.puesto;
    var coddepartamento = this.props.match.params.coddepartamento;
    
    
    //valle senado
    var valle ="https://cors-imagen.herokuapp.com/https://elecciones1.registraduria.gov.co/e14_cong_2018//e14_divulgacion/31/001/001/SEN/E14_SEN_X_31_001_001_XX_01_001_X_XXX.pdf";
    var URL ="https://cors-imagen.herokuapp.com/https://elecciones1.registraduria.gov.co/e14_cong_2018//e14_divulgacion/"+coddepartamento+"/"+codmunicipio+"/" + zona + "/SEN/E14_SEN_X_"+coddepartamento+"_"+codmunicipio+"_" +zona+"_XX_" +puesto+"_"+mesa+ "_X_XXX.pdf";
    
   
 
    this.setState({ url: URL });
  };
  generarmesascamara = () => {
    /*console.log(this.props.match.params.tipo);
    console.log(this.props.match.params.departamento);
    console.log(this.props.match.params.municipio);
    console.log(this.props.match.params.zona);
    console.log(this.props.match.params.puesto);
    console.log(this.props.match.params.mesa);
    console.log("this.props.match.params.mesa.length")*/
    
    // CONVERSION
    var codmunicipio = this.conversion(this.props.match.params.codmunicipio);
    var zona = this.conversion(this.props.match.params.zona);
    var mesa = this.conversion(this.props.match.params.mesa);
    // SIN CONVERSION
    var puesto = this.props.match.params.puesto;
    var coddepartamento = this.props.match.params.coddepartamento;
    
    
    //valle camara
    var valle ="https://cors-imagen.herokuapp.com/https://elecciones1.registraduria.gov.co/e14_cong_2018//e14_divulgacion/31/001/001/CAM/E14_CAM_X_31_001_001_XX_01_001_X_XXX.pdf";
      var URL ="https://cors-imagen.herokuapp.com/https://elecciones1.registraduria.gov.co/e14_cong_2018//e14_divulgacion/"+coddepartamento+"/"+codmunicipio+"/" + zona + "/CAM/E14_CAM_X_"+coddepartamento+"_"+codmunicipio+"_" +zona+"_XX_" +puesto+"_"+mesa+ "_X_XXX.pdf";
    
   
 
    this.setState({ url: URL });
  };
  conversion= (variable) => { 
    
    if(variable.length==1){
      variable = "0" + "0" + variable;
      console.log(variable)
      return variable
    }
    if(variable.length==2){
      variable = "0" + variable;
      console.log(variable)
      return variable
    }
    if(variable.length==3){
      console.log(variable)
      return variable
    }
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
  rendertitulo = () => {
    
    return (
      <>
      <div className="d-flex justify-content-center">
        <div className="card " style={{ width: "80%", height: "40%" }}>
          <div className="card-body">
            <div className="container">
              <h1 className="card-title">{this.props.match.params.tipo}</h1>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h3 className="card-title">
                    Departamento : {this.props.match.params.departamento}
                  </h3>
                </div>
                <div className="col">
                  <h3 className="card-title">
                    Municipio : {this.props.match.params.municipio}
                  </h3>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h3 className="card-title">
                    Zona : {this.props.match.params.zona}
                  </h3>
                </div>
                <div className="col">
                  <h3 className="card-title">
                    Puesto : {this.props.match.params.puesto}
                  </h3>
                </div>
                <div className="col">
                  <h3 className="card-title">
                    Mesa : {this.props.match.params.mesa}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  };

  botonnext = () => {
    if (this.state.numPages != this.state.page) {
      var page = this.state.page + 1;

  
      this.setState({ page: page });
  
    }
  };
  botonprev = () => {
    if (this.state.page != 1) {
      var page = this.state.page - 1;

  
      this.setState({ page: page });
    }
  };
  onDocumentLoadSuccess = (pdf) => {
    this.state.numPages = pdf?.numPages;
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
    
    
 
    
    this.setState((pre) => ({
      ...pre,
      [details]: {
        ...pre.details,
        ["id_postulante"]: name,
        ["votos"]: value,
      },
    }));
  
    
  };
  camara = async () => {
 
    var params = {
      //por aqui voy
      tipo: this.props.match.params.tipo,
      departamento: this.props.match.params.departamento,
      coddepartamento:this.props.match.params.coddepartamento,
      municipio: this.props.match.params.municipio,
      codmunicipio: this.props.match.params.codmunicipio,    
      zona: this.props.match.params.zona,
      puesto: this.props.match.params.puesto,
      mesa: this.props.match.params.mesa,
     
     
    };
    const res = await axios.post(
      enviroments.backendUrl + "/votos/camara",params);
      console.log(res.data[0])
    this.setState({ partido1: res.data[0] });
    this.setState({ partido2: res.data[1] });
    this.setState({ partido3: res.data[2] });
    this.setState({ partido4: res.data[3] });
    this.setState({ partido5: res.data[4] });
    this.setState({ partido6: res.data[5] });
    this.setState({ partido7: res.data[6] });
    this.setState({ partido8: res.data[7] });
    this.setState({ partido9: res.data[8] });
    this.setState({ partido10: res.data[9] });
    this.setState({ partido11: res.data[10] });
    this.setState({ partido12: res.data[11] });
    this.setState({ partido13: res.data[12] });
 
    this.setState({ nombre1: this.state.partido1[0].partidos });
    this.setState({ nombre2: this.state.partido2[0].partidos });
    this.setState({ nombre3: this.state.partido3[0].partidos });
    this.setState({ nombre4: this.state.partido4[0].partidos });
    this.setState({ nombre5: this.state.partido5[0].partidos });
    this.setState({ nombre6: this.state.partido6[0].partidos });
    this.setState({ nombre7: this.state.partido7[0].partidos });
    this.setState({ nombre8: this.state.partido8[0].partidos });
    this.setState({ nombre9: this.state.partido9[0].partidos });
    this.setState({ nombre10: this.state.partido10[0].partidos });
    this.setState({ nombre11: this.state.partido11[0].partidos });
    this.setState({ nombre12: this.state.partido12[0].partidos });
    this.setState({ nombre13: this.state.partido13[0].partidos });

  };

  senado = async () => {
    var params = {
      //por aqui voy
      tipo: this.props.match.params.tipo,
      departamento: this.props.match.params.departamento,
      coddepartamento:this.props.match.params.coddepartamento,
      municipio: this.props.match.params.municipio,
      codmunicipio: this.props.match.params.codmunicipio,    
      zona: this.props.match.params.zona,
      puesto: this.props.match.params.puesto,
      mesa: this.props.match.params.mesa,
     
     
    };
    const res = await axios.post(
      enviroments.backendUrl + "/votos/senado",params);

    console.log(res.data[0])
    this.setState({ partido1: res.data[0] });
    this.setState({ partido2: res.data[1] });
    this.setState({ partido3: res.data[2] });
    this.setState({ partido4: res.data[3] });
    this.setState({ partido5: res.data[4] });
    this.setState({ partido6: res.data[5] });
    this.setState({ partido7: res.data[6] });
    this.setState({ partido8: res.data[7] });
    this.setState({ partido9: res.data[8] });
    this.setState({ partido10: res.data[9] });
    this.setState({ partido11: res.data[10] });
    this.setState({ partido12: res.data[11] });
    this.setState({ partido13: res.data[12] });
    this.setState({ partido14: res.data[13] });
    this.setState({ partido15: res.data[14] });
    this.setState({ partido16: res.data[15] });
    this.setState({ partido17: res.data[16] });
    
   
    // this.setState({ partido: this.state.senado[0].partidos });

    this.setState({ nombre1: this.state.partido1[0].partidos });
    this.setState({ nombre2: this.state.partido2[0].partidos });
    this.setState({ nombre3: this.state.partido3[0].partidos });
    this.setState({ nombre4: this.state.partido4[0].partidos });
    this.setState({ nombre5: this.state.partido5[0].partidos });
    this.setState({ nombre6: this.state.partido6[0].partidos });
    this.setState({ nombre7: this.state.partido7[0].partidos });
    this.setState({ nombre8: this.state.partido8[0].partidos });
    this.setState({ nombre9: this.state.partido9[0].partidos });
    this.setState({ nombre10: this.state.partido10[0].partidos });
    this.setState({ nombre11: this.state.partido11[0].partidos });
    this.setState({ nombre12: this.state.partido12[0].partidos });
    this.setState({ nombre13: this.state.partido13[0].partidos });
    this.setState({ nombre14: this.state.partido14[0].partidos });
    this.setState({ nombre15: this.state.partido15[0].partidos });
    this.setState({ nombre16: this.state.partido16[0].partidos });
    this.setState({ nombre17: this.state.partido17[0].partidos });

  };
  renderpartidos = (senado, partido) => {
    var type;
    if(partido=="Error"){
      type="text";
    
    }else{
      type="number";
    }
    
    return (
      <>
        <div className="card" style={{ width: "500px", height: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">{partido}</h5>{" "}
            {senado.map(({ id_postulante, partidos, numero, votos }) => (
              <div key={id_postulante}>
                <div
                  style={{ width: "10%", height: "5%" }}
                  className="float-sm-left"
                >
                  <input
                    type={type}
                    style={{ width: "100%", height: "6%" }}
                    placeholder={numero}
                    name={id_postulante}
                    onChange={this.votosChange}
                  />
                  {votos}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  urlChange= async (e) => {
    const url = e.target.value;
    console.log(url)
    var params = {
      //por aqui voy
      tipo: this.props.match.params.tipo,
      departamento: this.props.match.params.departamento,
      coddepartamento:this.props.match.params.coddepartamento,
      municipio: this.props.match.params.municipio,
      codmunicipio: this.props.match.params.codmunicipio,    
      zona: this.props.match.params.zona,
      puesto: this.props.match.params.puesto,
      mesa: this.props.match.params.mesa,
      url:"https://cors-imagen.herokuapp.com/"+e.target.value
     
    };
    
    await axios.post(enviroments.backendUrl + "/votos/url",params);
  
    this.setState({urlbase: params.url});
  
    }

    iframeChange= async (e) => {
      const iframe = e.target.value;
      var params = {
        //por aqui voy
        tipo: this.props.match.params.tipo,
        departamento: this.props.match.params.departamento,
        coddepartamento:this.props.match.params.coddepartamento,
        municipio: this.props.match.params.municipio,
        codmunicipio: this.props.match.params.codmunicipio,    
        zona: this.props.match.params.zona,
        puesto: this.props.match.params.puesto,
        mesa: this.props.match.params.mesa,
        iframe:e.target.value
       
      };
      
      //await axios.post(enviroments.backendUrl + "/votos/iframe",params);
      this.setState({iframe: iframe});
    }
    urlbase= async () => {
      
      var params = {
        //por aqui voy
        tipo: this.props.match.params.tipo,
        departamento: this.props.match.params.departamento,
        coddepartamento:this.props.match.params.coddepartamento,
        municipio: this.props.match.params.municipio,
        codmunicipio: this.props.match.params.codmunicipio,    
        zona: this.props.match.params.zona,
        puesto: this.props.match.params.puesto,
        mesa: this.props.match.params.mesa,
       
       
      };
      const res = await axios.post(enviroments.backendUrl + "/votos/url/ver",params);
      
      this.setState({urlbase: res.data});
     
    
      }
  Guardar = async (e) => {
    

    var params = {
      //por aqui voy
      tipo: this.props.match.params.tipo,
      departamento: this.props.match.params.departamento,
      coddepartamento:this.props.match.params.coddepartamento,
      municipio: this.props.match.params.municipio,
      codmunicipio: this.props.match.params.codmunicipio,    
      zona: this.props.match.params.zona,
      puesto: this.props.match.params.puesto,
      mesa: this.props.match.params.mesa,
      partidos:this.state.votos
     
    };
    
      const dato = await axios.post(enviroments.backendUrl + "/votos/conteo", params);
      window.location.reload();
  
    
  };
  render() {
   
    return (
      <>
   
        {this.rendertitulo()}
        <div className="d-flex flex-row">
          <div className="container position-relative" >
          <div className="p-2">
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => this.botonprev()}
              >
                Atras
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => this.botonnext()}
              >
                Siguente
              </button>
              </div>
            </div>
            <div className="">
            <Document  
              file={{ url: this.state.url }}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={this.state.page}  />
     
            </Document>
            <div className="container">
            <div
                  style={{ width: "100%", height: "100%" }}
                  className="float-sm-left"
                >
                  <input type="text"
                    style={{ width: "100%", height: "50px" }}
                   
                    placeholder="URL"
                    name="url"
                    
                    onChange={this.urlChange}
                  ></input>
                  
                </div>
                
                </div>
                
            </div>
            
            <Document  
              file={{ url: this.state.urlbase }}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={this.state.page}  />
     
            </Document>
            <div
                  style={{ width: "100%", height: "100%" }}
                  className="float-sm-left"
                >
                  <input type="text"
                    style={{ width: "100%", height: "50px" }}
                   
                    placeholder="IFRAME"
                    name="iframe"
                    
                    onChange={this.iframeChange}
                  ></input>
                      <div class="embed-responsive embed-responsive-16by9" style={{ width: "100%", height: "500px" }}>
  <iframe class="embed-responsive-item" src={this.state.iframe} allowfullscreen></iframe>
</div>
                </div>
        
    
          </div>
        

          <div className="p-2">
            <div className="d-flex justify-content-around">
              <div className="p-2">
                <div className="row"></div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-primary btn-lg  position-relative"
                    style={{ width: "100%", height: "4%" }}
                    value=""
                    type="submit"
                    name="guardar2"
                    onClick={() => this.Guardar()}
                  >
                    Guardar
                  </button>

                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido1, this.state.nombre1)}
                    {this.renderpartidos(this.state.partido2, this.state.nombre2)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido3, this.state.nombre3)}
                    {this.renderpartidos(this.state.partido4, this.state.nombre4)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido5, this.state.nombre5)}
                    {this.renderpartidos(this.state.partido6, this.state.nombre6)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido7, this.state.nombre7)}
                    {this.renderpartidos(this.state.partido8, this.state.nombre8)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido9, this.state.nombre9)}
                    {this.renderpartidos(this.state.partido10, this.state.nombre10)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido11, this.state.nombre11)}
                    {this.renderpartidos(this.state.partido12, this.state.nombre12)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido13, this.state.nombre13)}
                    {this.renderpartidos(this.state.partido14, this.state.nombre14)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido15, this.state.nombre15)}
                    {this.renderpartidos(this.state.partido16, this.state.nombre16)}
                  </div>
                  <div className="d-flex justify-content-between">
                    {this.renderpartidos(this.state.partido17, this.state.nombre17)}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      </>
    );
  }
}
