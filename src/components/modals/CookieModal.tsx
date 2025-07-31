import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CookieModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CookieModal({ open, onOpenChange }: CookieModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Política de Cookies</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. O que são Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Como Utilizamos os Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies para melhorar sua experiência em nosso site, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                <li>Manter você conectado durante sua visita</li>
                <li>Lembrar suas preferências e configurações</li>
                <li>Analisar como nosso site é usado</li>
                <li>Personalizar conteúdo e anúncios</li>
                <li>Melhorar a funcionalidade do site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Tipos de Cookies que Utilizamos</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">3.1 Cookies Essenciais</h3>
                  <p className="text-muted-foreground">
                    Necessários para o funcionamento básico do site. Sem estes cookies, o site não pode funcionar adequadamente.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3.2 Cookies de Performance</h3>
                  <p className="text-muted-foreground">
                    Coletam informações sobre como os visitantes usam nosso site, como quais páginas são visitadas com mais frequência.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3.3 Cookies de Funcionalidade</h3>
                  <p className="text-muted-foreground">
                    Permitem que o site lembre de escolhas que você fez (como seu nome de usuário, idioma ou região).
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3.4 Cookies de Marketing</h3>
                  <p className="text-muted-foreground">
                    Utilizados para rastrear visitantes através de sites para exibir anúncios relevantes e envolventes.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Cookies de Terceiros</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nosso site pode conter cookies de terceiros, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                <li>Google Analytics para análise de tráfego</li>
                <li>Redes sociais para funcionalidades de compartilhamento</li>
                <li>Provedores de chat para suporte ao cliente</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Gerenciamento de Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão em seu computador e pode configurar a maioria dos navegadores para impedir que sejam colocados.
              </p>
              
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Como gerenciar cookies em diferentes navegadores:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Chrome: Configurações → Privacidade e segurança → Cookies</li>
                  <li>Firefox: Opções → Privacidade e Segurança</li>
                  <li>Safari: Preferências → Privacidade</li>
                  <li>Edge: Configurações → Cookies e permissões de site</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Consequências da Desativação</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se você optar por desativar cookies, algumas funcionalidades do nosso site podem não funcionar corretamente, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                <li>Manter preferências de login</li>
                <li>Personalização de conteúdo</li>
                <li>Funcionalidades interativas</li>
                <li>Análise de desempenho do site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Atualizações desta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar nossa Política de Cookies periodicamente para refletir mudanças em nossas práticas ou por outras razões operacionais, legais ou regulamentares.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Consentimento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao continuar a usar nosso site, você consente com o uso de cookies de acordo com esta política.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco em: cookies@energee.org.br
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}