import BlockRendererClient from '@/app/components/custom/BlockRendererClient';
import Heading from '@/app/components/custom/Heading'
import { notFound } from 'next/navigation';
import React from 'react'
import { getAboutUsData } from '@/app/api/strapi';
import AddFileContent from '@/app/components/custom/AddFileContent';
import { Metadata, ResolvedMetadata } from 'next';

export async function generateMetadata({params: {locale, slug}}: {params: {locale: string, slug:string}}, parent: ResolvedMetadata) : Promise<Metadata> {
    const aboutUs = await getAboutUsData(slug)
    const title = locale === 'th' ? aboutUs[0].attributes.text_th : aboutUs[0].attributes.text;
    const previousImages = (await parent).openGraph?.images || []
    return {
      title: title,
      description: "",
      openGraph: {
        images: [...previousImages],
      },
    };
  }
  

export default async function AboutUs({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const aboutUs = await getAboutUsData(slug);
    if (!aboutUs || aboutUs.length === 0) {
        return notFound();
    }

    const title = locale === 'th' ? aboutUs[0].attributes.text_th : aboutUs[0].attributes.text;

    return (
        <div className='bg-gray-100'>
            <div className="flex justify-center items-center absolute bg-black w-full bg-opacity-60">
                <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
                    <div className="breadcrumbs text-sm text-white">
                        <ul>
                            <li><a href={`/${locale}`}>Home</a></li>
                            <li>{title}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Heading imgUrl='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <div className="flex justify-center items-center mx-3 sm:mx-10 lg:mx-[4rem] -mt-[4rem] lg:-mt-[7rem] pb-5">
                <div className='bg-white relative p-[1rem] md:p-[2rem] shadow-xl w-full max-w-screen-xl min-h-screen'>
                    <div className='space-y-4'>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl text-blue-900'>{title}</h1>
                        <BlockRendererClient content={aboutUs[0].attributes.detail} />
                        <AddFileContent addFile={aboutUs[0].attributes.Add_File}/>
                    </div>
                </div>
            </div>
        </div>
    )
}