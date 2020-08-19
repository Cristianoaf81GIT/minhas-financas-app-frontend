import React from 'react'
import { withRouter }  from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import * as messages from '../../components/toastr'
import LocalStorageService from '../../app/service/localStorageService'
import { Link } from 'react-router-dom'

const initialState = {
  id: null,
  descricao: '',
  valor: '',
  mes: '',
  ano: '',
  tipo: '',
  status: '',
  usuario: null,
  atualizando: false      
}

class CadastroLancamentos extends React.Component {


  state = {
    id: null,
    descricao: '',
    valor: '',
    mes: '',
    ano: '',
    tipo: '',
    status: '',
    usuario: null,
    atualizando: false    
  }

  constructor () {
    super()
    this.service = new LancamentoService()
  }  


  componentDidMount() {
    const params = this.props.match.params    
    
    if ( params.id && params.id !== null && params.id > 0) {
       this.service.obterPorId( params.id )
      .then( response => {
        this.setState({...response.data, atualizando: true })        
      } ).catch( error => {
        
        messages.mensagemErro( error.response.data )
      } )

    }

  }

  handleOnChange = event => {
    const  value = event.target.value
    const name = event.target.name
    this.setState( { [name]: value } )
    
  }


  submit = async () => {


    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

    const usuario = usuarioLogado.id

    const { descricao, valor, mes, ano, tipo } = this.state

    const lancamento = { descricao, valor, mes, ano, tipo, usuario }
    

    try {
      this.service.validar( lancamento )
    } catch ( erros ) {
      const mensagens = erros.mensagens
      mensagens.forEach( msg => messages.mensagemAlerta( msg ) )
      return false;
    }
    
    await this.service
    .salvar(lancamento)
    .then( _ => {
      messages.mensagemSucesso('Lancamento cadastrado com sucesso!')
      this.setState({...initialState})
    } )
    .catch( error => {
      messages.mensagemErro(error.response.data)
    } )
    
    
  }

  atualizar =  () => {
    
    const { descricao, valor, mes, ano, tipo, id, usuario, status } = this.state

    const lancamento = { descricao, valor, mes, ano, tipo, id, usuario, status }
    
    console.log( 'lancamento: ',lancamento )
    this.service
    .atualizar(lancamento)
    .then( response => {
      messages.mensagemSucesso('Lancamento atualizado com sucesso!')
      this.setState({...initialState})
    } )
    .catch( error => {
      messages.mensagemErro(error.response.data)
    } )
  }

  render () {

    const tipos = this.service.obterListaTipos()

    const meses = this.service.obterListameses()

    return (
      <Card title={ this.state.atualizando ? 'Atualização de Lancamento' : 'Cadastro de Lançamento'}>

        <div className="row">

          <div className="col-md-12">
          
            <FormGroup id="inputDescricao" label="Descrição: *">
              
              <input 
                type="text" 
                className="form-control" 
                id="inputDescricao"
                name="descricao"
                value={ this.state.descricao }
                onChange={ this.handleOnChange }
              />

            </FormGroup>

          </div>

        </div>


        <div className="row">

          <div className="col-md-6">

            <FormGroup id="inputAno" label="Ano: *">

              <input 
                type="text" 
                className="form-control" 
                id="inputAno"
                value={ this.state.ano }
                name="ano"
                onChange={ this.handleOnChange }
              />  

            </FormGroup>


          </div>

          <div className="col-md-6">

            <FormGroup id="inputMes" label="Mês: *">

              <SelectMenu 
                id="inputMes" 
                items={ meses } 
                name="mes"
                value={ this.state.mes }                
                onChange={ this.handleOnChange }
                className="form-control"
              />

            </FormGroup>

          </div>

        </div>  

        <div className="row">

          <div className="col-md-6">
            
            <FormGroup id="inputValor" label="Valor: *">

              <input 
                type="text" 
                className="form-control" 
                id="inputValor"
                name="valor"
                value={ this.state.valor }
                onChange={ this.handleOnChange }
              />  

            </FormGroup>

          </div>

          <div className="col-md-3">

            <FormGroup id="inputTipo" label="Tipo: *">

            <SelectMenu 
              id="inputTipo" 
              name="tipo"
              items={tipos} 
              value={ this.state.tipo }
              onChange={ this.handleOnChange }
              className="form-control"
            />

            </FormGroup>

          </div>


          <div className="col-md-3" >

              { 
                this.state.status === '' ? 
                null : 
                <FormGroup id="inputStatus" label="Status: ">
                  <input 
                    type="text" 
                    name="status"
                    onChange={ this.handleOnChange }
                    value={ this.state.status }
                    className="form-control" 
                    disabled 
                  />
                </FormGroup>
              }
              


          </div>

        </div>
          
        

        <div className="row">

          <div className="col-md-6">

            <button 
              onClick={
                 this.state.id  && this.state.id > 0 && this.state.atualizando
                 ? this.atualizar : this.submit 
              } 
              className="btn btn-success">
                <span>
                <i className='fa fa-floppy-o'></i>
                </span>&nbsp;
                {this.state.atualizando ? 'Atualizar' : 'Salvar' }
            </button>
            
            <button 
              onClick={ e => this.props.history.push('/consulta-lancamentos') }
              className="btn btn-danger">
                <span>
                <i className='fa fa-times'></i>
                </span>&nbsp;
                Cancelar
            </button>
            
          </div>

        </div>

        <br/>
        <Link to="/consulta-lancamentos" style={styles.linkLancamento}>
          <i className="fa fa-money"></i>&nbsp;&nbsp;consultar lançamentos
        </Link>


      </Card>
    )
  }


}

const styles = {
  linkLancamento: {
    margin: '3.4rem 0.8rem',
    border: '1px solid rgb(225,225,225)',
    textDecoration: 'none',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default withRouter( CadastroLancamentos )

