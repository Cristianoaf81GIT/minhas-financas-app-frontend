import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'
import { mensagemErro } from '../components/toastr'

class Login extends React.Component {

 
  state = {
      email: '',
      senha: '',
      mensagemErro: null
  }

  constructor () {
    super()
    this.service = new UsuarioService()
  }

  entrar = () => {
   
    this.service.autenticar({
      email: this.state.email,
      senha: this.state.senha
    }).then( response => {
      LocalStorageService.adicionarItem('_usuario_logado', response.data)
      this.props.history.push('/home')
    }).catch( error => {
      this.setState({mensagemErro: error.response.data})
      mensagemErro(this.state.mensagemErro)
    })  
    
    

  }
		
		renderizaResponstaErro = () => {
			
			if ( this.state.mensagemErro ) {
				
				return (
					
          <span className='alert text-danger'>
            <li style={styles.alertWidth}>Erro : {this.state.mensagemErro}</li>					
          </span>
        
				)

			}

		}

    prepareCadastrar = () => {

        this.props.history.push('/cadastro-usuarios')

    }

    render () {
        return (        

            <div className="row">
                <div className="col col-md-6" style={ styles.formColumn }>
                    <div className="bs-docs-section">
                        <Card title="Login" >
														
														<div className="row" style={{marginBottom: '3px'}}>
															
															{this.renderizaResponstaErro()}
															
														</div>	

                            <div className="row">
                                <div className="col-lg-12">
																	<div className="bs-component">
																			<fieldset>
																			
																			<FormGroup label="Email: *"
																			htmlFor="exampleInputEmail">
																					
																					<input type="email" 
																					required
																					value={this.state.email}
																					onChange={(e)=>this.setState({email: e.target.value})}
																					className="form-control" 
																					id="exampleInputEmail1" 
																					aria-describedby="emailHelp" 
																					placeholder="Digite o Email"/>

																					</FormGroup>

																			<FormGroup label="Senha: *"
																			htmlFor="exampleInputPassword1">
																					
																					<input type="password" 
																					required
																					value={this.state.senha}
																					onChange={(e)=>this.setState({senha:e.target.value})}
																					className="form-control" 
																					id="exampleInputPassword1" 
																					placeholder="Digite a senha"/>

																			</FormGroup>

																			<button onClick={this.entrar}
																			className="btn btn-success">
																					Entrar
																			</button>
																			&nbsp;
																			<button 
																			className="btn btn-danger"
																			onClick={this.prepareCadastrar}>
																					Cadastrar
																			</button>

																			</fieldset>
																	</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>            

        )
    }
}



const styles = {
    
    formColumn: {
       width: '50%',
       maxWidth:'100%',
       marginLeft: 'auto',
       marginRight: 'auto'
		},
		
		alertWidth: {
			width: '100%',	
			marginLeft: 'auto',
			marginRight: 'auto'
		}

}

 

export default withRouter( Login )