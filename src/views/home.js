import React from 'react'
import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'
import { Link } from 'react-router-dom'


class Home extends React.Component {


    state = {
        saldo: 0,
        nome: ''
    }


    constructor () {
      super()
      this.usuarioService = new UsuarioService()
    }

    componentDidMount = async () => {

        const usuario = LocalStorageService.obterItem('_usuario_logado') 
        ? LocalStorageService.obterItem('_usuario_logado') : {id:0,nome:''}

        this.setState({nome: usuario.nome})

        try {

          const response = await this.usuarioService
          .obterSaldoPorUsuario(usuario.id)

          this.setState({saldo: response.data })

        } catch (error) {
            
          console.error(error.response)

        }
    }

    render () {
        return (
            <div className="jumbotron bg-lightblue">

              <h1 className="display-4">Bem vindo!</h1>
              <p style={styles.uname}>{ this.state.nome.toUpperCase() }</p>

                <p className="lead">Esse é seu sistema de finanças.</p>

                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>

                <hr className="my-4"/>

                <p>E essa é sua área administrativa, 
                utilize um dos menus ou botões abaixo
                 para navegar pelo sistema.</p>

                <p className="lead">

                <Link 
                className="btn btn-primary btn-md"
                to="/cadastro-usuarios"
                role="button">
                      <span>
                      <i className="fa fa-users"></i>&nbsp;
                      Cadastrar Usuário
                      </span>
                </Link>

                <Link 
                className="btn btn-danger btn-md" 
                to="/cadastro-lancamentos/0" 
                role="button">
                    <span>
                    <i className="fa fa-money"></i>&nbsp;
                    Cadastrar Lançamento
                    </span>

                </Link>

                </p>

            </div>
        )
    }


}

const styles = {
  uname: {
    color: 'red',
    fontWeight: '100',    
  }
}

export default Home 