import html2pdf from 'html2pdf.js';

export async function generatePDF(elementId: string, filename: string = 'cv.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  const opt = {
    margin: 0,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' as const,
    },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
}
