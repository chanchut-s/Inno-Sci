import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import BlockRendererClient from '@/app/components/custom/BlockRendererClient';
import Heading from '@/app/components/custom/Heading';
import ServiceTitleSwiper from '@/app/components/swiper/ServiceTitleSwiper';
import { getTranslations } from 'next-intl/server';
import { getServicesData } from '@/app/api/strapi';
import AddFileContent from '@/app/components/custom/AddFileContent';
import { Metadata, ResolvedMetadata } from 'next';

function renderAddItemContent(addItem: any) {
    if (!addItem || addItem.length === 0) return null;

    return addItem.map((item: any, index: number) => (
        <div key={index} className="flex flex-col md:flex-row gap-4 mt-6 border-b-[1px] pb-6">
            {item.image && item.image.data && (
                <div className="md:w-2/3">
                    <img
                        src={`http://localhost:1337${item.image.data.attributes.url}`}
                        className="rounded-lg object-cover"
                    />
                </div>
            )}
            <div className='flex flex-col justify-between gap-1 w-full'>
                <div className={item.image ? "md:w-2/3" : "w-full"}>
                    <p className='text-xl '>{item.name}</p>
                    <BlockRendererClient content={item.detail} />
                </div>
                {item.file && item.file.data && (
                    <div className='flex'>
                        <a href={`http://localhost:1337${item.file.data?.attributes?.url}`}
                            target="_blank"
                            className='bg-blue-900 h-[50px] min-w-[200px] flex items-center justify-between text-gray-100 px-2 '
                        >
                            <p className="line-clamp-1">{item.file_name}</p>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-6 w-6 text-gray-100 ml-2' fill="currentColor">
                                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    ));
}
  
  export async function generateMetadata({params: {locale, slug, id}}: {params: {locale: string, slug: string, id:string}}, parent: ResolvedMetadata) : Promise<Metadata> {
    const service = await getServicesData(slug)
    const selectedTitle = service.title.find((item: any) => item.id.toString() === id);
    const titleText = locale === 'th' ? selectedTitle.text_th : selectedTitle.text;
    const previousImages = (await parent).openGraph?.images || []
    const title = selectedTitle.text_th
    return {
      title: titleText,
      description: "",
      openGraph: {
        images: [...previousImages],
      },
    };
  }


export default async function ServiceDetail({ params: { locale, slug, id } }: { params: { locale: string, slug: string, id: string } }) {
    const t = await getTranslations('navbar');

    const service = await getServicesData(slug);
    if (!service || service.length === 0) {
        return notFound();
    }

    const mainTitle = locale === 'th' ? service.text_th : service.text;
    const selectedTitle = service.title.find((item: any) => item.id.toString() === id);

    if (!selectedTitle) {
        return notFound();
    }

    const titleText = locale === 'th' ? selectedTitle.text_th : selectedTitle.text;

    return (
        <div className='bg-gray-100'>
            <div className="flex justify-center items-center absolute bg-black w-full bg-opacity-60">
                <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
                    <div className="breadcrumbs text-sm text-white">
                        <ul>
                            <li><a href={`/${locale}`}>{t('home')}</a></li>
                            <li>{titleText}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Heading imgUrl='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />

            <div className="flex justify-center items-center mx-3 sm:mx-10 lg:mx-[4rem] -mt-[4rem] lg:-mt-[7rem] pb-5">
                <div className='bg-white relative p-[1rem] md:p-[2rem] shadow-xl w-full max-w-screen-xl min-h-screen'>
                    <div className='space-y-4'>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl text-blue-900 text-center'>{mainTitle}</h1>
                        <ServiceTitleSwiper titles={service.title} locale={locale} slug={slug} selectedId={id} />
                        <div className='mt-8'>
                            <h2 className='text-2xl text-blue-700'>{titleText}</h2>
                            <div className='mt-6'>
                                <div className='flex justify-center mb-6'>
                                    {selectedTitle.video?.data ? (
                                        <video
                                            src={`http://localhost:1337${selectedTitle.video.data.attributes.url}`}
                                            className="w-auto"
                                            controls
                                            autoPlay
                                            muted
                                            loop
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        []
                                    )}
                                </div>
                                <BlockRendererClient content={selectedTitle.detail} />
                                <AddFileContent addFile={selectedTitle.Add_File} />
                                <div className='border-b-[1px] pb-6'></div>
                                {renderAddItemContent(selectedTitle.Add_Item)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}