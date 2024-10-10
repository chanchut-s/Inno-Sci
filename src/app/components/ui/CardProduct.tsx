import { useLocale } from 'next-intl';
import Link from 'next/link';
import React from 'react'

interface CardServicesPorp {
    image: string;
    text: string;
    text_th: string;
    slug: string;
    id: number;
}

function CardProduct({ text, text_th, image, slug, id }: CardServicesPorp) {

    const locale = useLocale()
    const textLocale = locale === 'th' ? text_th : text

    return (
        <Link href={`/${locale}/services/${slug}/${id}`}>
            <div className='group relative block w-auto max-w-full'>
                <div className="bg-base-100 w-90 relative grid justify-items-center h-full transform items-end transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 duration-500">
                    <figure className="overflow-hidden group-hover:shadow-md group-hover:shadow-gray-700 duration-1000 mt-4">
                        <img
                            src={image}
                            alt="Shoes"
                            className="h-auto max-h-[14rem] w-full object-cover duration-500 group-hover:scale-110" />
                    </figure>
                    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">{textLocale}</h3>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct