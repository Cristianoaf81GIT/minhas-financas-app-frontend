import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemErro, mensagemSucesso } from '../components/toastr'

class CadastroUsuario extends React.Component {
  
  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: ''
  }

  constructor () {
    super()
    this.service = new UsuarioService()
  }

  validar () {
    const msgs = []

    if ( !this.state.nome )  
      msgs.push('O campo nome é obrigatório')

    if ( !this.state.email )  
      msgs.push('O campo email é obrigatório')
    else if ( !this.state.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]/) )
      msgs.push('Informe um e-mail válido')

    if ( !this.state.senha || !this.state.senhaRepeticao )  
      msgs.push('Favor digite a senha 2X.')
    else if ( this.state.senha !== this.state.senhaRepeticao )
      msgs.push('As senhas não coincidem')
    


    return msgs
  }

  cadastrar = () => {
    
    const msgs = this.validar()

    if (msgs && msgs.length > 0) {

      msgs.forEach( (msg, index) => {

        mensagemErro(msg)

      } )
      
      return false
    }

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    }   

    this.service.salvar( usuario )
    .then( response => {
      mensagemSucesso('Usuário cadastrado com sucesso!' 
      + 'Faça o login para acessar o sistema')
      this.props.history.push('/login')
    }).catch( error => {
      console.log(error)
      mensagemErro(error.response)
    })

  }

  cancelar = () => {
    // /login
    this.props.history.push('/login')
    
  }

    render () {
        return (

            <Card title="Cadastro de Usuário">

              <div className="row">

                <div className="col-md-12">

                  <div className="bs-content">

                    <FormGroup label="Nome: *" htmlFor="inputNome">
                      
                      <input 
                      type="text" 
                      id="inputNome" 
                      className="form-control"
                      required
                      onChange={ e => this.setState( { nome: e.target.value } )}
                      name="nome"/>

                    </FormGroup>

                    <FormGroup label="E-Mail: *" htmlFor="inputEmail">
                      
                      <input 
                      type="email" 
                      id="inputEmail" 
                      className="form-control"
                      required
                      onChange={ e => this.setState( { email: e.target.value } )}
                      name="email"/>

                    </FormGroup>

                    <FormGroup label="Senha: *" htmlFor="inputSenha">
                      
                      <input 
                      type="password" 
                      id="inputSenha" 
                      className="form-control"
                      required
                      onChange={ e => this.setState( { senha: e.target.value } )}
                      name="senha"/>

                    </FormGroup>

                    <FormGroup label="Repita a senha: *" htmlFor="inputRepeteSenha">
                      
                      <input 
                      type="password" 
                      id="inputRepeteSenha" 
                      className="form-control"
                      required
                      onChange={ e => this.setState( { senhaRepeticao: e.target.value } )}
                      name="senha"/>

                    </FormGroup>

                    <button type="button"
                    onClick={ this.cadastrar } 
                    className="btn btn-success">
                      Salvar
                    </button>

                    <button type="button" 
                    className="btn btn-danger"
                    onClick={this.cancelar}>
                      Cancelar
                    </button>
                    
                  </div>

                </div>

              </div>

            </Card>
        )
    }

}




export default withRouter ( CadastroUsuario )