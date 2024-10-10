import Heading from '@/app/components/custom/Heading'
import { Metadata } from 'next'
import { useLocale } from 'next-intl'
import React from 'react'

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อเรา"
}

function Contect() {
  const locale = useLocale()
  return (
    <div className='bg-gray-100'>
      <div className="flex justify-center items-center absolute bg-black w-full bg-opacity-60">
        <div className="w-full max-w-screen-xl mx-3 sm:mx-10 lg:mx-[4rem]">
          <div className="breadcrumbs text-sm text-white">
            <ul>
              <li><a href={`/${locale}`}>Home</a></li>
              <li>contact</li>
            </ul>
          </div>
        </div>
      </div>

      <Heading imgUrl='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
      <div className="flex justify-center items-center mx-3 sm:mx-10 lg:mx-[4rem] -mt-[4rem] lg:-mt-[7rem] pb-5">
        <div className='bg-white relative p-[1rem] md:p-[2rem] shadow-xl w-full max-w-screen-xl'>
          <div className='space-y-14'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl text-blue-900'>ติดต่อเรา</h1>
            <div className='grid md:grid-cols-3 justify-center items-start gap-12 md:gap-0'>
              
              <div className='grid justify-items-center gap-4 max-w-[400px]'>
                <svg className="w-[55px] h-[55px] text-blue-900" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
                </svg>
                <p className='text-center'>ที่อยู่ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, at?</p>
              </div>

              <div className='grid justify-items-center gap-4 max-w-[400px]'>
                <svg className="w-[55px] h-[55px] text-blue-900" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
                </svg>
                <div>
                  <p className='text-center'>0-2xxx-xxxx</p>
                  <p className='text-center'>0-2xxx-xxxx</p>
                </div>

              </div>

              <div className='grid justify-items-center gap-4 max-w-[400px]'>
                <svg className="w-[55px] h-[55px] text-blue-900" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
                </svg>
                <div>
                  <p className='text-center'>email</p>
                </div>
              </div>
            </div>
            <div className='bg-gray-300 w-full h-[400px] grid justify-center items-center'>
              <p className=''>map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contect