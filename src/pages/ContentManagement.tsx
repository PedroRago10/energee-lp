import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Plus, Edit } from "lucide-react";

// Definição das seções fixas
const FIXED_SECTIONS = [
  {
    key: 'header',
    title: 'Header',
    description: 'Logo, links de navegação e texto da associação'
  },
  {
    key: 'hero',
    title: 'Seção Principal',
    description: 'Título, descrição e cards de destaque'
  },
  {
    key: 'how_it_works',
    title: 'Como Funciona',
    description: 'Título, subtítulo e propaganda'
  },
  {
    key: 'steps',
    title: 'Etapas',
    description: 'Ícone, título, descrição e mensagem do botão das 3 etapas'
  },
  {
    key: 'differential',
    title: 'Energia Solar por Assinatura',
    description: 'Título, subtítulo e cards de diferenciais'
  },
  {
    key: 'benefits',
    title: 'Por que a Energee?',
    description: 'Título, descrição e cards de benefícios'
  },
  {
    key: 'who_can_participate',
    title: 'Quem Pode Participar?',
    description: 'Título, descrição e cards de participantes'
  },
  {
    key: 'requirements',
    title: 'Requisitos Básicos',
    description: 'Título e cards de requisitos'
  },
  {
    key: 'plans',
    title: 'Planos',
    description: 'Título, subtítulo e informações dos cards'
  },
  {
    key: 'testimonials',
    title: 'Depoimentos',
    description: 'Título, subtítulo, depoimentos e estatísticas'
  }
];

export default function ContentManagement() {
  const [sections, setSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check admin session
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin');
      return;
    }
    loadSections();
  }, [navigate]);

  const loadSections = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .order('section_key');

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error loading sections:', error);
      toast({
        title: "Erro ao carregar seções",
        description: "Não foi possível carregar as seções de conteúdo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingSection) return;

    try {
      const { error } = await supabase
        .from('content_sections')
        .upsert({
          ...editingSection,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Seção salva com sucesso!",
        description: "As alterações foram aplicadas."
      });

      setEditingSection(null);
      loadSections();
    } catch (error) {
      console.error('Error saving section:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  // Renderizar campos específicos baseados na seção
  const renderSectionFields = () => {
    if (!editingSection) return null;

    const sectionKey = editingSection.section_key;

    switch (sectionKey) {
      case 'header':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="association_text">Texto "Associação"</Label>
              <Input
                id="association_text"
                value={editingSection.content?.associationText || 'Associação'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, associationText: e.target.value }
                })}
                placeholder="Associação"
              />
            </div>
            <div className="space-y-2">
              <Label>Links de Navegação</Label>
              {['Como funciona', 'Planos', 'Depoimentos', 'FAQ', 'Quero Participar'].map((link, index) => (
                <div key={index}>
                  <Input
                    value={editingSection.content?.navLinks?.[index] || link}
                    onChange={(e) => {
                      const newNavLinks = [...(editingSection.content?.navLinks || ['Como funciona', 'Planos', 'Depoimentos', 'FAQ', 'Quero Participar'])];
                      newNavLinks[index] = e.target.value;
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, navLinks: newNavLinks }
                      });
                    }}
                    placeholder={link}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="hero_title">Título Principal</Label>
              <Input
                id="hero_title"
                value={editingSection.content?.title || 'A nova forma de consumir energia limpa chegou.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="A nova forma de consumir energia limpa chegou."
              />
            </div>
            <div>
              <Label htmlFor="hero_description">Descrição</Label>
              <Textarea
                id="hero_description"
                value={editingSection.content?.description || 'Qualquer pessoa pode economizar usando energia solar compartilhada, sem obras, sem investimento inicial e sem complicação.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, description: e.target.value }
                })}
                placeholder="Qualquer pessoa pode economizar usando energia solar compartilhada, sem obras, sem investimento inicial e sem complicação."
                rows={3}
              />
            </div>
            <div className="space-y-4">
              <Label>Cards de Destaque (3 fixos)</Label>
              {[
                { key: 'economy', defaultTitle: '30%', defaultSubtitle: 'Economia Média na Conta' },
                { key: 'clean', defaultTitle: '100%', defaultSubtitle: 'Energia Limpa e Renovável' },
                { key: 'investment', defaultTitle: '0', defaultSubtitle: 'Investimento Inicial' }
              ].map((card, index) => (
                <div key={card.key} className="border p-4 rounded-lg space-y-2">
                  <Label>Card {index + 1}</Label>
                  <Input
                    placeholder="Título"
                    value={editingSection.content?.cards?.[index]?.title || card.defaultTitle}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], title: e.target.value };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                  />
                  <Input
                    placeholder="Subtítulo"
                    value={editingSection.content?.cards?.[index]?.subtitle || card.defaultSubtitle}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], subtitle: e.target.value };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'how_it_works':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="how_title">Título</Label>
              <Input
                id="how_title"
                value={editingSection.content?.title || 'Como Funciona a Energia Compartilhada?'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="Como Funciona a Energia Compartilhada?"
              />
            </div>
            <div>
              <Label htmlFor="how_subtitle">Subtítulo</Label>
              <Textarea
                id="how_subtitle"
                value={editingSection.content?.subtitle || 'É simples, rápido e sem complicação. Em apenas 3 passos você já está economizando com energia solar compartilhada.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, subtitle: e.target.value }
                })}
                placeholder="É simples, rápido e sem complicação. Em apenas 3 passos você já está economizando com energia solar compartilhada."
                rows={2}
              />
            </div>
            <div className="space-y-4">
              <Label>Propaganda</Label>
              <div className="border p-4 rounded-lg space-y-2">
                <Input
                  placeholder="Título da Propaganda"
                  value={editingSection.content?.promo?.title || '💡 A energia vira crédito, e esse crédito é direcionado para o consumidor'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      promo: { ...editingSection.content?.promo, title: e.target.value }
                    }
                  })}
                />
                <Input
                  placeholder="Descrição da Propaganda"
                  value={editingSection.content?.promo?.description || 'Energia Solar por Assinatura - conectando famílias brasileiras à energia limpa'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      promo: { ...editingSection.content?.promo, description: e.target.value }
                    }
                  })}
                />
              </div>
            </div>
          </div>
        );

      case 'steps':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Etapas (3 fixas)</Label>
              {[
                { 
                  defaultTitle: 'Calcule sua economia e envie seu consumo',
                  defaultDescription: 'Preencha nosso formulário com seus dados e consumo. Selecione sua distribuidora de energia para uma simulação precisa.',
                  icon: '📋'
                },
                { 
                  defaultTitle: 'Análise e Aprovação',
                  defaultDescription: 'Nossa equipe analisa seu perfil de consumo e aprova sua participação no programa de energia compartilhada.',
                  icon: '⚡'
                },
                { 
                  defaultTitle: 'Comece a Economizar',
                  defaultDescription: 'Receba os créditos de energia solar diretamente na sua conta de luz e veja sua economia crescer mês a mês.',
                  icon: '💰'
                }
              ].map((step, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-2">
                  <Label>Etapa {index + 1} - {step.icon}</Label>
                  <Input
                    placeholder="Título"
                    value={editingSection.content?.steps?.[index]?.title || step.defaultTitle}
                    onChange={(e) => {
                      const newSteps = [...(editingSection.content?.steps || [])];
                      newSteps[index] = { ...newSteps[index], title: e.target.value, icon: step.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, steps: newSteps }
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Descrição"
                    value={editingSection.content?.steps?.[index]?.description || step.defaultDescription}
                    onChange={(e) => {
                      const newSteps = [...(editingSection.content?.steps || [])];
                      newSteps[index] = { ...newSteps[index], description: e.target.value, icon: step.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, steps: newSteps }
                      });
                    }}
                    rows={2}
                  />
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="cta_message">Mensagem abaixo do botão</Label>
              <Input
                id="cta_message"
                value={editingSection.content?.ctaMessage || 'Sem taxa de adesão • Sem fidelidade • Cancele quando quiser'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, ctaMessage: e.target.value }
                })}
                placeholder="Sem taxa de adesão • Sem fidelidade • Cancele quando quiser"
              />
            </div>
          </div>
        );

      case 'differential':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="diff_title">Título da Seção</Label>
              <Input
                id="diff_title"
                value={editingSection.content?.title || 'Unindo famílias, Geradores e Consumidores Brasileiros'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="Unindo famílias, Geradores e Consumidores Brasileiros"
              />
            </div>
            <div>
              <Label htmlFor="diff_subtitle">Subtítulo</Label>
              <Textarea
                id="diff_subtitle"
                value={editingSection.content?.subtitle || 'A energia vem de investimentos de famílias brasileiras, não de grandes corporações. Juntos, criamos uma rede de energia limpa, acessível e sustentável.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, subtitle: e.target.value }
                })}
                placeholder="A energia vem de investimentos de famílias brasileiras, não de grandes corporações. Juntos, criamos uma rede de energia limpa, acessível e sustentável."
                rows={2}
              />
            </div>
            <div className="space-y-4">
              <Label>Cards (3 fixos)</Label>
              {[
                { defaultTitle: 'Investimento de Famílias', defaultDescription: 'Nossa energia vem de investimentos de famílias brasileiras, não de grandes corporações', icon: '🏠' },
                { defaultTitle: 'Rede Colaborativa', defaultDescription: 'Conectamos geradores e consumidores em uma rede sustentável e econômica', icon: '🔗' },
                { defaultTitle: 'Energia Limpa', defaultDescription: 'Promovemos o uso de energia solar renovável para um futuro mais sustentável', icon: '🌱' }
              ].map((card, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-2">
                  <Label>Card {index + 1} - {card.icon}</Label>
                  <Input
                    placeholder="Título"
                    value={editingSection.content?.cards?.[index]?.title || card.defaultTitle}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], title: e.target.value, icon: card.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Descrição"
                    value={editingSection.content?.cards?.[index]?.description || card.defaultDescription}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], description: e.target.value, icon: card.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                    rows={2}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Card Promocional</Label>
              <div className="border p-4 rounded-lg space-y-2">
                <Input
                  placeholder="Título do Card Promo"
                  value={editingSection.content?.promoCard?.title || 'Faça parte desta revolução energética! 🚀'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      promoCard: { ...editingSection.content?.promoCard, title: e.target.value }
                    }
                  })}
                />
                <Textarea
                  placeholder="Descrição do Card Promo"
                  value={editingSection.content?.promoCard?.description || 'Junte-se a milhares de famílias brasileiras que já escolheram um futuro mais sustentável e econômico.'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      promoCard: { ...editingSection.content?.promoCard, description: e.target.value }
                    }
                  })}
                  rows={2}
                />
              </div>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="benefits_title">Título da Seção</Label>
              <Input
                id="benefits_title"
                value={editingSection.content?.title || 'Por que escolher Energia Compartilhada?'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="Por que escolher Energia Compartilhada?"
              />
            </div>
            <div>
              <Label htmlFor="benefits_description">Descrição</Label>
              <Textarea
                id="benefits_description"
                value={editingSection.content?.description || 'Todas as vantagens da energia solar, sem os problemas da instalação tradicional. Economia, sustentabilidade e praticidade em um só lugar.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, description: e.target.value }
                })}
                placeholder="Todas as vantagens da energia solar, sem os problemas da instalação tradicional. Economia, sustentabilidade e praticidade em um só lugar."
                rows={2}
              />
            </div>
            <div className="space-y-4">
              <Label>Cards de Benefícios (6 fixos)</Label>
              {[
                { defaultTitle: 'Economia Garantida', defaultDescription: 'Reduza até 30% na sua conta de luz todo mês com energia limpa e renovável.', icon: '💰' },
                { defaultTitle: 'Sem Investimento Inicial', defaultDescription: 'Comece a economizar imediatamente, sem precisar investir em painéis solares.', icon: '🏦' },
                { defaultTitle: 'Sem Obras ou Instalação', defaultDescription: 'Não há necessidade de obras em sua casa ou empresa. Tudo funciona remotamente.', icon: '🔧' },
                { defaultTitle: 'Flexibilidade Total', defaultDescription: 'Cancele quando quiser, sem multas ou taxas de cancelamento.', icon: '⚡' },
                { defaultTitle: 'Energia 100% Limpa', defaultDescription: 'Contribua para um planeta mais sustentável usando energia solar renovável.', icon: '🌱' },
                { defaultTitle: 'Suporte Especializado', defaultDescription: 'Nossa equipe está sempre disponível para esclarecer suas dúvidas.', icon: '🤝' }
              ].map((benefit, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-2">
                  <Label>Card {index + 1} - {benefit.icon}</Label>
                  <Input
                    placeholder="Título"
                    value={editingSection.content?.cards?.[index]?.title || benefit.defaultTitle}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], title: e.target.value, icon: benefit.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Descrição"
                    value={editingSection.content?.cards?.[index]?.description || benefit.defaultDescription}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], description: e.target.value, icon: benefit.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'who_can_participate':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="who_title">Título da Seção</Label>
              <Input
                id="who_title"
                value={editingSection.content?.title || 'Quem Pode Participar?'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="Quem Pode Participar?"
              />
            </div>
            <div>
              <Label htmlFor="who_description">Descrição</Label>
              <Textarea
                id="who_description"
                value={editingSection.content?.description || 'A energia compartilhada é para todos! Desde pessoas físicas até empresas, qualquer um pode aproveitar os benefícios da energia solar.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, description: e.target.value }
                })}
                placeholder="A energia compartilhada é para todos! Desde pessoas físicas até empresas, qualquer um pode aproveitar os benefícios da energia solar."
                rows={2}
              />
            </div>
            <div className="space-y-4">
              <Label>Cards de Participantes (3 fixos)</Label>
              {[
                { defaultTitle: 'Pessoa Física (CPF)', defaultDescription: 'Residências, apartamentos, casas e propriedades rurais com consumo mensal a partir de 100 kWh.', icon: '👤' },
                { defaultTitle: 'Pessoa Jurídica (CNPJ)', defaultDescription: 'Empresas, comércios, indústrias e estabelecimentos comerciais de todos os portes.', icon: '🏢' },
                { defaultTitle: 'Condomínios', defaultDescription: 'Condomínios residenciais e comerciais que buscam reduzir custos com energia elétrica.', icon: '🏘️' }
              ].map((participant, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-2">
                  <Label>Card {index + 1} - {participant.icon}</Label>
                  <Input
                    placeholder="Título"
                    value={editingSection.content?.cards?.[index]?.title || participant.defaultTitle}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], title: e.target.value, icon: participant.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Descrição"
                    value={editingSection.content?.cards?.[index]?.description || participant.defaultDescription}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], description: e.target.value, icon: participant.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'requirements':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="req_title">Título da Seção</Label>
              <Input
                id="req_title"
                value={editingSection.content?.title || 'Requisitos Básicos'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="Requisitos Básicos"
              />
            </div>
            <div className="space-y-4">
              <Label>Cards de Requisitos (3 fixos)</Label>
              {[
                { defaultTitle: 'Conta de Luz Ativa', defaultDescription: 'Tenha uma conta de energia elétrica ativa em seu nome ou empresa.', icon: '✓' },
                { defaultTitle: 'Consumo Mínimo', defaultDescription: 'Consumo mensal de pelo menos 100 kWh na conta de energia.', icon: '📊' },
                { defaultTitle: 'Distribuidora Participante', defaultDescription: 'Sua distribuidora deve fazer parte do programa de energia compartilhada.', icon: '🏢' }
              ].map((requirement, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-2">
                  <Label>Card {index + 1} - {requirement.icon}</Label>
                  <Input
                    placeholder="Título"
                    value={editingSection.content?.cards?.[index]?.title || requirement.defaultTitle}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], title: e.target.value, icon: requirement.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Descrição"
                    value={editingSection.content?.cards?.[index]?.description || requirement.defaultDescription}
                    onChange={(e) => {
                      const newCards = [...(editingSection.content?.cards || [])];
                      newCards[index] = { ...newCards[index], description: e.target.value, icon: requirement.icon };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, cards: newCards }
                      });
                    }}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'plans':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="plans_title">Título da Seção</Label>
              <Input
                id="plans_title"
                value={editingSection.content?.title || 'Escolha seu Plano de Economia'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="Escolha seu Plano de Economia"
              />
            </div>
            <div>
              <Label htmlFor="plans_subtitle">Subtítulo</Label>
              <Textarea
                id="plans_subtitle"
                value={editingSection.content?.subtitle || 'Quanto maior seu consumo, maior sua economia. Escolha o plano ideal para seu perfil e comece a economizar hoje mesmo.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, subtitle: e.target.value }
                })}
                placeholder="Quanto maior seu consumo, maior sua economia. Escolha o plano ideal para seu perfil e comece a economizar hoje mesmo."
                rows={2}
              />
            </div>
            <div className="space-y-4">
              <Label>Informações dos Cards</Label>
              {[
                { key: 'investment', defaultTitle: '100%', defaultSubtitle: 'Sem Investimento' },
                { key: 'cancellation', defaultTitle: '0', defaultSubtitle: 'Taxa de cancelamento' },
                { key: 'start', defaultTitle: '30', defaultSubtitle: 'Dias para começar' }
              ].map((info, index) => (
                <div key={info.key} className="border p-4 rounded-lg space-y-2">
                  <Label>Info {index + 1}</Label>
                  <Input
                    placeholder="Título"
                    value={editingSection.content?.infoCards?.[index]?.title || info.defaultTitle}
                    onChange={(e) => {
                      const newInfoCards = [...(editingSection.content?.infoCards || [])];
                      newInfoCards[index] = { ...newInfoCards[index], title: e.target.value };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, infoCards: newInfoCards }
                      });
                    }}
                  />
                  <Input
                    placeholder="Subtítulo"
                    value={editingSection.content?.infoCards?.[index]?.subtitle || info.defaultSubtitle}
                    onChange={(e) => {
                      const newInfoCards = [...(editingSection.content?.infoCards || [])];
                      newInfoCards[index] = { ...newInfoCards[index], subtitle: e.target.value };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, infoCards: newInfoCards }
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="testimonials_title">Título</Label>
              <Input
                id="testimonials_title"
                value={editingSection.content?.title || 'O que nossos clientes dizem?'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="O que nossos clientes dizem?"
              />
            </div>
            <div>
              <Label htmlFor="testimonials_subtitle">Subtítulo</Label>
              <Textarea
                id="testimonials_subtitle"
                value={editingSection.content?.subtitle || 'Milhares de pessoas já estão economizando com energia compartilhada. Veja o que elas têm a dizer sobre a experiência.'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, subtitle: e.target.value }
                })}
                placeholder="Milhares de pessoas já estão economizando com energia compartilhada. Veja o que elas têm a dizer sobre a experiência."
                rows={2}
              />
            </div>
            <div className="space-y-4">
              <Label>Depoimentos (3 fixos)</Label>
              {[
                { 
                  defaultName: 'Maria Silva', 
                  defaultLocation: 'São Paulo, SP', 
                  defaultSavings: 'R$ 180/mês',
                  defaultTestimonial: 'Incrível! Estou economizando muito na conta de luz sem precisar instalar nada. Super recomendo!'
                },
                { 
                  defaultName: 'João Santos', 
                  defaultLocation: 'Rio de Janeiro, RJ', 
                  defaultSavings: 'R$ 250/mês',
                  defaultTestimonial: 'A energia compartilhada mudou nossa vida. Economia real todo mês e ainda ajudamos o meio ambiente.'
                },
                { 
                  defaultName: 'Ana Costa', 
                  defaultLocation: 'Belo Horizonte, MG', 
                  defaultSavings: 'R$ 320/mês',
                  defaultTestimonial: 'Fácil de contratar e os resultados aparecem rapidamente. Melhor decisão que tomamos!'
                }
              ].map((testimonial, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-2">
                  <Label>Depoimento {index + 1}</Label>
                  <Input
                    placeholder="Nome"
                    value={editingSection.content?.testimonials?.[index]?.name || testimonial.defaultName}
                    onChange={(e) => {
                      const newTestimonials = [...(editingSection.content?.testimonials || [])];
                      newTestimonials[index] = { ...newTestimonials[index], name: e.target.value };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, testimonials: newTestimonials }
                      });
                    }}
                  />
                  <Input
                    placeholder="Localização"
                    value={editingSection.content?.testimonials?.[index]?.location || testimonial.defaultLocation}
                    onChange={(e) => {
                      const newTestimonials = [...(editingSection.content?.testimonials || [])];
                      newTestimonials[index] = { ...newTestimonials[index], location: e.target.value };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, testimonials: newTestimonials }
                      });
                    }}
                  />
                  <Input
                    placeholder="Economia"
                    value={editingSection.content?.testimonials?.[index]?.savings || testimonial.defaultSavings}
                    onChange={(e) => {
                      const newTestimonials = [...(editingSection.content?.testimonials || [])];
                      newTestimonials[index] = { ...newTestimonials[index], savings: e.target.value };
                      setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, testimonials: newTestimonials }
                      });
                    }}
                  />
                   <Input
                     placeholder="URL da Imagem (opcional)"
                     value={editingSection.content?.testimonials?.[index]?.image || ''}
                     onChange={(e) => {
                       const newTestimonials = [...(editingSection.content?.testimonials || [])];
                       newTestimonials[index] = { ...newTestimonials[index], image: e.target.value };
                       setEditingSection({
                         ...editingSection,
                         content: { ...editingSection.content, testimonials: newTestimonials }
                       });
                     }}
                   />
                   <Input
                     placeholder="Avaliação (1-5)"
                     type="number"
                     min="1"
                     max="5"
                     value={editingSection.content?.testimonials?.[index]?.rating || '5'}
                     onChange={(e) => {
                       const newTestimonials = [...(editingSection.content?.testimonials || [])];
                       newTestimonials[index] = { ...newTestimonials[index], rating: parseInt(e.target.value) || 5 };
                       setEditingSection({
                         ...editingSection,
                         content: { ...editingSection.content, testimonials: newTestimonials }
                       });
                     }}
                   />
                   <Textarea
                     placeholder="Depoimento"
                     value={editingSection.content?.testimonials?.[index]?.text || testimonial.defaultTestimonial}
                     onChange={(e) => {
                       const newTestimonials = [...(editingSection.content?.testimonials || [])];
                       newTestimonials[index] = { ...newTestimonials[index], text: e.target.value };
                       setEditingSection({
                         ...editingSection,
                         content: { ...editingSection.content, testimonials: newTestimonials }
                       });
                     }}
                     rows={2}
                   />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="active_clients">Clientes Ativos</Label>
                <Input
                  id="active_clients"
                  value={editingSection.content?.stats?.active_clients || '5.000+'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      stats: { 
                        ...editingSection.content?.stats, 
                        active_clients: e.target.value 
                      }
                    }
                  })}
                  placeholder="5.000+"
                />
              </div>
              <div>
                <Label htmlFor="monthly_savings">Economizado por Mês</Label>
                <Input
                  id="monthly_savings"
                  value={editingSection.content?.stats?.monthly_savings || 'R$ 2.5M'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      stats: { 
                        ...editingSection.content?.stats, 
                        monthly_savings: e.target.value 
                      }
                    }
                  })}
                  placeholder="R$ 2.5M"
                />
              </div>
              <div>
                <Label htmlFor="average_rating">Avaliação Média</Label>
                <Input
                  id="average_rating"
                  value={editingSection.content?.stats?.average_rating || '4.9/5'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      stats: { 
                        ...editingSection.content?.stats, 
                        average_rating: e.target.value 
                      }
                    }
                  })}
                  placeholder="4.9/5"
                />
              </div>
              <div>
                <Label htmlFor="recommendation">Recomendam</Label>
                <Input
                  id="recommendation"
                  value={editingSection.content?.stats?.recommendation || '98%'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { 
                      ...editingSection.content, 
                      stats: { 
                        ...editingSection.content?.stats, 
                        recommendation: e.target.value 
                      }
                    }
                  })}
                  placeholder="98%"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content_title">Título</Label>
              <Input
                id="content_title"
                value={editingSection.content?.title || ''}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, title: e.target.value }
                })}
                placeholder="Título"
              />
            </div>
            <div>
              <Label htmlFor="content_subtitle">Subtítulo</Label>
              <Textarea
                id="content_subtitle"
                value={editingSection.content?.subtitle || ''}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, subtitle: e.target.value }
                })}
                placeholder="Subtítulo"
                rows={2}
              />
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container-xl px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">
                Gerenciamento de Conteúdo
              </h1>
            </div>
            <Button 
              size="sm"
              onClick={() => setEditingSection(null)}
              className="w-full sm:w-auto"
            >
              Ver Seções
            </Button>
          </div>
        </div>
      </header>

      <div className="container-xl px-2 sm:px-4 py-4 sm:py-8">
        {editingSection ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingSection.id ? 'Editar Seção' : 'Nova Seção'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">
                  {FIXED_SECTIONS.find(s => s.key === editingSection.section_key)?.title || editingSection.title}
                </h3>
                <p className="text-sm text-blue-700">
                  {FIXED_SECTIONS.find(s => s.key === editingSection.section_key)?.description || editingSection.description}
                </p>
              </div>

              {/* Campos específicos da seção */}
              {renderSectionFields()}

              <div className="flex space-x-4">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button variant="outline" onClick={() => setEditingSection(null)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {FIXED_SECTIONS.map((fixedSection) => {
              const existingSection = sections.find(s => s.section_key === fixedSection.key);
              
              return (
                <Card key={fixedSection.key}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{fixedSection.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {fixedSection.description}
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => setEditingSection(existingSection || {
                          section_key: fixedSection.key,
                          title: fixedSection.title,
                          description: fixedSection.description,
                          content: {},
                          images: {}
                        })}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {existingSection ? 'Editar' : 'Configurar'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Status: {existingSection ? 'Configurado' : 'Não configurado'}
                    </p>
                    {existingSection && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Última atualização: {new Date(existingSection.updated_at).toLocaleString('pt-BR')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
