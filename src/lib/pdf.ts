'use client';

export async function generatePDF(elementId: string, filename: string = 'cv.pdf'): Promise<void> {
  // Only run on client side
  if (typeof window === 'undefined') {
    console.error('PDF generation only works on client side');
    return;
  }

  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  // Dynamic import to avoid server-side rendering issues
  const html2pdfModule = await import('html2pdf.js');
  const html2pdf = html2pdfModule.default;

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
