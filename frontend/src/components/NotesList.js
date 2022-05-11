import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'


export default class NotesList extends Component {

  state = {
    notes: [],
    todas: [],
    users: [],
    contra: '',
    error: ''
  }

  componentDidMount() {
    console.log("props NotesList",this.props);
    this.getNotes().then(async () => {
      const res2 = await axios.get('http://localhost:80/api/users');
      this.setState({ users: res2.data });
    });
  }

  async getNotes() {
    const res = await axios.get('http://localhost:80/api/notes');
    //;
    var todas = [];
    res.data.forEach((nota) => {
      todas.push(nota);
    });

    this.setState({ notes: res.data, todas: todas,error:"" });
  }

  filtrarNotas(id) {

    var filtradas = [];
    this.state.todas.forEach((nota) => {
      if (id === nota.author) {
        filtradas.push(nota);

      }
    });
    this.setState({ notes: filtradas,error:"" });
   
  }

  todasLasNotas() {

    var filtradas = [];
    this.state.todas.forEach((nota) => {
      filtradas.push(nota);
    });
    this.setState({ notes: filtradas,error:"" });
  }

  puedeBorrarse = async (id) => {
    var contras = this.extraerContrasena(id);
    console.log("contraseña recibida ",contras);
    if (this.state.contra !== contras) {
      this.setState({ error: "ERROR CON LA CONTRASEÑA", contra: '' });
    }else{
      this.setState({ error: "", contra: '' });
      await this.deleteNote(id);
    }
  }

  extraerContrasena(id) {
    var contrasena = '';
    var usu;

    for (let i = 0; i < this.state.todas.length; i++) {
      const element = this.state.todas[i];

      if (element._id === id) {
        usu = element.author;
      }
    }

    if (usu === null) return "";
    for (let index = 0; index < this.state.users.length; index++) {

      const element = this.state.users[index];

      if (element.username === usu) {
        if (element.contrasena !== '') {
          contrasena = element.contrasena;
        }
        index = 10000000;
      }
    }

    return contrasena;
  }

  deleteNote = async (id) => {
    await axios.delete('http://localhost:80/api/notes/' + id);
    this.getNotes();
  }

  editNote = async (id) => {
    await axios.post('http://localhost:80/api/notes/' + id);
    this.getNotes();
  }

  passNota = (id) => {

    var resp = this.extraerContrasena(id);

    var contrasena = false;

    if (resp !== '') {
      contrasena = true;
    }

    if (contrasena === true) {
      return (
        <input type="password"
          key={id}
          placeholder='Contraseña'
          id="password"
          className="form-control ms-5 me-5"
          value={this.state.contra}
        onChange={this.onChangeContrasena }
        />
      );
    } else {
      return "";
    }
  }

  

  onChangeContrasena = (e) => {
    this.setState({
      contra: e.target.value,error:''
    })
  }


  render() {
    return (
      <div className='row' id='rowFondo'>

        <div className='col-9'>
          <div className='row'>
            {
              this.state.error!==''?(
                <div className="alert alert-warning text-center mt-4 shadow fs-4" role="alert">
              {this.state.error}
            </div>
              ):""
            } 
             
          </div>
          <div className="row" >
            { 
              this.state.notes.map(note => (
                <div className="col-md-4 p-4" key={note._id} >
                  <div className="card bg-Light" id='Tarjeta'>
                    <div className="card-body " id="fondoTarjeta">
                      <div className="position-relative">

                        <h5 className='d-flex justify-content-center'>{note.title}</h5>
                        <div className="dropdown-divider"></div>
                        <p id="p1" className=" pb-2">{format(note.date)}</p><br />
                        <p id="p2">{note.content}</p><br />
                        <p id="p3" className='d-flex justify-content-end'>{note.author}</p>

                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between" >
                      <button
                        className="btn btn-secondary"
                        onClick={() => this.puedeBorrarse(note._id)} id="botonEliminar"
                      >
                        Eliminar
                      </button>
                      {this.passNota(note._id)}

                      <Link className="btn btn-secondary" to={"/edit/" + note._id+"/"} id="botonEditar" >
                        Editar
                      </Link>
                    </div>


                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className='col-3' id='columnaUsuarios'>
          <div className='row'><h5 id='encabezadoNotas'>FILTRAR NOTAS</h5></div>
          <div className='row pe-1'><p id="p4">PULSE EL NOMBRE DEL USUARIO PARA MOSTRAR SOLO LAS QUE DICHO USUARIO CREÓ</p></div>
          <div className="dropdown-divider bg-light pe-5 ps-4"></div>

          {
            this.state.users.map(user => (
              <div className='row me-4 mt-3 ms-4' key={user._id}>
                <button
                  className="btn btn-secondary"
                  onClick={() => this.filtrarNotas(user.username)}
                >
                  {user.username}
                </button>
              </div>
            ))
          }

          <div className='row me-5 mt-5 ms-5'>
            <button className="btn btn-secondary" onClick={() => this.todasLasNotas()}>
              TODAS LAS NOTAS
            </button>
          </div>

        </div>
      </div>
    )
  }
}
