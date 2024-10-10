import { useLocale } from 'next-intl';
import Link from 'next/link';
import React from 'react'

interface CardAboutInnoProps {
  text: string;
  text_th: string;
  image1: string;
  slug: string;
}

function CardAboutInno({ text, text_th, image1, slug }: CardAboutInnoProps) {
  const locale = useLocale()

  const textLocale = locale === 'th' ? text_th : text

  return (
    <Link href={`/${locale}/about-us/${slug}`}>
      <div className="group relative block">
        <div className="relative flex h-full transform items-end bg-gray-300 transition-transform group-hover:-translate-y-2 duration-500 group-hover:shadow-md group-hover:shadow-gray-700 ">
            <img
              src={image1}
              alt={text}
              className="w-full h-[100px] object-cover"
            />
          </div>
          <div className="absolute inset-0 p-4 flex items-center justify-center text-xl font-medium sm:text-2xl text-center text-gray-100 transition-transform group-hover:-translate-y-2 duration-500">
            {textLocale}
          </div>
        </div>
    </Link>
  )
}

export default CardAboutInno