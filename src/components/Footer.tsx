// Footer - Rodapé com links e informações de contato
// [ADMIN EDITABLE: Links, textos, redes sociais, contatos]

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import energeeLogo from "@/assets/energee-logo.png";
import { useContentData } from "@/hooks/useContentData";

export function Footer() {
  const { getSetting } = useContentData();
  
  const contactPhone = getSetting('contact_phone', '(11) 99999-9999');
  const contactEmail = getSetting('contact_email', 'contato@energee.org.br');
  const companyName = getSetting('company_name', 'Energee');
  const companyCnpj = getSetting('company_cnpj', '61.015.824/0001-20');
  const companyAddress = getSetting('company_address', 'Brasil');
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src={energeeLogo} 
                alt="Energee" 
                className="h-6 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Democratizando o acesso à energia sustentável através da geração compartilhada. Mais sustentabilidade para todos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#como-funciona" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#beneficios" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#planos" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Planos de Economia
                </a>
              </li>
              <li>
                <a href="#faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/politicas" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/privacidade" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="/regulamentacao" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                  Regulamentação ANEEL
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <a href={`tel:${contactPhone.replace(/\D/g, '')}`} className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                    {contactPhone}
                  </a>
                  <div className="text-sm text-primary-foreground/60">
                    WhatsApp
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <a href={`mailto:${contactEmail}`} className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">
                    {contactEmail}
                  </a>
                  <div className="text-sm text-primary-foreground/60">
                    Suporte
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-primary-foreground/80">
                    {companyAddress}
                  </div>
                  <div className="text-sm text-primary-foreground/60">
                    Atendimento Nacional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
              © 2024 {companyName}.org.br. Todos os direitos reservados. • CNPJ: {companyCnpj}
            </div>
            <div className="text-primary-foreground/60 text-sm">
              Regulamentado pela ANEEL • Desenvolvido por: Pedro Rago
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}