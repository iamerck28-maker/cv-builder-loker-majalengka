import html2pdf from 'html2pdf.js';

interface Html2PdfOptions {
  margin: number;
  filename: string;
  image: { type: string; quality: number };
  html2canvas: { 
    scale: number;
    useCORS: boolean;
    letterRendering: boolean;
  };
  jsPDF: { 
    unit: string; 
    format: string; 
    orientation: string;
  };
}

export async function generatePDF(elementId: string, filename: string = 'cv.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  const opt: Html2PdfOptions = {
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
      orientation: 'portrait',
    },
  };

  try {
    const html2pdfInstance = html2pdf();
    await html2pdfInstance.set(opt as any).from(element).save();
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
}
