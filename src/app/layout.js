// src/app/layout.js
import './globals.css';         // 1. استيراد أنماط Tailwind أولاً

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <head />
      <body>
        {/* 2. محتوى الصفحة (صفحتك البيضاء سابقاً) */}
        {children}
      </body>
    </html>
  );
}
