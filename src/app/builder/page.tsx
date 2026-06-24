'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfo } from '@/components/form/PersonalInfo';
import { EducationForm } from '@/components/form/Education';
import { ExperienceForm } from '@/components/form/Experience';
import { SkillsForm } from '@/components/form/Skills';
import { LanguagesForm } from '@/components/form/Languages';
import { ATSTemplate } from '@/components/templates/ATSTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { useCVStore } from '@/lib/store';
import { generatePDF } from '@/lib/pdf';
import { Download, Eye, FileText, Palette } from 'lucide-react';

export default function BuilderPage() {
  const {
    data,
    template,
    colorScheme,
    loadFromStorage,
    saveToStorage,
    setTemplate,
    setColorScheme,
  } = useCVStore();

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    saveToStorage();
  }, [data, template, colorScheme, saveToStorage]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const filename = `${data.personal.fullName || 'cv'}_${new Date().toISOString().split('T')[0]}.pdf`;
      await generatePDF('cv-preview', filename);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const colorOptions = [
    { name: 'Blue', value: '#1e40af' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Teal', value: '#0d9488' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">CV Builder</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Template Switcher */}
            <div className="flex items-center gap-2">
              <Button
                variant={template === 'ats' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTemplate('ats')}
              >
                ATS
              </Button>
              <Button
                variant={template === 'creative' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTemplate('creative')}
              >
                Kreatif
              </Button>
            </div>

            {/* Color Picker */}
            <div className="flex items-center gap-1">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setColorScheme(color.value)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    colorScheme === color.value
                      ? 'border-gray-900 scale-110'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'form'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Form Section */}
          <div className={`${activeTab === 'form' ? 'block' : 'hidden'} lg:block w-full lg:w-1/2`}>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <PersonalInfo />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-semibold mb-4">Ringkasan</h2>
                  <Textarea
                    value={data.summary}
                    onChange={(e) => useCVStore.getState().updateData({ summary: e.target.value })}
                    placeholder="Tulis ringkasan singkat tentang diri Anda..."
                    rows={4}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <EducationForm />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <ExperienceForm />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <SkillsForm />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <LanguagesForm />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block w-full lg:w-1/2`}>
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview CV
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto max-h-[70vh] border rounded-lg">
                    {template === 'ats' ? (
                      <ATSTemplate data={data} colorScheme={colorScheme} />
                    ) : (
                      <CreativeTemplate data={data} colorScheme={colorScheme} />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
