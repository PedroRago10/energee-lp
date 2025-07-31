import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Plus, Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check admin session
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin');
      return;
    }
    loadFaqs();
  }, [navigate]);

  const loadFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error loading FAQs:', error);
      toast({
        title: "Erro ao carregar FAQs",
        description: "Não foi possível carregar as perguntas frequentes.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingFaq) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .upsert({
          ...editingFaq,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "FAQ salva com sucesso!",
        description: "As alterações foram aplicadas."
      });

      setEditingFaq(null);
      loadFaqs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (faqId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta FAQ?')) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', faqId);

      if (error) throw error;

      toast({
        title: "FAQ excluída com sucesso!",
        description: "A pergunta foi removida."
      });

      loadFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a FAQ.",
        variant: "destructive"
      });
    }
  };

  const updateOrder = async (faqId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ display_order: newOrder })
        .eq('id', faqId);

      if (error) throw error;
      loadFaqs();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const createNewFaq = () => {
    setEditingFaq({
      question: '',
      answer: '',
      active: true,
      display_order: faqs.length
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
                Gerenciamento de FAQ
              </h1>
            </div>
            <Button onClick={createNewFaq}>
              <Plus className="h-4 w-4 mr-2" />
              Nova FAQ
            </Button>
          </div>
        </div>
      </header>

      <div className="container-xl px-4 py-8">
        {editingFaq ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingFaq.id ? 'Editar FAQ' : 'Nova FAQ'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="question">Pergunta</Label>
                <Input
                  id="question"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({
                    ...editingFaq,
                    question: e.target.value
                  })}
                  placeholder="Digite a pergunta..."
                />
              </div>
              
              <div>
                <Label htmlFor="answer">Resposta</Label>
                <Textarea
                  id="answer"
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({
                    ...editingFaq,
                    answer: e.target.value
                  })}
                  placeholder="Digite a resposta..."
                  rows={5}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingFaq.active}
                  onCheckedChange={(checked) => setEditingFaq({
                    ...editingFaq,
                    active: checked
                  })}
                />
                <Label>FAQ Ativa (visível no site)</Label>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button variant="outline" onClick={() => setEditingFaq(null)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={faq.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2">
                        <span>{faq.question}</span>
                        {!faq.active && (
                          <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                            Inativa
                          </span>
                        )}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-col">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateOrder(faq.id, faq.display_order - 1)}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateOrder(faq.id, faq.display_order + 1)}
                          disabled={index === faqs.length - 1}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingFaq(faq)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(faq.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Ordem: {faq.display_order} • 
                    Última atualização: {new Date(faq.updated_at).toLocaleString('pt-BR')}
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