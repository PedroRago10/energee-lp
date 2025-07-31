// Seção FAQ - Perguntas frequentes sobre energia compartilhada
// [ADMIN EDITABLE: Perguntas, respostas]

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function FAQSection() {
  useScrollReveal();
  const faqs = [
    {
      question: "O que é energia compartilhada?",
      answer: "Energia compartilhada é um modelo onde você recebe créditos de energia solar diretamente na sua conta de luz, sem precisar instalar painéis na sua propriedade. A energia é gerada em usinas solares e os créditos são distribuídos aos participantes."
    },
    {
      question: "Como funciona na prática?",
      answer: "Você se cadastra, escolhe um plano de acordo com seu consumo, e automaticamente passa a receber créditos de energia limpa na sua conta. Esses créditos reduzem o valor da sua conta de luz todos os meses."
    },
    {
      question: "Preciso fazer alguma instalação em casa?",
      answer: "Não! Esse é um dos principais benefícios. Você não precisa instalar nada em casa, não há obras, não há investimento inicial. A energia vem direto na sua conta através dos créditos."
    },
    {
      question: "Quanto posso economizar?",
      answer: "A economia varia de acordo com seu consumo e o plano escolhido, podendo chegar a até 30% na sua conta de luz. Oferecemos uma simulação gratuita para você saber exatamente quanto pode economizar."
    },
    {
      question: "Há algum contrato de fidelidade?",
      answer: "Não! Você pode cancelar quando quiser, sem multas e sem taxa de cancelamento. Nosso objetivo é sua satisfação, não te prender em contratos longos."
    },
    {
      question: "Como sei que é seguro e confiável?",
      answer: "Todo o processo é regulamentado pela ANEEL (Agência Nacional de Energia Elétrica). As usinas solares são registradas e licenciadas, garantindo total segurança e legalidade do serviço."
    },
    {
      question: "Em quanto tempo começo a economizar?",
      answer: "Normalmente em até 30 dias após a contratação você já começa a receber os primeiros créditos na sua conta de luz. O processo de ativação é rápido e sem burocracia."
    },
    {
      question: "Posso mudar de plano depois?",
      answer: "Sim! Você pode alterar seu plano a qualquer momento para se adequar melhor ao seu consumo atual. Nosso time de suporte está sempre disponível para ajudar."
    },
    {
      question: "E se eu me mudar de endereço?",
      answer: "Não há problema! Seus créditos de energia podem ser transferidos para o novo endereço, desde que seja na mesma área de concessão da distribuidora de energia."
    },
    {
      question: "Qual a diferença para instalar painéis em casa?",
      answer: "Com energia compartilhada você não tem investimento inicial (que pode chegar a R$ 50.000), não tem manutenção, não tem obras, e pode cancelar quando quiser. É mais flexível e acessível."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container-xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary">Dúvidas</span> Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encontre as respostas para as principais dúvidas sobre energia compartilhada. 
            Se não encontrar sua pergunta, entre em contato conosco.
          </p>
        </div>

        <div className="max-w-4xl mx-auto scroll-reveal">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 py-2 shadow-custom-sm hover:shadow-custom-md transition-smooth"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="gradient-section rounded-2xl p-8 md:p-12 shadow-custom-lg max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Nossa equipe de especialistas está pronta para esclarecer 
              todas as suas questões sobre energia compartilhada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-custom-md transition-smooth px-6 py-3 rounded-lg font-semibold">
                💬 Falar via WhatsApp
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth px-6 py-3 rounded-lg font-semibold">
                📧 Enviar E-mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}