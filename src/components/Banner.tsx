import React from 'react';

export default function Banner() {
    return (
        <section className="h-96 relative p-4">
            <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-banner opacity-80 rounded-lg overflow-hidden"></div>
            <div className="absolute top-36 w-full text-center text-white">
                <h1 className="text-5xl">Shop with Us</h1>
                <p className="text-lg mt-2">Best Products, High Quality</p>
            </div>
        </section>
    );
}
