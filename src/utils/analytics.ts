// Analytics and conversion tracking utilities

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // In production, this would integrate with GA4, Hotjar, etc.
  console.log('Event tracked:', eventName, properties);
  
  // Simulate analytics tracking
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
      event: eventName,
      ...properties
    });
  }
};

export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    type: conversionType,
    value,
    timestamp: new Date().toISOString()
  });
};

export const trackCTAClick = (ctaText: string, location: string) => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    location,
    timestamp: new Date().toISOString()
  });
};