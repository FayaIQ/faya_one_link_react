// —————————— بيانات الخدمات ——————————

/* File: app/LandingPage.jsx */
'use client';

import localFont from 'next/font/local';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Code,
  Smartphone,
  Calculator,
  Mail,
  Settings,
  Cloud,
  Utensils,
  Megaphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import {
  FaShoppingCart,
  FaCode,
  FaMobileAlt,
  FaCalculator,
  FaEnvelope,
  FaCogs,
  FaCloud,
  FaUtensils,
  FaBullhorn
} from 'react-icons/fa';


/* --------------------  الخطوط -------------------- */
const shamel = localFont({
  src: [
    { path: './fonts/FFShamelFamily-SansOneBook.ttf',  weight: '400', style: 'normal' },
    { path: './fonts/FFShamelFamily-SansOneBold.ttf',  weight: '700', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-shamel'
});

/* --------------------  البيانات -------------------- */
const services = [
  { id: 1, title: 'تصميم المتاجر الإلكترونية', icon: FaShoppingCart, badge: null },
  { id: 2, title: 'برمجة مواقع الويب',        icon: FaCode,        badge: null },
  { id: 3, title: 'برمجة تطبيقات الموبايل',     icon: FaMobileAlt,   badge: null },
  { id: 4, title: 'الأنظمة المالية',            icon: FaCalculator,  badge: null },
  { id: 5, title: 'البريد الإلكتروني المخصص',   icon: FaEnvelope,    badge: 'مجاني' },
  { id: 6, title: 'حلول برمجية مخصصة',          icon: FaCogs,        badge: null },
  { id: 7, title: 'تطبيقات الإنترنت',           icon: FaCloud,       badge: null },
  { id: 8, title: 'المنيو الإلكتروني للمطاعم',  icon: FaUtensils,    badge: 'خصم 50%' },
  { id: 9, title: 'التسويق الإلكتروني',          icon: FaBullhorn,    badge: null }
];
// —————————— بيانات المنتجات ——————————
const products = [
  { id: 1, title: "Faya ERP",     desc: " Faya ERP منصة متكاملة تدير المتاجر إلكترونيًّا، تجمع المنتجات والمخزون والطلبات والعملاء والدفع والتوصيل في لوحة مرنة قابلة للتخصيص، مع تقارير ذكية لحظية وبيانات تعزّز المبيعات",    img: "/images/faya-erp.png",     link: "https://erp.faya.dev/" },
  { id: 2, title: "Faya E-Menu",  desc: "المنيو الإلكتروني من Faya هو واجهة رقمية تفاعلية ومتعددة اللغات تُمكّن الزبائن من تصفّح الأطباق بصور وأسعار محدثة بتصميم مُخصص يعكس هوية المطعم ويعزز تجربة الطلب", img: "/images/faya-menu.png",    link: "https://emenu.faya.dev/" },
  { id: 3, title: "Faya Press",   desc: "نظام مواقع تعريفية من Faya يتيح لأصحاب المشاريع عرض معلوماتهم بخطة تصميم فريدة متوافقة مع هوية العلامة، يشمل الأقسام الأساسية، ويقدّم واجهة مرنة ومتجاوبة لجميع الأجهزة",   img: "/images/faya-press.png",   link: "https://press.faya.dev/" },
  { id: 4, title: "Faya Staff",   desc: "Faya Staff نظام متكامل لإدارة شؤون الموظفين يوفر تتبعًا دقيقًا لساعات العمل وتسجيل الدخول والخروج، ومراقبة النشاط عبر لقطات شاشة دورية مع تقارير تحليلية شاملة لتعزيز الشفافية والكفاءة في بيئة العمل", img: "/images/faya-staff.png",   link: "https://teams.faya.dev/" },
  { id: 5, title: "Faya CRM",     desc: "Faya CRM منصة شاملة لتنظيم بيانات العملاء وتتبع المبيعات وإطلاق حملات تسويقية مخصصة لكل موظف، مع أدوات تحليلية وتقارير دقيقة لدعم اتخاذ قرارات تسويقية مستنيرة",   img: "/images/faya-CRM.png",     link: "https://teams.faya.dev/#/FayaCRM" },
  { id: 6, title: "Faya OneLink", desc: "onelink من Faya أداة ذكية تجمع جميع روابط وخدمات الشركة في صفحة رقمية شخصية موحدة ببصمة العلامة، مريحة وسريعة للعرض في ملفات التواصل والوصول المباشر للعملاء",   img: "/images/faya-Onelink.png", link: "https://teams.faya.dev/#/FayaOneLink" },
  { id: 7, title: "Faya Survey",  desc: "نظام الاستبيانات من Faya يُنشئ نماذج تفاعلية تدعم QR سهل الوصول، يجمع ردود العملاء والموظفين بدقّة، ويقدّم تقارير تحليلية فورية وتصدير PDF موثوق فعّال لتعزيز التطوير",   img: "/images/faya-Survey.png",  link: "https://teams.faya.dev/#/fayaSurvey" },
  { id: 8, title: "Faya RX",      desc: "Faya RX منصة رقمية متطورة للأطباء والعيادات لإدارة الوصفات الطبية ومتابعة المرضى وتنظيم المواعيد عبر نسختين مخصصتين للطبيب والسكرتير، مع تعزيز التواصل وكفاءة العمليات",   img: "/images/faya-RX.png",      link: "https://rx.faya.dev/" },
  { id: 9, title: "Faya Agents",      desc: "Faya RX نظام رقمي متطور للأطباء والعيادات لإدارة الوصفات الطبية ومتابعة المرضى وتنظيم المواعيد عبر نسختين مخصصتين للطبيب والسكرتير، مع تعزيز التواصل وكفاءة العمليات",   img: "/images/faya-Agents.png",      link: "https://agents.faya.dev/" }
];
const gradients = [
  'from-blue-400/20  to-blue-600/30',
  'from-emerald-400/20 to-emerald-600/30',
  'from-purple-400/20 to-purple-600/30',
  'from-amber-400/20  to-amber-600/30',
  'from-pink-400/20   to-pink-600/30',
  'from-indigo-400/20 to-indigo-600/30',
  'from-red-400/20    to-red-600/30',
  'from-teal-400/20   to-teal-600/30',
  'from-slate-400/20  to-slate-600/30'
];

const sliderImages = ['/sliderimges/slide1.jpg', '/sliderimges/slide2.jpg' , ];

/* --------------------  السلايدر -------------------- */
/**
 * سلايدر زجاجي جميل ⚡️
 * @param {string[]}  images  مصفوفة مسارات الصور
 * @param {boolean}   autoPlay (اختياري) تفعيل التشغيل التلقائي
 * @param {number}    delay    (اختياري) مدّة التأخير بالمللي ثانية
 */
function CustomSlider({ images = [], autoPlay = true, delay = 4000 }) {
  const [current, setCurrent] = useState(0);

  /* تدوير الشرائح تلقائياً */
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % images.length), delay);
    return () => clearInterval(id);
  }, [images.length, autoPlay, delay]);

  return (
    <div
      className="
        relative isolate w-full h-56 sm:h-72 md:h-96 lg:h-[28rem]
        overflow-hidden rounded-3xl
        shadow-xl ring-1 ring-black/10              /* إطار لطيف */
        bg-white/5 backdrop-blur-md                 /* تأثير Glassmorphism */
      "
    >
      {/* الشرائح */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          loading="lazy"
          alt={`Slide ${i + 1}`}
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-all duration-700 ease-in-out         /* تلاشي + تكبير */
            ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
          `}
        />
      ))}

      {/* هالة غامقة خفيفة لإبراز النص إن وُجِد */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/20" />

      {/* الأسهم */}
      <button
        aria-label="السابق"
        onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
        className="
          absolute top-1/2 left-3 sm:left-5 -translate-y-1/2
          grid place-items-center p-2 sm:p-3 rounded-full
          bg-white/60 hover:bg-white/80 backdrop-blur-md
          shadow-md transition
        "
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <button
        aria-label="التالي"
        onClick={() => setCurrent((c) => (c + 1) % images.length)}
        className="
          absolute top-1/2 right-3 sm:right-5 -translate-y-1/2
          grid place-items-center p-2 sm:p-3 rounded-full
          bg-white/60 hover:bg-white/80 backdrop-blur-md
          shadow-md transition
        "
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      {/* النقاط */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`اذهب إلى الشريحة ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`
              h-2.5 w-2.5 rounded-full transition
              ${i === current
                ? 'scale-125 bg-white shadow-lg'
                : 'bg-white/40 hover:bg-white/70'}
            `}
          />
        ))}
      </div>

      {/* شريط تقدّم سفلي (اختياري) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full bg-white/80 transition-all duration-700"
          style={{ width: `${((current + 1) / images.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
const HeroSection = () => {
  // —————————— تتبّع مؤشر الفأرة لصناعة تأثير parallax ——————————
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => {
      setPos({
        x: (e.clientX - window.innerWidth / 2) / 20,
        y: (e.clientY - window.innerHeight / 2) / 20,
      });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden select-none"
    >
      {/* —————————— خلفية متدرّجة أساسية —————————— */}
      <div className="absolute inset-0 from-indigo-50 via-purple-50 to-rose-50" />

      {/* —————————— دوائر ملوّنة متحركة (بارالاكس) —————————— */}
      <motion.div
  /* نستفيد من إحداثيات المؤشر إن كنت تستخدمها للبارالاكس */
  style={{ x: pos.x * 0.3, y: pos.y * 0.3 }}
  /* تغطية العنصر بالكامل + شفافية لطيفة حتى لا تطغى على المحتوى */
  className="
    absolute inset-0
    bg-[url('/images/D924F00A.png')]
    bg-cover bg-center
    opacity-25
    pointer-events-none   /* ضمان عدم حجب التفاعل */
    mix-blend-normal      /* أزل خلط الألوان إن لم تعد بحاجة له */
  "
  aria-hidden="true"
/>

      {/* —————————— شبكة هندسية خفيفة لتعزيز العمق —————————— */}

      {/* —————————— المحتوى الرئيسي —————————— */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
        {/* العنوان */}
        <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="
    text-[clamp(2.5rem,3vw,4.75rem)]
    font-extrabold leading-tight tracking-tight
    text-[#5b8dfa]          /* أزرق مائل للأرجواني */
    dark:text-[#8f6cff]     /* درجة أغمق للوضع الليلي (اختياري) */
    drop-shadow-sm
  "
>
  فيا ديف للحلول البرمجية
</motion.h1>


        {/* وصف */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-4 max-w-2xl text-lg md:text-2xl text-slate-700/90 leading-relaxed"
        >
         نحوّل الرؤى إلى حلول رقمية متطورة تتنامى مع أعمالك
        </motion.p>

        {/* وسوم القيم */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            "إبداعية",
            "موثوقة",
            "قابلة للتوسع",
            "تجربة سلسة",
          ].map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="rounded-full border border-slate-200/70 bg-white/60 px-5 py-2 text-sm font-semibold text-slate-700 backdrop-blur-md shadow-sm"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* زرّ الدعوة */}
        <motion.a
          href="#our-products"
          whileHover={{ scale: 1.07, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 inline-block rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-white text-base sm:text-sm font-semibold shadow-lg hover:shadow-xl transition"
        >
          استكشف منتجاتنا
        </motion.a>
      </div>
    </section>
  );
};


/* --------------------  الصفحة -------------------- */
export default function LandingPage() {
  return (
    <main
      dir="rtl"
      className={`${shamel.className} scroll-smooth bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800 selection:bg-blue-200/70 overflow-x-hidden`}>
      
      {/* HERO -------------------------------------------------- */}
      <HeroSection></HeroSection>

      {/* PRODUCTS -------------------------------------------------- */}
      <motion.section
  id="our-products"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="
    relative isolate overflow-hidden
    bg-gradient-to-b from-transparent via-indigo-50/60 to-transparent
    py-24 sm:py-28
  "
>
  {/* طبقة زجاجيّة شفّافة لإحساس العمق */}
  <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-xl" />

  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* العنوان */}
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
        relative mb-16 text-center font-extrabold tracking-tight
        text-[clamp(2rem,5vw,2.75rem)] text-emerald-700
      "
    >
      منتجاتنا
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
    </motion.h2>

    {/* السلايدر */}
    <CustomSlider images={sliderImages} />

    {/* بطاقات المنتجات */}
    <div className="mt-16 grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-10">
      {products.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.1 }}
          whileHover={{ rotateX: 4, rotateY: -4, scale: 1.06 }}
          className="group relative will-change-transform"
        >
          {/* إطار متدرّج بوسـط padding 1px */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-emerald-400/50 via-indigo-400/50 to-blue-400/50 group-hover:via-indigo-500/70 transition-all duration-700">
            {/* محتوى البطاقة بخلفيّة بيضاء خالصة */}
            <div className="flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white ring-1 ring-black/5 shadow-xl">
              
              {/* صورة المنتج */}
              <div className="relative w-full overflow-hidden aspect-square">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* النصوص */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
                  {p.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">
                  {p.desc}
                </p>
                <a
  href={p.link}
  target="_blank"                // يفتح في تبويب جديد
  rel="noopener noreferrer"      // أفضل ممارسة أمنيّة
  aria-label={`المزيد عن ${p.title}`}
  className="
    mt-4 inline-flex items-center gap-1 font-semibold
    text-blue-600 transition-transform duration-300
    hover:translate-x-1 hover:text-blue-700
  "
>
  المزيد ←
</a>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
</motion.section>

      {/* SERVICES -------------------------------------------------- */}
      <section id="services" className="bg-slate-50/90 backdrop-blur-sm py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative text-center mb-20 text-[clamp(2rem,5vw,2.5rem)] font-bold text-slate-800">
            خدماتنا
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </motion.h2>

          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`relative p-8 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition`}>
                  
                  <div className="absolute inset-0 bg-white/30 mix-blend-overlay" />

                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <Icon className="text-4xl text-slate-700" />
                    {s.badge && (
                      <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                        {s.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="relative z-10 text-base font-semibold text-slate-800 leading-normal">
                    {s.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA -------------------------------------------------- */}
      <motion.section
        id="contact"
        className="py-28 text-center relative"
        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }}>

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-emerald-500/10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-[clamp(2rem,5vw,2.5rem)] font-bold mb-6 text-slate-800">
            جاهز لإطلاق مشروعك الرقمي؟
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-12 leading-relaxed">
            اتصل بنا اليوم واحصل على استشارة مجانية مع خبراء فيا ديف لتحديد المتطلبات،
            وضع خارطة الطريق، والبدء في التنفيذ.
          </p>

          <motion.a
            href="https://wa.me/9647822445666"
            aria-label="تواصل عبر واتساب"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-block rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-12 py-4 text-white font-semibold shadow-xl hover:shadow-2xl transition">
            اتصل عبر واتساب
          </motion.a>
        </div>
      </motion.section>

      {/* FOOTER -------------------------------------------------- */}
      <footer className="bg-white/80 backdrop-blur border-t border-slate-200/50 py-10 text-center text-slate-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} فيا ديف. جميع الحقوق محفوظة.
        </div>
      </footer>
    </main>
  );
}

/* --------------------  مساعدة سريعة --------------------
.slider-arrow {
  @apply absolute top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm
          rounded-full p-2 transition-transform hover:scale-110;
}
--------------------------------------------------------- */
