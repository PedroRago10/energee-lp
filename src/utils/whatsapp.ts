// WhatsApp integration utilities
import { trackWhatsAppClick } from "@/utils/analytics";
import { supabase } from "@/integrations/supabase/client";

// Função para obter configurações do sistema
const getSystemSettings = async () => {
  try {
    const { data: settings } = await supabase
    .from('site_settings')
    .select('setting_key, setting_value');
    
    const settingsObj: Record<string, string> = {};
    settings?.forEach(setting => {
      settingsObj[setting.setting_key] = setting.setting_value || '';
    });
    
    return settingsObj;
  } catch (error) {
    console.error('Error loading settings:', error);
    return {};
  }
};


export const openWhatsApp = async (message?: string, source?: string) => {
  const settings = await getSystemSettings();
  
  const rawPhone = settings.whatsapp_number || "5511999999999";
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  
  const defaultMessage = `
     *ENERGEE - ENERGIA SOLAR COMPARTILHADA*
    `;
  
  const finalMessage = message || defaultMessage;
  const trackedMessage = source
  ? `${finalMessage}`
  : finalMessage;
  
  const encodedMessage = encodeURIComponent(trackedMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  
  console.log(`WhatsApp opened from: ${source || 'Unknown'}`);
  console.log('o link: ', whatsappUrl);
  
  await trackWhatsAppClick(source || 'Unknown', finalMessage);
  window.open(whatsappUrl, '_blank');
};

export const getWhatsAppLink = async (message?: string) => {
  const settings = await getSystemSettings();
  const phoneNumber = settings.whatsapp_number || "5511999999999";
  
  const defaultMessage = "Olá! Vi o site da Energee e gostaria de saber mais sobre energia compartilhada.";
  const finalMessage = message || defaultMessage;
  const encodedMessage = encodeURIComponent(finalMessage);
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};