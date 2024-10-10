import React from 'react'

interface HaedingProps {
    imgUrl: string;
}

function  Haeding (a: HaedingProps) {
    return (
        <div
            className="hero h-[12rem] sm:h-[16rem] lg:h-[20rem]"
            style={{
                backgroundImage: `url(${a.imgUrl})`,
            }}>
            <div className="hero-overlay bg-opacity-0"></div>
            <div className="hero-content text-neutral-content">
                <div className="max-w-md">
                    {/* <h1 className="mb-5 text-5xl font-bold">{title.text}</h1> */}
                </div>
            </div> 
        </div>
    )
}

export default Haeding