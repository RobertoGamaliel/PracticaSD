import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NotesList extends Component {

  state = {
    notes: [],
    todas:[],
    users:[],
  }

  componentDidMount() {
    this.getNotes().then(async ()=>{
      const res2 = await axios.get('http://localhost:4000/api/users');
      this.setState({ users:res2.data});
    });
  }
  
  async getNotes() {
    const res = await axios.get('http://localhost:4000/api/notes');
    //;
    var todas=[];
    res.data.forEach((nota)=>{
      todas.push(nota);
    });

    this.setState({ notes: res.data,todas:todas});
  }

  filtrarNotas(id){
    
    var filtradas=[];
    this.state.todas.forEach((nota)=>{
      if(id===nota.author){
        filtradas.push(nota);
        
      }
    });
    this.setState({ notes: filtradas});
    /*
    alert(filtradas);
    */
  }

  todasLasNotas(){
    
    var filtradas=[];
    this.state.todas.forEach((nota)=>{
        filtradas.push(nota);
    });
    this.setState({ notes: filtradas});
    /*
    alert(filtradas);
    */
  }

  deleteNote = async (id) => {
    await axios.delete('http://localhost:4000/api/notes/' + id);
    this.getNotes();
  }

  editNote = async (id) => {
    await axios.post('http://localhost:4000/api/notes/' + id);
    this.getNotes();
  }


  render() {
    return (
      <div className='row' id='rowFondo'>
        <div className='col-10'> 
          <div className="row" >
              {
                this.state.notes.map(note => (
                  <div className="col-md-4 p-4" key={note._id} >
                    <div className="card bg-Light" id='Tarjeta'>
                      <div className="card-body " id="fondoTarjeta">
                      <div className="position-relative">
                      
                        <h5 className='d-flex justify-content-center'>{note.title}</h5>
                        <div class="dropdown-divider"></div>
                        <p1 className=" pb-2">{format(note.date)}</p1><br/>
                        <p2>{note.content}</p2><br/>
                        <p3 className='d-flex justify-content-end'>{note.author}</p3>
                        
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between" >
                        <button
                          className="btn btn-secondary"
                          onClick={() => this.deleteNote(note._id)} id="botonEliminar"
                        >
                          Eliminar
                        </button>
                        <Link className="btn btn-secondary" to={"/edit/" + note._id} id="botonEditar">
                          Editar
                        </Link>
                      </div>


                    </div>
                </div>
              ))
            }
          </div>
        </div>
          
        <div className='col-2' id='columnaUsuarios'> 
            <div className='row'><h5 id='encabezadoNotas'>FILTRAR NOTAS</h5></div>
            <div className='row pe-1'><p4>PULSE EL NOMBRE DEL USUARIO PARA MOSTRAR SOLO LAS QUE DICHO USUARIO CREÓ</p4></div>
            <div class="dropdown-divider bg-light pe-5 ps-4"></div>

          {
            this.state.users.map(user => (
              <div className='row me-4 mt-3 ms-4'>
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
