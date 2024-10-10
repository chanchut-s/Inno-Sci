'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CardPartner from '../ui/CardPartner';

interface PartnerPorp {
    partners: any[]
}

function SwiperPartner({ partners }: PartnerPorp) {
    return (
        <div className='relative'>
            <Swiper
                loop={true}

                breakpoints={{
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    980: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={2000}
                modules={[Autoplay, Pagination, Navigation]}
                className="cardpartner-swiper-container"
            >
                {partners.map((partner: any) => (
                    <SwiperSlide key={partner.id} className='p-2'>
                        <CardPartner
                            image={`http://localhost:1337${partner.attributes.image.data.attributes.url}`}
                            url={partner.attributes.url}
                        />
                    </SwiperSlide>
                ))}
                {/* <SwiperSlide className='p-2'><CardPartner /></SwiperSlide>
                <SwiperSlide className='p-2'><CardPartner /></SwiperSlide>
                <SwiperSlide className='p-2'><CardPartner /></SwiperSlide>
                <SwiperSlide className='p-2'><CardPartner /></SwiperSlide>
                <SwiperSlide className='p-2'><CardPartner /></SwiperSlide> */}
            </Swiper>
        </div>
    )
}

export default SwiperPartner