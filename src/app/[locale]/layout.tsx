import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Kanit } from '@next/font/google';
import Navbar from '../components/custom/Navbar';
import "./globals.css";
import Footer from '../components/custom/Footer';
import { notFound } from 'next/navigation';
import { getMenuPersonnelData , getLogoData} from '../api/strapi';
import { Metadata } from 'next';

const kanit = Kanit({
  subsets: ['latin'], // เลือก subset ที่ต้องการ
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // รวมทุกน้ำหนักที่มี
  style: ['normal', 'italic'], // รวมสไตล์ปกติและเอียง
});

// async function getMenuPersonnelData() {
//   const res = await fetch('http://localhost:1337/api/add-menu-personnel?populate=personnels,about_us,services.title');
//   if (!res.ok) {
//     throw new Error('Failed to fetch menu data');
//   }
//   return res.json();
// }

export const metadata: Metadata = {
  title: "หน้าแรก",
  description: "KU InnoSci",
  keywords: ['KuInnoSci', 'InnoSci', 'Inno']
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const menupersonnel = await getMenuPersonnelData();
  const Logo = await getLogoData()

  if (!menupersonnel) {
    return notFound();
}

  return (
    <html lang={locale} className={kanit.className} data-theme="light">
      <body>

        <NextIntlClientProvider messages={messages}>
          <Navbar menu={menupersonnel} logo={Logo}/>
          {children}
          <Footer menu={menupersonnel} logo={Logo}/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}