import Link from 'next/link'
import React from 'react'

interface CardPartnerPorp {
    url: string;
    image: string
}

function CardPartner({url, image}: CardPartnerPorp) {
    return (
        <Link href={url} target="_blank">
            <div className='group relative block w-auto max-w-full'>
                <div className="relative transform transition-transform duration-500 flex flex-col">
                    <figure className="flex justify-center overflow-hidden flex-shrink-0 group-hover:shadow-gray-400 group-hover:shadow-md duration-1000 border-2 border-blue-900 group-hover:border-transparent">
                        <img
                            src={image}
                            alt="Shoes"
                            className="h-auto max-h-[5rem] object-cover duration-500 group-hover:scale-110" />
                    </figure>
                </div>
            </div>
        </Link>
    )
}

export default CardPartner