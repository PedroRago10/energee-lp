import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container-xl px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Política de Cookies
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="text-xl leading-relaxed mb-8">
                Última atualização: Janeiro de 2024
              </p>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. O que são Cookies</h2>
                <p>
                  Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, 
                  smartphone ou tablet) quando você visita um site. Eles são amplamente utilizados 
                  para fazer os sites funcionarem de forma mais eficiente e fornecer informações 
                  aos proprietários do site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Como Utilizamos Cookies</h2>
                <p>
                  A Energee.org.br utiliza cookies para melhorar sua experiência de navegação, 
                  analisar como nosso site é usado e personalizar conteúdo. Nossos cookies nos 
                  ajudam a entender quais seções do site são mais populares, como os visitantes 
                  navegam pelo site e como podemos melhorar a experiência geral.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Tipos de Cookies que Utilizamos</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Cookies Essenciais</h3>
                    <p>
                      Estes cookies são necessários para o funcionamento básico do site e não podem 
                      ser desativados. Eles geralmente são configurados em resposta a ações suas, 
                      como definir suas preferências de privacidade, fazer login ou preencher formulários.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Cookies de sessão</li>
                      <li>Cookies de segurança</li>
                      <li>Cookies de funcionalidade básica</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Cookies de Performance</h3>
                    <p>
                      Estes cookies coletam informações sobre como você usa nosso site, como quais 
                      páginas você visita com mais frequência. Todas as informações coletadas são 
                      agregadas e, portanto, anônimas.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Google Analytics</li>
                      <li>Métricas de desempenho do site</li>
                      <li>Análise de comportamento de navegação</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">3.3 Cookies de Funcionalidade</h3>
                    <p>
                      Estes cookies permitem que o site se lembre das escolhas que você faz e 
                      forneça recursos aprimorados e mais personalizados.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Preferências de idioma</li>
                      <li>Configurações de exibição</li>
                      <li>Informações de localização</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">3.4 Cookies de Marketing</h3>
                    <p>
                      Estes cookies podem ser definidos através do nosso site por nossos parceiros 
                      de publicidade para criar um perfil dos seus interesses e mostrar anúncios 
                      relevantes em outros sites.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Cookies de remarketing</li>
                      <li>Cookies de redes sociais</li>
                      <li>Cookies de rastreamento de conversão</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Cookies de Terceiros</h2>
                <p>
                  Alguns cookies são colocados por serviços de terceiros que aparecem em nossas páginas. 
                  Isso inclui:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong>Google Analytics:</strong> Para análise de tráfego do site</li>
                  <li><strong>Google Tag Manager:</strong> Para gerenciamento de tags</li>
                  <li><strong>Facebook Pixel:</strong> Para rastreamento de conversões</li>
                  <li><strong>WhatsApp Business:</strong> Para funcionalidade de chat</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Gerenciamento de Cookies</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.1 Configurações do Navegador</h3>
                  <p>
                    Você pode controlar e/ou deletar cookies conforme desejar. Para mais detalhes, 
                    consulte aboutcookies.org. Você pode deletar todos os cookies que já estão no 
                    seu computador e configurar a maioria dos navegadores para impedir que sejam colocados.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-6">5.2 Consequências da Desativação</h3>
                  <p>
                    Se você escolher desativar os cookies, algumas funcionalidades do nosso site 
                    podem não funcionar corretamente. Isso pode incluir:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Perda de preferências personalizadas</li>
                    <li>Necessidade de re-inserir informações</li>
                    <li>Funcionalidades limitadas</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Atualizações desta Política</h2>
                <p>
                  Esta Política de Cookies pode ser atualizada ocasionalmente. Recomendamos que 
                  você verifique esta página regularmente para se manter informado sobre como 
                  usamos cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Consentimento</h2>
                <p>
                  Ao continuar a usar nosso site, você concorda com o uso de cookies conforme 
                  descrito nesta política. Se você não concordar com o uso de cookies, você deve 
                  configurar seu navegador adequadamente ou deixar de usar nosso site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contato</h2>
                <p>
                  Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco:
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

export default CookiePolicy;