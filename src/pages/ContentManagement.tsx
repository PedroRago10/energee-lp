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

  const createNewSection = () => {
    setEditingSection({
      section_key: '',
      title: '',
      description: '',
      content: {},
      images: {}
    });
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
            <Button onClick={createNewSection}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Seção
            </Button>
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
              <div>
                <Label htmlFor="section_key">Chave da Seção</Label>
                <Input
                  id="section_key"
                  value={editingSection.section_key}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    section_key: e.target.value
                  })}
                  placeholder="ex: hero-section"
                />
              </div>
              
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    title: e.target.value
                  })}
                  placeholder="Título da seção"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={editingSection.description || ''}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    description: e.target.value
                  })}
                  placeholder="Descrição da seção"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Conteúdo (JSON)</Label>
                <Textarea
                  id="content"
                  value={JSON.stringify(editingSection.content, null, 2)}
                  onChange={(e) => {
                    try {
                      const content = JSON.parse(e.target.value);
                      setEditingSection({
                        ...editingSection,
                        content
                      });
                    } catch (error) {
                      // Invalid JSON, keep as string for now
                    }
                  }}
                  placeholder='{"texto": "Conteúdo aqui"}'
                  rows={6}
                />
              </div>

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
            {sections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Chave: {section.section_key}
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setEditingSection(section)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {section.description || 'Sem descrição'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Última atualização: {new Date(section.updated_at).toLocaleString('pt-BR')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
