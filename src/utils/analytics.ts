// Analytics utilities - Tracking de conversões e eventos
// Configurações básicas para acompanhar métricas

import { supabase } from "@/integrations/supabase/client";

export const trackCTAClick = async (buttonText: string, section: string) => {
  console.log(`CTA Click: ${buttonText} - Section: ${section}`);
  
  // Track in Supabase
  try {
    await supabase.functions.invoke('track-analytics', {
      body: {
        event_type: 'cta_click',
        event_data: {
          button_text: buttonText,
          section: section,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          user_agent: navigator.userAgent
        }
      }
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
  
  // Also track with Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      button_text: buttonText,
      section: section
    });
  }
};

export const trackWhatsAppClick = async (source: string, buttonText: string) => {
  console.log(`WhatsApp Click: ${buttonText} - Source: ${source}`);
  
  // Track in Supabase
  try {
    await supabase.functions.invoke('track-analytics', {
      body: {
        event_type: 'whatsapp_click',
        event_data: {
          source: source,
          button_text: buttonText,
          timestamp: new Date().toISOString(),
          url: window.location.href
        }
      }
    });
  } catch (error) {
    console.error('WhatsApp tracking error:', error);
  }
  
  // Also track with Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'whatsapp_click', {
      source: source,
      button_text: buttonText
    });
  }
};

export const trackConversion = async (eventName: string, value: number) => {
  console.log(`Conversion: ${eventName} - Value: ${value}`);
  
  // Track in Supabase
  try {
    await supabase.functions.invoke('track-analytics', {
      body: {
        event_type: 'conversion',
        event_data: {
          event_name: eventName,
          value: value
        }
      }
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
  
  // Also track with Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      event_name: eventName,
      value: value
    });
  }
};

export const trackPageView = async (pageName: string) => {
  console.log(`Page View: ${pageName}`);
  
  // Track in Supabase
  try {
    await supabase.functions.invoke('track-analytics', {
      body: {
        event_type: 'page_view',
        event_data: {
          page_title: pageName
        }
      }
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
  
  // Also track with Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: pageName
    });
  }
};