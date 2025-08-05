// Seção FAQ - Perguntas frequentes sobre energia compartilhada
// [ADMIN EDITABLE: Perguntas, respostas]

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useContentData } from "@/hooks/useContentData";
import {  trackWhatsAppClick } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
export function FAQSection() {
  useScrollReveal();
  const { faqs } = useContentData();

 
   const handleWhatsAppClick = async () => {
     await trackWhatsAppClick("CTA Form Section", "Falar via WhatsApp");
     await openWhatsApp(
       "Olá! Vi o site da Energee e gostaria de falar com um especialista sobre energia compartilhada.",
       "CTA Form Section"
     );
   };
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
                key={faq.id} 
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
              <button className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-custom-md transition-smooth px-6 py-3 rounded-lg font-semibold" onClick={handleWhatsAppClick}>
                💬 Falar via WhatsApp
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth px-6 py-3 rounded-lg font-semibold"
               onClick={() => window.open('mailto:contato@energee.org.br', '_blank')}
              >
                📧 Enviar E-mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}