import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container-xl px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Termos de Uso
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="text-xl leading-relaxed mb-8">
                Última atualização: Janeiro de 2024
              </p>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceitação dos Termos</h2>
                <p>
                  Ao acessar e utilizar os serviços da Energee.org.br, você concorda com estes Termos de Uso. 
                  Se você não concordar com algum destes termos, não utilize nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Descrição dos Serviços</h2>
                <p>
                  A Energee é uma plataforma que facilita o acesso à energia solar compartilhada, conectando 
                  consumidores a usinas de geração de energia solar fotovoltaica, proporcionando economia na 
                  conta de luz através do sistema de compensação de energia elétrica regulamentado pela ANEEL.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Elegibilidade e Cadastro</h2>
                <div className="space-y-4">
                  <p>Para utilizar nossos serviços, você deve:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Ser maior de 18 anos ou representante legal de pessoa jurídica</li>
                    <li>Possuir CPF ou CNPJ válido</li>
                    <li>Ser titular da unidade consumidora ou ter autorização do titular</li>
                    <li>Estar localizado na área de cobertura das distribuidoras parceiras</li>
                    <li>Fornecer informações verdadeiras e atualizadas</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Funcionamento do Serviço</h2>
                <div className="space-y-4">
                  <p>O serviço de energia compartilhada funciona da seguinte forma:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A energia é gerada em usinas solares remotas</li>
                    <li>Os créditos de energia são injetados na rede da distribuidora</li>
                    <li>Você recebe os créditos proporcionalmente à sua cota</li>
                    <li>O desconto é aplicado automaticamente na sua conta de luz</li>
                    <li>Você paga apenas pela energia que consome acima dos créditos recebidos</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Responsabilidades do Cliente</h2>
                <div className="space-y-4">
                  <p>Ao utilizar nossos serviços, você se compromete a:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Fornecer informações precisas e atualizadas</li>
                    <li>Manter seus dados de contato atualizados</li>
                    <li>Comunicar mudanças na titularidade da unidade consumidora</li>
                    <li>Cumprir as regulamentações da ANEEL e da distribuidora local</li>
                    <li>Não transferir seus direitos sem autorização prévia</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cobrança e Pagamento</h2>
                <p>
                  Os valores e formas de pagamento são estabelecidos no momento da contratação. 
                  O não pagamento pode resultar na suspensão temporária ou cancelamento do serviço, 
                  conforme previsto em contrato específico.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Cancelamento</h2>
                <p>
                  O cliente pode cancelar o serviço a qualquer momento, mediante comunicação prévia 
                  conforme estabelecido em contrato. O cancelamento será efetivado respeitando-se 
                  os prazos regulamentares da ANEEL.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitação de Responsabilidade</h2>
                <p>
                  A Energee não se responsabiliza por interrupções no fornecimento de energia, 
                  alterações nas regras regulamentares, problemas na rede de distribuição ou 
                  fatores externos que possam afetar a geração de energia solar.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Modificações dos Termos</h2>
                <p>
                  Estes termos podem ser atualizados periodicamente. As mudanças serão comunicadas 
                  através dos nossos canais oficiais e entrarão em vigor conforme especificado na comunicação.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Contato</h2>
                <p>
                  Para dúvidas sobre estes termos, entre em contato conosco através do email: 
                  <a href="mailto:contato@energee.org.br" className="text-primary hover:underline">
                    contato@energee.org.br
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;