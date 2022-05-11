import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'  

export default class Navigation extends Component {
  state = {
    ruta:"/create",
    obtenerUsuario:0,
    componente:0,
    conteo:0
  }

  

  async componentDidMount() {
      this.usuarios();
  }

  async usuarios(){
    const res = await axios.get('http://localhost:4000/api/users');
    if(res.data.length>0){
      this.setState({
        ruta: "/create"
    });
    }else{
      this.setState({
        ruta: "/user",  
    });
    }
  }
  render() {
    
    return (
      <div className='row'>
        <nav className="navbar navbar-expand-lg navbar-dark  " id='navVar'>
          <div className="container">
            <div className="navbar-brand fs-3" >
                EL tablón de notas
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <Link className="nav-link fs-5" onClick={()=>this.usuarios()} to="/"> Todas las notas </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fs-5" onClick={()=>this.usuarios()} to={this.state.ruta}> Crear una nota </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fs-5" onClick={()=>this.usuarios()} to="/user"> Crear usuario </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
    )
  }
}
