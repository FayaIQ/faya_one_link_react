// src/app/layout.js
import './globals.css';       

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <head />
      <body>
        {children}              
      </body>
    </html>
  );
}
