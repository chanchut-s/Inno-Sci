import React from 'react';
import Heading from '@/app/components/custom/Heading';
import CardBlogNews from '@/app/components/ui/CardBlogNews';
import { PaginationComponent } from '@/app/components/custom/Pagination';
import { getTranslations } from 'next-intl/server';
import SearchComponent from '@/app/components/custom/Search';
import { notFound } from 'next/navigation';
import { getNewsEventData } from '@/app/api/strapi';
import DateRangeSearch from '@/app/components/custom/DateRangeSearch';
import { Metadata } from 'next';

interface NewsData {
  id: number;
  attributes: {
    title: string;
    slug: string;
    publishedAt: string;
    start: string;
    end: string;
    thumbnail: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }
}

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
    startDate?: string;
    endDate?: string;
  };
}

export const metadata: Metadata = {
  title: "กิจกรรมที่กำลังจะมาถึง",
  description: "กิจกรรมที่กำลังจะมาถึง"
}

export default async function NewsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParamsProps['searchParams'];
}) {
  const t = await getTranslations('Event');
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 9;
  const startDate = searchParams?.startDate ?? '';
  const endDate = searchParams?.endDate ?? '';

  let data, meta, error, pageCount;
  try {
    const result = await getNewsEventData(query, currentPage, pageSize, startDate, endDate);
    data = result.data;
    meta = result.meta;
    pageCount = meta?.pagination?.pageCount || 1;
  } catch (e) {
    console.error('Error fetching event data:', e);
    error = e instanceof Error ? e.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return notFound();

  const now = new Date();
  // Filter for upcoming events
  const upcomingEvents = data.filter((event: NewsData) => new Date(event.attributes.start) <= now && new Date(event.attributes.end) >= now);

  return (
    <div className='bg-gray-100'>
      <div className="flex justify-center items-center absolute bg-black w-full bg-opacity-60">
        <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
          <div className="breadcrumbs text-sm text-white">
            <ul>
              <li><a href={`/${locale}`}>{t('home')}</a></li>
              <li>{t('upevent')}</li>
            </ul>
          </div>
        </div>
      </div>

      <Heading imgUrl='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
      
      <div className='flex justify-center items-center mx-3 sm:mx-10 lg:mx-[4rem] -mt-[4rem] lg:-mt-[7rem] pb-5'>
        <div className='bg-white relative w-full max-w-screen-xl shadow-xl'>
          <div className='p-[1rem] md:p-[2rem] space-y-4 md:space-y-8'>
            <div className='flex flex-col gap-4 justify-between'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl text-blue-900'>{t('upevent')}</h1>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <SearchComponent initialQuery={query} placeholder={t("placeholder")} />
                <DateRangeSearch startDate={startDate} endDate={endDate} />
              </div>
            </div>

            {/* Upcoming events */}
            <div className='grid grid-cols-1 gap-8 md:gap-14 md:grid-cols-2 lg:grid-cols-3'>
              {upcomingEvents.map((news: NewsData) => (
                <CardBlogNews
                  key={news.id}
                  id={news.id}
                  title={news.attributes.title}
                  thumbnailUrl={news.attributes.thumbnail.data?.attributes?.url}
                  start={news.attributes.start}
                  end={news.attributes.end}
                  pageType="event"
                  slug={news.attributes.slug}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <PaginationComponent pageCount={pageCount ?? 1} startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
