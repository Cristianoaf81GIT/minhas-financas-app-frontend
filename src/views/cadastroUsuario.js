import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemErro, mensagemSucesso, mensagemAlerta } from '../components/toastr'

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

 
  cadastrar = () => {
   
    const { nome, email, senha, senhaRepeticao } = this.state
   
    const usuario = {  nome,  email, senha, senhaRepeticao }
    
    try {
      this.service.validar( usuario )
    } catch (erros) {
      const mensagens = erros.mensagens
      mensagens.forEach(msg => mensagemAlerta( msg ) )
      return false
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
                      <span>
                      <i className='fa fa-floppy-o'></i>
                      </span>&nbsp;
                      Salvar
                    </button>

                    <button type="button" 
                    className="btn btn-danger"
                    onClick={this.cancelar}>
                      <span>
                      <i className='fa fa-undo'></i>
                      </span>&nbsp;
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