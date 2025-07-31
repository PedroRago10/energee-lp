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
          <div className="space-y-4">
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
            <div>
              <Label htmlFor="cta_text">Texto do botão CTA</Label>
              <Input
                id="cta_text"
                value={editingSection.content?.ctaText || 'Quero Participar'}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: { ...editingSection.content, ctaText: e.target.value }
                })}
                placeholder="Quero Participar"
              />
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-4">
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
          </div>
        );

      case 'how_it_works':
        return (
          <div className="space-y-4">
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
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4">
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
        <div className="container-xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate("/admin/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-2xl font-bold text-foreground">
                Gerenciamento de Conteúdo
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container-xl px-4 py-8">
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
