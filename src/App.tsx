/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  Send, 
  Video, 
  Star,
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
  label: string;
}

const TeacherCard: FC<TeacherCardProps> = ({ teacher, label }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="editorial-card border-x-4 border-x-secondary"
  >
    <div className="section-label">{label}</div>
    <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
      {teacher.name}
    </h4>
    <div className="space-y-3">
      {teacher.schedule.map((slot, idx) => (
        <div key={idx} className="flex items-start gap-2 text-primary/80 border-b border-primary/5 pb-2 last:border-0">
          <Clock size={16} className="mt-1 text-secondary shrink-0" />
          <span className="text-sm font-sans font-medium leading-relaxed">{slot}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLang] = useState<Language>('ar');
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

  const teacherNames: Record<Language, string[]> = {
    ar: ["أ. أروى", "أ. يمنى", "أ. منار", "أ. فاطمة", "أ. بشرى", "أ. سمية"],
    en: ["Arwa", "Yomna", "Manar", "Fatima", "Bushra", "Somaya"],
    fr: ["Arwa", "Yomna", "Manar", "Fatima", "Bushra", "Somaya"],
    tr: ["Arwa", "Yomna", "Manar", "Fatima", "Bushra", "Somaya"],
    id: ["Arwa", "Yomna", "Manar", "Fatima", "Bushra", "Somaya"],
    ur: ["استانی ارویٰ", "استانی یمنیٰ", "استانی منار", "استانی فاطمہ", "استانی بشرہ", "استانی سمیہ"]
  };

  const getSchedules = (langCode: Language): string[][] => {
    switch(langCode) {
      case 'en': return [["Mon/Wed: 7-10 AM (Makkah Time)", "Mon/Wed: 1-3 PM", "Mon/Wed: 4-6 PM", "Mon/Wed: 8-10 PM"], ["Sun-Thu: 7-10 AM (Makkah Time)"], ["Sat-Thu: 7-10 AM (Makkah Time)"], ["Mon-Wed: 9-11 AM (Makkah Time)"], ["Sun-Wed: 8:30-10:30 PM (Makkah Time)"], ["Sat-Thu: 4-6 PM (Makkah Time)"]];
      case 'fr': return [["Lun/Mer: 7-10h (Heure Mecque)", "Lun/Mer: 13-15h", "Lun/Mer: 16-18h", "Lun/Mer: 20-22h"], ["Dim-Jeu: 7-10h (Heure Mecque)"], ["Sam-Jeu: 7-10h (Heure Mecque)"], ["Lun-Mer: 9-11h (Heure Mecque)"], ["Dim-Mer: 20:30-22:30 (Heure Mecque)"], ["Sam-Jeu: 16-18h (Heure Mecque)"]];
      case 'tr': return [["Pzt/Çar: 07:00-10:00 (Mekke Saati)", "Pzt/Çar: 13:00-15:00", "Pzt/Çar: 16:00-18:00", "Pzt/Çar: 20:00-22:00"], ["Paz-Per: 07:00-10:00 (Mekke Saati)"], ["Cmt-Per: 07:00-10:00 (Mekke Saati)"], ["Pzt-Çar: 09:00-11:00 (Mekke Saati)"], ["Paz-Çar: 20:30-22:30 (Mekke Saati)"], ["Cmt-Per: 16:00-18:00 (Mekke Saati)"]];
      case 'id': return [["Sen/Rab: 07:00-10:00 (Waktu Makkah)", "Sen/Rab: 13:00-15:00", "Sen/Rab: 16:00-18:00", "Sen/Rab: 20:00-22:00"], ["Aha-Kam: 07:00-10:00 (Waktu Makkah)"], ["Sab-Kam: 07:00-10:00 (Waktu Makkah)"], ["Sen-Rab: 09:00-11:00 (Waktu Makkah)"], ["Aha-Rab: 20:30-22:30 (Waktu Makkah)"], ["Sab-Kam: 16:00-18:00 (Waktu Makkah)"]];
      case 'ur': return [["پیر/بدھ: 7 - 10 بجے صبح (مکہ مکرمہ ٹائم)", "پیر/بدھ: 1 - 3 بجے دوپہر", "پیر/بدھ: 4 - 6 بجے شام", "پیر/بدھ: 8 - 10 بجے رات"], ["اتوار تا جمعرات: 7 - 10 بجے صبح (مکہ مکرمہ ٹائم)"], ["ہفتہ تا جمعرات: 7 - 10 بجے صبح (مکہ مکرمہ ٹائم)"], ["پیر تا بدھ: 9 - 11 بجے صبح (مکہ مکرمہ ٹائم)"], ["اتوار تا بدھ: 8:30 - 10:30 بجے رات (مکہ مکرمہ ٹائم)"], ["ہفتہ تا جمعرات: 4 - 6 بجے شام (مکہ مکرمہ ٹائم)"]];
      default: return [["الإثنين والأربعاء: 7 - 10 صباحًا (بتوقيت مكة المكرمة)", "الإثنين والأربعاء: 1 - 3 عصرًا", "الإثنين والأربعاء: 4 - 6 مساءً", "الإثنين والأربعاء: 8 - 10 مساءً"], ["من الأحد إلى الخميس: 7 - 10 صباحًا (بتوقيت مكة المكرمة)"], ["من السبت إلى الخميس: 7 - 10 صباحًا (بتوقيت مكة المكرمة)"], ["من الاثنين إلى الأربعاء: 9 - 11 صباحًا (بتوقيت مكة المكرمة)"], ["من الأحد إلى الأربعاء: 8:30 - 10:30 مساءً (بتوقيت مكة المكرمة)"], ["من السبت إلى الخميس: 4 - 6 مساءً (بتوقيت مكة المكرمة)"]];
    }
  };

  const teachers: Teacher[] = teacherNames[lang].map((name, i) => ({
    name,
    schedule: getSchedules(lang)[i]
  }));

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
                onChange={(e) => setLang(e.target.value as Language)}
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
              onChange={(e) => setLang(e.target.value as Language)}
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

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label">{t.hero.label}</div>
            <h1 className={`text-7xl md:text-9xl font-bold leading-[1.1] mb-8 ${isRtl ? 'border-r-[8px] pr-6' : 'border-l-[8px] pl-6'} border-accent`}>
              {t.hero.title1}<br /><span className="text-primary/40 italic">{t.hero.title2}</span>
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
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1000" 
                alt="Quran" 
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
              <TeacherCard key={idx} teacher={teacher} label={t.schedule.label} />
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
                    placeholder="00966500000000" 
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
                <a href="#" className="w-12 h-12 bg-[#e4405f] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-[#e4405f]/20" title="إنستغرام">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
