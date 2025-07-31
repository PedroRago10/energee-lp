import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ContentSection {
  id: string;
  section_key: string;
  title: string;
  description: string;
  content: any;
  images: any;
  created_at: string;
  updated_at: string;
}

export const useContentData = () => {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setIsLoading(true);
      
      // Load content sections
      const { data: sectionsData } = await supabase
        .from('content_sections')
        .select('*');
      
      // Load active plans
      const { data: plansData } = await supabase
        .from('plans')
        .select('*')
        .eq('active', true)
        .order('display_order');
      
      // Load active FAQs
      const { data: faqsData } = await supabase
        .from('faqs')
        .select('*')
        .eq('active', true)
        .order('display_order');
      
      // Load site settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*');
      
      setSections(sectionsData || []);
      setPlans(plansData || []);
      setFaqs(faqsData || []);
      
      // Convert settings array to object
      const settingsObj: Record<string, string> = {};
      settingsData?.forEach(setting => {
        settingsObj[setting.setting_key] = setting.setting_value || '';
      });
      setSettings(settingsObj);
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSection = (sectionKey: string) => {
    return sections.find(section => section.section_key === sectionKey);
  };

  const getSetting = (key: string, defaultValue: string = '') => {
    return settings[key] || defaultValue;
  };

  return {
    sections,
    plans,
    faqs,
    settings,
    isLoading,
    getSection,
    getSetting,
    refreshData: loadAllData
  };
};