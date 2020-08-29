import React from 'react'
import AuthService from '../app/service/authService'

export const AuthContext = React.createContext() // cria o contexto em si
export const AuthConsumer = AuthContext.Consumer // cria comp p/ perm que filhos usem o contexto
const AuthProvider = AuthContext.Provider // elemento pai (ProvedorAtenticacao)

class ProvedorAutenticacao extends React.Component {

  state = {
    usuarioAutenticado:null,
    isAutenticado: false
  }

  iniciarSessao = (usuario) => {
    AuthService.logar(usuario)
    this.setState( {isAutenticado: true, usuarioAutenticado:usuario} )
  }

  encerrarSessao = () => {
    AuthService.removerUsuarioAutenticado()
    this.setState({isAutenticado: false, usuarioAutenticado: null})
  }

  render () {

    const contexto = {
      usuarioAutenticado: this.state.usuarioAutenticado,
      isAutenticado: this.state.isAutenticado,
      iniciarSessao: this.iniciarSessao,
      encerrarSessao: this.encerrarSessao    
    }

    return (      
  
      <AuthProvider value={contexto}>

        {this.props.children}

      </AuthProvider>

    )

  }
}

export default ProvedorAutenticacao
