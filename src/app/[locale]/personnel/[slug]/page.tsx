import { useLocale, useTranslations } from 'next-intl';
import CardProfile from '@/app/components/ui/CardProfile';
import Heading from '@/app/components/custom/Heading';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata, ResolvedMetadata } from 'next';

interface Personnel {
  id: number;
  attributes: {
    name: string;
    position: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface PersonnelPosition {
  id: number;
  attributes: {
    text: string;
    text_th: string;
    slug: string;
    blog_personnels: {
      data: Personnel[];
    };
  };
}

async function fetchPersonnelData() {
  const response = await fetch('http://localhost:1337/api/menu-personnels?populate=blog_personnels.image', { cache: 'no-store' });
  const data = await response.json();
  return data.data as PersonnelPosition[];
}

export async function generateMetadata({params: {locale, slug}}: {params: {slug:string, locale: string}}, parent: ResolvedMetadata) : Promise<Metadata> {
  const personnelData = await fetchPersonnelData()
  const filteredData = personnelData.filter(item => item.attributes.slug === slug);
  const previousImages = (await parent).openGraph?.images || []
  const title = locale === 'th'
    ? filteredData[0]?.attributes.text_th
    : filteredData[0]?.attributes.text;
  return {
    title: title,
    description: "",
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default async function Lecturer({ params: { locale, slug } }: { params: { slug: string, locale: string } }) {
  const personnelData = await fetchPersonnelData();
  const t = await getTranslations('Partner');

  const filteredData = personnelData.filter(item => item.attributes.slug === slug);
  
  if (filteredData.length === 0) {
    return notFound();
  }
  
  const jobTitle = locale === 'th'
    ? filteredData[0]?.attributes.text_th
    : filteredData[0]?.attributes.text;

  const imgUrl = "https://plus.unsplash.com/premium_photo-1661306465544-cc55151ab336?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className='bg-gray-100'>
      <div className="flex justify-center items-center absolute bg-black w-full bg-opacity-60">
        <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
          <div className="breadcrumbs text-sm text-white">
            <ul>
              <li><a href={`/${locale}`}>{t('home')}</a></li>
              <li>
                {jobTitle}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Heading imgUrl={imgUrl} />
      <div className='flex justify-center items-center mx-3 sm:mx-10 lg:mx-[4rem] -mt-[4rem] lg:-mt-[7rem] pb-5'>
        <div className='bg-white relative w-full max-w-screen-xl shadow-xl'>
          <div className="p-[1rem] md:p-[2rem] space-y-4 md:space-y-8 ">
            <h1 className='text-3xl sm:text-4xl lg:text-5xl text-blue-900'>{jobTitle}</h1>
            <div className="grid grid-cols-1 gap-8 sm:gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {filteredData[0]?.attributes.blog_personnels.data.map((personnel) => (
                <CardProfile
                  key={personnel.id}
                  id={personnel.id}
                  name={personnel.attributes.name}
                  position={personnel.attributes.position}
                  image={personnel.attributes.image.data.attributes.url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
