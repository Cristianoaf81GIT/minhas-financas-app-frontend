import ApiService from '../apiservice'
import ErroValidacao from '../exceptions/erroValidacao'

class UsuarioService extends ApiService {

  constructor () {
    super('/api/usuarios')
  }

  autenticar( credenciais ) {
    return this.post('/autenticar', credenciais)
  }

  obterSaldoPorUsuario ( id ) {
    return this.get(`/${id}/saldo`)
  }

  salvar ( usuario ) {
    return this.post('/' , usuario )
  }

  validar ( usuario ) {
    const erros = []

    if ( !usuario.nome )  
      erros.push('O campo nome é obrigatório')

    if ( !usuario.email )  
      erros.push('O campo email é obrigatório')
    else if ( !usuario.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]/) )
      erros.push('Informe um e-mail válido')

    if ( !usuario.senha || !usuario.senhaRepeticao )  
      erros.push('Favor digite a senha 2X.')
    else if ( usuario.senha !== usuario.senhaRepeticao )
      erros.push('As senhas não coincidem')
    
    if ( erros && erros.length > 0 )
      throw new  ErroValidacao( erros )
  }

}

export default UsuarioService