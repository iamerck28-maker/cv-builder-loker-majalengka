import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Download, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CV Builder</span>
          </div>
          <Link href="/builder">
            <Button>Buat CV Sekarang</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Buat CV Profesional
          <span className="text-blue-600"> dalam Hitungan Menit</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Tanpa ribet, tanpa mahal. Pilih template, isi data, langsung download PDF. 
          Cocok untuk melamar kerja di Majalengka dan sekitarnya.
        </p>
        <Link href="/builder">
          <Button size="lg" className="text-lg px-8">
            Mulai Buat CV
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Cepat & Mudah</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Isi formulir sederhana, langsung jadi CV. Tidak perlu desain sendiri.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>ATS-Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Template dirancang agar mudah dibaca oleh sistem ATS perusahaan.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Download PDF</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Langsung download sebagai PDF berkualitas tinggi, siap dikirim.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>© 2024 CV Builder Loker Majalengka. Dibuat dengan ❤️</p>
      </footer>
    </main>
  );
}
