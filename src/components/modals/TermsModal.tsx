import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Termos de Uso</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e utilizar a plataforma Energee, você concorda em estar vinculado a estes Termos de Uso e a todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Descrição do Serviço</h2>
              <p className="text-muted-foreground leading-relaxed">
                A Energee é uma plataforma que facilita o acesso à energia solar compartilhada, conectando consumidores a fazendas solares através de um sistema de geração distribuída regulamentado pela ANEEL (Agência Nacional de Energia Elétrica).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Elegibilidade</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para utilizar nossos serviços, você deve ser maior de 18 anos e ter capacidade legal para celebrar contratos. Ao se registrar, você declara que todas as informações fornecidas são verdadeiras e precisas.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Funcionalidades da Plataforma</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Simulação de economia personalizada</li>
                <li>Acompanhamento de geração em tempo real</li>
                <li>Gestão de créditos de energia</li>
                <li>Suporte técnico especializado</li>
                <li>Relatórios detalhados de consumo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Responsabilidades do Usuário</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Fornecer informações precisas e atualizadas</li>
                <li>Manter a confidencialidade dos dados de acesso</li>
                <li>Usar a plataforma de acordo com as leis aplicáveis</li>
                <li>Notificar imediatamente sobre qualquer uso não autorizado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Faturamento e Pagamentos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Os valores dos planos são claramente informados na plataforma. O faturamento ocorre mensalmente, com desconto automático na conta de energia. Os preços podem ser alterados mediante notificação prévia de 30 dias.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Cancelamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Você pode cancelar sua assinatura a qualquer momento através da plataforma ou entrando em contato conosco. O cancelamento será efetivo no final do período de faturamento atual.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Limitações de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed">
                A Energee não se responsabiliza por interrupções no serviço de energia elétrica, mudanças na regulamentação ou fatores externos que possam afetar a geração solar.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Modificações</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações serão comunicadas através da plataforma e entrarão em vigor após 15 dias da notificação.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">10. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail: contato@energee.org.br
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}