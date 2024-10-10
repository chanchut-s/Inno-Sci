import Heading from '@/app/components/custom/Heading'
import Link from 'next/link'
import React from 'react'
import { getPartnerData } from '@/app/api/strapi'
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations('Partner');
    const title = t('partner')
    return {
      title: title,
      description: "",
    };
  }


async function PartnerLink({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations('Partner');
    const partner = await getPartnerData();
    const showpartner =  partner.data.attributes.blog_partners.data

    return (
        <div className='bg-gray-100'>
            <div className="flex justify-center items-center absolute bg-black w-full bg-opacity-60">
                <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
                    <div className="breadcrumbs text-sm text-white">
                        <ul>
                            <li><a href={`/${locale}`}>{t('home')}</a></li>
                            <li>{t('partner')}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Heading imgUrl='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <div className="flex justify-center items-center mx-3 sm:mx-10 lg:mx-[4rem] -mt-[4rem] lg:-mt-[7rem] pb-5">
                <div className='bg-white relative p-[1rem] md:p-[2rem] shadow-xl w-full max-w-screen-xl'>
                    <div className='space-y-4'>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl text-blue-900'>{t('partner')}</h1>
                        {showpartner.map((item: any) => (
                            <div key={item.id} className='grid justify-items-center gap-4'>
                                <Link href={item.attributes.url || ""} target="_blank">
                                    <img
                                        src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                                        alt={item.attributes.name}
                                        className="h-[10rem] object-cover duration-500 group-hover:scale-110"
                                    />
                                </Link>
                                <p className=''>{item.attributes.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartnerLink