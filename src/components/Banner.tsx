import React from 'react';

export default function Banner() {
    return (
        <section className="h-96 relative">
            <div className="w-full h-full bg-cover bg-center bg-banner opacity-80" />
            <div className="absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl">
                <h2 className="text-3xl font-Raleway italic lg:text-6xl">Shop the latest trends,</h2>
                <p className="text-2xl font-Raleway italic lg:text-5xl">elevate your style</p>
            </div>
        </section>
    );
}
