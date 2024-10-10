'use client';

import React, { useRef, useState } from 'react';
import CardProduct from '../ui/CardProduct';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiperProductStyles.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface ServicesPorp {
  servives: any[];
}

export default function SwiperProduct({ servives }: ServicesPorp) {
  return (
    <>
      <Swiper
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          },
        }}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        pagination={{
          clickable: true,
        }}
        speed={2000}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {servives.map((servive: any) => (
          <SwiperSlide key={servive.id} className='p-3'>
              <CardProduct
              image={`http://localhost:1337${servive.attributes.image.data.attributes.url}`}
              text={servive.attributes.text}
              text_th={servive.attributes.text_th}
              slug={servive.attributes.slug}
              id={servive.attributes.title[0].id}
              />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide className='p-3'><CardProduct/></SwiperSlide>
        <SwiperSlide className='p-3'><CardProduct/></SwiperSlide>
        <SwiperSlide className='p-3'><CardProduct/></SwiperSlide>
        <SwiperSlide className='p-3'><CardProduct/></SwiperSlide> */}
        <div className="swiper-pagination"></div>
      </Swiper>
    </>
  );
}
