import React, { useState, useEffect } from "react";
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
    setSettings(prevSettings => {
      const existingSetting = prevSettings.find(s => s.setting_key === key);
      if (existingSetting) {
        return prevSettings.map(setting => 
          setting.setting_key === key 
            ? { ...setting, setting_value: value }
            : setting
        );
      } else {
        // Create new setting if it doesn't exist
        return [
          ...prevSettings,
          {
            id: crypto.randomUUID(),
            setting_key: key,
            setting_value: value,
            setting_type: 'text',
            description: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
      }
    });
  };

  const getSettingValue = (key: string) => {
    return settings.find(s => s.setting_key === key)?.setting_value || '';
  };

  if (isLoading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container-xl px-2 sm:px-4 py-3 sm:py-4">
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
              Configurações do Sistema
            </h1>
          </div>
        </div>
      </header>

      <div className="container-xl px-2 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Informações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Informações da Empresa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company_name">Nome da Empresa</Label>
              <Input
                id="company_name"
                value={getSettingValue('company_name')}
                onChange={(e) => updateSetting('company_name', e.target.value)}
                placeholder="Energee"
              />
            </div>
            
            <div>
              <Label htmlFor="company_cnpj">CNPJ</Label>
              <Input
                id="company_cnpj"
                value={getSettingValue('company_cnpj')}
                onChange={(e) => updateSetting('company_cnpj', e.target.value)}
                placeholder="00.000.000/0001-00"
              />
            </div>

            <div>
              <Label htmlFor="company_address">Endereço</Label>
              <Input
                id="company_address"
                value={getSettingValue('company_address')}
                onChange={(e) => updateSetting('company_address', e.target.value)}
                placeholder="Rua Example, 123 - São Paulo, SP"
              />
            </div>

            <Button onClick={() => {
              const companyName = getSettingValue('company_name');
              const companyCnpj = getSettingValue('company_cnpj');
              const companyAddress = getSettingValue('company_address');
              
              handleSave('company_name', companyName);
              handleSave('company_cnpj', companyCnpj);
              handleSave('company_address', companyAddress);
            }}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Informações da Empresa
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
                value={getSettingValue('contact_email')}
                onChange={(e) => updateSetting('contact_email', e.target.value)}
                placeholder="contato@energee.org.br"
              />
            </div>
            
            <div>
              <Label htmlFor="contact_phone">Telefone de Contato</Label>
              <Input
                id="contact_phone"
                value={getSettingValue('contact_phone')}
                onChange={(e) => updateSetting('contact_phone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
              <Input
                id="whatsapp_number"
                value={getSettingValue('whatsapp_number')}
                onChange={(e) => updateSetting('whatsapp_number', e.target.value)}
                placeholder="5511999999999"
              />
            </div>

            <Button onClick={async () => {
              const contactEmail = getSettingValue('contact_email');
              const contactPhone = getSettingValue('contact_phone');
              const whatsappNumber = getSettingValue('whatsapp_number');
              
              await handleSave('contact_email', contactEmail);
              await handleSave('contact_phone', contactPhone);
              await handleSave('whatsapp_number', whatsappNumber);
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
                value={getSettingValue('hero_title')}
                onChange={(e) => updateSetting('hero_title', e.target.value)}
                placeholder="Economia de até 20% na conta de luz com energia solar"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="hero_subtitle">Subtítulo (Hero)</Label>
              <Textarea
                id="hero_subtitle"
                value={getSettingValue('hero_subtitle')}
                onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
                placeholder="Energia limpa, sem investimento inicial e com economia garantida"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="cta_text">Texto do CTA Principal</Label>
              <Input
                id="cta_text"
                value={getSettingValue('cta_text')}
                onChange={(e) => updateSetting('cta_text', e.target.value)}
                placeholder="Comece a Economizar Agora"
              />
            </div>

            <Button onClick={async () => {
              const heroTitle = getSettingValue('hero_title');
              const heroSubtitle = getSettingValue('hero_subtitle');
              const ctaText = getSettingValue('cta_text');
              
              await handleSave('hero_title', heroTitle);
              await handleSave('hero_subtitle', heroSubtitle);
              await handleSave('cta_text', ctaText);
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
            <p className="text-sm text-muted-foreground">
              Configure IDs de ferramentas de analytics para rastrear conversões e acessos do site
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="google_analytics_id">Google Analytics ID (Opcional)</Label>
              <Input
                id="google_analytics_id"
                value={getSettingValue('google_analytics_id')}
                onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
                placeholder="G-XXXXXXXXXX ou GA-XXXXXXXXX-X"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Para rastrear pageviews e eventos no Google Analytics
              </p>
            </div>
            
            <div>
              <Label htmlFor="facebook_pixel_id">Facebook Pixel ID (Opcional)</Label>
              <Input
                id="facebook_pixel_id"
                value={getSettingValue('facebook_pixel_id')}
                onChange={(e) => updateSetting('facebook_pixel_id', e.target.value)}
                placeholder="123456789012345"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Para rastrear conversões para campanhas do Facebook/Instagram
              </p>
            </div>

            <Button onClick={async () => {
              const gaId = getSettingValue('google_analytics_id');
              const fbPixelId = getSettingValue('facebook_pixel_id');
              
              await handleSave('google_analytics_id', gaId);
              await handleSave('facebook_pixel_id', fbPixelId);
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