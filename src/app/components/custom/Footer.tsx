import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

interface MenuData {
    data: {
        attributes: {
            personnels: {
                data: any[];
            };
            about_us: {
                data: any[];
            };
            services: {
                data: any[];
            };
        };
    };
}

interface LogoData {
    data: {
        attributes: {
            logo: {
                data: {
                    attributes: {
                        url: string;
                    }
                }
            }
        }
    }
}

function Footer({ menu, logo }: { menu: MenuData, logo: LogoData }) {
    const locale = useLocale()
    const t = useTranslations('navbar')
    const aboutUs = menu.data.attributes.about_us.data
    const services = menu.data.attributes.services.data
    const logoUrl = logo.data.attributes.logo.data.attributes.url

    const getTextForLocale = (item: any) => {
        return locale === 'th' ? item.attributes.text_th : item.attributes.text;
    };

    return (
        <div className="bg-white shadow-[0_-8px_5px_-5px_rgba(0,0,0,0.1)]">
            <div className="flex justify-center items-center">
                <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
                    <footer className="footer p-10">
                        <aside>
                            <div className='flex flex-col md:flex-row gap-10'>
                                <a href={`/${locale}`}><img className='h-[70px] object-center' src={`http://localhost:1337${logoUrl}`} alt="" /></a>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-10'>
                                    <ul className=' space-y-2'>
                                        <li className=' font-bold'><p>{t("about")}</p></li>
                                        {aboutUs.map((data: any) => (
                                            <li key={data.id} className='pl-2'>
                                                <a href={`/${locale}/about-us/${data.attributes.slug}`} className='hover:underline'>{getTextForLocale(data)}</a>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className=' space-y-2'>
                                        <li className=' font-bold'><p>{t('news')}</p></li>
                                        <li className='pl-2'><a href={`/${locale}/event/upcoming-events`} className='hover:underline'><p>{t('event')}</p></a></li>
                                        <li className='pl-2'><a href={`/${locale}/news`} className='hover:underline'><p>{t('news1')}</p></a></li>
                                    </ul>
                                    <ul className=' space-y-2'>
                                        <li className=' font-bold'><p>{t('service')}</p></li>
                                        {services.map((service: any) => (
                                            <li key={service.id} className='pl-2'>
                                                <a href={`/${locale}/services/${service.attributes.slug}/${service.attributes.title[0].id}`} className='hover:underline'>{getTextForLocale(service)}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <button className='shadow-lg bg-blue-900 h-[35px] w-[100px] rounded-3xl hover:bg-gray-300 text-gray-100 hover:text-gray-900'><a href={`/${locale}/contact/`}><p className=''>ติดต่อเรา</p></a></button>
                                </div>
                            </div>
                        </aside>
                        <nav>
                            <h6 className="footer-title">Social</h6>
                            <div className="grid grid-flow-col gap-4">
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                    </svg>
                                </a>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current">
                                        <path
                                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                    </svg>
                                </a>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                    </svg>
                                </a>
                            </div>
                        </nav>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Footer