'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Download, Sparkles } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';

export default function Home() {
  const locale = useLocale();
  const t = locale.landing;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-foreground">CV Builder</span>
          </div>
          <Link href="/builder">
            <Button size="sm" className="sm:text-base sm:px-4">{t.headerCta}</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
          {t.hero.title}
          <span className="text-blue-600"> {t.hero.titleHighlight}</span>
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>
        <Link href="/builder">
          <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8">
            {t.hero.cta}
            <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-2" />
              <CardTitle className="text-base sm:text-lg">{t.features.fast}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t.features.fastDesc}</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 mb-2" />
              <CardTitle className="text-base sm:text-lg">{t.features.ats}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t.features.atsDesc}</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur sm:col-span-2 md:col-span-1">
            <CardHeader>
              <Download className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 mb-2" />
              <CardTitle className="text-base sm:text-lg">{t.features.pdf}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t.features.pdfDesc}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 sm:py-8 text-center text-muted-foreground text-sm">
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}
