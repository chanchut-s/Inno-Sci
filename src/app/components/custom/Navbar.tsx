import Link from 'next/link'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from './Locale-Switcher'
import { useState } from 'react';

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

function Navbar({ menu, logo }: { menu: MenuData, logo: LogoData }) {
    const locale = useLocale()
    const t = useTranslations('navbar')
    const personnel = menu.data.attributes.personnels.data
    const aboutUs = menu.data.attributes.about_us.data
    const services = menu.data.attributes.services.data
    const logoUrl = logo.data.attributes.logo.data.attributes.url

    const getTextForLocale = (item: any) => {
        return locale === 'th' ? item.attributes.text_th : item.attributes.text;
    };

    return (
        <div className="navbar bg-white sticky top-0 z-50 shadow-md">
            <div className="navbar-start">
                <div className='flex justify-start'>
                    <div className="drawer lg:hidden">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content relative z-10">
                            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                        </div>
                        <div className="drawer-side fixed inset-0 z-20">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                <li><a href={`/${locale}`}>{t("home")}</a></li>
                                <li>
                                    <details className="dropdown">
                                        <summary>{t("about")}</summary>
                                        <ul className="p-2 ">
                                            <li>
                                                <details className="dropdown">
                                                    <summary>{t("personnel")}</summary>
                                                    <ul className="p-2 ">
                                                        {personnel.map((data: any) => (
                                                            <li key={data.id}><a href={`/${locale}/personnel/${data.attributes.slug}`}>{getTextForLocale(data)}</a></li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            </li>
                                            {aboutUs.map((data: any) => (
                                                <li key={data.id}><a href={`/${locale}/about-us/${data.attributes.slug}`}>{getTextForLocale(data)}</a></li>
                                            ))}
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details className="dropdown">
                                        <summary>{t("news")}</summary>
                                        <ul className="p-2 ">
                                            <li>
                                                <details className="dropdown">
                                                    <summary>{t("event")}</summary>
                                                    <ul className="p-2 ">
                                                        <li><a href={`/${locale}/event/upcoming-events`}>{t('upevent')}</a></li>
                                                        <li><a href={`/${locale}/event/pass-events`}>{t('passevent')}</a></li>
                                                    </ul>
                                                </details>
                                            </li>
                                            <li><a href={`/${locale}/news`}>{t("news1")}</a></li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details className="dropdown">
                                        <summary>{t("about")}</summary>
                                        <ul className="p-2 ">
                                            {services.map((data: any) => (
                                                <li key={data.id}><a href={`/${locale}/services/${data.attributes.slug}`}>{getTextForLocale(data)}</a></li>
                                            ))}
                                        </ul>
                                    </details>
                                </li>
                                <li><a href={`/${locale}/contact`}>{t("contact")}</a></li>
                            </ul>
                        </div>
                    </div>
                    <a href={`/${locale}`} className="btn btn-link"><img className='h-[50px] object-center' src={`http://localhost:1337${logoUrl}`} alt="" /></a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <div className="menu menu-horizontal px-1">
                    <a role="button" className="btn btn-ghost font-normal hover:bg-gray-50" href={`/${locale}`}>{t("home")}</a>
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost font-normal hover:bg-gray-50"
                        >
                            {t("about")}
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 mt-2 shadow-lg"
                        >
                            <li className="group">
                                <details className="dropdown w-full">
                                    <summary className="hover:bg-gray-50 rounded-lg">
                                        {t("personnel")}
                                    </summary>
                                    <ul className="p-2">
                                        {personnel.map((data: any) => (
                                            <li key={data.id}>
                                                <a
                                                    href={`/${locale}/personnel/${data.attributes.slug}`}
                                                    className="hover:bg-gray-50"
                                                >
                                                    {getTextForLocale(data)}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                            {aboutUs.map((data: any) => (
                                <li key={data.id}>
                                    <a
                                        href={`/${locale}/about-us/${data.attributes.slug}`}
                                        className="hover:bg-gray-50"
                                    >
                                        {getTextForLocale(data)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost font-normal hover:bg-gray-50"
                        >
                            {t("news")}
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-auto p-2 mt-2 shadow-lg"
                        >
                            <li className="group">
                                <details className="dropdown w-[200px]">
                                    <summary className="hover:bg-gray-50 rounded-lg">
                                        {t("event")}
                                    </summary>
                                    <ul className="p-2">
                                        <li>
                                            <a
                                                href={`/${locale}/event/upcoming-events`}
                                                className="hover:bg-gray-50"
                                            >
                                                {t('upevent')}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`/${locale}/event/pass-events`}
                                                className="hover:bg-gray-50"
                                            >
                                                {t('passevent')}
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <a
                                    href={`/${locale}/news`}
                                    className="hover:bg-gray-50"
                                >
                                    {t("news1")}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost font-normal hover:bg-gray-50"
                        >
                            {t("service")}
                        </div>
                        <div
                            tabIndex={0}
                            className="dropdown-content bg-white rounded-lg z-[1] shadow-lg mt-2 fixed left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl"
                        >
                            <div className="grid grid-cols-4 gap-1 p-4">
                                {services.map((service) => (
                                    <div key={service.id} className="min-w-[200px]">
                                        <div className="px-4 py-2 font-medium text-gray-700 border-b">
                                            {locale === 'th' ? service.attributes.text_th : service.attributes.text}
                                        </div>
                                        <ul className="py-2">
                                            {service.attributes.title.map((title: any) => (
                                                <li key={title.id}>
                                                    <a
                                                        href={`/${locale}/services/${service.attributes.slug}/${title.id}`}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    >
                                                        {locale === 'th' ? title.text_th : title.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a role="button" className="btn btn-ghost font-normal hover:bg-gray-50" href={`/${locale}/contact`}>{t("contact")}</a>
                </div>
            </div>
            <div className="navbar-end">
                <LocaleSwitcher />
            </div>
        </div>
    )
}

export default Navbar