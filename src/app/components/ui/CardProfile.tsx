import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

interface CardProfileProps {
    id: number;
    name?: string;
    position?: string;
    image?: string;
  }

function CardProfile({ name, position, image, id }: CardProfileProps ) {
    const locale = useLocale()
    return (
        <Link href={`/${locale}/personnel-cv/${id}`}>
            <div className='group relative block overflow-hidden w-auto max-w-full'>
                <img
                    alt=""
                    src={`http://localhost:1337${image}`}
                    className="h-auto max-h-[40rem] w-full object-cover duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full h-[105px] bg-blue-900 bg-opacity-0 lg:bg-opacity-100  lg:translate-y-24 transform group-hover:translate-y-0 lg:group-hover:bg-opacity-100  lg:transition-all  lg:duration-500"></div>
                <div className="absolute bottom-[3rem] left-0 w-full h-[4rem] p-4">
                    <div className="opacity-0 lg:opacity-100">
                        <p className="text-sm text-white">{name}</p>
                        <p className="text-sm text-white pt-1">{position}</p>
                        {/* <p className="text-sm text-white">082299480</p> */}
                    </div>
                </div>
                
            </div>
            <div className=" lg:hidden block pt-2 relative bg-white">
                <div className='mx-4'>
                    <p className="text-sm">{name}</p>
                    <p className="text-sm">{position}</p>
                    {/* <p className="text-sm">082299480</p> */}
                </div>
                <div className='w-full h-[7px] mt-1 bg-blue-900'></div>
            </div>
        </Link>
    )
}

export default CardProfile
