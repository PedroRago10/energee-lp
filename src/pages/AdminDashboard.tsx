// Admin Dashboard - Painel de controle administrativo

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Eye,
  Mail,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalAnalytics: 0,
    activePlans: 0,
    activeFaqs: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin");
        return;
      }
      setUser(user);
    };

    checkAuth();
    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const [submissions, analytics, plans, faqs] = await Promise.all([
        supabase.from('form_submissions').select('*', { count: 'exact' }),
        supabase.from('analytics_events').select('*', { count: 'exact' }),
        supabase.from('plans').select('*', { count: 'exact' }).eq('active', true),
        supabase.from('faqs').select('*', { count: 'exact' }).eq('active', true)
      ]);

      setStats({
        totalSubmissions: submissions.count || 0,
        totalAnalytics: analytics.count || 0,
        activePlans: plans.count || 0,
        activeFaqs: faqs.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/admin");
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container-xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Painel Administrativo
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo, {user.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate("/")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Formulários Enviados
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                Total de leads captados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eventos de Analytics
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAnalytics}</div>
              <p className="text-xs text-muted-foreground">
                Interações registradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Planos Ativos
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePlans}</div>
              <p className="text-xs text-muted-foreground">
                Planos disponíveis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                FAQs Ativas
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeFaqs}</div>
              <p className="text-xs text-muted-foreground">
                Perguntas publicadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="forms">Formulários</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Conteúdo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aqui você poderá editar textos, títulos e imagens de todas as seções do site.
                </p>
                <div className="mt-4">
                  <Button>Editar Seções</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Planos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure os planos de economia, preços e benefícios oferecidos.
                </p>
                <div className="mt-4">
                  <Button>Gerenciar Planos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Formulários Recebidos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize e exporte os dados dos formulários enviados pelos visitantes.
                </p>
                <div className="mt-4">
                  <Button>Ver Formulários</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adicione, edite ou remova perguntas e respostas da seção FAQ.
                </p>
                <div className="mt-4">
                  <Button>Gerenciar FAQ</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure integrações (Mautic), textos estratégicos e outras configurações do sistema.
                </p>
                <div className="mt-4">
                  <Button>Abrir Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}