import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Política de Privacidade</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed">
                A Energee está comprometida em proteger e respeitar sua privacidade. Esta política explica quando e como coletamos informações pessoais sobre você, como as utilizamos e com quem as compartilhamos.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Informações que Coletamos</h2>
              <div className="space-y-3">
                <h3 className="font-medium">2.1 Dados Pessoais:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Nome completo e CPF</li>
                  <li>Endereço residencial</li>
                  <li>E-mail e telefone</li>
                  <li>Dados da conta de energia</li>
                </ul>

                <h3 className="font-medium">2.2 Dados de Uso:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Histórico de consumo energético</li>
                  <li>Padrões de uso da plataforma</li>
                  <li>Preferências e configurações</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Como Utilizamos suas Informações</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar pagamentos e faturamento</li>
                <li>Comunicar sobre sua conta e serviços</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Personalizar sua experiência na plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Base Legal para Processamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Processamos seus dados pessoais com base em: consentimento, necessidade contratual, obrigações legais e interesses legítimos para melhorar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Compartilhamento de Informações</h2>
              <p className="text-muted-foreground leading-relaxed">
                Compartilhamos informações apenas quando necessário para: prestação de serviços, cumprimento legal, proteção de direitos ou com seu consentimento explícito.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Segurança dos Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Retenção de Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mantemos suas informações pessoais apenas pelo tempo necessário para os fins estabelecidos nesta política ou conforme exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Seus Direitos</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Direito de acesso aos seus dados</li>
                <li>Direito de retificação</li>
                <li>Direito de exclusão</li>
                <li>Direito de portabilidade</li>
                <li>Direito de oposição ao processamento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Cookies e Tecnologias Similares</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies para melhorar sua experiência, analisar o uso do site e personalizar conteúdo. Consulte nossa Política de Cookies para mais detalhes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">10. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através de e-mail ou aviso na plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">11. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para questões sobre privacidade ou exercer seus direitos, entre em contato: privacidade@energee.org.br
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}