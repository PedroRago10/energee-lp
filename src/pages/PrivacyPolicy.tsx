import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container-xl px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Política de Privacidade
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="text-xl leading-relaxed mb-8">
                Última atualização: Janeiro de 2024
              </p>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introdução</h2>
                <p>
                  A Energee.org.br valoriza e respeita a privacidade dos seus usuários. Esta Política de 
                  Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações 
                  pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD) e demais 
                  regulamentações aplicáveis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Informações que Coletamos</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">2.1 Dados Pessoais</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nome completo</li>
                    <li>CPF ou CNPJ</li>
                    <li>E-mail</li>
                    <li>Telefone</li>
                    <li>Endereço da unidade consumidora</li>
                    <li>Dados da conta de energia elétrica</li>
                    <li>Histórico de consumo energético</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mt-6">2.2 Dados de Navegação</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador</li>
                    <li>Páginas visitadas</li>
                    <li>Tempo de navegação</li>
                    <li>Cookies e tecnologias similares</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Como Utilizamos suas Informações</h2>
                <div className="space-y-4">
                  <p>Utilizamos seus dados pessoais para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Processar sua solicitação de adesão ao serviço</li>
                    <li>Gerenciar sua conta e prestação de serviços</li>
                    <li>Calcular e aplicar os descontos na sua conta de energia</li>
                    <li>Comunicar sobre seu consumo e economia</li>
                    <li>Enviar atualizações importantes sobre o serviço</li>
                    <li>Cumprir obrigações legais e regulamentares</li>
                    <li>Melhorar nossos serviços e experiência do usuário</li>
                    <li>Prevenir fraudes e garantir a segurança</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Base Legal para o Tratamento</h2>
                <div className="space-y-4">
                  <p>O tratamento dos seus dados pessoais é baseado em:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Execução de contrato</li>
                    <li>Cumprimento de obrigação legal</li>
                    <li>Legítimo interesse</li>
                    <li>Consentimento (quando aplicável)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Compartilhamento de Dados</h2>
                <div className="space-y-4">
                  <p>Seus dados podem ser compartilhados com:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Distribuidoras de energia elétrica (para viabilizar o serviço)</li>
                    <li>Usinas de geração de energia solar parceiras</li>
                    <li>Prestadores de serviços (processamento de pagamentos, suporte técnico)</li>
                    <li>Órgãos reguladores (ANEEL) quando exigido</li>
                    <li>Autoridades competentes mediante determinação legal</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Segurança dos Dados</h2>
                <p>
                  Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados 
                  contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui 
                  criptografia, controles de acesso, monitoramento e treinamento de equipe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Retenção de Dados</h2>
                <p>
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
                  descritas nesta política, respeitando prazos legais de retenção e períodos de 
                  prescrição aplicáveis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Seus Direitos</h2>
                <div className="space-y-4">
                  <p>Você tem o direito de:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Confirmar a existência de tratamento dos seus dados</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação</li>
                    <li>Solicitar a portabilidade dos dados</li>
                    <li>Obter informações sobre compartilhamento</li>
                    <li>Revogar o consentimento (quando aplicável)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Cookies</h2>
                <p>
                  Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego 
                  do site e personalizar conteúdo. Você pode configurar seu navegador para recusar 
                  cookies, mas isso pode afetar algumas funcionalidades do site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Alterações nesta Política</h2>
                <p>
                  Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças 
                  significativas através dos nossos canais de comunicação.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contato</h2>
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em 
                  contato conosco:
                </p>
                <div className="ml-4 mt-4">
                  <p>E-mail: <a href="mailto:privacidade@energee.org.br" className="text-primary hover:underline">privacidade@energee.org.br</a></p>
                  <p>Telefone: (11) 99999-9999</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;