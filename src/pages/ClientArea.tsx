import { Link } from 'react-router-dom'
import { LogoMark } from '../components/Logo'
import { Icon } from '../components/Icon'

/** Placeholder da Área do Cliente — será construída junto com o backend. */
export default function ClientArea() {
  return (
    <main className="gate">
      <div className="gate__card">
        <LogoMark size={52} />
        <h1>Área do cliente</h1>
        <p>Seu portal com documentos, relatórios e chamados estará disponível em breve.</p>
        <Link to="/" className="btn btn--primary">Voltar ao site <Icon name="arrow" size={18} /></Link>
      </div>
    </main>
  )
}
