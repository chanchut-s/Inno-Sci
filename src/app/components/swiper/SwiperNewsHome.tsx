'use client';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import CardBlogNewsHome from '../ui/CardBlogNewsHome';

interface News {
    news: any[]
    pageType: string
}

export default function SwiperNewHone({ news, pageType }: News) {
    
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    // เมื่อหน้าจอมีความกว้างน้อยกว่า 640px (มือถือ)
                    0: {
                        slidesPerView: 1,
                    },
                    // เมื่อหน้าจอมีความกว้างตั้งแต่ 640px ถึง 899px
                    640: {
                        slidesPerView: 2,
                    },
                    // เมื่อหน้าจอมีความกว้างตั้งแต่ 900px ถึง 979px
                    900: {
                        slidesPerView: 3,
                    },
                    // เมื่อหน้าจอมีความกว้างมากกว่า 980px
                    980: {
                        slidesPerView: 4,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {news.slice(0, 10).map((news: any) => (
                    <SwiperSlide key={news.id} className='p-2'>
                        <CardBlogNewsHome
                            key={news.id}
                            id={news.id}
                            publishedAt={news.attributes.publishedAt}
                            title={news.attributes.title}
                            start={news.attributes.start}
                            thumbnailUrl={`http://localhost:1337${news.attributes.thumbnail.data?.attributes?.url}`}
                            pageType={pageType}
                            slug={news.attributes.slug}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
