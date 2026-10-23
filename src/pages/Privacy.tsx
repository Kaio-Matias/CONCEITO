import { Link } from 'react-router-dom'
import { COMPANY } from '../data/content'
import { LegalPage, type LegalSection } from '../components/LegalPage'

export const LEGAL_UPDATED = '23 de outubro de 2026'

const email = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
const whats = <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer">{COMPANY.phone}</a>

const SECTIONS: LegalSection[] = [
  {
    id: 'quem-somos', title: 'Quem é o responsável pelos seus dados',
    body: (
      <>
        <p>
          O responsável (controlador) pelos dados tratados neste site é a <strong>{COMPANY.legalName}</strong>,
          inscrita no CNPJ {COMPANY.cnpj}, com registro profissional {COMPANY.crc}, com escritório na {COMPANY.address},
          {' '}{COMPANY.city}.
        </p>
        <p>Para qualquer assunto sobre privacidade e proteção de dados, fale com a gente pelo e-mail {email} ou pelo WhatsApp {whats}.</p>
      </>
    ),
  },
  {
    id: 'dados', title: 'Quais dados coletamos',
    body: (
      <>
        <p>Coletamos apenas o necessário para responder ao seu contato e melhorar o site:</p>
        <ul>
          <li><strong>Formulário “Peça uma proposta”:</strong> nome, número de WhatsApp, nome da empresa (opcional) e o serviço de que você precisa.</li>
          <li><strong>Formulário de feedback:</strong> nome, empresa, nota de 1 a 5, os assuntos marcados, o seu comentário e se você autoriza a publicação do depoimento.</li>
          <li><strong>Simulador de economia:</strong> os valores que você informa (faturamento, percentual de impostos e horas) são calculados no seu próprio navegador e não são enviados para nós — a não ser que você clique em “Validar com um contador”, que leva esses valores na mensagem do WhatsApp.</li>
          <li><strong>Dados de navegação:</strong> se você aceitar os cookies de análise, o Google Analytics registra de forma estatística como o site é usado (páginas vistas, cliques em botões, tipo de aparelho, cidade aproximada). Veja a <Link to="/cookies">Política de Cookies</Link>.</li>
        </ul>
        <p>Não pedimos documentos, dados bancários ou senhas pelo site.</p>
      </>
    ),
  },
  {
    id: 'whatsapp', title: 'Como os formulários funcionam',
    body: (
      <>
        <p>
          Os formulários do site <strong>não gravam os seus dados em nenhum servidor nosso</strong>. Ao enviar, o site abre o WhatsApp com a
          mensagem pronta — e ela só chega até nós quando você toca em enviar. Antes do envio, mostramos uma prévia exata do que será mandado.
        </p>
        <p>
          A partir daí, a conversa acontece no WhatsApp, um serviço da Meta Platforms, que tem a sua própria política de privacidade.
          As mensagens ficam guardadas no nosso atendimento para que possamos responder e acompanhar o seu pedido.
        </p>
      </>
    ),
  },
  {
    id: 'finalidades', title: 'Para que usamos os seus dados',
    body: (
      <ul>
        <li>Responder ao seu contato e enviar a proposta que você pediu;</li>
        <li>Prestar os serviços contratados, quando você se torna cliente;</li>
        <li>Ouvir a sua opinião e melhorar o atendimento (feedback);</li>
        <li>Publicar o seu depoimento no site, <strong>somente</strong> se você autorizar e depois de revisado pela nossa equipe;</li>
        <li>Entender como o site é usado, para deixá-lo mais claro e útil (estatísticas, somente com o seu consentimento).</li>
      </ul>
    ),
  },
  {
    id: 'bases', title: 'Base legal (LGPD)',
    body: (
      <>
        <p>Tratamos os seus dados de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), com base em:</p>
        <ul>
          <li><strong>Procedimentos preliminares a um contrato, a seu pedido</strong> (art. 7º, V): para responder ao pedido de proposta;</li>
          <li><strong>Execução de contrato</strong> (art. 7º, V) e <strong>cumprimento de obrigação legal</strong> (art. 7º, II): quando você é nosso cliente, inclusive nas obrigações contábeis e fiscais;</li>
          <li><strong>Consentimento</strong> (art. 7º, I): para os cookies de análise e para a publicação de depoimentos — e você pode retirá-lo a qualquer momento;</li>
          <li><strong>Legítimo interesse</strong> (art. 7º, IX): para registrar e responder ao seu feedback e melhorar o atendimento.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'compartilhamento', title: 'Com quem compartilhamos',
    body: (
      <>
        <p><strong>Não vendemos nem alugamos os seus dados.</strong> Alguns serviços de terceiros participam do funcionamento do site:</p>
        <ul>
          <li><strong>Meta (WhatsApp)</strong> — canal de atendimento usado pelos formulários e botões de contato;</li>
          <li><strong>Google (Analytics)</strong> — estatísticas de uso do site, somente com o seu consentimento;</li>
          <li><strong>Google (Maps e Fonts)</strong> — o mapa do escritório e as fontes do site são carregados a partir dos servidores do Google;</li>
          <li><strong>Vercel</strong> — empresa que hospeda o site.</li>
        </ul>
        <p>
          Alguns desses serviços podem armazenar dados fora do Brasil. Nesses casos, a transferência segue o que a LGPD permite
          (art. 33), com empresas que adotam padrões de proteção de dados compatíveis.
        </p>
        <p>Também podemos compartilhar dados quando a lei exigir ou por ordem de autoridade competente.</p>
      </>
    ),
  },
  {
    id: 'guarda', title: 'Por quanto tempo guardamos',
    body: (
      <ul>
        <li><strong>Contatos que não viraram contrato:</strong> pelo tempo necessário para responder e acompanhar o pedido;</li>
        <li><strong>Clientes:</strong> durante o contrato e, depois dele, pelos prazos exigidos pela legislação contábil, fiscal e trabalhista;</li>
        <li><strong>Depoimentos publicados:</strong> até você pedir a retirada;</li>
        <li><strong>Estatísticas do Google Analytics:</strong> conforme o prazo de retenção configurado na ferramenta, de forma agregada.</li>
      </ul>
    ),
  },
  {
    id: 'direitos', title: 'Os seus direitos',
    body: (
      <>
        <p>Pela LGPD (art. 18), você pode, a qualquer momento e sem custo:</p>
        <ul>
          <li>Confirmar se tratamos os seus dados e ter acesso a eles;</li>
          <li>Corrigir dados incompletos, incorretos ou desatualizados;</li>
          <li>Pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários;</li>
          <li>Pedir a portabilidade dos seus dados;</li>
          <li>Saber com quem compartilhamos os seus dados;</li>
          <li>Retirar o seu consentimento — por exemplo, recusar os cookies de análise ou pedir a retirada do seu depoimento.</li>
        </ul>
        <p>Para exercer esses direitos, fale com a gente pelo e-mail {email} ou pelo WhatsApp {whats}. Você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).</p>
      </>
    ),
  },
  {
    id: 'seguranca', title: 'Como protegemos os seus dados',
    body: (
      <p>
        O site usa conexão segura (HTTPS) e não armazena os dados dos formulários. No atendimento, o acesso às informações dos clientes é
        restrito à equipe que cuida de cada empresa, e seguimos o sigilo profissional exigido da profissão contábil.
      </p>
    ),
  },
  {
    id: 'app', title: 'App e área do cliente',
    body: (
      <p>
        O aplicativo Conceito Negócios e o portal da área do cliente são sistemas próprios, acessados com login. Os dados tratados neles
        seguem os termos apresentados nesses sistemas, em complemento a esta política.
      </p>
    ),
  },
  {
    id: 'mudancas', title: 'Mudanças nesta política',
    body: (
      <p>
        Podemos atualizar esta política para refletir mudanças no site ou na legislação. A data da última atualização fica sempre no
        topo desta página.
      </p>
    ),
  },
]

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Privacidade"
      title="Política de Privacidade"
      updated={LEGAL_UPDATED}
      description="Saiba como a Conceito Contabilidade e Negócios trata os seus dados pessoais no site, de acordo com a LGPD."
      intro={<p>Explicamos, em linguagem simples, quais dados o site coleta, para que usamos e como você pode controlá-los, de acordo com a Lei Geral de Proteção de Dados (LGPD).</p>}
      sections={SECTIONS}
    />
  )
}
