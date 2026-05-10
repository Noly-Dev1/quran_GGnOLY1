/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, FC, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  ChevronDown, 
  Send, 
  Video, 
  MessageCircle,
  Instagram,
  Menu,
  X,
  Heart,
  Baby,
  GraduationCap,
  LucideIcon
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { translations, Language } from './translations';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Error Handling
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: Record<string, unknown>;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {},
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Types
interface Teacher {
  name: string;
  schedule: string[];
  specialties: string[];
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  label: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, label }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="editorial-card"
  >
    <div className="section-label">{label}</div>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-primary/5 flex items-center justify-center text-secondary">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-bold text-primary">{title}</h3>
    </div>
    <p className="text-primary/70 leading-relaxed text-base">{description}</p>
  </motion.div>
);

interface TeacherCardProps {
  teacher: Teacher;
  labels: {
    schedule: string;
    specialties: string;
  };
}

const TeacherCard: FC<TeacherCardProps> = ({ teacher, labels }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="editorial-card border-x-4 border-x-secondary flex flex-col h-full"
    >
      <div className="section-label">{labels.schedule}</div>
      <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {teacher.name}
      </h4>
      
      <div className="space-y-6 flex-grow">
        {/* Specialties Section */}
        <div>
          <div className="text-[10px] uppercase font-bold text-accent tracking-widest mb-3 flex items-center gap-2">
            <GraduationCap size={12} />
            <span>{labels.specialties}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {teacher.specialties.map((spec, idx) => (
              <span key={idx} className="px-2 py-1 bg-primary/5 text-[10px] font-bold text-primary/70 rounded">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
        <div>
          <div className="text-[10px] uppercase font-bold text-accent tracking-widest mb-3 flex items-center gap-2">
            <Clock size={12} />
            <span>{labels.schedule}</span>
          </div>
          <div className="space-y-2">
            {teacher.schedule.map((slot, idx) => (
              <div key={idx} className="flex items-start gap-2 text-primary/80 border-b border-primary/5 pb-2 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                <span className="text-xs font-sans font-medium leading-relaxed">{slot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-primary/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-right hover:text-secondary transition-colors"
      >
        <span className="font-bold text-lg font-serif">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-secondary"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-primary/70 leading-relaxed font-sans text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('quran_sanctuary_lang');
    if (saved && ['ar', 'en', 'fr', 'tr', 'id', 'ur'].includes(saved)) return saved as Language;
    
    // Auto detection
    const browserLang = navigator.language.split('-')[0];
    if (['ar', 'en', 'fr', 'tr', 'id', 'ur'].includes(browserLang)) return browserLang as Language;
    
    return 'ar';
  });

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('quran_sanctuary_lang', newLang);
  };

  const t = translations[lang];

  const languages: { code: Language; name: string }[] = [
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'id', name: 'Indonesia' },
    { code: 'ur', name: 'اردو' }
  ];

  const isRtl = lang === 'ar' || lang === 'ur';
  const whatsappNumber = "966547013085"; // Updated to match footer number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const teacherNames: Record<Language, string[]> = {
    ar: ["أ. أروى", "أ. يمنى", "أ. منار", "أ. فاطمة", "أ. سمية"],
    en: ["Arwa", "Yomna", "Manar", "Fatima", "Somaya"],
    fr: ["Arwa", "Yomna", "Manar", "Fatima", "Somaya"],
    tr: ["Arwa", "Yomna", "Manar", "Fatima", "Somaya"],
    id: ["Arwa", "Yomna", "Manar", "Fatima", "Somaya"],
    ur: ["استانی ارویٰ", "استانی یمنیٰ", "استانی منار", "استانی فاطمہ", "استانی سمیہ"]
  };

  const getSchedules = (langCode: Language): string[][] => {
    switch(langCode) {
      case 'en': return [
        ["Mon/Wed: 7-10 AM (Makkah Time)", "Mon/Wed: 1-3 PM", "Mon/Wed: 4-6 PM", "Mon/Wed: 8-10 PM"], 
        ["Sun-Thu: 7-10 AM (Makkah Time)"], 
        ["Sat-Thu: 7-10 AM (Makkah Time)"], 
        ["Mon-Wed: 9-11 AM (Makkah Time)"], 
        ["Daily: 6:30 - 8:30 AM (Makkah Time)", "Daily: 10:30 - 11:30 PM (Makkah Time)"]
      ];
      case 'fr': return [
        ["Lun/Mer: 7-10h (Heure Mecque)", "Lun/Mer: 13-15h", "Lun/Mer: 16-18h", "Lun/Mer: 20-22h"], 
        ["Dim-Jeu: 7-10h (Heure Mecque)"], 
        ["Sam-Jeu: 7-10h (Heure Mecque)"], 
        ["Lun-Mer: 9-11h (Heure Mecque)"], 
        ["Tous les jours: 6:30 - 8:30 (Heure Mecque)", "Tous les jours: 22:30 - 23:30 (Heure Mecque)"]
      ];
      case 'tr': return [
        ["Pzt/Çar: 07:00-10:00 (Mekke Saati)", "Pzt/Çar: 13:00-15:00", "Pzt/Çar: 16:00-18:00", "Pzt/Çar: 20:00-22:00"], 
        ["Paz-Per: 07:00-10:00 (Mekke Saati)"], 
        ["Cmt-Per: 07:00-10:00 (Mekke Saati)"], 
        ["Pzt-Çar: 09:00-11:00 (Mekke Saati)"], 
        ["Her gün: 06:30 - 08:30 (Mekke Saati)", "Her gün: 22:30 - 23:30 (Mekke Saati)"]
      ];
      case 'id': return [
        ["Sen/Rab: 07:00-10:00 (Waktu Makkah)", "Sen/Rab: 13:00-15:00", "Sen/Rab: 16:00-18:00", "Sen/Rab: 20:00-22:00"], 
        ["Aha-Kam: 07:00-10:00 (Waktu Makkah)"], 
        ["Sab-Kam: 07:00-10:00 (Waktu Makkah)"], 
        ["Sen-Rab: 09:00-11:00 (Waktu Makkah)"], 
        ["Setiap hari: 06:30 - 08:30 (Waktu Makkah)", "Setiap hari: 22:30 - 23:30 (Waktu Makkah)"]
      ];
      case 'ur': return [
        ["پیر/بدھ: 7 - 10 بجے صبح (مکہ مکرمہ ٹائم)", "پیر/بدھ: 1 - 3 بجے دوپہر", "پیر/بدھ: 4 - 6 بجے شام", "پیر/بدھ: 8 - 10 بجے رات"], 
        ["اتوار تا جمعرات: 7 - 10 بجے صبح (مکہ مکرمہ ٹائم)"], 
        ["ہفتہ تا جمعرات: 7 - 10 بجے صبح (مکہ مکرمہ ٹائم)"], 
        ["پیر تا بدھ: 9 - 11 بجے صبح (مکہ مکرمہ ٹائم)"], 
        ["روزانہ: 6:30 - 8:30 صبح (مکہ مکرمہ ٹائم)", "روزانہ: 10:30 - 11:30 شام (مکہ مکرمہ ٹائم)"]
      ];
      default: return [
        ["الإثنين والأربعاء: 7 - 10 صباحًا (بتوقيت مكة المكرمة)", "الإثنين والأربعاء: 1 - 3 عصرًا", "الإثنين والأربعاء: 4 - 6 مساءً", "الإثنين والأربعاء: 8 - 10 مساءً"], 
        ["من الأحد إلى الخميس: 7 - 10 صباحًا (بتوقيت مكة المكرمة)"], 
        ["من السبت إلى الخميس: 7 - 10 صباحًا (بتوقيت مكة المكرمة)"], 
        ["من الاثنين إلى الأربعاء: 9 - 11 صباحًا (بتوقيت مكة المكرمة)"], 
        ["يومياً: 6:30 - 8:30 صباحاً (بتوقيت مكة المكرمة)", "يومياً: 10:30 - 11:30 مساءً (بتوقيت مكة المكرمة)"]
      ];
    }
  };

  const teachers = useMemo(() => {
    const schedules = getSchedules(lang);
    
    const extraData: Record<Language, { specialties: string[][] }> = {
      ar: {
        specialties: [
          ["حفظ", "مراجعة", "قاعدة نورانية"],
          ["حفظ", "مراجعة"],
          ["حفظ", "مراجعة"],
          ["حفظ", "مراجعة"],
          ["حفظ", "مراجعة", "قاعدة نورانية"]
        ]
      },
      en: {
        specialties: [
          ["Memorization", "Revision", "Noorania"],
          ["Memorization", "Revision"],
          ["Memorization", "Revision"],
          ["Memorization", "Revision"],
          ["Memorization", "Revision", "Noorania"]
        ]
      },
      fr: {
        specialties: [
          ["Mémorisation", "Révision", "Noorania"],
          ["Mémorisation", "Révision"],
          ["Mémorisation", "Révision"],
          ["Mémorisation", "Révision"],
          ["Mémorisation", "Révision", "Noorania"]
        ]
      },
      tr: {
        specialties: [
          ["Ezber", "Tekrar", "Nuraniye"],
          ["Ezber", "Tekrar"],
          ["Ezber", "Tekrar"],
          ["Ezber", "Tekrar"],
          ["Ezber", "Tekrar", "Nuraniye"]
        ]
      },
      id: {
        specialties: [
          ["Hafalan", "Murajaah", "Noorania"],
          ["Hafalan", "Murajaah"],
          ["Hafalan", "Murajaah"],
          ["Hafalan", "Murajaah"],
          ["Hafalan", "Murajaah", "Noorania"]
        ]
      },
      ur: {
        specialties: [
          ["حفظ", "دہرائی", "قاعدہ نورانیہ"],
          ["حفظ", "دہرائی"],
          ["حفظ", "دہرائی"],
          ["حفظ", "دہرائی"],
          ["حفظ", "دہرائی", "قاعدہ نورانیہ"]
        ]
      }
    };

    return teacherNames[lang].map((name, i) => ({
      name,
      schedule: schedules[i],
      specialties: extraData[lang].specialties[i] || []
    }));
  }, [lang, teacherNames]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const name = formData.get('fullName') as string;
      const ageStr = formData.get('age') as string;
      const teacher = formData.get('teacher') as string;
      const juz = formData.get('juz') as string;
      const whatsapp = formData.get('whatsapp') as string;
      const notes = formData.get('notes') as string;

      const age = parseInt(ageStr, 10);

      // 1. Save to Firestore
      const registrationsPath = 'registrations';
      try {
        await addDoc(collection(db, registrationsPath), {
          fullName: name,
          age: age,
          teacher: teacher,
          juz: juz,
          whatsapp: whatsapp,
          notes: notes || '',
          createdAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, registrationsPath);
      }

      // 2. Prepare WhatsApp message
      const message = `*${t.register.successDesc}*%0A%0A` +
        `*${t.register.fullName}:* ${name}%0A` +
        `*${t.register.age}:* ${age}%0A` +
        `*${t.register.teacher}:* ${teacher}%0A` +
        `*${t.register.juz}:* ${juz}%0A` +
        `*${t.register.whatsapp}:* ${whatsapp}%0A` +
        `*${t.register.notes}:* ${notes || 'N/A'}`;

      // 3. Open WhatsApp
      const whatsappUrl = `https://wa.me/966547013085?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      alert(t.register.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`text-4xl font-black text-primary font-serif ${isRtl ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-accent`}>
              {lang === 'ar' || lang === 'ur' ? 'قرآن يتلى' : 'Quran Sanctuary'}
            </div>
            
            <div className="hidden lg:flex items-center gap-2">
              <select 
                value={lang} 
                onChange={(e) => handleLangChange(e.target.value as Language)}
                className="bg-transparent border border-primary/10 rounded px-2 py-1 text-sm font-bold text-primary/60 outline-none hover:border-accent transition-colors cursor-pointer"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-primary font-sans text-sm uppercase tracking-widest font-black">
            <a href="#about" className="hover:text-accent transition-colors">{t.nav.about}</a>
            <a href="#schedule" className="hover:text-accent transition-colors">{t.nav.schedule}</a>
            <a href="#pricing" className="hover:text-accent transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-accent transition-colors">{t.nav.faq}</a>
            <a href="#register" className="bg-primary text-white px-10 py-4 hover:bg-accent transition-all">{t.nav.register}</a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <select 
              value={lang} 
              onChange={(e) => handleLangChange(e.target.value as Language)}
              className="bg-transparent border border-primary/10 rounded px-2 py-1 text-xs font-bold text-primary/60 outline-none"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
            <button className="text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-b border-primary/10 p-8 shadow-2xl"
            >
              <div className="flex flex-col gap-8 text-sm uppercase tracking-widest font-black text-center font-sans">
                <a href="#about" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
                <a href="#schedule" onClick={() => setIsMenuOpen(false)}>{t.nav.schedule}</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)}>{t.nav.pricing}</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)}>{t.nav.faq}</a>
                <a href="#register" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white py-4">{t.nav.register}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-colors`}
      >
        <MessageCircle size={32} fill="currentColor" className="text-white" />
      </motion.a>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label">{t.hero.label}</div>
            <h1 className={`font-bold leading-[1.1] mb-8 ${isRtl ? 'border-r-[8px] pr-6' : 'border-l-[8px] pl-6'} border-accent`}>
              <span className="text-7xl md:text-9xl block mb-4">{t.hero.title1}</span>
              <span className="text-2xl md:text-4xl text-primary/40 font-serif italic block">{t.hero.title2}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-primary/70 leading-relaxed mb-12 max-w-2xl font-serif">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <a href="#register" className="bg-accent text-white px-12 py-5 text-lg font-sans font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-accent/20">
                {t.hero.cta}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] bg-sand p-4 border border-primary/5">
              <img 
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=70&w=800" 
                alt="Quran" 
                loading="lazy"
                className="w-full h-full object-cover filter grayscale-[0.2] contrast-[1.1]"
              />
            </div>
            <div className={`absolute -bottom-10 ${isRtl ? '-right-10' : '-left-10'} editorial-card max-w-[200px] z-20`}>
              <div className="section-label">{t.hero.dailyMessage}</div>
              <p className="text-sm italic leading-relaxed text-primary/80">{t.hero.dailyQuote}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.4fr_1fr] gap-20">
            <div>
              <div className="section-label">{t.features.label}</div>
              <h2 className="text-4xl font-bold mb-8 leading-snug">{t.features.title}</h2>
              <div className="w-20 h-1 bg-accent"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard 
                icon={Users}
                label={t.features.label}
                title={t.features.individual.title}
                description={t.features.individual.desc}
              />
              <FeatureCard 
                icon={BookOpen}
                label={t.features.label}
                title={t.features.curriculum.title}
                description={t.features.curriculum.desc}
              />
              <FeatureCard 
                icon={Clock}
                label={t.features.label}
                title={t.features.timing.title}
                description={t.features.timing.desc}
              />
              <FeatureCard 
                icon={Heart}
                label={t.features.label}
                title={t.features.special.title}
                description={t.features.special.desc}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-32 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label text-center">{t.schedule.label}</div>
          <h2 className="text-5xl font-bold text-center mb-20 italic">{t.schedule.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, idx) => (
              <TeacherCard 
                key={idx} 
                teacher={teacher} 
                labels={{
                  schedule: t.schedule.label,
                  specialties: t.schedule.specialtiesLabel
                }} 
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-primary/60 text-lg font-serif">
              {t.schedule.note}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-cream border-y border-primary/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="section-label">{t.pricing.label}</div>
          <div className="grid md:grid-cols-2 gap-10 mt-16 max-w-4xl mx-auto">
            <div className="editorial-card !shadow-none p-12 hover:bg-primary/5 transition-colors">
              <div className="section-label !text-accent mb-6">{t.pricing.individual.title}</div>
              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="text-7xl font-sans font-light text-primary">{t.pricing.individual.price}</span>
                <span className="text-sm font-sans opacity-70 uppercase tracking-widest text-primary/60">{t.pricing.individual.period}</span>
              </div>
              <p className="text-primary/70 leading-relaxed font-serif">{t.pricing.individual.desc}</p>
            </div>
 
            <div className="editorial-card !shadow-none p-12 hover:bg-primary/5 transition-colors">
              <div className="section-label !text-accent mb-6">{t.pricing.group.title}</div>
              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="text-7xl font-sans font-light text-primary">{t.pricing.group.price}</span>
                <span className="text-sm font-sans opacity-70 uppercase tracking-widest text-primary/60">{t.pricing.group.period}</span>
              </div>
              <p className="text-primary/70 leading-relaxed font-serif">{t.pricing.group.desc}</p>
            </div>
          </div>
          
          <div className={`grid md:grid-cols-2 gap-y-4 gap-x-12 ${isRtl ? 'text-right' : 'text-left'} my-16 font-sans text-sm tracking-wider uppercase max-w-2xl mx-auto text-primary`}>
            {t.pricing.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-primary/10 pb-4">
                <span className="text-accent">◈</span> {f}
              </div>
            ))}
          </div>
          
          <a href="#register" className="inline-block bg-accent text-white px-16 py-6 text-xl font-sans font-bold uppercase tracking-widest hover:bg-primary transition-all">
            {t.pricing.cta}
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label text-center">{t.faq.label}</div>
          <h2 className="text-5xl font-bold text-center mb-20 italic">{t.faq.title}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem question={t.faq.q1.q} answer={t.faq.q1.a} />
            <FAQItem question={t.faq.q2.q} answer={t.faq.q2.a} />
            <FAQItem question={t.faq.q3.q} answer={t.faq.q3.a} />
            <FAQItem question={t.faq.q4.q} answer={t.faq.q4.a} />
            <FAQItem question={t.faq.q5.q} answer={t.faq.q5.a} />
            <FAQItem question={t.faq.q6.q} answer={t.faq.q6.a} />
            <FAQItem question={t.faq.q7.q} answer={t.faq.q7.a} />
            <FAQItem question={t.faq.q8.q} answer={t.faq.q8.a} />
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <div className="section-label">{t.register.label}</div>
            <h2 className="text-7xl font-bold mb-10 leading-tight italic">{t.register.title1}<br /><span className="text-accent">{t.register.title2}</span></h2>
            <p className="text-2xl text-primary/70 leading-relaxed mb-12 font-serif">
              {t.register.description}
            </p>
          </div>

          <div className="editorial-card !p-12 lg:sticky lg:top-32">
            <div className="section-label mb-8">{t.register.formTitle}</div>
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl text-accent mb-6 italic">{t.register.successTitle}</div>
                <h3 className="text-2xl font-bold text-primary mb-4">{t.register.successDesc}</h3>
                <p className="text-primary/60 font-sans text-sm tracking-wide">{t.register.successMessage}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className={`text-[10px] uppercase font-bold text-accent tracking-widest block font-sans ${isRtl ? 'text-right' : 'text-left'}`}>{t.register.fullName}</label>
                    <input name="fullName" type="text" required className="input-editorial" placeholder={t.register.fullNamePlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] uppercase font-bold text-accent tracking-widest block font-sans ${isRtl ? 'text-right' : 'text-left'}`}>{t.register.age}</label>
                    <input name="age" type="number" required min="2" className="input-editorial" placeholder={t.register.agePlaceholder} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className={`text-[10px] uppercase font-bold text-accent tracking-widest block font-sans ${isRtl ? 'text-right' : 'text-left'}`}>{t.register.teacher}</label>
                    <select name="teacher" required defaultValue="" className="input-editorial cursor-pointer">
                      <option value="" disabled>{t.register.teacherPlaceholder}</option>
                      {teachers.map((teacher, idx) => (
                        <option key={idx} value={teacher.name}>{teacher.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] uppercase font-bold text-accent tracking-widest block font-sans ${isRtl ? 'text-right' : 'text-left'}`}>{t.register.juz}</label>
                    <select name="juz" defaultValue={t.register.juzStart} className="input-editorial cursor-pointer">
                      <option value={t.register.juzStart}>{t.register.juzStart}</option>
                      {[...Array(30)].map((_, i) => (
                        <option key={i + 1}>
                          {i + 1} {t.register.juzMultiple}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] uppercase font-bold text-accent tracking-widest block font-sans ${isRtl ? 'text-right' : 'text-left'}`}>{t.register.whatsapp}</label>
                  <input 
                    name="whatsapp"
                    type="tel" 
                    required 
                    pattern="[0-9]*"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                    }}
                    title={t.register.whatsappTitle}
                    className="input-editorial !text-left" 
                    dir="ltr" 
                    placeholder="00966547013085" 
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] uppercase font-bold text-accent tracking-widest block font-sans ${isRtl ? 'text-right' : 'text-left'}`}>{t.register.notes}</label>
                  <textarea name="notes" className="input-editorial h-20 resize-none" placeholder={t.register.notesPlaceholder}></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-6 font-sans font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-lg hover:shadow-primary/20">
                  {t.register.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto p-12 editorial-card !shadow-2xl relative"
            >
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className={`absolute top-8 ${isRtl ? 'left-8' : 'right-8'} text-primary/40 hover:text-accent transition-colors`}
              >
                <X size={24} />
              </button>

              <div className="section-label mb-8">{t.privacy.title}</div>
              <h2 className="text-4xl font-bold mb-6 italic">{t.privacy.title}</h2>
              <p className="text-primary/70 mb-10 font-serif leading-relaxed">
                {t.privacy.description}
              </p>

              <div className="space-y-10">
                {t.privacy.sections.map((section, idx) => (
                  <div key={idx} className={`border-b border-primary/5 pb-8 last:border-0`}>
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-3">
                      <span className="text-accent">◈</span>
                      {section.title}
                    </h3>
                    <p className="text-primary/60 text-sm leading-relaxed font-sans">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="w-full mt-12 bg-primary text-white py-4 font-bold uppercase tracking-widest hover:bg-accent transition-all"
              >
                {t.privacy.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-sand py-32 border-t border-primary/5 text-center md:text-start">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-20 items-start mb-24">
            <div>
              <div className={`text-5xl font-bold text-primary font-serif ${isRtl ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-accent mb-8 inline-block`}>
                {lang === 'ar' || lang === 'ur' ? 'قرآن يتلى' : 'Quran Sanctuary'}
              </div>
              <p className="text-primary/60 text-xl max-w-md leading-relaxed font-serif mx-auto md:mx-0">
                {t.footer.desc}
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-10">
              <div className="section-label mb-0">{t.footer.contact}</div>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/quranyutlaa?igsh=MWVjeHNpNTZkbzdkMg%3D%3D&utm_source=ig_contact_invite%E2%80%8E%E2%80%8F" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#e4405f] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-[#e4405f]/20" title="إنستغرام">
                  <Instagram size={24} />
                </a>
                <a href="https://wa.me/966547013085" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-[#25D366]/20" title="واتساب">
                  <MessageCircle size={24} />
                </a>
                <a href="https://t.me/+966547013085" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-[#0088cc]/20" title="تلجرام">
                  <Send size={24} className="rotate-180" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-primary/10 pt-10 font-sans text-[11px] uppercase tracking-[0.3em] text-primary/40 uppercase">
            <p>© 2026 {lang === 'ar' || lang === 'ur' ? 'قرآن يتلى' : 'Quran Sanctuary'}. {t.footer.rights}</p>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-secondary transition-colors underline underline-offset-4 cursor-pointer"
            >
              {t.footer.privacy}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
