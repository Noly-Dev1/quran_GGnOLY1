
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
  footer: {
    desc: string;
    contact: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  ar: {
    nav: { about: "عن الخدمة", schedule: "المواعيد", pricing: "الأسعار", faq: "الأسئلة الشائعة", register: "سجّلي الآن" },
    hero: { label: "خدمة تعليم القرآن الكريم أونلاين", title1: "نـورٌ فـي", title2: "بيتكِ", description: "تعليم النساء عبر Zoom. تواصل مباشر، مراجعة دقيقة وإتقان للتجويد.", cta: "سجّلي الآن", dailyMessage: "رسالة اليوم", dailyQuote: "\"خيركم من تعلم القرآن وعلمه\"" },
    features: { label: "من نحن", title: "لماذا تختارين منصتنا؟", individual: { title: "تعليم فردي", desc: "حصص خاصة لضمان أعلى مستويات التركيز والمتابعة الصحيحة." }, curriculum: { title: "منهج متكامل", desc: "يشمل حفظ القرآن، مراجعته، وتعليم أحكام التجويد بأسلوب سهل ومبسط." }, timing: { title: "مرونة المواعيد", desc: "خيارات متعددة للمواعيد صباحية ومسائية لتناسب مختلف الالتزامات." }, special: { title: "فئة خاصة", desc: "نهتم بتعليم النساء بأسلوب مشجع ومحبب يراعي مستوياتهن المختلفة." } },
    schedule: { label: "جدول المواعيد", title: "اختاري ما يناسبكِ", note: "* جميع المواعيد المذكورة أعلاه هي حسب توقيت مكة المكرمة." },
    pricing: { label: "باقات الاشتراك", individual: { title: "تعليم فردي", price: "$25", period: "شهرياً", desc: "حصة خاصة لضمان أعلى مستويات التركيز والمتابعة." }, group: { title: "تعليم جماعي", price: "$15", period: "شهرياً", desc: "دراسة ضمن مجموعات صغيرة تشجيعاً على الحفظ." }, features: ["تسميع القرآن الكريم بانتظام", "مراجعة دورية للمحفوظ", "تعليم أحكام التجويد", "حصص مباشرة عبر Zoom", "متابعة شخصية مستمرة", "شهادة إنجاز معتمدة"], cta: "ابدئي رحلتكِ اليوم" },
    faq: { label: "الأسئلة الشائعة", title: "ماذا يتبادر لذهنكِ؟", q1: { q: "هل الحصص تكون جماعية أم فردية؟", a: "الحصص جماعية، كما أننا نوفر خيار الحصص الفردية لضمان أقصى فائدة وتركيز مع الطالبة." }, q2: { q: "هل التدريس متاح لجميع الأعمار؟", a: "خدمتنا مخصصة للنساء فقط من جميع الأعمار." }, q3: { q: "كيف يتم دفع الرسوم الشهرية؟", a: "نوفر طرق دفع سهلة وآمنة (مثل التحويل البنكي)، ويتم الدفع في بداية كل شهر لضمان استمرارية الحصص." }, q4: { q: "ماذا أحتاج للبدء في الدروس؟", a: "تحتاجين فقط إلى جهاز (كمبيوتر أو هاتف) مثبت عليه برنامج Zoom، واتصال جيد بالإنترنت والمصحف الخاص بكِ." }, q5: { q: "كيف يتم التواصل بعد إرسال البيانات؟", a: "سيصلنا طلبكِ فوراً عبر قاعدة البيانات، وسيقوم فريق العمل بالتواصل معكِ عبر الواتساب خلال 24-48 ساعة لتأكيد موعد التجربة أو البدء." }, q6: { q: "هل توجد حلقات تجريبية مجانية؟", a: "نعم، نؤمن بأن الطالبة يجب أن تشعر بالارتياح مع المعلمة أولاً، لذا نوفر أول حصة للقاء والتعارف وتقييم المستوى مجاناً." }, q7: { q: "ماذا لو كنتُ في مستوى 'مبتدئ جداً' (أحتاج للقاعدة النورانية)؟", a: "معلماتنا مؤهلات لتعليم المبتدئات من الصفر، نبدأ معكِ من مخارج الحروف والقاعدة النورانية حتى تصلي لطلاقة القراءة والحفظ." }, q8: { q: "هل يتم منح إجازات أو شهادات؟", a: "نعم، نوفر للطالبات اللواتي يختمن أجزاءً أو القرآن كاملاً شهادات تكريمية، كما يوجد مسار خاص للإجازات بالسند المتصل للنبي ﷺ مع المعلمات المجازات." } },
    register: { label: "سجّلي الآن", title1: "دعينا نبدأ", title2: "بالتواصل", description: "املئي النموذج وسنقوم بالتواصل معكِ عبر الواتساب لتحديد موعد الحصة التجرِيبية المجانية والاتفاق على جدول الحصص.", formTitle: "استمارة البيانات", fullName: "الاسم الكامل", fullNamePlaceholder: "اكتبي اسمكِ هنا...", age: "العمر", agePlaceholder: "مثلاً: 25", teacher: "اختيار المعلمة", teacherPlaceholder: "إختيار المعلمة...", juz: "كم جزء محفوظ؟", juzStart: "البدء من الصفر", juzOne: "جزء واحد", juzTwo: "جزئين", juzMultiple: "أجزاء", whatsapp: "رقم الواتساب", whatsappTitle: "يرجى إدخال أرقام فقط", notes: "ملاحظات إضافية", notesPlaceholder: "ملاحظات إضافية أو تفضيلات المواعيد...", submit: "إرسال البيانات", successTitle: "شكراً لكِ", successDesc: "تم استلام طلبكِ بنجاح", successMessage: "سوف نرسل لكِ تفاصيل الحصة التجرِيبية عبر الواتساب.", error: "عذراً، حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى." },
    footer: { desc: "نحن هنا لنكون رفيقكِ في رحلتكِ مع القرآن الكريم، نوفر لكِ البيئة المناسبة والمعلمات المؤهلات لتحقيق حلمكِ في الحفظ والإتقان.", contact: "تواصل معنا", rights: "جميع الحقوق محفوظة." }
  },
  en: {
    nav: { about: "About", schedule: "Schedule", pricing: "Pricing", faq: "FAQ", register: "Register Now" },
    hero: { label: "Online Quran Education Service", title1: "Light in", title2: "Your Home", description: "Teaching women via Zoom. Direct communication, careful review, and mastery of Tajweed.", cta: "Register Now", dailyMessage: "Message of the Day", dailyQuote: "\"The best of you is the one who learns the Quran and teaches it.\"" },
    features: { label: "About Us", title: "Why Choose Our Platform?", individual: { title: "Individual Education", desc: "Private sessions to ensure the highest levels of focus and individual progress." }, curriculum: { title: "Comprehensive Curriculum", desc: "Includes Quran memorization, revision, and Tajweed rules in a simple way." }, timing: { title: "Flexible Schedule", desc: "Multiple morning and evening options to fit different commitments." }, special: { title: "Special Category", desc: "We focus on teaching women in an encouraging environment for all levels." } },
    schedule: { label: "Schedule", title: "Choose What Suits You", note: "* All mentioned times are according to Makkah time." },
    pricing: { label: "Subscription Plans", individual: { title: "Individual", price: "$25", period: "Monthly", desc: "Private session for maximum concentration and tracking." }, group: { title: "Group", price: "$15", period: "Monthly", desc: "Small groups to encourage shared memorization." }, features: ["Regular Quran recitation", "Periodic revision of memorized parts", "Tajweed rule teaching", "Live Zoom sessions", "Constant personal follow-up", "Certified completion certificate"], cta: "Start Your Journey Today" },
    faq: { label: "FAQ", title: "Common Questions", q1: { q: "Are sessions group or individual?", a: "We offer both group and individual options to ensure maximum benefit and focus for the student." }, q2: { q: "Is teaching available for all ages?", a: "Our service is dedicated to women of all ages." }, q3: { q: "How are monthly fees paid?", a: "We provide easy and secure payment methods (such as bank transfer), paid at the beginning of each month." }, q4: { q: "What do I need to start?", a: "You only need a device (computer or phone) with Zoom installed, a good internet connection, and your Mus-haf." }, q5: { q: "How are we contacted after registration?", a: "We receive your request instantly. Our team will contact you via WhatsApp within 24-48 hours to confirm your trial." }, q6: { q: "Are there free trial sessions?", a: "Yes, we offer a free introductory session for assessment and to ensure you are comfortable with the teacher." }, q7: { q: "What if I am a absolute beginner?", a: "Our teachers are qualified to teach from scratch, starting with Noorania to achieve fluent reading." }, q8: { q: "Are certificates or Ijazas granted?", a: "Yes, we provide certificates for completed parts, and there is a path for Ijaza with teachers for the full Quran ختم." } },
    register: { label: "Register Now", title1: "Let's Start", title2: "Connecting", description: "Fill out the form and we will contact you via WhatsApp to schedule your free trial session.", formTitle: "Registration Form", fullName: "Full Name", fullNamePlaceholder: "Write your name here...", age: "Age", agePlaceholder: "Example: 25", teacher: "Select Teacher", teacherPlaceholder: "Select Teacher...", juz: "Juz Memorized?", juzStart: "Starting from scratch", juzOne: "1 Juz", juzTwo: "2 Juz", juzMultiple: "Juz", whatsapp: "WhatsApp Number", whatsappTitle: "Please enter digits only", notes: "Additional Notes", notesPlaceholder: "Additional notes or timing preferences...", submit: "Submit Data", successTitle: "Thank You", successDesc: "Received Successfully", successMessage: "We will send trial details via WhatsApp.", error: "Sorry, an error occurred. Please try again." },
    footer: { desc: "We are here to be your companion in your journey with the Holy Quran, providing the right environment for mastery.", contact: "Contact Us", rights: "All rights reserved." }
  },
  fr: {
    nav: { about: "À propos", schedule: "Horaires", pricing: "Tarifs", faq: "FAQ", register: "S'inscrire" },
    hero: { label: "Service d'éducation Coranique en ligne", title1: "Une lumière dans", title2: "Votre foyer", description: "Enseignement pour femmes via Zoom. Communication directe, révision minutieuse et maîtrise du Tajwid.", cta: "S'inscrire", dailyMessage: "Message du jour", dailyQuote: "\"Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne.\"" },
    features: { label: "À propos de nous", title: "Pourquoi choisir notre plateforme ?", individual: { title: "Éducation individuelle", desc: "Sessions privées pour assurer les plus hauts niveaux de concentration et de progrès." }, curriculum: { title: "Programme complet", desc: "Comprend la mémorisation du Coran, la révision et les règles du Tajwid de manière simple." }, timing: { title: "Horaires flexibles", desc: "Plusieurs options matin et soir pour s'adapter à différents engagements." }, special: { title: "Catégorie spéciale", desc: "Nous nous concentrons sur l'enseignement aux femmes dans un environnement encourageant." } },
    schedule: { label: "Horaires", title: "Choisissez ce qui vous convient", note: "* Tous les horaires mentionnés sont basés sur l'heure de La Mecque." },
    pricing: { label: "Forfaits d'abonnement", individual: { title: "Individuel", price: "25$", period: "Mensuel", desc: "Session privée pour une concentration et un suivi optimaux." }, group: { title: "Groupe", price: "15$", period: "Mensuel", desc: "Petits groupes pour encourager la mémorisation partagée." }, features: ["Récitation régulière du Coran", "Révision périodique des parties mémorisées", "Enseignement des règles du Tajwid", "Sessions Zoom en direct", "Suivi personnel constant", "Certificat de réussite certifié"], cta: "Commencez votre voyage aujourd'hui" },
    faq: { label: "FAQ", title: "Questions fréquentes", q1: { q: "Les sessions sont-elles collectives ou individuelles ?", a: "Nous proposons des options collectives et individuelles pour assurer un bénéfice maximal." }, q2: { q: "L'enseignement est-il disponible pour tous les âges ?", a: "Notre service est dédié aux femmes de tous âges." }, q3: { q: "Comment les frais mensuels sont-ils payés ?", a: "Nous proposons des méthodes de paiement sécurisées (virement bancaire), payées au début de chaque mois." }, q4: { q: "De quoi ai-je besoin pour commencer ?", a: "Un appareil avec Zoom, une bonne connexion internet et votre Mous-haf." }, q5: { q: "Comment sommes-nous contactés après l'inscription ?", a: "Nous recevons votre demande instantanément. Notre équipe vous contactera via WhatsApp sous 24-48h." }, q6: { q: "Y a-t-il des séances d'essai gratuites ?", a: "Oui, nous offrons une séance d'introduction gratuite pour l'évaluation." }, q7: { q: "Et si je suis débutante absolue ?", a: "Nos enseignants sont qualifiés pour enseigner à partir de zéro, en commençant par la Noorania." }, q8: { q: "Des certificats sont-ils délivrés ?", a: "Oui, nous fournissons des certificats pour les parties achevées." } },
    register: { label: "S'inscrire", title1: "Commençons", title2: "À échanger", description: "Remplissez le formulaire et nous vous contacterons via WhatsApp pour planifier votre essai gratuit.", formTitle: "Formulaire d'inscription", fullName: "Nom complet", fullNamePlaceholder: "Écrivez votre nom ici...", age: "Âge", agePlaceholder: "Exemple : 25", teacher: "Choisir l'enseignante", teacherPlaceholder: "Choisir...", juz: "Juz mémorisés ?", juzStart: "Partir de zéro", juzOne: "1 Juz", juzTwo: "2 Juz", juzMultiple: "Juz", whatsapp: "Numéro WhatsApp", whatsappTitle: "Chiffres uniquement svp", notes: "Notes additionnelles", notesPlaceholder: "Notes ou préférences d'horaire...", submit: "Envoyer", successTitle: "Merci", successDesc: "Reçu avec succès", successMessage: "Nous enverrons les détails de l'essai par WhatsApp.", error: "Désolé, une erreur s'est produite. Veuillez réessayer." },
    footer: { desc: "Accompagnateur dans votre voyage avec le Saint Coran, offrant l'environnement idéal pour la maîtrise.", contact: "Contact", rights: "Tous droits réservés." }
  },
  tr: {
    nav: { about: "Hakkımızda", schedule: "Program", pricing: "Fiyatlandırma", faq: "SSS", register: "Şimdi Kaydol" },
    hero: { label: "Çevrimiçi Kuran Eğitim Hizmeti", title1: "Evinizde Bir", title2: "Işık", description: "Zoom üzerinden kadınlara eğitim. Doğrudan iletişim, dikkatli inceleme ve Tecvid ustalığı.", cta: "Şimdi Kaydol", dailyMessage: "Günün Mesajı", dailyQuote: "\"Sizin en hayırlınız Kuran'ı öğrenen ve öğreteninizdir.\"" },
    features: { label: "Hakkımızda", title: "Neden Platformumuzu Seçmelisiniz?", individual: { title: "Bireysel Eğitim", desc: "En yüksek odaklanma ve bireysel gelişim seviyelerini sağlamak için özel dersler." }, curriculum: { title: "Kapsamlı Müfredat", desc: "Kuran ezberi, tekrarı ve Tecvid kurallarını basit bir şekilde içerir." }, timing: { title: "Esnek Program", desc: "Farklı taahhütlere uyması için sabah ve akşam seçenekleri." }, special: { title: "Özel Kategori", desc: "Tüm seviyeler için teşvik edici bir ortamda kadınlara eğitim vermeye odaklanıyoruz." } },
    schedule: { label: "Program", title: "Size Uygun Olanı Seçin", note: "* Belirtilen tüm saatler Mekke saatine göredir." },
    pricing: { label: "Abonelik Planları", individual: { title: "Bireysel", price: "25$", period: "Aylık", desc: "Maksimum konsantrasyon ve takip için özel ders." }, group: { title: "Grup", price: "15$", period: "Aylık", desc: "Paylaşımlı ezberi teşvik etmek için küçük gruplar." }, features: ["Düzenli Kuran okuma", "Ezberlenen kısımların periyodik tekrarı", "Tecvid kuralı öğretimi", "Canlı Zoom oturumları", "Sürekli kişisel takip", "Sertifikalı tamamlama belgesi"], cta: "Yolculuğunuza Bugün Başlayın" },
    faq: { label: "SSS", title: "Sıkça Sorulan Sorular", q1: { q: "Dersler grup mu yoksa bireysel mi?", a: "Öğrenci için maksimum fayda ve odaklanmayı sağlamak için hem grup hem de bireysel seçenekler sunuyoruz." }, q2: { q: "Eğitim her yaş için uygun mu?", a: "Hizmetimiz her yaştan kadına özeldir." }, q3: { q: "Aylık ücretler nasıl ödenir?", a: "Kolay ve güvenli ödeme yöntemleri sunuyoruz (örneğin banka havalesi)." }, q4: { q: "Başlamak için neye ihtiyacım var?", a: "Zoom yüklü bir cihaz, iyi bir internet bağlantısı ve Mushaf'ınız yeterli." }, q5: { q: "Kayıttan sonra nasıl iletişime geçilir?", a: "İsteğinizi anında alıyoruz. Ekibimiz 24-48 saat içinde WhatsApp üzerinden sizinle iletişime geçecektir." }, q6: { q: "Ücretsiz deneme dersleri var mı?", a: "Evet, değerlendirme ve öğretmene alışmanız için ücretsiz bir tanışma dersi sunuyoruz." }, q7: { q: "Ya tamamen yeni başlıyorsam?", a: "Öğretmenlerimiz, akıcı okumaya ulaşmak için Nuraniye'den başlayarak sıfırdan öğretmeye yetkindir." }, q8: { q: "Sertifika veriliyor mu?", a: "Evet, tamamlanan kısımlar için sertifika sağlıyoruz." } },
    register: { label: "Şimdi Kaydol", title1: "Hadi", title2: "Başlayalım", description: "Formu doldurun, ücretsiz deneme dersinizi planlamak için sizinle WhatsApp üzerinden iletişime geçelim.", formTitle: "Kayıt Formu", fullName: "Ad Soyad", fullNamePlaceholder: "Adınızı buraya yazın...", age: "Yaş", agePlaceholder: "Örnek: 25", teacher: "Öğretmen Seçin", teacherPlaceholder: "Öğretmen Seçin...", juz: "Kaç Cüz Ezberlediniz?", juzStart: "Sıfırdan başla", juzOne: "1 Cüz", juzTwo: "2 Cüz", juzMultiple: "Cüz", whatsapp: "WhatsApp Numarası", whatsappTitle: "Lütfen sadece rakam girin", notes: "Ek Notlar", notesPlaceholder: "Ek notlar veya zaman tercihleri...", submit: "Verileri Gönder", successTitle: "Teşekkürler", successDesc: "Başarıyla Alındı", successMessage: "WhatsApp üzerinden detayları göndereceğiz.", error: "Bir hata oluştu. Lütfen tekrar deneyin." },
    footer: { desc: "Kuran-ı Kerim yolculuğunuzda yoldaşınız olmak, ustalık için doğru ortamı sağlamak için buradayız.", contact: "İletişim", rights: "Tüm hakları saklıdır." }
  },
  id: {
    nav: { about: "Tentang", schedule: "Jadwal", pricing: "Harga", faq: "FAQ", register: "Daftar Sekarang" },
    hero: { label: "Layanan Pendidikan Al-Quran Online", title1: "Cahaya di", title2: "Rumahmu", description: "Mengajar wanita via Zoom. Komunikasi langsung, ulasan teliti, dan penguasaan Tajwid.", cta: "Daftar Sekarang", dailyMessage: "Pesan Hari Ini", dailyQuote: "\"Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya.\"" },
    features: { label: "Tentang Kami", title: "Mengapa Memilih Platform Kami?", individual: { title: "Pendidikan Individu", desc: "Sesi privat untuk memastikan tingkat fokus tertinggi dan kemajuan individu." }, curriculum: { title: "Kurikulum Komprehensif", desc: "Mencakup hafalan Al-Quran, murajaah, dan hukum Tajwid dengan cara sederhana." }, timing: { title: "Jadwal Fleksibel", desc: "Beberapa pilihan pagi dan sore untuk menyesuaikan berbagai komitmen." }, special: { title: "Kategori Khusus", desc: "Fokus pada pengajaran wanita dalam lingkungan yang mendukung untuk semua tingkatan." } },
    schedule: { label: "Jadwal", title: "Pilih yang Sesuai", note: "* Semua waktu yang disebutkan adalah berdasarkan waktu Makkah." },
    pricing: { label: "Paket Langganan", individual: { title: "Individu", price: "$25", period: "Bulanan", desc: "Sesi privat untuk konsentrasi dan pelacakan maksimal." }, group: { title: "Grup", price: "$15", period: "Bulanan", desc: "Kelompok kecil untuk mendorong hafalan bersama." }, features: ["Setoran hafalan rutin", "Murajaah berkala", "Pelajaran hukum Tajwid", "Sesi Zoom langsung", "Tindak lanjut pribadi terus-menerus", "Sertifikat penyelesaian resmi"], cta: "Mulai Perjalananmu Hari Ini" },
    faq: { label: "FAQ", title: "Pertanyaan Umum", q1: { q: "Apakah sesi grup atau individu?", a: "Kami menawarkan opsi grup dan individu untuk memastikan manfaat maksimal bagi siswa." }, q2: { q: "Apakah pengajaran tersedia untuk semua usia?", a: "Layanan kami dikhususkan untuk wanita dari segala usia." }, q3: { q: "Bagaimana pembayaran biaya bulanan?", a: "Kami menyediakan metode pembayaran mudah (seperti transfer bank)." }, q4: { q: "Apa yang saya butuhkan untuk memulai?", a: "Hanya perangkat dengan Zoom, koneksi internet, dan Mushaf Anda." }, q5: { q: "Bagaimana kami dihubungi setelah pendaftaran?", a: "Tim kami akan menghubungi Anda via WhatsApp dalam 24-48 jam untuk konfirmasi." }, q6: { q: "Apakah ada sesi uji coba gratis?", a: "Ya, kami menawarkan sesi perkenalan gratis untuk penilaian." }, q7: { q: "Bagaimana jika saya benar-benar pemula?", a: "Guru kami berkualifikasi untuk mengajar dari nol, mulai dari Noorania." }, q8: { q: "Apakah diberikan sertifikat?", a: "Ya, kami menyediakan sertifikat untuk bagian yang telah diselesaikan." } },
    register: { label: "Daftar Sekarang", title1: "Ayo", title2: "Terhubung", description: "Isi formulir dan kami akan menghubungi Anda via WhatsApp untuk jadwal sesi uji coba gratis.", formTitle: "Formulir Pendaftaran", fullName: "Nama Lengkap", fullNamePlaceholder: "Tulis nama Anda di sini...", age: "Usia", agePlaceholder: "Contoh: 25", teacher: "Pilih Guru", teacherPlaceholder: "Pilih Guru...", juz: "Juz yang Dihafal?", juzStart: "Mulai dari nol", juzOne: "1 Juz", juzTwo: "2 Juz", juzMultiple: "Juz", whatsapp: "Nomor WhatsApp", whatsappTitle: "Harap masukkan angka saja", notes: "Catatan Tambahan", notesPlaceholder: "Catatan tambahan atau preferensi waktu...", submit: "Kirim Data", successTitle: "Terima Kasih", successDesc: "Berhasil Diterima", successMessage: "Kami akan mengirim detail uji coba via WhatsApp.", error: "Maaf, terjadi kesalahan. Silakan coba lagi." },
    footer: { desc: "Kami di sini untuk menjadi pendamping dalam perjalanan Anda dengan Al-Quran Nur Karim.", contact: "Hubungi Kami", rights: "Seluruh hak cipta dilindungi." }
  },
  ur: {
    nav: { about: "سروس کے بارے میں", schedule: "اوقات", pricing: "قیمتیں", faq: "عام سوالات", register: "رجسٹریشن کریں" },
    hero: { label: "آن لائن قرآن تعلیم سروس", title1: "آپ کے گھر میں", title2: "ایک نور", description: "زوم کے ذریعے خواتین کی تعلیم۔ براہ راست رابطہ، باریک بینی سے جائزہ اور تجوید میں مہارت۔", cta: "رجسٹریشن کریں", dailyMessage: "آج کا پیغام", dailyQuote: "\"تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔\"" },
    features: { label: "ہمارے بارے میں", title: "ہمارے پلیٹ فارم کا انتخاب کیوں کریں؟", individual: { title: "انفرادی تعلیم", desc: "اعلیٰ درجے کی توجہ اور انفرادی ترقی کو یقینی بنانے کے لیے پرائیویٹ سیشنز۔" }, curriculum: { title: "جامع نصاب", desc: "قرآن کا حفظ، اس کی دہرائی اور تجوید کے قواعد کی آسان طریقے سے تعلیم۔" }, timing: { title: "اوقات میں لچک", desc: "مختلف مصروفیات کے مطابق صبح اور شام کے متعدد اوقات۔" }, special: { title: "خواتین کے لیے", desc: "خواتین کو ایک حوصلہ افزا ماحول میں قرآن سکھانے پر توجہ۔" } },
    schedule: { label: "اوقات", title: "اپنے لیے مناسب وقت کا انتخاب کریں", note: "* درج بالا تمام اوقات مکہ مکرمہ کے وقت کے مطابق ہیں۔" },
    pricing: { label: "سبسکرپشن پلانز", individual: { title: "انفرادی", price: "$25", period: "ماہانہ", desc: "اعلیٰ توجہ اور نگرانی کے لیے پرائیویٹ سیشن۔" }, group: { title: "اجتماعی", price: "$15", period: "ماہانہ", desc: "حفظ کی حوصلہ افزائی کے لیے چھوٹے گروپس میں تعلیم۔" }, features: ["باقاعدگی سے قرآن کی منزل سنانا", "حفظ کی وقفے وقفے سے دہرائی", "تجوید کے قواعد کی تعلیم", "زوم پر لائیو سیشنز", "مسلسل ذاتی نگرانی", "سرٹیفیکیٹ کا حصول"], cta: "آج سے اپنا سفر شروع کریں" },
    faq: { label: "عام سوالات", title: "آپ کے ذہن میں کیا ہے؟", q1: { q: "کلاسز گروپ میں ہوں گی یا انفرادی؟", a: "ہم گروپ اور انفرادی دونوں طرح کی کلاسز فراہم کرتے ہیں۔" }, q2: { q: "کیا تعلیم تمام عمر کی خواتین کے لیے دستیاب ہے؟", a: "ہماری سروس ہر عمر کی خواتین کے لیے وقف ہے۔" }, q3: { q: "ماہانہ فیس کی ادائیگی کیسے ہوگی؟", a: "ہم بینک ٹرانسفر جیسے آسان اور محفوظ طریقے فراہم کرتے ہیں۔" }, q4: { q: "شروع کرنے کے لیے مجھے کیا چاہیے؟", a: "آپ کو صرف زوم، اچھا انٹرنیٹ اور اپنے مصحف کی ضرورت ہے۔" }, q5: { q: "رجسٹریشن کے بعد رابطہ کیسے ہوگا؟", a: "ہمیں آپ کی درخواست فوراً مل جاتی ہے، ہماری ٹیم 24-48 گھنٹوں میں آپ سے رابطہ کرے گی۔" }, q6: { q: "کیا مفت ٹرائل سیشن دستیاب ہے؟", a: "جی ہاں، ہم طالبہ کی تسلی کے لیے پہلا سیشن مفت فراہم کرتے ہیں۔" }, q7: { q: "اگر میں بالکل شروع سے سیکھنا چاہوں تو؟", a: "ہمارے اساتذہ قاعدہ نورانیہ سے شروع کر کے روانی سے پڑھنا سکھانے کے اہل ہیں۔" }, q8: { q: "کیا سرٹیفیکیٹ دیا جاتا ہے؟", a: "جی ہاں، منزل مکمل کرنے پر سرٹیفیکیٹ دیا جاتا ہے۔" } },
    register: { label: "رجسٹریشن کریں", title1: "آئیں", title2: "رابطہ کریں", description: "فارم بھریں اور ہم آپ سے ٹرائل سیشن کے لیے واٹس ایپ پر رابطہ کریں گے۔", formTitle: "رجسٹریشن فارم", fullName: "مکمل نام", fullNamePlaceholder: "اپنا نام یہاں لکھیں...", age: "عمر", agePlaceholder: "مثال کے طور پر: 25", teacher: "استانی کا انتخاب", teacherPlaceholder: "استانی منتخب کریں...", juz: "کتنے پارے حفظ ہیں؟", juzStart: "صفر سے شروع", juzOne: "1 پارہ", juzTwo: "2 پارے", juzMultiple: "پارے", whatsapp: "واٹس ایپ نمبر", whatsappTitle: "براہ کرم صرف نمبر درج کریں", notes: "مزید تفصیلات", notesPlaceholder: "مزید تفصیلات یا وقت کی ترجیحات...", submit: "ڈیٹا بھیجیں", successTitle: "شکریہ", successDesc: "کامیابی سے موصول ہوا", successMessage: "ہم ٹرائل سیشن کی تفصیلات بھیجیں گے۔", error: "معذرت، کوئی غلطی ہوئی ہے۔ دوبارہ کوشش کریں۔" },
    footer: { desc: "ہم قرآن کریم کے سفر میں آپ کے ساتھی بننے کے لیے تیار ہیں۔", contact: "رابطہ کریں", rights: "جملہ حقوق محفوظ ہیں۔" }
  }
};
