import React from 'react';

export default function Banner() {
    return (
        <article className="w-full h-full p-4">
            <video autoPlay muted loop controls className="w-full h-full">
                <source src={process.env.PUBLIC_URL + '/video/banner_video.mp4'} type="video/mp4" />
            </video>
        </article>
    );
}
