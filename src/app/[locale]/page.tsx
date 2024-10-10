import { getTranslations } from "next-intl/server";
import CardEventHome from "../components/ui/CardBlogNewsHome";
import CardAboutInno from "../components/ui/CardAboutInno";
import SwiperProduct from "../components/swiper/SwiperProduct";
import SwiperHero from "../components/swiper/SwiperHero";
import SwiperPartner from "../components/swiper/SwiperPartner";
import CardBlogNewsHome from "../components/ui/CardBlogNewsHome";
import { getAboutUsHomeData, getServicesHomeData, getBlogData, getPartnerData, getHeroBannerData } from "../api/strapi";

export interface BlogNews {
  id: number;
  attributes: {
    title: string;
    slug: string;
    start: string;
    end: string;
    publishedAt: string;
    thumbnail: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }
}

export interface AboutUs {
  id: number;
  attributes: {
    text: string;
    slug: string;
    text_th: string;
    image1: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('HomePage');
  const blogData = await getBlogData();
  const herobanner = await getHeroBannerData();
  const aboutUs = await getAboutUsHomeData();
  const services = await getServicesHomeData()
  const partner = await getPartnerData()
  const events = blogData.data.attributes.blog_events.data;
  const publicities = blogData.data.attributes.blog_publicities.data;
  const showbanner = herobanner.data.attributes.hero_banners.data || []
  const showpartner =  partner.data.attributes.blog_partners.data
  
  return (
    <div className="bg-gray-100">
      <div className="relative z-0">
        <SwiperHero
          BannerUrl={showbanner}
        />

      </div>
      <div className="flex justify-center items-center mx-3 sm:mx-10 lg:mx-[4rem] -mt-[2rem] md:-mt-[4rem] pb-5">
        <div className='bg-white relative p-[1rem] md:p-[2rem] shadow-xl w-full max-w-screen-xl'>
          <h1 className="text-2xl sm:text-4xl text-blue-900 font-bold text-center pt-[1rem]">{t('aboutInno')}</h1>
          <div className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-3">
            {aboutUs.slice(0, 3).map((about: AboutUs) => (
              <CardAboutInno
                key={about.id}
                text={about.attributes.text}
                text_th={about.attributes.text_th}
                slug={about.attributes.slug}
                image1={`http://localhost:1337${about.attributes.image1?.data?.attributes?.url}`}
              />
            ))}
          </div>
          <h1 className="text-2xl sm:text-4xl text-blue-900 font-bold text-center pt-[2rem]">{t('ourServices')}</h1>
          <div className="md:mt-5">
            <SwiperProduct servives={services}/>
          </div>

          <div className="grid grid-cols-1 md-custom:grid-cols-2 gap-7 pt-4">
            <div className="flex-col">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-blue-900">{t('news')}</h1>
                <a href={`/${locale}/news`}><button className="btn bg-orange-600 text-white text-xs px-1.5 py-0.5 font-normal hover:text-gray-900">{t('viewAll')}</button></a>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-7">
                {publicities.slice(0, 3).map((publicitie: BlogNews) => (
                  <CardBlogNewsHome
                    key={publicitie.id}
                    id={publicitie.id}
                    publishedAt={publicitie.attributes.publishedAt}
                    title={publicitie.attributes.title}
                    start={publicitie.attributes.start}
                    thumbnailUrl={`http://localhost:1337${publicitie.attributes.thumbnail.data.attributes.url}`}
                    pageType="news"
                    slug={publicitie.attributes.slug}
                  />
                ))}
              </div>
            </div>
            <div className="flex-col">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-blue-900">{t('events')}</h1>
                <a href={`/${locale}/event/upcoming-events`}><button className="btn bg-orange-600 text-white text-xs px-1.5 py-0.5 font-normal hover:text-gray-900">{t('viewAll')}</button></a>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-7">
                {events.slice(0, 3).map((event: BlogNews) => (
                  <CardBlogNewsHome
                    key={event.id}
                    id={event.id}
                    publishedAt={event.attributes.publishedAt}
                    title={event.attributes.title}
                    start={event.attributes.start}
                    end={event.attributes.end}
                    thumbnailUrl={`http://localhost:1337${event.attributes.thumbnail.data.attributes.url}`}
                    pageType="event"
                    slug={event.attributes.slug}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-col pt-5">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-4xl font-bold text-blue-900">{t('partner')}</h1>
              <a href={`/${locale}/partner-link`}><button className="btn bg-orange-600 text-white text-xs px-1.5 py-0.5 font-normal hover:text-gray-900">{t('viewAll')}</button></a>
            </div>
            <div className="">
              <SwiperPartner partners={showpartner}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}