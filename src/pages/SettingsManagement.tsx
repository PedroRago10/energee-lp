import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Settings } from "lucide-react";

export default function SettingsManagement() {
  const [settings, setSettings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check admin session
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin');
      return;
    }
    loadSettings();
  }, [navigate]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar as configurações.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (settingKey: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: settingKey,
          setting_value: value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Configuração salva!",
        description: "A configuração foi atualizada com sucesso."
      });

      loadSettings();
    } catch (error) {
      console.error('Error saving setting:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a configuração.",
        variant: "destructive"
      });
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(settings.map(setting => 
      setting.setting_key === key 
        ? { ...setting, setting_value: value }
        : setting
    ));
  };

  if (isLoading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container-xl px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={() => navigate("/admin/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              Configurações do Sistema
            </h1>
          </div>
        </div>
      </header>

      <div className="container-xl px-4 py-8 space-y-6">
        {/* Integração Mautic */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Integração Mautic</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mautic_url">URL do Mautic</Label>
              <Input
                id="mautic_url"
                value={settings.find(s => s.setting_key === 'mautic_url')?.setting_value || ''}
                onChange={(e) => updateSetting('mautic_url', e.target.value)}
                placeholder="https://seu-mautic.com"
              />
            </div>
            
            <div>
              <Label htmlFor="mautic_username">Usuário do Mautic</Label>
              <Input
                id="mautic_username"
                value={settings.find(s => s.setting_key === 'mautic_username')?.setting_value || ''}
                onChange={(e) => updateSetting('mautic_username', e.target.value)}
                placeholder="seu-usuario"
              />
            </div>

            <div>
              <Label htmlFor="mautic_password">Senha do Mautic</Label>
              <Input
                id="mautic_password"
                type="password"
                value={settings.find(s => s.setting_key === 'mautic_password')?.setting_value || ''}
                onChange={(e) => updateSetting('mautic_password', e.target.value)}
                placeholder="sua-senha"
              />
            </div>

            <Button onClick={() => {
              const mauticUrl = settings.find(s => s.setting_key === 'mautic_url')?.setting_value || '';
              const mauticUsername = settings.find(s => s.setting_key === 'mautic_username')?.setting_value || '';
              const mauticPassword = settings.find(s => s.setting_key === 'mautic_password')?.setting_value || '';
              
              handleSave('mautic_url', mauticUrl);
              handleSave('mautic_username', mauticUsername);
              handleSave('mautic_password', mauticPassword);
            }}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações do Mautic
            </Button>
          </CardContent>
        </Card>

        {/* Contatos e Informações */}
        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contact_email">Email de Contato</Label>
              <Input
                id="contact_email"
                value={settings.find(s => s.setting_key === 'contact_email')?.setting_value || ''}
                onChange={(e) => updateSetting('contact_email', e.target.value)}
                placeholder="contato@energee.org.br"
              />
            </div>
            
            <div>
              <Label htmlFor="contact_phone">Telefone de Contato</Label>
              <Input
                id="contact_phone"
                value={settings.find(s => s.setting_key === 'contact_phone')?.setting_value || ''}
                onChange={(e) => updateSetting('contact_phone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
              <Input
                id="whatsapp_number"
                value={settings.find(s => s.setting_key === 'whatsapp_number')?.setting_value || ''}
                onChange={(e) => updateSetting('whatsapp_number', e.target.value)}
                placeholder="5511999999999"
              />
            </div>

            <Button onClick={() => {
              const contactEmail = settings.find(s => s.setting_key === 'contact_email')?.setting_value || '';
              const contactPhone = settings.find(s => s.setting_key === 'contact_phone')?.setting_value || '';
              const whatsappNumber = settings.find(s => s.setting_key === 'whatsapp_number')?.setting_value || '';
              
              handleSave('contact_email', contactEmail);
              handleSave('contact_phone', contactPhone);
              handleSave('whatsapp_number', whatsappNumber);
            }}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Informações de Contato
            </Button>
          </CardContent>
        </Card>

        {/* Textos Estratégicos */}
        <Card>
          <CardHeader>
            <CardTitle>Textos Estratégicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hero_title">Título Principal (Hero)</Label>
              <Textarea
                id="hero_title"
                value={settings.find(s => s.setting_key === 'hero_title')?.setting_value || ''}
                onChange={(e) => updateSetting('hero_title', e.target.value)}
                placeholder="Economia de até 20% na conta de luz com energia solar"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="hero_subtitle">Subtítulo (Hero)</Label>
              <Textarea
                id="hero_subtitle"
                value={settings.find(s => s.setting_key === 'hero_subtitle')?.setting_value || ''}
                onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
                placeholder="Energia limpa, sem investimento inicial e com economia garantida"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="cta_text">Texto do CTA Principal</Label>
              <Input
                id="cta_text"
                value={settings.find(s => s.setting_key === 'cta_text')?.setting_value || ''}
                onChange={(e) => updateSetting('cta_text', e.target.value)}
                placeholder="Comece a Economizar Agora"
              />
            </div>

            <Button onClick={() => {
              const heroTitle = settings.find(s => s.setting_key === 'hero_title')?.setting_value || '';
              const heroSubtitle = settings.find(s => s.setting_key === 'hero_subtitle')?.setting_value || '';
              const ctaText = settings.find(s => s.setting_key === 'cta_text')?.setting_value || '';
              
              handleSave('hero_title', heroTitle);
              handleSave('hero_subtitle', heroSubtitle);
              handleSave('cta_text', ctaText);
            }}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Textos Estratégicos
            </Button>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics e Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
              <Input
                id="google_analytics_id"
                value={settings.find(s => s.setting_key === 'google_analytics_id')?.setting_value || ''}
                onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
                placeholder="GA-XXXXXXXXX-X"
              />
            </div>
            
            <div>
              <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
              <Input
                id="facebook_pixel_id"
                value={settings.find(s => s.setting_key === 'facebook_pixel_id')?.setting_value || ''}
                onChange={(e) => updateSetting('facebook_pixel_id', e.target.value)}
                placeholder="123456789012345"
              />
            </div>

            <Button onClick={() => {
              const gaId = settings.find(s => s.setting_key === 'google_analytics_id')?.setting_value || '';
              const fbPixelId = settings.find(s => s.setting_key === 'facebook_pixel_id')?.setting_value || '';
              
              handleSave('google_analytics_id', gaId);
              handleSave('facebook_pixel_id', fbPixelId);
            }}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações de Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}