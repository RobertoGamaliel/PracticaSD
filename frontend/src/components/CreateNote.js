import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' 

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data,
            userSelected: res.data[0].username

        })
        if (this.props.params.id) {
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.params.id);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.params.id
            })
        }
    }

    onSubmit = async (e) => {
        if(this.state.content.length===0){
             alert("La nota debe tener contenido");
             return;
        }

        if(this.state.title.length===0){
            alert("La nota debe tener un titulo");
            return;
       }
       
        e.preventDefault();
        //Enviando al backend
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }//en caso de editar
        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
        } else {
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/'; //Colocar en la pantalla inicial
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date })
    }

    render() {
        return (
            <div className='row' >
                <div className="col-md-8 offset-md-2 p-5">
                    <div className="card card-body p-3" id='formularioNota'>
                        <h4 className='d-flex justify-content-center'>Agregar nota</h4>
                        <div class="dropdown-divider"></div>
                        <div className='row justify-content-center'>
                            <div className="col-md-3  p-1"></div>
                            <div className="col-md-6 p-1">
                                <select
                                    className="form-control"
                                    name="userSelected"
                                    onChange={this.onInputChange} //seleccion de usuario
                                    value={this.state.userSelected}>
                                    {
                                        this.state.users.map(
                                            user =>
                                                <option key={user._id} value={user.username}>
                                                    {user.username}
                                                </option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-md-3  p-1"></div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className="col-md-3  p-1"></div>
                            <div className="col-md-6 p-1">

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Titulo de la nota"
                                        name="title"
                                        onChange={this.onInputChange}
                                        value={this.state.title}
                                        required
                                    />
                                </div>
                            
                            </div>
                            <div className="col-md-3  p-1"></div>
                        </div>

                        <div className="form-group p-4">
                            <textarea
                                className="form-control p-5"
                                placeholder="Contenido de la nota"
                                name="content"
                                onChange={this.onInputChange} //ingreso de fecha
                                value={this.state.content}
                                required
                            />
                        </div>
                        <div className='row justify-content-center'>
                            <div className="col-md-4  p-1"></div>
                            <div className="col-md-4 p-1">
                                <div className="form-group p-2">
                                    <DatePicker
                                        className="form-control"
                                        selected={this.state.date}
                                        onChange={this.onChangeDate} //cambio de fecha
                                    />
                                </div>
                            </div>
                            <div className="col-md-4  p-1 "></div>
                        </div>
                        <div className='row justify-content-center'>
                            <form onSubmit={this.onSubmit}>
                                <button type="submit" className="btn btn-primary position-relative bottom-0 start-50 translate-middle-x"  id='botonGuardar'>
                                    Guardar nota
                                </button>
                            </form> 
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
