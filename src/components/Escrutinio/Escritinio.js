import React, { Component } from "react";
import axios from "axios";
import { enviroments } from "../../env";
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { Document, pdfjs, Page, View } from "react-pdf";
import "jquery/dist/jquery.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";
import { json2xls } from "json2xls";
import { fs } from "fs";
import { CSVLink } from "react-csv";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const styles =({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});
export default class Escritinio extends Component {
  state = {
    csvsena: [],
    csvcamara: [],
    tipo: "SENADO",
    departamento: "",
    codigodepartamento: "",
    municipio: "",
    codigomunicipio: "",
    zona: "",
    puesto: "",
    mesa: "",
    estado: false,
    success: false,
    divipoldepartamento: [],
    divipolmunicipio: [],
    divipolzona: [],
    divipolpuesto: [],
    divipolmesas: [],
    datos: [],
  };

  onSubmit = async (e) => {
    e.preventDefault();
  };

  zonaChange = async (e) => {
    this.setState({ zona: e.target.value });

    var params = {
      zona: e.target.value,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
    };
    //  this.setState({divipolmesas: []});
    const res = await axios.post(
      enviroments.backendUrl + "/divipol/unpuesto",
      params
    );
    this.setState({ divipolpuesto: res.data });
  };
  puestoChange = async (e) => {
    this.setState({ puesto: e.target.value });
    var params = {
      pp: e.target.value,
      zona: this.state.zona,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
    };

    const res = await axios.post(
      enviroments.backendUrl + "/divipol/mesas",
      params
    );
   
    if (res.data[0] == null) {
      this.setState({ divipolmesas: [] });
    } else {
      var cosas = [];
      for (var i = 1; i <= res.data[0].mesas; i++) {
        var params = {
          tipo: this.state.tipo,
    
          departamento: this.state.departamento,
          codigodepartamento: this.state.codigodepartamento,
          municipio: this.state.municipio,
          codigomunicipio: this.state.codigomunicipio,
          zona: this.state.zona,
          puesto: this.state.puesto,
          mesa: i,
        };
        const res = await axios.post(
          enviroments.backendUrl + "/escrutinio/estado/",
          params
        );
        cosas.push({numero:i,estado:res.data});
       
      }
     
      this.setState({ divipolmesas: cosas });
    }
  };

  
  tipoChange = async (e) => {
    this.setState({ tipo: e.target.value });

   
    var params = {
      pp: this.state.puesto,
      zona: this.state.zona,
      departamento: this.state.departamento,
      municipio: this.state.municipio,
    };

    const res = await axios.post(
      enviroments.backendUrl + "/divipol/mesas",
      params
    );
    console.log(res.data[0])
    if (res.data[0] == null) {
      this.setState({ divipolmesas: [] });
    } else {
      var cosas = [];
      for (var i = 1; i <= res.data[0].mesas; i++) {
        var params = {
          tipo: this.state.tipo,
    
          departamento: this.state.departamento,
          codigodepartamento: this.state.codigodepartamento,
          municipio: this.state.municipio,
          codigomunicipio: this.state.codigomunicipio,
          zona: this.state.zona,
          puesto: this.state.puesto,
          mesa: i,
        };
        const res = await axios.post(
          enviroments.backendUrl + "/escrutinio/estado/",
          params
        );
        cosas.push({numero:i,estado:res.data});
       
      }
      console.log(cosas)
      this.setState({ divipolmesas: cosas });
    }
    

  };
  departamentoChange = async (e) => {
    const obj = JSON.parse(e.target.value);
    

    this.setState({ codigodepartamento: obj.dd });

    this.setState({ departamento: obj.departamento });

    this.setState({ municipio: "" });
    this.setState({ zona: "" });
    this.setState({ puesto: "" });
    this.setState({ divipolmesas: [] });
    var params = { departamento: obj.departamento, municipio: null };
    const res = await axios.post(
      enviroments.backendUrl + "/divipol/unmunicipio",
      params
    );
    this.setState({ divipolmunicipio: res.data });
  };
  municipioChange = async (e) => {
    const obj = JSON.parse(e.target.value);
   
    this.setState({ codigomunicipio: obj.mm });
    this.setState({ municipio: obj.municipio });
    this.setState({ divipolmesas: [] });
    var params = {
      municipio: obj.municipio,
      departamento: this.state.departamento,
    };
    const res = await axios.post(
      enviroments.backendUrl + "/divipol/unazona",
      params
    );
    this.setState({ divipolzona: res.data });
  };
  rendermunicipio = () => {
    return this.state.divipolmunicipio.map((divipol) => (
      <option key={divipol.municipio}>{divipol.municipio}</option>
    ));
  };
  renderunazona = () => {
    return this.state.divipolzona.map((divipol) => (
      <option key={divipol.zz}>{divipol.zz}</option>
    ));
  };
  renderunpuesto = () => {
    return this.state.divipolpuesto.map((divipol) => (
      <option key={divipol.pp} value={divipol.pp}>
        {divipol.pp} - {divipol.nombre_puesto}
      </option>
    ));
  };

  mostrardepartamentos = async () => {
    const res = await axios.get(
      enviroments.backendUrl + "/divipol/departamento"
    );
    this.setState({ divipoldepartamento: res.data });
  };

  async componentDidMount() {
    console.log("iniciando");
    this.mostrardepartamentos();
    this.excel();
  }
  excel=async()=>{
   
    const res = await axios.post(enviroments.backendUrl + '/escrutinio/Excel');

    this.setState({csvsena: res.data.excel});
    this.setState({csvcamara: res.data.excel2});
    
   }
  
  borrar = async (id) => {
   
    await axios.delete(enviroments.backendUrl + "/votos/" + id);

    this.reclamos();
  };
  onDocumentLoadSuccess = (pdf) => {
    this.state.estado = true;
  };
  succes = async (mesa) => {
    var params = {
      tipo: this.state.tipo,

      departamento: this.state.departamento,
      codigodepartamento: this.state.codigodepartamento,
      municipio: this.state.municipio,
      codigomunicipio: this.state.codigomunicipio,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: mesa,
    };
    const res = await axios.post(
      enviroments.backendUrl + "/escrutinio/estado/",
      params
    );
  
    return res.data
    // this.setState({ success: res.data });
   //this.state.success=true;
    
  };

  renderbotonmesa =  (numero,estado)  => {
  
    var params = {
      tipo: this.state.tipo,

      departamento: this.state.departamento,
      codigodepartamento: this.state.codigodepartamento,
      municipio: this.state.municipio,
      codigomunicipio: this.state.codigomunicipio,
      zona: this.state.zona,
      puesto: this.state.puesto,
      mesa: numero.toString(),
    };
    
    var codmunicipio = this.conversion(this.state.codigomunicipio);
    var zona = this.conversion(this.state.zona);
    var mesas = this.conversion(numero.toString());

    
    var URL;
    //aqui para poner el voton en verde
    if(this.state.tipo=="SENADO"){
       URL ="https://cors-imagen.herokuapp.com/https://elecciones1.registraduria.gov.co/e14_cong_2018//e14_divulgacion/"+this.state.codigodepartamento+"/"+codmunicipio+"/" + zona + "/SEN/E14_SEN_X_"+this.state.codigodepartamento+"_"+codmunicipio+"_" +zona+"_XX_" +this.state.puesto+"_"+mesas+ "_X_XXX.pdf";
    }else{
       URL ="https://cors-imagen.herokuapp.com/https://elecciones1.registraduria.gov.co/e14_cong_2018//e14_divulgacion/"+this.state.codigodepartamento+"/"+codmunicipio+"/" + zona + "/CAM/E14_CAM_X_"+this.state.codigodepartamento+"_"+codmunicipio+"_" +zona+"_XX_" +this.state.puesto+"_"+mesas+ "_X_XXX.pdf";
     
    }
  
   // this.setState({ url: "https://elecciones1.registraduria.gov.co/e14_cong_2018//e14_divulgacion/31/001/001/SEN/E14_SEN_X_31_001_001_XX_01_001_X_XXX.pdf" });
 
   if(estado){
    return (
      
      <>
   
   <div className="container">
       <Link className="nav-link h5 btn btn-success ml-4 "to={"/escrutinio/mesas/" +params.tipo +"/" +params.departamento +"/" +params.municipio +"/" + params.codigodepartamento + "/" + params.codigomunicipio + "/" + params.zona + "/" + params.puesto + "/" +  params.mesa }
      >
        {" "}
        Mesa{numero}
        
      </Link>
    
  <div className="container">
  <Document className=" "
         file={{ url: URL}}
         onLoadSuccess={this.onDocumentLoadSuccess}
        
       >
         <Page pageNumber={1} className=" canvas"/>
         
         
       </Document>
  </div>
  </div>
       </>
    );}else{
      return (
      
        <>
     
     <div className="container">
         <Link className="nav-link h5 btn btn-danger ml-4 "to={"/escrutinio/mesas/" +params.tipo +"/" +params.departamento +"/" +params.municipio +"/" + params.codigodepartamento + "/" + params.codigomunicipio + "/" + params.zona + "/" + params.puesto + "/" +  params.mesa }
        >
          {" "}
          Mesa{numero}
          
        </Link>
      
    <div className="container">
    <Document className=" "
           file={{ url: URL}}
           onLoadSuccess={this.onDocumentLoadSuccess}
          
         >
           <Page pageNumber={1} className=" canvas"/>
           
           
         </Document>
    </div>
    </div>
         </>
      );
    }
  };
  conversion= (variable) => { 
    
    if(variable.length==1){
      variable = "0" + "0" + variable;
     
      return variable
    }
    if(variable.length==2){
      variable = "0" + variable;
      
      return variable
    }
    if(variable.length==3){
     
      return variable
    }
  };
  render() {
   
    return (
      <>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                <select
                  className="browser-default custom-select"
                  type="onSubmit"
                  name="tipo"
                  value={this.state.tipo}
                  onChange={this.tipoChange}
                >
                  <option>SENADO</option>
                  <option>CAMARA</option>
                </select>
              </th>
              <th scope="col">
                <select
                  className="browser-default custom-select"
                  type="onSubmit"
                  name="departamento"
                  onChange={this.departamentoChange}
                >
                  <option value={JSON.stringify("")}>DEPARTAMENTO</option>

                  {this.state.divipoldepartamento.map((divipol) => (
                    <option
                      key={divipol.departamento}
                      value={JSON.stringify(divipol)}
                    >
                      {divipol.departamento}
                    </option>
                  ))}
                </select>
              </th>
              <th scope="col">
                <select
                  className="browser-default custom-select"
                  type="onSubmit"
                  name="municipio"
                  onChange={this.municipioChange}
                >
                  <option value={JSON.stringify("")}>MUNICIPIO</option>
                  {this.state.divipolmunicipio.map((divipol) => (
                    <option
                      key={divipol.municipio}
                      value={JSON.stringify(divipol)}
                    >
                      {divipol.municipio}
                    </option>
                  ))}
                </select>
              </th>

              <th scope="col">
                <select
                  className="browser-default custom-select"
                  type="onSubmit"
                  value={this.state.zona}
                  onChange={this.zonaChange}
                >
                  <option value="">ZONA</option>
                  {this.renderunazona()}
                </select>
              </th>
              <th scope="col">
                <select
                  className="browser-default custom-select"
                  type="onSubmit"
                  value={this.state.puesto}
                  onChange={this.puestoChange}
                >
                  <option value="">PUESTO</option>
                  {this.renderunpuesto()}
                </select>
              </th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>
        <div className="container">
          <div className="abs-center2 ">
            <div className="col-md-12 mx-auto  ">
              <div className="card text-center ">
                <div className="card-header">
                {this.state.divipolmesas.map(({numero, estado }) => (
               <div className="container float-sm-left" style={{ width: "20%", height: "100%" }} key={numero}>
               <div className="container "
                 style={{ width: "100%", height: "100%" }}
                 
               >
                 {" "}
                 {this.renderbotonmesa(numero,estado)}
               </div>
               </div>
                ))} 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-start" style={{ width: "80%", height: "400px", margin: "20px"  }}>
          <div className="p-2">
          <ExcelFile filename="COMISIONES SENADO" element={<button className="btn btn-info glyphicon glyphicon-download-alt"  style={{ width: "150%", height: "150%" }}  key= {110}  >  </button>}>
                <ExcelSheet data={this.state.csvsena}  name="Employees" >
                <ExcelColumn label="Tipo"
                       value={(data) => data.tipo }/>
                        <ExcelColumn label="dd"
                       value={(data) => data.dd }/>
                        <ExcelColumn label="mm"
                       value={(data) => data.mm }/>
                       <ExcelColumn label="zz"
                       value={(data) => data.zz }/>
                       <ExcelColumn label="pp"
                       value={(data) => data.pp }/>
                        <ExcelColumn label="Mesa"
                       value={(data) => data.mesa }/>
                       <ExcelColumn label="Departamento"
                       value={(data) => data.departamento }/>
                       <ExcelColumn label="Municipio"
                       value={(data) => data.municipio }/>
                       <ExcelColumn label="Partido"
                       value={(data) => data.partidos }/>
                       <ExcelColumn label="Origen"
                       value={(data) => data.origen }/>
                       <ExcelColumn label="Comision"
                       value={(data) => data.comision }/>
                       <ExcelColumn label="Casilla"
                       value={(data) => data.casilla }/>
                       <ExcelColumn label="Voto"
                       value={(data) => data.votos }/>
                      
                     
                       
                  
              
                   
                </ExcelSheet>
               
            </ExcelFile>
            </div>
            <div className="p-2">
            <ExcelFile filename="COMISIONES CAMARA" element={<button className="btn btn-info glyphicon glyphicon-download-alt botonexcel2" style={{ width: "90%", height: "150%" }}  key= {110}  >  </button>}>
                <ExcelSheet data={this.state.csvcamara}  name="Employees" >
                       <ExcelColumn label="Tipo"
                       value={(data) => data.tipo }/>
                        <ExcelColumn label="dd"
                       value={(data) => data.dd }/>
                        <ExcelColumn label="mm"
                       value={(data) => data.mm }/>
                       <ExcelColumn label="zz"
                       value={(data) => data.zz }/>
                       <ExcelColumn label="pp"
                       value={(data) => data.pp }/>
                       <ExcelColumn label="Mesa"
                       value={(data) => data.mesa }/>
                       <ExcelColumn label="Departamento"
                       value={(data) => data.departamento }/>
                       <ExcelColumn label="Municipio"
                       value={(data) => data.municipio }/>
                       <ExcelColumn label="Partido"
                       value={(data) => data.partidos }/>
                       <ExcelColumn label="Origen"
                       value={(data) => data.origen }/>
                       <ExcelColumn label="Comision"
                       value={(data) => data.comision }/>
                       <ExcelColumn label="Casilla"
                       value={(data) => data.casilla }/>
                       <ExcelColumn label="Voto"
                       value={(data) => data.votos }/>
                      
                      
                  
              
                   
                </ExcelSheet>
               
            </ExcelFile>
            </div>
            
            </div>
      </>
    );
  }
}
