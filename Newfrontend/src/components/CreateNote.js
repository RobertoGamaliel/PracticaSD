import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useParams } from "react-router-dom";



import 'react-datepicker/dist/react-datepicker.css'
function parametros(Component){
    return props => <Component {...this.props} useParams={useParams()}/>;
}

const Parametros = parametros();

export default class CreateNote extends Component {
    
    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: '',
        refrescos: 0,
        contra: '',
        contrasena: '',
        error: ''
    }




    async componentDidMount() {
        
        console.log("props CreateNote",Parametros.props);

        const res = await axios.get("https://practicasd2022.herokuapp.com/api/users");
        this.setState({
            users: res.data,
            userSelected: res.data[0].username,
            contrasena: res.data[0].contrasena

        })
        /*if (this.props.match.params.id) {
            const res = await axios.get('https://practicasd2022.herokuapp.com/api/notes/' + this.props.params.id);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.params.id,
            })
        }*/
    }

    onSubmit = async (e) => {
        if (this.state.contrasena !== this.state.contra) {
            this.setState({
                error: "ERROR CON LA CONTRASEÑA"
            });
            return false;

        }
        if (this.state.error === '' && this.state.content.length === 0) {
            this.setState({
                error: "LA NOTA NO TIENE CONTENIDO"
            });
            return false;
        
        }

        if (this.state.error === '' && this.state.title.length === 0) {
            this.setState({
                error: "LA NOTA DEBE TENER UN TITULO"
            });
            return false;

        }
        
        if (this.state.error === '') {
            e.preventDefault();

            //Enviando al backend
            const newNote = {
                title: this.state.title,
                content: this.state.content,
                date: this.state.date,
                author: this.state.userSelected,
            }//en caso de editar
            if (this.state.editing) {
                await axios.put("https://practicasd2022.herokuapp.com/api/notes/" + this.state._id, newNote)
            } else {
                await axios.post("https://practicasd2022.herokuapp.com/api/notes", newNote);
            }
            window.location.href = '/'; //Colocar en la pantalla inicial
            return true;
        }
        return false;
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });


        for (let index = 0; index < this.state.users.length; index++) {
            if (this.state.users[index].username === e.target.value) {
                this.setState({
                    contrasena: this.state.users[index].contrasena
                });
                break;
            }

        }

    }

    onChangeDate = date => {
        this.setState({ date: date, })
    }

    pantallaAlerta() {
        if (this.state.contrasena !== '')
            return (
                <div className='row pt-3 pb-3'>
                    <div className="col-md-3 "></div>
                    <div className="col-md-6 ">
                        <div className="alert alert-warning shadow text-center" role="alert">
                            PARA AGREGAR NOTAS CON ESTE USUARIO DEBERA INTRODUCIRR SU CONTRASEÑA
                        </div>
                    </div>
                    <div className="col-md-3 "></div>
                </div>
            );
        else { <div className='row pt-3 pb-3'>{""}</div> }
    }

    render() {
        return (
            <div className='row justify-content-md-center' >
                
                {this.pantallaAlerta()}
                <div className="col-md-5 mt-5">
                    <div className="card card-body p-3" id='formularioNota'>
                        <h4 className='d-flex justify-content-center'>Agregar nota {this.state.contra}</h4>
                        <div className="dropdown-divider"></div>

                        <div className='row justify-content-center'>
                            <div className="col-md-1  p-1"></div>

                            <div className="col-md-10 p-1">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group" >
                                        <select
                                            className="form-control mb-2"
                                            name="userSelected"
                                            onChange={this.onInputChange} //seleccion de usuario
                                            value={this.state.userSelected}>
                                            {
                                                this.state.users.map(
                                                    user =>
                                                        <option key={user._id} value={user.username} >
                                                            {user.username}
                                                        </option>
                                                )
                                            }
                                        </select>
                                        <input
                                            required
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Titulo de la nota"
                                            name="title"
                                            onChange={this.onInputChange}
                                            value={this.state.title}
                                        />
                                        <textarea
                                            required
                                            className="form-control p-3 mb-2 "
                                            placeholder="Contenido de la nota"
                                            name="content"
                                            onChange={this.onInputChange} //ingreso de fecha
                                            value={this.state.content}
                                        />
                                        {
                                            this.state.contrasena !== '' ? (
                                                <input
                                                required
                                                type="password"
                                                className="form-control mb-2"
                                                placeholder="CONTRASEÑA (OBLIGATORIO)"
                                                name="contra"
                                                value={this.state.contra}
                                                onChange={this.onInputChange}

                                        />
                                            ) : ""
                                        }
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.date}
                                            onChange={this.onChangeDate} //cambio de fecha
                                        />


                                    </div>
                                    <button type="submit" className="btn btn-primary position-relative bottom-0 start-50 translate-middle-x" id='botonGuardar'>
                                    Guardar nota
                                </button>
                                </form>
                            </div>

                            <div className="col-md-1  p-1"></div>
                        </div>


                        <div className='row justify-content-center'>
                            <form onSubmit={this.onSubmit}>
                                
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
