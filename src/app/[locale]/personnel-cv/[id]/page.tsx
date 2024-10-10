import React from 'react'
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import BlockRendererClient from '@/app/components/custom/BlockRendererClient'
import { getTranslations } from 'next-intl/server';
import { Metadata, ResolvedMetadata } from 'next';

interface personnelData {
    id: number;
    attributes: {
        name: string;
        position: string;
        phone_number: string;
        email: string;
        detail: {
            type: string;
            children: { type: string; text: string }[];
        }[];
        image: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
    }
}

async function getPersonnelData(id: string) {
    const res = await fetch(`http://localhost:1337/api/blog-personnels/${id}?populate=*`, { next: { revalidate: 60 } });
    if (!res.ok) {
        throw new Error('Failed to fetch Personnel data');
    }
    const data = await res.json();
    return data.data
}

export async function generateMetadata({params: {locale, id}}: {params: {id:string, locale: string}}, parent: ResolvedMetadata) : Promise<Metadata> {
    const personnel = await getPersonnelData(id)
    const previousImages = (await parent).openGraph?.images || []
    const title = personnel.attributes.name
    const description = personnel.attributes.position
    const imageUrl = `http://localhost:1337${personnel.attributes.image.data.attributes.url}`
    return {
      title: title,
      description: description,
      openGraph: {
        images: [imageUrl, ...previousImages],
      },
    };
  }

export default async function PersonnelCV({ params: { locale, id } }: { params: { locale: string, id: string }, searchParams: { jobTitle: string } }) {
    const personnel = await getPersonnelData(id);
    const t = await getTranslations('Partner');

    if (!personnel) {
        return notFound();
    }

    return (
        <div className=''>
            <div className="flex justify-center items-center absolute bg-black w-full bg-opacity-60">
                <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
                    <div className="breadcrumbs text-sm text-white">
                        <ul>
                            <li><a href={`/${locale}`}>{t('home')}</a></li>
                            <li>{personnel.attributes.name}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='pt-16 mx-3 md:mx-20 flex justify-center items-center'>
                <div className='flex flex-col gap-[1rem] md:flex-row w-auto md:max-w-screen-xl pb-5'>
                    <div className='md:w-[420px] w-full px-4'> 
                        <img
                            src={`http://localhost:1337${personnel.attributes.image.data.attributes.url}`}
                            alt=""
                            className='w-full object-cover' />
                    </div>
                    <div className='w-full space-y-2'>
                        <h1 className='text-3xl'>{personnel.attributes.name}</h1>
                        <p className='text-2xl'>{personnel.attributes.position}</p>
                        <div className='flex flex-col md-custom:flex-row md-custom:gap-12'>
                            <div className='flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 h-5 text-blue-900'>
                                    <path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                </svg>
                                <p className='text-lg whitespace-nowrap'>{personnel.attributes.phone_number}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 h-5 text-blue-900'>
                                    <path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                </svg>
                                <p className='text-lg'>{personnel.attributes.email}</p>
                            </div>
                        </div>
                        <hr className='mt-4 border-b-4 border-gray-300 max-w-screen' />
                        <BlockRendererClient content={personnel.attributes.detail} />
                    </div>
                </div>
            </div>
        </div>
        
    )
}