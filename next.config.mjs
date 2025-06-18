/** @type {import('next').NextConfig} */
const nextConfig = {
  // يُفعّل التصدير الثابت بدل الأمر next export
  output: 'export',

  // (اختياري) لجعل الروابط تنتهي بشرطة مائلة وتُنشئ ملف index.html لكل مسار:
  // trailingSlash: true,

  // (اختياري) لتغيير اسم مجلد الإخراج من `out` إلى مثلاً `dist`:
  // distDir: 'dist',
};

export default nextConfig;
