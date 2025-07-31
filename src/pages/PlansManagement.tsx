import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Plus, Edit, Trash2 } from "lucide-react";

export default function PlansManagement() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check admin session
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin');
      return;
    }
    loadPlans();
  }, [navigate]);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error loading plans:', error);
      toast({
        title: "Erro ao carregar planos",
        description: "Não foi possível carregar os planos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPlan) return;

    try {
      const planData = {
        ...editingPlan,
        features: typeof editingPlan.features === 'string' 
          ? JSON.parse(editingPlan.features) 
          : editingPlan.features,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('plans')
        .upsert(planData);

      if (error) throw error;

      toast({
        title: "Plano salvo com sucesso!",
        description: "As alterações foram aplicadas."
      });

      setEditingPlan(null);
      loadPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (planId: string) => {
    if (!confirm('Tem certeza que deseja excluir este plano?')) return;

    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;

      toast({
        title: "Plano excluído com sucesso!",
        description: "O plano foi removido."
      });

      loadPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o plano.",
        variant: "destructive"
      });
    }
  };

  const createNewPlan = () => {
    setEditingPlan({
      name: '',
      subtitle: '',
      percentage: 10,
      consumption_range: '',
      estimated_savings: '',
      features: [],
      button_text: 'Contratar Plano',
      button_variant: 'outline',
      active: true,
      popular: false,
      display_order: plans.length
    });
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
                Gerenciamento de Planos
              </h1>
            </div>
            <Button 
              size="sm"
              onClick={createNewPlan}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1 sm:mr-2" />
              Novo Plano
            </Button>
          </div>
        </div>
      </header>

      <div className="container-xl px-2 sm:px-4 py-4 sm:py-8">
        {editingPlan ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingPlan.id ? 'Editar Plano' : 'Novo Plano'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Plano</Label>
                  <Input
                    id="name"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({
                      ...editingPlan,
                      name: e.target.value
                    })}
                    placeholder="ex: Econômico"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={editingPlan.subtitle || ''}
                    onChange={(e) => setEditingPlan({
                      ...editingPlan,
                      subtitle: e.target.value
                    })}
                    placeholder="ex: Mesma titularidade"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="percentage">Porcentagem de Economia</Label>
                  <Input
                    id="percentage"
                    type="number"
                    value={editingPlan.percentage}
                    onChange={(e) => setEditingPlan({
                      ...editingPlan,
                      percentage: parseInt(e.target.value)
                    })}
                    placeholder="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="consumption_range">Faixa de Consumo</Label>
                  <Input
                    id="consumption_range"
                    value={editingPlan.consumption_range || ''}
                    onChange={(e) => setEditingPlan({
                      ...editingPlan,
                      consumption_range: e.target.value
                    })}
                    placeholder="100-250 kWh"
                  />
                </div>

                <div>
                  <Label htmlFor="estimated_savings">Economia Estimada</Label>
                  <Input
                    id="estimated_savings"
                    value={editingPlan.estimated_savings || ''}
                    onChange={(e) => setEditingPlan({
                      ...editingPlan,
                      estimated_savings: e.target.value
                    })}
                    placeholder="R$ 30-75"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="features">Características (uma por linha)</Label>
                <Textarea
                  id="features"
                  value={Array.isArray(editingPlan.features) 
                    ? editingPlan.features.join('\n') 
                    : editingPlan.features}
                  onChange={(e) => setEditingPlan({
                    ...editingPlan,
                    features: e.target.value.split('\n').filter(f => f.trim())
                  })}
                  placeholder="Mesma titularidade&#10;Suporte por e-mail"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="button_text">Texto do Botão</Label>
                  <Input
                    id="button_text"
                    value={editingPlan.button_text || ''}
                    onChange={(e) => setEditingPlan({
                      ...editingPlan,
                      button_text: e.target.value
                    })}
                    placeholder="Contratar Plano"
                  />
                </div>

                <div>
                  <Label htmlFor="button_variant">Variante do Botão</Label>
                  <Select
                    value={editingPlan.button_variant}
                    onValueChange={(value) => setEditingPlan({
                      ...editingPlan,
                      button_variant: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="cta">CTA</SelectItem>
                      <SelectItem value="hero">Hero</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingPlan.active}
                    onCheckedChange={(checked) => setEditingPlan({
                      ...editingPlan,
                      active: checked
                    })}
                  />
                  <Label>Plano Ativo</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingPlan.popular}
                    onCheckedChange={(checked) => setEditingPlan({
                      ...editingPlan,
                      popular: checked
                    })}
                  />
                  <Label>Plano Popular</Label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button onClick={handleSave} className="flex-1 sm:flex-none">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button variant="outline" onClick={() => setEditingPlan(null)} className="flex-1 sm:flex-none">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{plan.name}</span>
                        {plan.popular && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Popular</span>}
                        {!plan.active && <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">Inativo</span>}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {plan.subtitle} • {plan.percentage}% de economia
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline"
                        onClick={() => setEditingPlan(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                    <div>
                      <strong>Consumo:</strong> {plan.consumption_range}
                    </div>
                    <div>
                      <strong>Economia:</strong> {plan.estimated_savings}
                    </div>
                  </div>
                  <div className="mt-2">
                    <strong>Características:</strong>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {Array.isArray(plan.features) ? plan.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      )) : null}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}