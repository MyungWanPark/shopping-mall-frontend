import React from 'react';

export default function NavbarTest() {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const navContent = document.querySelector('#example-navbar-warning') as HTMLDivElement;
        navContent.classList.toggle('h-32');
        navContent.style.transition = 'height 0.5s ease';
    };

    return (
        <nav className="w-full relative flex flex-wrap items-center justify-between px-2 py-3 bg-lime-500 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                    <a
                        className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                        href="#pablo"
                    >
                        lime Color
                    </a>
                    <button
                        className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={handleClick}
                    >
                        <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                    </button>
                </div>
                <div
                    className="h-0 overflow-hidden lg:h-auto lg:flex flex-grow items-center"
                    id="example-navbar-warning"
                >
                    <ul className="flex flex-col overflow-hidden lg:flex-row list-none mr-auto">
                        <li className="nav-item">
                            <a
                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo"
                            >
                                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo"
                            >
                                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" />{' '}
                                <span className="ml-2">Tweet</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo"
                            >
                                <span className="ml-2">Settings</span>
                            </a>
                        </li>
                    </ul>
                    <div className="relative overflow-hidden flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
                        <div className="flex">
                            <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-lime-600 rounded-full text-sm bg-lime-100 items-center rounded-r-none pl-2 py-1 text-lime-800 border-r-0 placeholder-lime-300">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <input
                            type="text"
                            className="overflow-hidden px-2 py-1 h-8 border border-solid  border-lime-600 rounded-full text-sm leading-snug text-lime-700 bg-lime-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-lime-300"
                            placeholder="Search lime"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
