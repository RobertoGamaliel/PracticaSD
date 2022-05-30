import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Navigation extends Component {
  state = {
    ruta: "/create",
    obtenerUsuario: 0,
    componente: 0,
    conteo: 0
  }



  async componentDidMount() {
    console.log("props Navigation");
    this.usuarios();
  }

  async usuarios() {
    const res = await axios.get("https://practicasd2022.herokuapp.com/api/users");
    if (res.data.length > 0) {
      this.setState({
        ruta: "/create"
      });
    } else {
      this.setState({
        ruta: "/user",
      });
    }
  }


  render() {

    return (
        <div className='row'>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark " id='navVar'>
          <p className="navbar-brand ps-5 text-light text-center" >Tablon de notas</p>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
              <Link className="nav-link text-light" onClick={() => this.usuarios()} to="/"> Todas las notas </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-light" onClick={() => this.usuarios()} to={this.state.ruta}> Crear una nota </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-light" onClick={() => this.usuarios()} to="/user"> Crear usuario </Link>
              </li>
            </ul>
          </div>
        </nav>
       </div>

     
    )
  }
}
