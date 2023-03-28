/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                tablet: '500px',
            },
            height: {
                84: '21rem',
                100: '25rem',
                104: '26rem',
                108: '27rem',
                112: '28rem',
                128: '32rem',
                144: '36rem',
                160: '40rem',
            },
            fontFamily: {
                Gothic: ['Nanum Gothic', 'sans-serif'],
                Abel: ['Abel', 'sans-serif'],
                Raleway: ['Raleway', 'sans-serif'],
                // RalewayItalic: ['Raleway', 'sans-serif'],
                RobotoMono: ['Roboto Mono', 'monospace'],
            },
            colors: {
                brand: '#f96162',
            },
            backgroundImage: {
                banner: `url('../public/images/banner2.jpg')`,
            },
            flexBasis: {
                '1/20': '5%',
                '2/20': '10%',
                '3/20': '15%',
                '4/20': '20%',
                '5/20': '25%',
                '6/20': '30%',
                '7/20': '35%',
                '8/20': '40%',
                '9/20': '45%',
                '10/20': '50%',
                '11/20': '55%',
                '12/20': '60%',
                '13/20': '65%',
                '14/20': '70%',
                '15/20': '75%',
                '16/20': '80%',
                '17/20': '85%',
                '18/20': '90%',
                '19/20': '95%',
            },
        },
    },
    plugins: [],
};
