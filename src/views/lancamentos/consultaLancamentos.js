import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentosTable from '../lancamentos/lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'
import * as messages from '../../components/toastr'
import {Dialog} from 'primereact/dialog'
import { Link } from 'react-router-dom'

/** url para acessar #/consulta-lancamentos */

const initialState = {
  ano: '',
  mes: '',
  tipo: '',
  descricao: '',
  lancamentos: [],
  showConfirmDialog: false,
  lancamentoDeletar: {}
}

class ConsultaLancamentos extends React.Component {

  state = {
    ano: '',
    mes: '',
    tipo: '',
    descricao: '',
    lancamentos: [],
    showConfirmDialog: false,
    lancamentoDeletar: {}
  }


  constructor () {
    super()
    this.service = new LancamentoService()
    this.windowViewportWidth = window.innerWidth
    
  }

  componentDidUpdate() {
    this.windowViewportWidth = window.innerWidth    
    this.defineLarguraModal()
  }


  defineLarguraModal = () => {
    this.windowViewportWidth = window.innerWidth
    if ( this.windowViewportWidth && this.windowViewportWidth <= 800 )
      return {width: '80vw'}
    else
      return {width: '30vw'}
  }

  buscar = async () => {
    
    if (!this.state.ano) {
      messages.mensagemAlerta('O preenchimento do campo ano é obrigatório!')
      return false;
    }

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    
    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }

    await this.service.consultar(lancamentoFiltro).then( response => {
      this.setState( {lancamentos: response.data} )

      if ( this.state.lancamentos.length <= 0 ) 
        messages.mensagemAlerta('Nenhum registro encontrado para a pesquisa!')
      
    }).catch( error => {
      messages.mensagemErro(error.data)
    }) 

  }

  
  DialogoConfirmaACao = (lancamento) => {
    this.setState({showConfirmDialog:true, lancamentoDeletar: lancamento})
  }

  editar = ( id ) => {
    this.props.history.push(`/cadastro-lancamentos/${id}`)
  }

  deletar = () => {
    try {
      // eslint-disable-next-line
      let response = this.service.deletar( this.state.lancamentoDeletar.id )
      const lancamentos = this.state.lancamentos
      const index = lancamentos.indexOf( this.state.lancamentoDeletar )
      lancamentos.splice(index, 1)
      this.setState({ lancamentos, showConfirmDialog:false })
      
      messages.mensagemSucesso('Lançamento removido com sucesso!')
      
    } catch (error) {
      messages.mensagemErro('Ocorreu um erro ao remover o lançamento!')
    }
  }

  render () {

    const meses = this.service.obterListameses()

    const tipos = this.service.obterListaTipos()

    const ConfirmDialogFooter = (
      <div>
          <button  className="btn btn-success"
          onClick={this.deletar} >
            <span>
              <i className="fa fa-check"></i>
            </span>
            sim
          </button>

          <button className="btn btn-danger"
          onClick={ ()=> this.setState(
              {
                showConfirmDialog:false,
                 lancamentoDeletar:{}
              }
            )} >
            <span>
              <i className="fa fa-times"></i>
            </span>
            Não
          </button>

      </div>
    )
    

    return(
      <Card title="Consulta Lancamentos">

        <div className="row">

          <div  className="col-md-6">

            <div className="bs-component">
                
              <FormGroup htmlFor="inputAno" label="Ano: *">

                 <input type="text" className="form-control" id="inputAno"
                 value={this.state.ano} 
                 onChange={ (e) =>  this.setState({ano: e.target.value }) }
                 placeholder="digite o ano"/>

              </FormGroup>

              <FormGroup htmlFor="inputMes" label="Mês: ">

                <SelectMenu 
                items={meses}
                value={this.state.mes} 
                onChange={ (e) => this.setState({mes: e.target.value })}
                id="inputMes" 
                className='form-control'/>

              </FormGroup>

              <FormGroup htmlFor="inputDescricao" label="Descrição: ">

                 <input type="text" className="form-control" id="inputDescricao"
                 value={this.state.descricao} 
                 onChange={ (e) =>  this.setState({descricao: e.target.value }) }
                 placeholder="digite a descrição"/>

              </FormGroup>


              <FormGroup htmlFor="inputTipo" label="Tipo lançamento: ">

                <SelectMenu 
                items={tipos} 
                id="inputTipo" 
                value={this.state.tipo}
                onChange={ (e) =>  this.setState( { tipo: e.target.value } )}
                className='form-control'/>

              </FormGroup>

              
              <button
              type="button" 
              onClick={ this.buscar } 
              className="btn btn-success">
                <i className="fa fa-search"></i>&nbsp;  
                Buscar
              </button>

              <Link to="/cadastro-lancamentos/0" className="btn btn-primary">
                <i className="fa fa-plus"></i>&nbsp;
                Cadastrar
              </Link>
              
            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-md-12">

            <div className="bs-component">
              <br/>
                
              <div className="table table-responsive">
                {
                  this.state.lancamentos.length > 0 ? 
                  <>
                    <button
                      type="button"
                      onClick={()=> this.setState({...initialState})}
                      className="btn lancamentos-btn btn-link">
                      <i className="fa fa-paint-brush"></i>&nbsp; 
                        limpar pesquisa 
                    </button> 

                    <LancamentosTable
                      lancamentos={this.state.lancamentos}
                      deleteAction={this.DialogoConfirmaACao}
                      editAction={this.editar}
                    />                    

                  </> : null

                
                }
                

              </div>
            </div>

          </div>

        </div>
                  
        <div>
          <Dialog 
          header="Confirmar exclusão" 
          visible={this.state.showConfirmDialog} 
          style={this.defineLarguraModal()} 
          modal={true} 
          footer={ConfirmDialogFooter}
          onHide={() => this.setState({showConfirmDialog: false})}>
            Deseja realmente excluir este lançamento ?<br/>
            {this.state.lancamentoDeletar.descricao}
          </Dialog>
        </div>

      </Card>
    )
  }

}



export default withRouter ( ConsultaLancamentos )