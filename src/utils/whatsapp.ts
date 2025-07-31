// WhatsApp integration utilities

const WHATSAPP_NUMBER = "5511999999999"; // Replace with actual number

export const openWhatsApp = (message?: string, source?: string) => {
  const defaultMessage = "Olá! Vi o site da Energee e gostaria de saber mais sobre energia compartilhada.";
  const finalMessage = message || defaultMessage;
  
  // Add source tracking to message for analytics
  const trackedMessage = source 
    ? `${finalMessage}\n\n_Origem: ${source}_`
    : finalMessage;
  
  const encodedMessage = encodeURIComponent(trackedMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Track which button was clicked for analytics
  console.log(`WhatsApp opened from: ${source || 'Unknown'}`);
  
  window.open(whatsappUrl, '_blank');
};

export const getWhatsAppLink = (message?: string) => {
  const defaultMessage = "Olá! Vi o site da Energee e gostaria de saber mais sobre energia compartilhada.";
  const finalMessage = message || defaultMessage;
  const encodedMessage = encodeURIComponent(finalMessage);
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};