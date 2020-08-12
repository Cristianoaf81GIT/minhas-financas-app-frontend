import React from 'react'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import cadastroLancamentos from '../views/lancamentos/cadastroLancamentos'

function Rotas () {

    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login }/>
                <Route path="/cadastro-usuarios" component={ CadastroUsuario }/>
                <Route path="/home" component={ Home }/>
                <Route path="/consulta-lancamentos" component={ ConsultaLancamentos }/>
                <Route path="/cadastro-lancamentos/:id" component={ cadastroLancamentos } />                
                <Route path="/">
                  <Redirect to="/login"/>
                </Route>
            </Switch>
        </HashRouter>
    )

}

export default Rotas