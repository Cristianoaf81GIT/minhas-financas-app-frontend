import React from 'react'
import NavBarItem from './navBarItem'

function Navbar () {

    return (

      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >

        <div className="container">

          <a href="#/home" className="navbar-brand">
            Minhas Finanças
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbarResponsive" aria-controls="navbarResponsive" 
          aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse collapse" id="navbarResponsive">
            
            <ul className="navbar-nav">

              <NavBarItem href="#/home" label="Home"/>

              <NavBarItem href="#/cadastro-usuarios" label="Usuários"/>
              {/**#/consulta-lancamentos */}
              <NavBarItem href="#/consulta-lancamentos" label="Lançamentos"/>

              <NavBarItem href="#/login" label="Login"/>
              
            </ul>
  
          </div>
        </div>

      </div>
    )

}


export default Navbar