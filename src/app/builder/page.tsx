'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { compressToEncodedURIComponent } from 'lz-string';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PersonalInfo } from '@/components/form/PersonalInfo';
import { EducationForm } from '@/components/form/Education';
import { ExperienceForm } from '@/components/form/Experience';
import { SkillsForm } from '@/components/form/Skills';
import { LanguagesForm } from '@/components/form/Languages';
import { ATSTemplate } from '@/components/templates/ATSTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';
import { useCVStore } from '@/lib/store';
import { useLocale } from '@/hooks/useLocale';
import { generatePDF } from '@/lib/pdf';
import { ensureIds, type CVData } from '@/types/cv';
import {
  Download, Eye, FileText, Globe, LogOut, Moon, Sun,
  ChevronDown, Plus, Trash2, Upload, Share2, Check, Pencil,
} from 'lucide-react';

export default function BuilderPage() {
  const router = useRouter();
  const {
    data, template, language, colorScheme, darkMode, saveStatus,
    profiles, activeProfileId,
    loadFromStorage, saveToStorage,
    setTemplate, setLanguage, setColorScheme, setDarkMode,
    createProfile, deleteProfile, renameProfile, switchProfile, importData,
    updateData,
  } = useCVStore();

  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem('cv-user');
    if (!raw) { router.replace('/login'); return; }
    try { setUserName(JSON.parse(raw).name); } catch { router.replace('/login'); }
  }, [router]);

  useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  useEffect(() => {
    const timer = setTimeout(() => saveToStorage(), 300);
    return () => clearTimeout(timer);
  }, [data, template, language, colorScheme, darkMode, profiles, activeProfileId, saveToStorage]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const filename = `${data.personal.fullName || 'cv'}_${new Date().toISOString().split('T')[0]}.pdf`;
      await generatePDF('cv-preview', filename);
      toast.success(locale.builder.pdfSuccess);
    } catch {
      toast.error(locale.builder.pdfError);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cv-user');
    router.replace('/login');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target!.result as string);
        const imported: CVData = {
          personal: { fullName: '', email: '', phone: '', city: '', ...parsed.personal },
          summary: parsed.summary || '',
          education: ensureIds(parsed.education || []) as CVData['education'],
          experience: ensureIds(parsed.experience || []) as CVData['experience'],
          skills: ensureIds(parsed.skills || []) as CVData['skills'],
          languages: ensureIds(parsed.languages || []) as CVData['languages'],
        };
        importData(imported);
        toast.success(locale.builder.importSuccess);
      } catch {
        toast.error(locale.builder.importError);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleShare = () => {
    const shareData = {
      ...data,
      personal: { ...data.personal, photo: undefined },
    };
    const compressed = compressToEncodedURIComponent(JSON.stringify({
      d: shareData, t: template, c: colorScheme,
    }));
    const url = `${window.location.origin}/share?d=${compressed}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success(locale.builder.shareCopied);
      if (data.personal.photo) toast.info(locale.builder.shareNoPhoto);
    });
  };

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) return;
    createProfile(newProfileName.trim());
    setNewProfileName('');
  };

  const handleRename = (id: string) => {
    if (!renameValue.trim()) return;
    renameProfile(id, renameValue.trim());
    setRenamingId(null);
  };

  const colorOptions = [
    { name: 'Blue', value: '#1e40af' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Teal', value: '#0d9488' },
  ];

  const templateOptions: Array<{ key: 'ats' | 'creative' | 'minimalist'; label: string }> = [
    { key: 'ats', label: locale.template.ats },
    { key: 'creative', label: locale.template.creative },
    { key: 'minimalist', label: locale.template.minimalist },
  ];

  if (!userName) return null;

  const activeProfile = profiles.find(p => p.id === activeProfileId);

  const renderTemplate = () => {
    const props = { data, colorScheme, locale };
    if (template === 'creative') return <CreativeTemplate {...props} />;
    if (template === 'minimalist') return <MinimalistTemplate {...props} />;
    return <ATSTemplate {...props} />;
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-20">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Row 1: Logo + User + Core Actions */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 shrink-0" />
              <span className="text-base sm:text-xl font-bold truncate hidden sm:inline">CV Builder</span>
              <span className="text-xs sm:text-sm text-muted-foreground truncate">{userName}</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Save Status */}
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {saveStatus === 'saving' ? locale.builder.saving : saveStatus === 'saved' ? locale.builder.saved : ''}
              </span>
              {saveStatus === 'saved' && <Check className="h-3 w-3 text-green-500 sm:hidden" />}

              {/* Dark Mode */}
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Download */}
              <Button onClick={handleDownload} disabled={isGenerating} size="sm" className="gap-1 text-xs sm:text-sm">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{isGenerating ? locale.builder.generating : locale.builder.downloadPDF}</span>
              </Button>

              {/* Toolbar Toggle (mobile) */}
              <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden" onClick={() => setShowToolbar(!showToolbar)}>
                <ChevronDown className={`h-4 w-4 transition-transform ${showToolbar ? 'rotate-180' : ''}`} />
              </Button>

              {/* Logout */}
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout} title={locale.login.logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Row 2: Toolbar (always visible on desktop, toggleable on mobile) */}
          <div className={`${showToolbar ? 'flex' : 'hidden'} lg:flex flex-wrap items-center gap-2 sm:gap-3 mt-2 pb-1`}>
            {/* Profile Selector */}
            <div className="relative" ref={profileMenuRef}>
              <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <span className="truncate max-w-[100px]">{activeProfile?.name || 'CV'}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              {showProfileMenu && (
                <div className="absolute top-full left-0 mt-1 bg-popover border rounded-lg shadow-lg p-2 z-30 w-60">
                  {profiles.map(p => (
                    <div key={p.id} className="flex items-center gap-1 mb-1">
                      {renamingId === p.id ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleRename(p.id); }} className="flex-1 flex gap-1">
                          <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} className="h-7 text-xs" autoFocus />
                          <Button type="submit" size="sm" variant="ghost" className="h-7 px-2"><Check className="h-3 w-3" /></Button>
                        </form>
                      ) : (
                        <>
                          <button
                            onClick={() => { switchProfile(p.id); setShowProfileMenu(false); }}
                            className={`flex-1 text-left text-xs px-2 py-1.5 rounded hover:bg-accent truncate ${p.id === activeProfileId ? 'bg-accent font-medium' : ''}`}
                          >
                            {p.name}
                          </button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setRenamingId(p.id); setRenameValue(p.name); }}>
                            <Pencil className="h-3 w-3" />
                          </Button>
                          {profiles.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => deleteProfile(p.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-1 mt-2 pt-2 border-t">
                    <Input
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder={locale.builder.profileName}
                      className="h-7 text-xs flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
                    />
                    <Button size="sm" variant="outline" className="h-7 px-2" onClick={handleCreateProfile}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border hidden sm:block" />

            {/* Template Toggle */}
            <div className="flex items-center gap-1">
              {templateOptions.map(opt => (
                <Button
                  key={opt.key}
                  variant={template === opt.key ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs h-7 px-2 sm:px-3"
                  onClick={() => setTemplate(opt.key)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border hidden sm:block" />

            {/* Color Picker */}
            <div className="flex items-center gap-1">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setColorScheme(color.value)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-transform ${
                    colorScheme === color.value ? 'border-foreground scale-110' : 'border-muted'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border hidden sm:block" />

            {/* Language Toggle */}
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              {(['id', 'en'] as const).map(lang => (
                <Button
                  key={lang}
                  variant={language === lang ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border hidden sm:block" />

            {/* Import & Share */}
            <div className="flex items-center gap-1">
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <Button variant="outline" size="sm" className="text-xs h-7 gap-1" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-3 w-3" />
                <span className="hidden sm:inline">{locale.builder.importJSON}</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-7 gap-1" onClick={handleShare}>
                <Share2 className="h-3 w-3" />
                <span className="hidden sm:inline">{locale.builder.shareLink}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden bg-card border-b sticky top-[52px] sm:top-[56px] z-10">
        <div className="flex">
          {(['form', 'preview'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-muted-foreground'
              }`}
            >
              {tab === 'form' ? locale.builder.form : locale.builder.preview}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Form Section */}
          <div className={`${activeTab === 'form' ? 'block' : 'hidden'} lg:block w-full lg:w-1/2`}>
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                  <PersonalInfo />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                  <h2 className="text-lg font-semibold mb-3">{locale.form.summary.title}</h2>
                  <Textarea
                    value={data.summary}
                    onChange={(e) => updateData({ summary: e.target.value })}
                    placeholder={locale.form.summary.placeholder}
                    rows={3}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                  <EducationForm />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                  <ExperienceForm />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                  <SkillsForm />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                  <LanguagesForm />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block w-full lg:w-1/2`}>
            <div className="lg:sticky lg:top-24">
              <Card>
                <CardHeader className="py-3 sm:py-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    {locale.builder.previewCV}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <div className="overflow-auto max-h-[75vh] border rounded-lg">
                    <div className="origin-top-left scale-[0.45] sm:scale-[0.5] lg:scale-[0.48] xl:scale-[0.55]" style={{ width: '210mm', transformOrigin: 'top left' }}>
                      {renderTemplate()}
                    </div>
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
