'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { decompressFromEncodedURIComponent } from 'lz-string';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ATSTemplate } from '@/components/templates/ATSTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';
import { useLocale } from '@/hooks/useLocale';
import { CVData } from '@/types/cv';
import { FileText } from 'lucide-react';

function ShareContent() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const [shareData, setShareData] = useState<{ d: CVData; t: string; c: string } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const compressed = searchParams.get('d');
    if (!compressed) { setError(true); return; }
    try {
      const raw = decompressFromEncodedURIComponent(compressed);
      if (!raw) { setError(true); return; }
      setShareData(JSON.parse(raw));
    } catch {
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">{locale.share.invalid}</p>
          <Link href="/">
            <Button>{locale.share.backHome}</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!shareData) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </main>
    );
  }

  const { d: cvData, t: tmpl, c: color } = shareData;
  const templateProps = { data: cvData, colorScheme: color, locale };

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">{locale.share.title}</span>
          </div>
          <Link href="/">
            <Button size="sm">{locale.share.backHome}</Button>
          </Link>
        </div>
      </header>
      <div className="container mx-auto px-3 sm:px-4 py-6 flex justify-center">
        <div className="overflow-auto border rounded-lg shadow-lg">
          <div className="origin-top-left scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-100" style={{ width: '210mm', transformOrigin: 'top left' }}>
            {tmpl === 'creative' ? <CreativeTemplate {...templateProps} /> :
             tmpl === 'minimalist' ? <MinimalistTemplate {...templateProps} /> :
             <ATSTemplate {...templateProps} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
      <ShareContent />
    </Suspense>
  );
}
