import React, { Component } from 'react'
import axios from 'axios'
export default class CreateUser extends Component {

  state = {
    users: [],
    username: '',
    comentario: '',
    contrasena: '',
    sexo: null,
    errores: '',
    pantallaCarga: '',
    cs: ''
  }

  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    this.setState({ pantallaCarga: 'OBTENIENDO USUARIOS...' });
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({ users: res.data, pantallaCarga: '' });

  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onChangeContrasna = (e) => {
    this.setState({
      contrasena: e.target.value
    })
  }

  onChangeComentario = (e) => {
    this.setState({
      comentario: e.target.value
    })
  }

  onChangeSexo1 = (e) => {
    if (e.target.value === 'on') {
      this.setState({
        sexo: 1
      })
    }
  }

  onChangeSexo2 = (e) => {
    if (e.target.value === 'on') {
      this.setState({
        sexo: 2
      })
    }
  }

  onChangeSexo3 = (e) => {
    if (e.target.value === 'on') {
      this.setState({
        sexo: 3
      })
    }
  }

  onSubmit = async (e) => {

    this.setState({ pantallaCarga: 'UN MOMENTO, ESTAMOS CREANDO EL NUEVO USUARIO...' });
    if (this.state.sexo === null) {
      this.setState({ errores: "NO HA SELECCIONADO UN SEXO PARA EL NUEVO USUARIO", pantallaCarga: '' });
      return false;
    }


    var _repetido = false;
    this.state.users.forEach((user) => {
      if (user.username === this.state.username.toUpperCase()) {
        _repetido = true;
      }
    });
    if (_repetido === true) {
      this.setState({ errores: "EL USUARIO QUE TRATA DE INGRESAR YA EXISTE", pantallaCarga: '' });
      return false;
    }

    if (this.state.errores !== "") return false;

    this.setState({ pantallaCarga: 'PUBLICANDO EL NUEVO USUARIO...' });
    e.preventDefault();
    await axios.post('http://localhost:4000/api/users', {
      username: this.state.username,
      sexo: this.state.sexo,
      comentario: this.state.comentario,
      contrasena: this.state.contrasena
    });
    this.setState({ username: '', comentario: '', contrasena: '', pantallaCarga: '' });
    this.getUsers();
    return true;
  }

  deleteUser = async (id, cont) => {

    if (cont !== this.state.cs) {
      this.setState({ errores: "ERROR CON LA CONTRASEÑA", pantallaCarga: '', cs: '' });
    } else {

      this.setState({ pantallaCarga: 'UN MOMENTO, ELIMINANDO AL USUARIO...' });
      await axios.delete('http://localhost:4000/api/users/' + id);
      this.setState({ pantallaCarga: '', errores: '', cs: '' });
      this.getUsers();
    }

  }

  iconoDeContraseña(id) {
    if (id !== "") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        </svg>
      )
    }

    else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-unlock-fill" viewBox="0 0 16 16">
          <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
        </svg>
      )
    }
  }

  pantallaCarga() {
    if (this.state.errores !== '')
      return (
        <div className='row pt-3 pb-3'>
          <div className="col-md-3 "></div>
          <div className="col-md-6 ">
            <div className="alert alert-warning shadow text-center" role="alert">
              {this.state.errores}
            </div>
          </div>
          <div className="col-md-3 "></div>
        </div>
      );
    else if (this.state.pantallaCarga !== '')
      return (
        <div className='row pt-3 pb-3'>
          <div className="col-md-3 "></div>
          <div className="col-md-6 ">
            <div className="alert alert-light shadow text-center" role="alert">
              {this.state.pantallaCarga}
            </div>
          </div>
          <div className="col-md-3 "></div>
        </div>
      );
    else { <div className='row pt-3 pb-3'>{""}</div> }
  }

  iconoSexo(sexo) {
    if (sexo === 3) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gender-trans" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1.707L3.5 2.793l.646-.647a.5.5 0 1 1 .708.708l-.647.646.822.822A3.99 3.99 0 0 1 8 3c1.18 0 2.239.51 2.971 1.322L14.293 1H11.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 0 1-3.05-5.814l-.95-.949-.646.647a.5.5 0 1 1-.708-.708l.647-.646L1 1.707V3.5a.5.5 0 0 1-1 0v-3zm5.49 4.856a3 3 0 1 0 5.02 3.288 3 3 0 0 0-5.02-3.288z" />
        </svg>
      )
    }

    else if (sexo === 2) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gender-female" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
        </svg>
      )
    }

    else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gender-male" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        </svg>
      )
    }

  }

  render() {
    return (

      <div className="row">
        {this.pantallaCarga()}
        <div className="col-md-2 "></div>
        <div className="col-md-4 p-5 mb-5">
          <div className="card card-body rounded shadow">
            <h3 className='text-dark text-center'>Nuevo usuario </h3>

            <p className='text-secondary'>En esta sección usted podrá dar de alta nuevos usuarios, no olvide ingresar todos los datos solicitados</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group ps-5 pe-5 pt-2 pb-2">
                <input required
                  type="text"
                  id="nombres"
                  placeholder='Nombre del nuevo usuario'
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
                <input type="password"
                  placeholder='Contraseña (opcional)'
                  id="password"
                  className="form-control mt-3"
                  value={this.state.contrasena}
                  onChange={this.onChangeContrasna}
                />
                <textarea type="text"
                  placeholder='descripción (opcional)'
                  id="descripcion"
                  rows="2"
                  className="form-control mt-3"
                  value={this.state.comentario}
                  onChange={this.onChangeComentario}
                ></textarea>
                <div className='row mx-auto'>
                  <h5 className='font-weight-bold mt-3'>Sexo</h5>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={this.onChangeSexo1} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Hombre
                    </label>

                  </div>
                  <div className="form-check" >
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={this.onChangeSexo2} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Mujer
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={this.onChangeSexo3} />
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                      Otro
                    </label>
                  </div>
                </div>
              </div>

              <button  className="btn btn-primary ms-5 mt-3" id='botonGuardar' onClick={()=>this.onSubmit}>
                CREAR NUEVO USUARIO
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-5 pt-5 mb-5">

          <ul className="list-group">
            <p id='listaUsuarios' className='pt-1 pb-1 ms-3 me-3'> {this.state.pantallaCarga === "OBTENIENDO USUARIOS..." || this.state.pantallaCarga === "UN MOMENTO, ESTAMOS CREANDO EL NUEVO USUARIO..." ? "UN MOMENTO" : this.state.users.length > 0 ? 'USUARIOS REGISTRADOS' : 'SIN USUARIOS REGISTRADOS'}</p>
            {
              this.state.users.map(user => {

                return (
                  <li id='listaUsuarios'
                    className="list-group-item list-group-item-action shadow mt-2"
                    key={user._id}
                  >
                    <div className='row d-flex align-items-center'>
                      <div className='col-md-4 '>
                        <p>{user.username}</p>
                        <div id='p5'>{user.comentario}</div>
                      </div>
                      <div className='col-md-1'>
                        {this.iconoDeContraseña(user.contrasena)}
                        <div className='mt-2'> {this.iconoSexo(user.sexo)}</div>

                      </div>
                      {

                        (user.contrasena === "") ? (
                          <div className='col-md-7'>
                            <button type="button" className="btn btn-light" id='botonEliminar' onClick={() => this.deleteUser(user._id, "")}>ELIMINAR</button>
                          </div>
                        ) : (
                          <div className='col-md-7'>
                            <div className='row'>
                              <div className='col-md-3'>
                                <button type="button" className="btn btn-light" id='botonEliminar' onClick={() => this.deleteUser(user._id, user.contrasena)}>ELIMINAR</button>
                              </div>
                              <div className='col-md-9'>
                                <input type="password"
                                  placeholder='Contraseña'
                                  id="password"
                                  className="form-control"
                                  value={this.state.cs}
                                  onChange={(e) => { this.setState({ cs: e.target.value }) }}
                                />
                              </div>
                            </div>
                          </div>

                        )

                      }

                    </div>


                  </li>
                )


              }
              )
            }
          </ul>
        </div>

      </div>

    )
  }
}
