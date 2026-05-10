
export type Language = 'ar' | 'en' | 'fr' | 'tr' | 'id' | 'ur';

export interface TranslationSchema {
  nav: {
    about: string;
    schedule: string;
    pricing: string;
    faq: string;
    register: string;
  };
  hero: {
    label: string;
    title1: string;
    title2: string;
    description: string;
    cta: string;
    dailyMessage: string;
    dailyQuote: string;
  };
  features: {
    label: string;
    title: string;
    individual: { title: string; desc: string };
    curriculum: { title: string; desc: string };
    timing: { title: string; desc: string };
    special: { title: string; desc: string };
  };
  schedule: {
    label: string;
    title: string;
    note: string;
    specialtiesLabel: string;
  };
  pricing: {
    label: string;
    individual: { title: string; price: string; period: string; desc: string };
    group: { title: string; price: string; period: string; desc: string };
    features: string[];
    cta: string;
  };
  faq: {
    label: string;
    title: string;
    q1: { q: string; a: string };
    q2: { q: string; a: string };
    q3: { q: string; a: string };
    q4: { q: string; a: string };
    q5: { q: string; a: string };
    q6: { q: string; a: string };
    q7: { q: string; a: string };
    q8: { q: string; a: string };
  };
  register: {
    label: string;
    title1: string;
    title2: string;
    description: string;
    formTitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    age: string;
    agePlaceholder: string;
    teacher: string;
    teacherPlaceholder: string;
    juz: string;
    juzStart: string;
    juzOne: string;
    juzTwo: string;
    juzMultiple: string;
    whatsapp: string;
    whatsappTitle: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
    successMessage: string;
    error: string;
  };
  privacy: {
    title: string;
    description: string;
    sections: { title: string; content: string }[];
    close: string;
  };
  footer: {
    desc: string;
    contact: string;
    rights: string;
    privacy: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  ar: {
    nav: { about: "عن الخدمة", schedule: "المواعيد", pricing: "الأسعار", faq: "الأسئلة الشائعة", register: "سجّلي الآن" },
    hero: { label: "خدمة تعليم القرآن الكريم أونلاين", title1: "قرآن يتلى", title2: "نـورٌ فـي بيتكِ", description: "تعليم النساء عبر Zoom. تواصل مباشر، مراجعة دقيقة وإتقان للتجويد.", cta: "سجّلي الآن", dailyMessage: "رسالة اليوم", dailyQuote: "\"خيركم من تعلم القرآن وعلمه\"" },
    features: { label: "من نحن", title: "لماذا تختارين منصتنا؟", individual: { title: "تعليم فردي", desc: "حصص خاصة لضمان أعلى مستويات التركيز والمتابعة الصحيحة." }, curriculum: { title: "منهج متكامل", desc: "يشمل حفظ القرآن، مراجعته، وتعليم أحكام التجويد بأسلوب سهل ومبسط." }, timing: { title: "مرونة المواعيد", desc: "خيارات متعددة للمواعيد صباحية ومسائية لتناسب مختلف الالتزامات." }, special: { title: "فئة خاصة", desc: "نهتم بتعليم النساء بأسلوب مشجع ومحبب يراعي مستوياتهن المختلفة." } },
    schedule: { label: "جدول المواعيد", title: "اختاري ما يناسبكِ", note: "* جميع المواعيد المذكورة أعلاه هي حسب توقيت مكة المكرمة.", specialtiesLabel: "الحلقات المتاحة" },
    pricing: { label: "باقات الاشتراك", individual: { title: "تعليم فردي", price: "$25", period: "شهرياً", desc: "حصة خاصة لضمان أعلى مستويات التركيز والمتابعة." }, group: { title: "تعليم جماعي", price: "$15", period: "شهرياً", desc: "دراسة ضمن مجموعات صغيرة تشجيعاً على الحفظ." }, features: ["تسميع القرآن الكريم بانتظام", "مراجعة دورية للمحفوظ", "تعليم أحكام التجويد", "حصص مباشرة عبر Zoom", "متابعة شخصية مستمرة", "شهادة إنجاز معتمدة"], cta: "ابدئي رحلتكِ اليوم" },
    faq: { label: "الأسئلة الشائعة", title: "ماذا يتبادر لذهنكِ؟", q1: { q: "هل الحصص تكون جماعية أم فردية؟", a: "الحصص جماعية، كما أننا نوفر خيار الحصص الفردية لضمان أقصى فائدة وتركيز مع الطالبة." }, q2: { q: "هل التدريس متاح لجميع الأعمار؟", a: "خدمتنا مخصصة للنساء فقط من جميع الأعمار." }, q3: { q: "كيف يتم دفع الرسوم الشهرية؟", a: "نوفر طرق دفع سهلة وآمنة (مثل التحويل البنكي)، ويتم الدفع في بداية كل شهر." }, q4: { q: "ماذا أحتاج للبدء في الدروس؟", a: "تحتاجين فقط إلى جهاز مثبت عليه برنامج Zoom، واتصال جيد بالإنترنت والمصحف الخاص بكِ." }, q5: { q: "كيف يتم التواصل بعد إرسال البيانات؟", a: "سيقوم فريق العمل بالتواصل معكِ عبر الواتساب خلال 24-48 ساعة لتأكيد الموعد." }, q6: { q: "هل توجد حلقات تجريبية مجانية؟", a: "نعم، نوفر أول حصة للقاء والتعارف وتقييم المستوى مجاناً." }, q7: { q: "ماذا لو كنتُ في مستوى مبتدئ؟", a: "معلماتنا مؤهلات لتعليم المبتدئات من الصفر حتى طلاقة القراءة والحفظ." }, q8: { q: "هل يتم منح شهادات؟", a: "نعم، نوفر للطالبات اللواتي يختمن أجزاءً أو القرآن كاملاً شهادات تكريمية." } },
    register: { label: "سجّلي الآن", title1: "دعينا نبدأ", title2: "بالتواصل", description: "املئي النموذج وسنقوم بالتواصل معكِ عبر الواتساب لتحديد موعد الحصة التجرِيبية المجانية.", formTitle: "استمارة البيانات", fullName: "الاسم الكامل", fullNamePlaceholder: "اكتبي اسمكِ هنا...", age: "العمر", agePlaceholder: "مثلاً: 25", teacher: "اختيار المعلمة", teacherPlaceholder: "إختيار المعلمة...", juz: "كم جزء محفوظ؟", juzStart: "البدء من الصفر", juzOne: "جزء واحد", juzTwo: "جزئين", juzMultiple: "أجزاء", whatsapp: "رقم الواتساب", whatsappTitle: "يرجى إدخال أرقام فقط", notes: "ملاحظات إضافية", notesPlaceholder: "ملاحظات إضافية أو تفضيلات المواعيد...", submit: "إرسال البيانات", successTitle: "شكراً لكِ", successDesc: "تم استلام طلبكِ بنجاح", successMessage: "سوف نرسل لكِ تفاصيل الحصة التجرِيبية عبر الواتساب.", error: "عذراً، حدث خطأ أثناء إرسال البيانات." },
    privacy: {
      title: "سياسة الخصوصية",
      description: "نحن في قرآن يتلى نلتزم بحماية خصوصيتكِ.",
      sections: [
        { title: "جمع البيانات", content: "نقوم بجمع اسمكِ وعمركِ ورقم الواتساب الخاص بكِ لغرض وحيد وهو تنسيق حصص القرآن الكريم التي ترسلينها." },
        { title: "استخدام البيانات", content: "تُستخدم بياناتكِ فقط للتواصل معكِ وتحديد مواعيد الحلقات وإرسال روابط الزووم." },
        { title: "حماية البيانات", content: "نحن لا نشارك بياناتكِ مع أي أطراف ثالثة. يتم تخزين البيانات بشكل آمن." },
        { title: "حقوقكِ", content: "يمكنكِ طلب حذف بياناتكِ في أي وقت عبر التواصل معنا." }
      ],
      close: "إغلاق"
    },
    footer: { desc: "نحن هنا لنكون رفيقكِ في رحلتكِ مع القرآن الكريم، نوفر لكِ البيئة المناسبة والمعلمات المؤهلات.", contact: "تواصل معنا", rights: "جميع الحقوق محفوظة.", privacy: "سياسة الخصوصية" }
  },
  en: {
    nav: { about: "About", schedule: "Schedule", pricing: "Pricing", faq: "FAQ", register: "Register Now" },
    hero: { label: "Online Quran Education Service", title1: "Quran Sanctuary", title2: "Light in Your Home", description: "Teaching women via Zoom. Direct communication, careful review, and mastery of Tajweed.", cta: "Register Now", dailyMessage: "Message of the Day", dailyQuote: "\"The best of you is the one who learns the Quran and teaches it.\"" },
    features: { label: "About Us", title: "Why Choose Our Platform?", individual: { title: "Individual Education", desc: "Private sessions to ensure the highest levels of focus and individual progress." }, curriculum: { title: "Comprehensive Curriculum", desc: "Includes Quran memorization, revision, and Tajweed rules in a simple way." }, timing: { title: "Flexible Schedule", desc: "Multiple morning and evening options to fit different commitments." }, special: { title: "Special Category", desc: "We focus on teaching women in an encouraging environment for all levels." } },
    schedule: { label: "Schedule", title: "Choose What Suits You", note: "* All mentioned times are according to Makkah time.", specialtiesLabel: "Specialized Circles" },
    pricing: { label: "Subscription Plans", individual: { title: "Individual", price: "$25", period: "Monthly", desc: "Private session for maximum concentration and tracking." }, group: { title: "Group", price: "$15", period: "Monthly", desc: "Small groups to encourage shared memorization." }, features: ["Regular Quran recitation", "Periodic revision of memorized parts", "Tajweed rule teaching", "Live Zoom sessions", "Constant personal follow-up", "Certified completion certificate"], cta: "Start Your Journey Today" },
    faq: { label: "FAQ", title: "Common Questions", q1: { q: "Are sessions group or individual?", a: "We offer both group and individual options to ensure maximum benefit for the student." }, q2: { q: "Is teaching available for all ages?", a: "Our service is dedicated to women of all ages." }, q3: { q: "How are monthly fees paid?", a: "We provide easy and secure payment methods (such as bank transfer)." }, q4: { q: "What do I need to start?", a: "You only need a device with Zoom, internet connection, and your Mushaf." }, q5: { q: "How are we contacted?", a: "Our team will contact you via WhatsApp within 24-48 hours to confirm your trial." }, q6: { q: "Are there free trials?", a: "Yes, we offer a free introductory session for assessment." }, q7: { q: "What if I am a beginner?", a: "Our teachers are qualified to teach from scratch until fluent reading." }, q8: { q: "Are certificates granted?", a: "Yes, we provide certificates for completed parts." } },
    register: { label: "Register Now", title1: "Let's Start", title2: "Connecting", description: "Fill out the form and we will contact you via WhatsApp for your free trial.", formTitle: "Registration Form", fullName: "Full Name", fullNamePlaceholder: "Write your name here...", age: "Age", agePlaceholder: "Example: 25", teacher: "Select Teacher", teacherPlaceholder: "Select Teacher...", juz: "Juz Memorized?", juzStart: "Starting from scratch", juzOne: "1 Juz", juzTwo: "2 Juz", juzMultiple: "Juz", whatsapp: "WhatsApp Number", whatsappTitle: "Digits only please", notes: "Additional Notes", notesPlaceholder: "Timing preferences...", submit: "Submit", successTitle: "Thank You", successDesc: "Received Successfully", successMessage: "We will send trial details via WhatsApp.", error: "Sorry, an error occurred." },
    privacy: {
      title: "Privacy Policy",
      description: "We are committed to protecting your privacy.",
      sections: [
        { title: "Data Collection", content: "We collect your name, age, and WhatsApp number solely for coordinating Quran classes." },
        { title: "Data Usage", content: "Your data is used to contact you, schedule classes, and send Zoom links." },
        { title: "Data Protection", content: "We do not share your data with third parties. All data is stored securely." },
        { title: "Your Rights", content: "You can request data deletion at any time by contacting us." }
      ],
      close: "Close"
    },
    footer: { desc: "We are here to be your companion in your journey with the Holy Quran.", contact: "Contact Us", rights: "All rights reserved.", privacy: "Privacy Policy" }
  },
  fr: {
    nav: { about: "À propos", schedule: "Horaires", pricing: "Tarifs", faq: "FAQ", register: "S'inscrire" },
    hero: { label: "Service d'éducation Coranique en ligne", title1: "Quran Sanctuary", title2: "Une lumière dans votre foyer", description: "Enseignement pour femmes via Zoom. Communication directe, révision minutieuse et maîtrise du Tajwid.", cta: "S'inscrire", dailyMessage: "Message du jour", dailyQuote: "\"Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne.\"" },
    features: { label: "À propos de nous", title: "Pourquoi choisir notre plateforme ?", individual: { title: "Éducation individuelle", desc: "Sessions privées pour assurer les plus hauts niveaux de concentration." }, curriculum: { title: "Programme complet", desc: "Comprend la mémorisation du Coran, la révision et les règles du Tajwid." }, timing: { title: "Horaires flexibles", desc: "Plusieurs options matin et soir pour s'adapter à différents engagements." }, special: { title: "Catégorie spéciale", desc: "Nous nous concentrons sur l'enseignement aux femmes dans un environnement encourageant." } },
    schedule: { label: "Horaires", title: "Choisissez ce qui vous convient", note: "* Tous les horaires sont basés sur l'heure de La Mecque.", specialtiesLabel: "Cercles spécialisés" },
    pricing: { label: "Forfaits d'abonnement", individual: { title: "Individuel", price: "25$", period: "Mensuel", desc: "Session privée pour une concentration et un suivi optimaux." }, group: { title: "Groupe", price: "15$", period: "Mensuel", desc: "Petits groupes pour encourager la mémorisation." }, features: ["Récitation régulière", "Révision périodique", "Enseignement Tajwid", "Sessions Zoom en direct", "Certificat de réussite"], cta: "Commencez aujourd'hui" },
    faq: { label: "FAQ", title: "Questions fréquentes", q1: { q: "Sessions collectives ou individuelles ?", a: "Nous proposons les deux options pour assurer un bénéfice maximal." }, q2: { q: "Disponible pour tous les âges ?", a: "Notre service est dédié aux femmes de tous âges." }, q3: { q: "Comment payer les frais ?", a: "Nous proposons des méthodes de paiement sécurisées (virement bancaire)." }, q4: { q: "De quoi ai-je besoin ?", a: "Un appareil avec Zoom, internet et votre Mous-haf." }, q5: { q: "Comment sommes-nous contactés ?", a: "Notre équipe vous contactera via WhatsApp sous 24-48h." }, q6: { q: "Séances d'essai gratuites ?", a: "Oui, nous offrons une séance d'introduction gratuite." }, q7: { q: "Si je suis débutante ?", a: "Nos enseignants sont qualifiés pour enseigner de zéro." }, q8: { q: "Des certificats sont-ils délivrés ?", a: "Oui, nous fournissons des certificats." } },
    register: { label: "S'inscrire", title1: "Commençons", title2: "À échanger", description: "Remplissez le formulaire pour votre essai gratuit via WhatsApp.", formTitle: "Inscription", fullName: "Nom complet", fullNamePlaceholder: "Votre nom...", age: "Âge", agePlaceholder: "Ex: 25", teacher: "Enseignante", teacherPlaceholder: "Choisir...", juz: "Juz mémorisés ?", juzStart: "De zéro", juzOne: "1 Juz", juzTwo: "2 Juz", juzMultiple: "Juz", whatsapp: "WhatsApp", whatsappTitle: "Chiffres uniquement", notes: "Notes", notesPlaceholder: "Préférences d'horaire...", submit: "Envoyer", successTitle: "Merci", successDesc: "Reçu", successMessage: "Détails envoyés par WhatsApp.", error: "Une erreur est survenue." },
    privacy: {
      title: "Politique de Confidentialité",
      description: "Nous nous engageons à protéger votre vie privée.",
      sections: [
        { title: "Collecte de Données", content: "Données pour coordonner les cours de Coran (nom, âge, WhatsApp)." },
        { title: "Utilisation des Données", content: "Pour vous contacter, planifier les cours et sessions Zoom." },
        { title: "Protection des Données", content: "Nous ne partageons pas vos données." },
        { title: "Vos Droits", content: "Vous pouvez demander la suppression de vos données." }
      ],
      close: "Fermer"
    },
    footer: { desc: "Votre compagnon dans votre voyage avec le Saint Coran.", contact: "Contact", rights: "Tous droits réservés.", privacy: "Confidentialité" }
  },
  tr: {
    nav: { about: "Hakkımızda", schedule: "Program", pricing: "Fiyatlandırma", faq: "SSS", register: "Şimdi Kaydol" },
    hero: { label: "Çevrimiçi Kuran Eğitim Hizmeti", title1: "Quran Sanctuary", title2: "Evinizde Bir Işık", description: "Zoom üzerinden kadınlara eğitim. Doğrudan iletişim ve Tecvid ustalığı.", cta: "Şimdi Kaydol", dailyMessage: "Günün Mesajı", dailyQuote: "\"Sizin en hayırlınız Kuran'ı öğrenen ve öğreteninizdir.\"" },
    features: { label: "Hakkımızda", title: "Neden Platformumuzu Seçmelisiniz?", individual: { title: "Bireysel Eğitim", desc: "Yüksek odaklanma için özel dersler." }, curriculum: { title: "Kapsamlı Müfredat", desc: "Kuran ezberi, tekrarı ve Tecvid kurallarını içerir." }, timing: { title: "Esnek Program", desc: "Sabah ve akşam seçenekleri." }, special: { title: "Özel Kategori", desc: "Kadınlara destekleyici bir ortamda eğitim." } },
    schedule: { label: "Program", title: "Size Uygun Olanı Seçin", note: "* Tüm saatler Mekke saatine göredir.", specialtiesLabel: "Uzmanlık Halkaları" },
    pricing: { label: "Planlar", individual: { title: "Bireysel", price: "25$", period: "Aylık", desc: "Maksimum konsantrasyon için özel ders." }, group: { title: "Grup", price: "15$", period: "Aylık", desc: "Ezberi teşvik etmek için küçük gruplar." }, features: ["Düzenli okuma", "Periyodik tekrar", "Tecvid eğitimi", "Canlı Zoom", "Sertifika"], cta: "Bugün Başlayın" },
    faq: { label: "SSS", title: "Sıkça Sorulan Sorular", q1: { q: "Dersler grup mu?", a: "Hem grup hem de bireysel seçenekler sunuyoruz." }, q2: { q: "Her yaş için mi?", a: "Hizmetimiz her yaştan kadına özeldir." }, q3: { q: "Ödeme nasıl?", a: "Güvenli ödeme yöntemleri sunuyoruz (virement)." }, q4: { q: "Ne lazım?", a: "Zoom, internet ve Mushaf." }, q5: { q: "İletişim nasıl?", a: "WhatsApp üzerinden iletişime geçeceğiz." }, q6: { q: "Deneme var mı?", a: "Evet, ücretsiz tanışma dersi sunuyoruz." }, q7: { q: "Yeni başlıyorsam?", a: "Öğretmenlerimiz sıfırdan öğretmeye yetkindir." }, q8: { q: "Sertifika var mı?", a: "Evet, sağlıyoruz." } },
    register: { label: "Şimdi Kaydol", title1: "Hadi", title2: "Başlayalım", description: "İletişime geçmemiz için formu doldurun.", formTitle: "Kayıt Formu", fullName: "Ad Soyad", fullNamePlaceholder: "Adınız...", age: "Yaş", agePlaceholder: "Örn: 25", teacher: "Öğretmen", teacherPlaceholder: "Seçin...", juz: "Ezberiniz?", juzStart: "Sıfırdan", juzOne: "1 Cüz", juzTwo: "2 Cüz", juzMultiple: "Cüz", whatsapp: "WhatsApp", whatsappTitle: "Sadece rakam", notes: "Notlar", notesPlaceholder: "Tercihleriniz...", submit: "Gönder", successTitle: "Teşekkürler", successDesc: "Alındı", successMessage: "WhatsApp üzerinden döneceğiz.", error: "Hata oluştu." },
    privacy: {
      title: "Gizlilik Politikası",
      description: "Gizliliğinizi korumaya kararlıyız.",
      sections: [
        { title: "Veri Toplama", content: "Sadece koordinasyon için isim ve WhatsApp topluyoruz." },
        { title: "Veri Kullanımı", content: "İletişim ve Zoom için kullanılır." },
        { title: "Veri Koruma", content: "Verilerinizi paylaşmıyoruz." },
        { title: "Haklarınız", content: "Verileri sildirebilirsiniz." }
      ],
      close: "Kapat"
    },
    footer: { desc: "Kuran yolculuğunuzda yanınızdayız.", contact: "İletişim", rights: "Tüm hakları saklıdır.", privacy: "Gizlilik" }
  },
  id: {
    nav: { about: "Tentang", schedule: "Jadwal", pricing: "Harga", faq: "FAQ", register: "Daftar Sekarang" },
    hero: { label: "Layanan Pendidikan Al-Quran Online", title1: "Quran Sanctuary", title2: "Cahaya di Rumahmu", description: "Mengajar wanita via Zoom. Komunikasi langsung dan penguasaan Tajwid.", cta: "Daftar Sekarang", dailyMessage: "Pesan Hari Ini", dailyQuote: "\"Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya.\"" },
    features: { label: "Tentang Kami", title: "Mengapa Memilih Platform Kami?", individual: { title: "Pendidikan Individu", desc: "Sesi privat untuk fokus tertinggi." }, curriculum: { title: "Kurikulum Komprehensif", desc: "Mencakup hafalan Al-Quran, murajaah, dan hukum Tajwid." }, timing: { title: "Jadwal Fleksibel", desc: "Pilihan pagi dan sore." }, special: { title: "Kategori Khusus", desc: "Fokus pada pengajaran wanita." } },
    schedule: { label: "Jadwal", title: "Pilih yang Sesuai", note: "* Semua waktu berdasarkan waktu Makkah.", specialtiesLabel: "Halaqah Khusus" },
    pricing: { label: "Paket Langganan", individual: { title: "Individu", price: "$25", period: "Bulanan", desc: "Sesi privat untuk konsentrasi maksimal." }, group: { title: "Grup", price: "$15", period: "Bulanan", desc: "Kelompok kecil untuk hafalan bersama." }, features: ["Setoran hafalan rutin", "Murajaah berkala", "Pelajaran Tajwid", "Sesi Zoom langsung", "Sertifikat resmi"], cta: "Mulai Hari Ini" },
    faq: { label: "FAQ", title: "Pertanyaan Umum", q1: { q: "Apakah sesi grup atau individu?", a: "Kami menawarkan opsi grup dan individu." }, q2: { q: "Apakah tersedia untuk semua usia?", a: "Khusus untuk wanita dari segala usia." }, q3: { q: "Bagaimana pembayaran biaya?", a: "Kami menyediakan metode pembayaran mudah (transfer bank)." }, q4: { q: "Apa yang saya butuhkan?", a: "Perangkat dengan Zoom, internet, dan Mushaf." }, q5: { q: "Kapan kami dihubungi?", a: "Tim kami akan menghubungi Anda dalam 24-48 jam." }, q6: { q: "Ada sesi uji coba gratis?", a: "Ya, kami menawarkan sesi perkenalan gratis." }, q7: { q: "Bagaimana jika saya pemula?", a: "Guru kami berkualifikasi untuk mengajar dari nol." }, q8: { q: "Diberikan sertifikat?", a: "Ya, kami menyediakan sertifikat." } },
    register: { label: "Daftar Sekarang", title1: "Ayo", title2: "Terhubung", description: "Isi formulir dan kami akan menghubungi Anda untuk uji coba gratis.", formTitle: "Pendaftaran", fullName: "Nama Lengkap", fullNamePlaceholder: "Tulis nama Anda...", age: "Usia", agePlaceholder: "Contoh: 25", teacher: "Pilih Guru", teacherPlaceholder: "Pilih...", juz: "Juz yang Dihafal?", juzStart: "Mulai dari nol", juzOne: "1 Juz", juzTwo: "2 Juz", juzMultiple: "Juz", whatsapp: "Nomor WhatsApp", whatsappTitle: "Angka saja", notes: "Catatan", notesPlaceholder: "Preferensi waktu...", submit: "Kirim", successTitle: "Terima Kasih", successDesc: "Berhasil", successMessage: "Kami kirim detail via WhatsApp.", error: "Terjadi kesalahan." },
    privacy: {
      title: "Kebijakan Privasi",
      description: "Kami berkomitmen melindungi privasi Anda.",
      sections: [
        { title: "Pengumpulan Data", content: "Data nama dan WhatsApp hanya untuk koordinasi kelas." },
        { title: "Penggunaan Data", content: "Untuk komunikasi jadwal dan Zoom." },
        { title: "Perlindungan Data", content: "Kami tidak membagikan data Anda." },
        { title: "Hak Anda", content: "Anda dapat meminta penghapusan data." }
      ],
      close: "Tutup"
    },
    footer: { desc: "Pendamping perjalanan Al-Quran Anda.", contact: "Hubungi Kami", rights: "Seluruh hak cipta dilindungi.", privacy: "Kebijakan Privasi" }
  },
  ur: {
    nav: { about: "سروس کے بارے میں", schedule: "اوقات", pricing: "قیمتیں", faq: "عام سوالات", register: "رجسٹریشن کریں" },
    hero: { label: "آن لائن قرآن تعلیم سروس", title1: "قرآن يتلى", title2: "آپ کے گھر میں ایک نور", description: "زوم کے ذریعے خواتین کی تعلیم۔ براہ راست رابطہ اور تجوید میں مہارت۔", cta: "رجسٹریشن کریں", dailyMessage: "آج کا پیغام", dailyQuote: "\"تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔\"" },
    features: { label: "ہمارے بارے میں", title: "ہمارے پلیٹ فارم کا انتخاب کیوں کریں؟", individual: { title: "انفرادی تعلیم", desc: "اعلیٰ توجہ اور انفرادی ترقی کے لیے پرائیویٹ سیشنز۔" }, curriculum: { title: "جامع نصاب", desc: "حفظ، دہرائی اور تجوید کے قواعد کی آسان تعلیم۔" }, timing: { title: "اوقات میں لچک", desc: "صبح اور شام کے متعدد اوقات۔" }, special: { title: "خواتین کے لیے", desc: "خواتین کو ایک حوصلہ افزا ماحول میں تعلیم۔" } },
    schedule: { label: "اوقات", title: "اپنے لیے مناسب وقت کا انتخاب کریں", note: "* تمام اوقات مکہ مکرمہ کے وقت کے مطابق ہیں۔", specialtiesLabel: "دستیاب حلقے" },
    pricing: { label: "سبسکرپشن پلانز", individual: { title: "انفرادی", price: "$25", period: "ماہانہ", desc: "اعلیٰ توجہ کے لیے پرائیویٹ سیشن۔" }, group: { title: "اجتماعي", price: "$15", period: "ماہانہ", desc: "حفظ کی حوصلہ افزائی کے لیے گروپس۔" }, features: ["باقاعدہ تلاوت", "حفظ کی دہرائی", "تجوید کی تعلیم", "لائیو زوم سیشنز", "سرٹیفیکیٹ"], cta: "آج سے شروع کریں" },
    faq: { label: "عام سوالات", title: "آپ کے ذہن میں کیا ہے؟", q1: { q: "کلاسز گروپ میں ہوں گی یا انفرادی؟", a: "ہم دونوں طرح کی کلاسز فراہم کرتے ہیں۔" }, q2: { q: "کیا تمام عمر کی خواتین کے لیے ہے؟", a: "ہماری سروس ہر عمر کی خواتین کے لیے ہے۔" }, q3: { q: "فیس کی ادائیگی کیسے ہوگی؟", a: "ہم بینک ٹرانسفر جیسے آسان طریقے فراہم کرتے ہیں۔" }, q4: { q: "شروع کرنے کے لیے کیا چاہیے؟", a: "آپ کو صرف زوم، انٹرنیٹ اور مصحف کی ضرورت ہے۔" }, q5: { q: "رابطہ کیسے ہوگا؟", a: "ہماری ٹیم 24-48 گھنٹوں میں واٹس ایپ پر رابطہ کرے گی۔" }, q6: { q: "کیا ٹرائل سیشن ہے؟", a: "جی ہاں، ہم پہلا سیشن مفت فراہم کرتے ہیں۔" }, q7: { q: "اگر میں بالکل شروع سے سیکھنا چاہوں؟", a: "ہمارے اساتذہ صفر سے روانی تک سکھانے کے اہل ہیں۔" }, q8: { q: "کیا سرٹیفیکیٹ دیا جاتا ہے؟", a: "جی ہاں، منزل مکمل کرنے پر سرٹیفیکیٹ دیا جاتا ہے۔" } },
    register: { label: "رجسٹریشن کریں", title1: "آئیں", title2: "رابطہ کریں", description: "فارم بھریں اور ہم ٹرائل سیشن کے لیے واٹس ایپ پر رابطہ کریں گے۔", formTitle: "رجسٹریشن فارم", fullName: "مکمل نام", fullNamePlaceholder: "نام لکھیں...", age: "عمر", agePlaceholder: "مثلاً: 25", teacher: "استانی", teacherPlaceholder: "منتخب کریں...", juz: "کتنے پارے حفظ ہیں؟", juzStart: "صفر سے شروع", juzOne: "1 پارہ", juzTwo: "2 پارے", juzMultiple: "پارے", whatsapp: "واٹس ایپ نمبر", whatsappTitle: "صرف نمبر درج کریں", notes: "تفصیلات", notesPlaceholder: "وقت کی ترجیحات...", submit: "ڈیٹا بھیجیں", successTitle: "شکریہ", successDesc: "موصول ہوا", successMessage: "ہم واٹس ایپ پر تفصیلات بھیجیں گے۔", error: "معذرت، کوئی غلطی ہوئی ہے۔" },
    privacy: {
      title: "رازداری کی پالیسی",
      description: "ہم آپ کی رازداری کے تحفظ کے لیے پرعزم ہیں۔",
      sections: [
        { title: "معلومات کا حصول", content: "ہم نام اور واٹس ایپ نمبر صرف کلاسز کے لیے جمع کرتے ہیں۔" },
        { title: "معلومات کا استعمال", content: "رابطے اور زوم لنکس کے لیے استعمال ہوتا ہے۔" },
        { title: "معلومات کا تحفظ", content: "ہم معلومات کسی تیسرے فریق کو نہیں دیتے۔" },
        { title: "آپ کے حقوق", content: "آپ کسی بھی وقت اپنی معلومات حذف کروا سکتے ہیں۔" }
      ],
      close: "بند کریں"
    },
    footer: { desc: "ہم قرآن کریم کے سفر میں آپ کے ساتھی ہیں۔", contact: "رابطہ کریں", rights: "جملہ حقوق محفوظ ہیں۔", privacy: "رازداری" }
  }
};
