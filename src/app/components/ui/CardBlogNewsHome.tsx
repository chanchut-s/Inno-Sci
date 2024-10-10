import { useLocale } from 'next-intl'
import Link from 'next/link'
import React from 'react'

interface CardBlogNewsHomeProps {
    id: number;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    start: string;
    end?: string;  // เปลี่ยนเป็น optional
    pageType: 'news' | 'event';
    slug: string;
}

function CardBlogNewsHome({ id, title, thumbnailUrl, start, end, pageType, slug }: CardBlogNewsHomeProps) {
    const locale = useLocale()

    const formatDate = (date: string) => {
        const d = new Date(date)
        const day = d.getDate()
        const month = d.toLocaleDateString('th-TH', { month: 'short' })
        const year = d.getFullYear() + 543  // Convert to Buddhist Era

        return {
            day,
            month,
            year
        }
    }

    const formattedStartDate = new Date(start).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    

    const startDate = formatDate(start)
    const endDate = end ? formatDate(end) : null

    const href = pageType === 'news' ? `/${locale}/news-read/${id}` : `/${locale}/event-read/${id}`

    return (
        <Link href={href}>
            <div className='group relative block'>
                <div className="relative transform transition-transform group-hover:-translate-y-2 duration-500 flex flex-col md:flex-row gap-2 md:gap-6">
                    <figure className="flex justify-center overflow-hidden flex-shrink-0 group-hover:shadow-gray-700 group-hover:shadow-md duration-1000 bg-gray-900 relative">
                        <div className="absolute top-2 left-2 z-20">
                            <div className="flex">
                                {/* วันที่เริ่มต้น */}
                                <div className="bg-blue-700 text-white px-3 py-1 bg-opacity-90 ">
                                    <p className="text-xl md:text-sm font-bold text-center">{startDate.day}</p>
                                    <p className="text-lg md:text-xs text-center">{startDate.month}</p>
                                    <p className="text-lg md:text-xs text-center">{startDate.year}</p>
                                </div>
                                {/* วันที่สิ้นสุด */}
                                {endDate && (
                                    <div className="bg-blue-400 text-white px-3 py-1 bg-opacity-70">
                                        <p className="text-xl md:text-sm font-bold text-center">{endDate.day}</p>
                                        <p className="text-lg md:text-xs text-center">{endDate.month}</p>
                                        <p className="text-lg md:text-xs text-center">{endDate.year}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="h-[15rem] sm:h-[30rem] md:h-[9rem] w-[33rem] sm:w-[40rem] md:w-[14rem] object-scale-down duration-500 group-hover:scale-110"
                        />
                    </figure>
                    <div className='flex-grow p-4'>
                        <p className="text-sm text-gray-600">{formattedStartDate}</p>
                        <h3 className="text-lg font-medium text-gray-900 sm:text-xl text-start line-clamp-4">{title}</h3>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardBlogNewsHome;
