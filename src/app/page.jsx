"use client";
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaShoppingCart,
  FaCode,
  FaMobileAlt,
  FaCalculator,
  FaEnvelope,
  FaCogs,
  FaCloud,
  FaUtensils,
  FaBullhorn,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

// بيانات الخدمات
const services = [
  { id: 1, title: 'تصميم المتاجر الإلكترونية', icon: FaShoppingCart, badge: null },
  { id: 2, title: 'برمجة مواقع الويب', icon: FaCode, badge: null },
  { id: 3, title: 'برمجة تطبيقات الموبايل', icon: FaMobileAlt, badge: null },
  { id: 4, title: 'الأنظمة المالية', icon: FaCalculator, badge: null },
  { id: 5, title: 'البريد الإلكتروني المخصص', icon: FaEnvelope, badge: 'مجاني' },
  { id: 6, title: 'حلول برمجية مخصصة', icon: FaCogs, badge: null },
  { id: 7, title: 'تطبيقات الإنترنت', icon: FaCloud, badge: null },
  { id: 8, title: 'المنيو الإلكتروني للمطاعم', icon: FaUtensils, badge: 'خصم 50%' },
  { id: 9, title: 'التسويق الإلكتروني', icon: FaBullhorn, badge: null }
];

// بيانات المنتجات
const products = [
  {
    id: 7,
    title: 'Faya ERP',
    desc: 'منصة متكاملة لإدارة أنشطة المؤسسات',
    img: '/images/faya-erp.png',
    link: 'https://erp.faya.dev/'
  },
  {
    id: 2,
    title: 'Faya E-Menu',
    desc: 'تطبيق يقدم للمطاعم منيو ألكتروني متكامل',
    img: '/images/faya-menu.png',
    link: 'https://emenu.faya.dev/'
  },
  {
    id: 3,
    title: 'Faya Press',
    desc: 'نظام إصدار الفواتير والإشعارات بسهولة',
    img: '/images/faya-press.png',
    link: '/products/faya-press'
  },
  {
    id: 4,
    title: 'Faya Staff',
    desc: 'إدارة الموارد البشرية وجدولة الموظفين',
    img: '/images/faya-staff.png',
    link: '/products/faya-staff'
  },
  {
    id: 5,
    title: 'Faya Press',
    desc: 'نظام إصدار الفواتير والإشعارات بسهولة',
    img: '/images/faya-press.png',
    link: '/products/faya-press'
  },
  {
    id: 6,
    title: 'Faya CRM',
    desc: 'نظام إصدار الفواتير والإشعارات بسهولة',
    img: '/images/faya-CRM.png',
    link: 'https://teams.faya.dev/#/FayaCRM'
  },
  {
    id: 1,
    title: 'Faya Onelink',
    desc: 'نظام إصدار الفواتير والإشعارات بسهولة',
    img: '/images/faya-Onelink.png',
    link: 'https://teams.faya.dev/#/FayaOneLink'
  },
  {
    id: 8,
    title: 'Faya Survey',
    desc: 'نظام إصدار الفواتير والإشعارات بسهولة',
    img: '/images/faya-Survey.png',
    link: 'https://teams.faya.dev/#/fayaSurvey'
  },
  {
    id: 9,
    title: 'Faya RX',
    desc: 'نظام إصدار الفواتير والإشعارات بسهولة',
    img: '/images/faya-RX.png',
    link: 'https://rx.faya.dev/'
  }
];

// تدرجات لونية مموّهة للكروت
const gradients = [
  'from-blue-200/40 to-blue-300/40',
  'from-green-200/40 to-green-300/40',
  'from-pink-200/40 to-pink-300/40',
  'from-yellow-200/40 to-yellow-300/40',
  'from-purple-200/40 to-purple-300/40',
  'from-indigo-200/40 to-indigo-300/40',
  'from-red-200/40 to-red-300/40',
  'from-teal-200/40 to-teal-300/40',
  'from-slate-200/40 to-slate-300/40'
];

const sliderImages = [
  '/images/faya-erp.png',
  '/images/faya-CRM.png',
  '/images/faya-menu.png'
];

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex(i => (i + 1) % sliderImages.length),
      4000
    );
    return () => resetTimeout();
  }, [index]);

  const prevSlide = () => {
    setIndex(i => (i - 1 + sliderImages.length) % sliderImages.length);
  };

  const nextSlide = () => {
    setIndex(i => (i + 1) % sliderImages.length);
  };

  return (
    <div className="my-24">
      <div className="relative mx-auto w-full max-w-5xl md:max-w-6xl aspect-video overflow-hidden rounded-3xl shadow-xl">
        {sliderImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="slide"
            fill
            unoptimized
            className={`object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/70 p-2 text-slate-700 shadow hover:bg-white"
        >
          <FaChevronRight className="rotate-180" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/70 p-2 text-slate-700 shadow hover:bg-white"
        >
          <FaChevronRight />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {sliderImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? 'bg-indigo-600' : 'bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* خط عربي حديث وأنيق يدعم كامل الأوزان */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>فيا ديف للحلول البرمجية</title>
      </Head>

      {/* جذر الصفحة */}
      <main
        dir="rtl"
        style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
        className="scroll-smooth bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800"
      >
        {/* HERO */}
        <header className="relative isolate overflow-hidden pt-28 pb-32">
          <div className="absolute inset-0 -z-10 bg-[url('/images/D924F00A.png')] bg-cover opacity-40" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#8166E4] via-[#828BE6] to-[#83AFE9] drop-shadow-md">فيا ديف, للحلول البرمجية</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto">
              نُحوّل أفكارك إلى منصات رقمية مُبهرة، تدفع أعمالك نحو المستقبل.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['إبداع', 'موثوقية', 'احترافية'].map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-white/60 backdrop-blur border border-white/70 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:shadow-md transition"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a href="#our-products" className="inline-block rounded-full bg-[#8054E3] px-10 py-4 text-white font-semibold tracking-wide shadow-lg hover:bg-[#6F47CE] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8054E3] transition">اكتشف منتجاتنا</a>

          </motion.div>
        </header>

        {/* SLIDESHOW */}
        <Slideshow />

        {/* PRODUCTS */}
        <motion.section
          id="our-products"
          className="relative py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-indigo-50 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h1 className="section-title text-3xl text-slate-1000 mb-16">منتجاتنا</h1>

            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {products.map(prod => (
                <motion.article
                  key={prod.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/70 backdrop-blur border border-slate-200 shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ y: -6 }}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={prod.img}
                      alt={prod.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 250px, 40vw"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-8 flex-grow">
                    <h3 className="text-xl font-bold text-slate-800">{prod.title}</h3>
                    <p className="text-sm text-slate-600 flex-grow leading-relaxed min-h-[3rem]">
                      {prod.desc}
                    </p>
                    <a
                      href={prod.link}
                      className="mt-auto self-start inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium transition"
                    >
                      المزيد →
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SERVICES */}
        <section className="bg-slate-50/60 backdrop-blur-sm py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h1 className="section-title text-3xl mb-16 text-slate-800">خدماتنا</h1>

            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={svc.id}
                    className={`relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all bg-gradient-to-br ${gradients[idx % gradients.length]} backdrop-blur`}
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute inset-0 bg-white/50 mix-blend-overlay" />
                    <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                      <Icon className="text-3xl shrink-0 text-slate-700" />
                      {svc.badge && (
                        <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                          {svc.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="relative z-10 text-lg font-semibold text-slate-800 leading-normal">
                      {svc.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className="relative py-24 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/20 to-emerald-500/20" />
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
              جاهز لإطلاق مشروعك الرقمي؟
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              اتصل بنا اليوم واحصل على استشارة مجانية مع خبراء فيا ديف لتحديد المتطلبات، وضع خارطة الطريق، والبدء في التنفيذ.
            </p>
            <a
              href="https://wa.me/9647822445666"
              className="inline-block rounded-full bg-emerald-600 px-12 py-4 text-white font-semibold shadow-lg hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 transition"
            >
              اتصل عبر واتساب
            </a>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="bg-white/70 backdrop-blur border-t border-slate-200 py-12 text-center text-slate-600 text-sm">
          <address className="not-italic leading-relaxed">
            العراق · بغداد · زيونة · الشارع الخدمي · بناية زيونة ستارز 3 · الطابق الثاني شقة 108<br />
            جميع الحقوق محفوظة © {new Date().getFullYear()} فيا ديف
          </address>
        </footer>
      </main>

      {/* HELPER STYLES */}
      <style jsx>{`
        .section-title {
          @apply text-2xl sm:text-3xl md:text-4xl font-extrabold text-center relative text-emerald-700;
        }
        .section-title::after {
          content: "";
          position: absolute;
          bottom: -0.75rem;
          left: 50%;
          transform: translateX(-50%);
          width: 3.5rem;
          height: 0.25rem;
          background: linear-gradient(90deg, #10b981 0%, #6366f1 100%);
          border-radius: 9999px;
        }
      `}</style>
    </>
  );
}