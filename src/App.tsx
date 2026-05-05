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
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="editorial-card"
  >
    <div className="section-label">المميزات</div>
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
}

const TeacherCard: FC<TeacherCardProps> = ({ teacher }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="editorial-card border-r-4 border-r-secondary"
  >
    <div className="section-label">المعلمة</div>
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


  const teachers: Teacher[] = [
    {
      name: "أ. أروى",
      schedule: [
        "الإثنين والأربعاء: 7 - 10 صباحًا (بتوقيت مكة المكرمة)",
        "الإثنين والأربعاء: 1 - 3 عصرًا",
        "الإثنين والأربعاء: 4 - 6 مساءً",
        "الإثنين والأربعاء: 8 - 10 مساءً"
      ]
    },
    {
      name: "أ. يمنى",
      schedule: [
        "من الأحد إلى الخميس: 7 - 10 صباحًا (بتوقيت مكة المكرمة)"
      ]
    },
    {
      name: "أ. منار",
      schedule: [
        "من السبت إلى الخميس: 7 - 10 صباحًا (بتوقيت مكة المكرمة)"
      ]
    },
    {
      name: "أ. فاطمة",
      schedule: [
        "من الاثنين إلى الأربعاء: 9 - 11 صباحًا (بتوقيت مكة المكرمة)"
      ]
    },
    {
      name: "أ. بشرى",
      schedule: [
        "من الأحد إلى الأربعاء: 8:30 - 10:30 مساءً (بتوقيت مكة المكرمة)"
      ]
    },
    {
      name: "أ. سمية",
      schedule: [
        "من السبت إلى الخميس: 4 - 6 مساءً (بتوقيت مكة المكرمة)"
      ]
    }
  ];

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
      const message = `*استمارة اشتراك جديدة*%0A%0A` +
        `*الاسم الكامل:* ${name}%0A` +
        `*العمر:* ${age}%0A` +
        `*المعلمة المختارة:* ${teacher}%0A` +
        `*كم جزء محفوظ:* ${juz}%0A` +
        `*رقم الواتساب:* ${whatsapp}%0A` +
        `*ملاحظات إضافية:* ${notes || 'لا يوجد'}`;

      const whatsappUrl = `https://wa.me/966547013085?text=${message}`;
      
      // 3. Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      alert('عذراً، حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-primary font-serif border-r-4 border-accent pr-3">قرآن يتلى</div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-primary/80 font-sans text-sm uppercase tracking-widest font-bold">
            <a href="#about" className="hover:text-accent transition-colors">عن الخدمة</a>
            <a href="#schedule" className="hover:text-accent transition-colors">المواعيد</a>
            <a href="#pricing" className="hover:text-accent transition-colors">الأسعار</a>
            <a href="#faq" className="hover:text-accent transition-colors">الأسئلة الشائعة</a>
            <a href="#register" className="bg-primary text-white px-10 py-4 hover:bg-accent transition-all">سجّلي الآن</a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
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
              <div className="flex flex-col gap-8 text-sm uppercase tracking-widest font-bold text-center font-sans">
                <a href="#about" onClick={() => setIsMenuOpen(false)}>عن الخدمة</a>
                <a href="#schedule" onClick={() => setIsMenuOpen(false)}>المواعيد</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)}>الأسعار</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)}>الأسئلة الشائعة</a>
                <a href="#register" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white py-4">سجّلي الآن</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label">خدمة تعليم القرآن الكريم أونلاين</div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[1.1] mb-8 border-r-[8px] border-accent pr-6">
              نـورٌ فـي<br /><span className="text-primary/40 italic">بيتكِ</span>
            </h1>
            <p className="text-2xl md:text-3xl text-primary/70 leading-relaxed mb-12 max-w-2xl font-serif">
              تعليم النساء عبر Zoom. تواصل مباشر، مراجعة دقيقة وإتقان للتجويد.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <a href="#register" className="bg-accent text-white px-12 py-5 text-lg font-sans font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-accent/20">
                سجّلي الآن
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
            <div className="absolute -bottom-10 -right-10 editorial-card max-w-[200px] z-20">
              <div className="section-label">رسالة اليوم</div>
              <p className="text-sm italic leading-relaxed text-primary/80">"خيركم من تعلم القرآن وعلمه"</p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section id="about" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.4fr_1fr] gap-20">
            <div>
              <div className="section-label">من نحن</div>
              <h2 className="text-4xl font-bold mb-8 leading-snug">لماذا تختارين<br />منصتنا؟</h2>
              <div className="w-20 h-1 bg-accent"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard 
                icon={Users}
                title="تعليم فردي"
                description="حصص خاصة لضمان أعلى مستويات التركيز والمتابعة الصحيحة."
              />
              <FeatureCard 
                icon={BookOpen}
                title="منهج متكامل"
                description="يشمل حفظ القرآن، مراجعته، وتعليم أحكام التجويد بأسلوب سهل ومبسط."
              />
              <FeatureCard 
                icon={Clock}
                title="مرونة المواعيد"
                description="خيارات متعددة للمواعيد صباحية ومسائية لتناسب مختلف الالتزامات."
              />
              <FeatureCard 
                icon={Heart}
                title="فئة خاصة"
                description="نهتم بتعليم النساء بأسلوب مشجع ومحبب يراعي مستوياتهن المختلفة."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-32 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label text-center">جدول المواعيد</div>
          <h2 className="text-5xl font-bold text-center mb-20 italic">اختاري ما يناسبكِ</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, idx) => (
              <TeacherCard key={idx} teacher={teacher} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-primary/60 text-lg font-serif">
              * جميع المواعيد المذكورة أعلاه هي حسب توقيت مكة المكرمة.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-cream border-y border-primary/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="section-label">باقات الاشتراك</div>
          <div className="grid md:grid-cols-2 gap-10 mt-16 max-w-4xl mx-auto">
            <div className="editorial-card !shadow-none p-12 hover:bg-primary/5 transition-colors">
              <div className="section-label !text-accent mb-6">تعليم فردي</div>
              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="text-7xl font-sans font-light text-primary">$25</span>
                <span className="text-sm font-sans opacity-70 uppercase tracking-widest text-primary/60">شهرياً</span>
              </div>
              <p className="text-primary/70 leading-relaxed font-serif">حصة خاصة لضمان أعلى مستويات التركيز والمتابعة.</p>
            </div>
 
            <div className="editorial-card !shadow-none p-12 hover:bg-primary/5 transition-colors">
              <div className="section-label !text-accent mb-6">تعليم جماعي</div>
              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="text-7xl font-sans font-light text-primary">$15</span>
                <span className="text-sm font-sans opacity-70 uppercase tracking-widest text-primary/60">شهرياً</span>
              </div>
              <p className="text-primary/70 leading-relaxed font-serif">دراسة ضمن مجموعات صغيرة تشجيعاً على الحفظ.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-y-4 gap-x-12 text-right my-16 font-sans text-sm tracking-wider uppercase max-w-2xl mx-auto text-primary">
            {[
              "تسميع القرآن الكريم بانتظام",
              "مراجعة دورية للمحفوظ",
              "تعليم أحكام التجويد",
              "حصص مباشرة عبر Zoom",
              "متابعة شخصية مستمرة",
              "شهادة إنجاز معتمدة"
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-primary/10 pb-4">
                <span className="text-accent">◈</span> {f}
              </div>
            ))}
          </div>
          
          <a href="#register" className="inline-block bg-accent text-white px-16 py-6 text-xl font-sans font-bold uppercase tracking-widest hover:bg-primary transition-all">
            ابدئي رحلتكِ اليوم
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label text-center">الأسئلة الشائعة</div>
          <h2 className="text-5xl font-bold text-center mb-20 italic">ماذا يتبادر لذهنكِ؟</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem 
              question="هل الحصص تكون جماعية أم فردية؟"
              answer="الحصص جماعية، كما أننا نوفر خيار الحصص الفردية لضمان أقصى فائدة وتركيز مع الطالبة."
            />
            <FAQItem 
              question="هل التدريس متاح لجميع الأعمار؟"
              answer="خدمتنا مخصصة للنساء فقط من جميع الأعمار."
            />
            <FAQItem 
              question="كيف يتم دفع الرسوم الشهرية؟"
              answer="نوفر طرق دفع سهلة وآمنة (مثل التحويل البنكي)، ويتم الدفع في بداية كل شهر لضمان استمرارية الحصص."
            />
            <FAQItem 
              question="ماذا أحتاج للبدء في الدروس؟"
              answer="تحتاجين فقط إلى جهاز (كمبيوتر أو هاتف) مثبت عليه برنامج Zoom، واتصال جيد بالإنترنت والمصحف الخاص بكِ."
            />
            <FAQItem 
              question="كيف يتم التواصل بعد إرسال البيانات؟"
              answer="سيصلنا طلبكِ فوراً عبر قاعدة البيانات، وسيقوم فريق العمل بالتواصل معكِ عبر الواتساب خلال 24-48 ساعة لتأكيد موعد التجربة أو البدء."
            />
            <FAQItem 
              question="هل توجد حلقات تجريبية مجانية؟"
              answer="نعم، نؤمن بأن الطالبة يجب أن تشعر بالارتياح مع المعلمة أولاً، لذا نوفر أول حصة للقاء والتعارف وتقييم المستوى مجاناً."
            />
            <FAQItem 
              question="ماذا لو كنتُ في مستوى 'مبتدئ جداً' (أحتاج للقاعدة النورانية)؟"
              answer="معلماتنا مؤهلات لتعليم المبتدئات من الصفر، نبدأ معكِ من مخارج الحروف والقاعدة النورانية حتى تصلي لطلاقة القراءة والحفظ."
            />
            <FAQItem 
              question="هل يتم منح إجازات أو شهادات؟"
              answer="نعم، نوفر للطالبات اللواتي يختمن أجزاءً أو القرآن كاملاً شهادات تكريمية، كما يوجد مسار خاص للإجازات بالسند المتصل للنبي ﷺ مع المعلمات المجازات."
            />
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <div className="section-label">سجّلي الآن</div>
            <h2 className="text-7xl font-bold mb-10 leading-tight italic">دعينا نبدأ<br /><span className="text-accent">بالتواصل</span></h2>
            <p className="text-2xl text-primary/70 leading-relaxed mb-12 font-serif">
              املئي النموذج وسنقوم بالتواصل معكِ عبر الواتساب لتحديد موعد الحصة التجرِيبية المجانية والاتفاق على جدول الحصص.
            </p>
            

          </div>

          <div className="editorial-card !p-12 lg:sticky lg:top-32">
            <div className="section-label mb-8">استمارة البيانات</div>
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl text-accent mb-6 italic">شكراً لكِ</div>
                <h3 className="text-2xl font-bold text-primary mb-4">تم استلام طلبكِ بنجاح</h3>
                <p className="text-primary/60 font-sans text-sm tracking-wide">سوف نرسل لكِ تفاصيل الحصة التجرِيبية عبر الواتساب.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest block font-sans">الاسم الكامل</label>
                    <input name="fullName" type="text" required className="input-editorial" placeholder="اكتبي اسمكِ هنا..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest block font-sans">العمر</label>
                    <input name="age" type="number" required min="2" className="input-editorial" placeholder="مثلاً: 25" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest block font-sans">اختيار المعلمة</label>
                    <select name="teacher" required defaultValue="" className="input-editorial cursor-pointer">
                      <option value="" disabled>إختيار المعلمة...</option>
                      {teachers.map((teacher, idx) => (
                        <option key={idx} value={teacher.name}>{teacher.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest block font-sans">كم جزء محفوظ؟</label>
                    <select name="juz" defaultValue="البدء من الصفر" className="input-editorial cursor-pointer">
                      <option value="البدء من الصفر">البدء من الصفر</option>
                      {[...Array(30)].map((_, i) => (
                        <option key={i + 1}>
                          {i + 1 === 1 ? 'جزء واحد' : i + 1 === 2 ? 'جزئين' : (i + 1 >= 3 && i + 1 <= 10) ? `${i + 1} أجزاء` : `${i + 1} جزءاً`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-accent tracking-widest block font-sans">رقم الواتساب</label>
                  <input 
                    name="whatsapp"
                    type="tel" 
                    required 
                    pattern="[0-9]*"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                    }}
                    title="يرجى إدخال أرقام فقط"
                    className="input-editorial !text-left" 
                    dir="ltr" 
                    placeholder="00966500000000" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-accent tracking-widest block font-sans">ملاحظات إضافية</label>
                  <textarea name="notes" className="input-editorial h-20 resize-none" placeholder="ملاحظات إضافية أو تفضيلات المواعيد..."></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-6 font-sans font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-lg hover:shadow-primary/20">
                  إرسال البيانات
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sand py-32 border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-20 items-start mb-24">
            <div>
              <div className="text-5xl font-bold text-primary font-serif border-r-4 border-accent pr-4 mb-8 inline-block">قرآن يتلى</div>
              <p className="text-primary/60 text-xl max-w-md leading-relaxed font-serif">
                نحن هنا لنكون رفيقكِ في رحلتكِ مع القرآن الكريم، نوفر لكِ البيئة المناسبة والمعلمات المؤهلات لتحقيق حلمكِ في الحفظ والإتقان.
              </p>
            </div>
            
            <div className="flex flex-col items-start gap-10">
              <div className="section-label mb-0">تواصل معنا</div>
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
            <p>© 2026 قرآن يتلى لتعليم القرآن الكريم. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
