import React from 'react'
import currencyFormatter from 'currency-formatter'


const LancamentosTable = ( props ) => {

  const rows = props.lancamentos.map( (lancamento) => {
    
    return(
      <tr key={lancamento.id} >
        <td>{lancamento.descricao}</td>
        <td>{currencyFormatter.format( lancamento.valor, {code: 'BRL'} ) }</td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>

          <button type="button"
            className="btn btn-outline-primary btn-table"
            disabled={lancamento.status === 'EFETIVADO'}
            onClick={ e => props.changeStatus(lancamento, 'EFETIVADO')}
            data-toggle="tooltip" data-placement="top" title="redefinir situação: efetivar lançamento">
            <i className='fa fa-check'></i>
          </button>

          <button type="button"
            className="btn btn-outline-warning btn-table"
            disabled={lancamento.status === 'CANCELADO'}
            onClick={ e => props.changeStatus(lancamento, 'CANCELADO')}
            data-toggle="tooltip" data-placement="top" title="redefinir situação: cancelar lançamento">
            <i className='fa fa-ban'></i>
          </button>

          <button type="button"
            className="btn btn-outline-info btn-table"
            disabled={lancamento.status === 'PENDENTE'}
            onClick={ e => props.changeStatus(lancamento, 'PENDENTE')}
            data-toggle="tooltip" data-placement="top" title="reverter situação para lançamento pendente">
            <i className='fa fa-undo'></i>
          </button>

          <button type="button"
            className="btn btn-outline-success btn-table"
            data-toggle="tooltip" data-placement="top" title="editar o lançamento"
            onClick={ e => props.editAction(lancamento.id) }>
            <i className="fa fa-edit"></i>
          </button>

          <button type="button" 
            className="btn btn-outline-danger btn-table"
            data-toggle="tooltip" data-placement="top" title="excluir o lançamento"
            onClick={ e => props.deleteAction(lancamento) }>
            <i className="fa fa-trash"></i>
          </button>

        </td>
      </tr> 
    )

  })

  return (

    <table className="table table-hover">
      
      <thead>

        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>  
        </tr>

      </thead>

      <tbody>
        {rows}
      </tbody>

    </table>       

  )

}

export default LancamentosTable
