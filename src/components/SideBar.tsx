import React from 'react';

import { MdKeyboardArrowRight } from 'react-icons/md';

export default function SideBar() {
    function handleTitleClick(liSelector: string, arrowSelector: string) {
        const listItems = document.querySelectorAll<HTMLLIElement>(`.${liSelector}`);
        const arrowBtn = document.querySelector<HTMLElement>(`.${arrowSelector}`)!;

        arrowBtn.classList.toggle('rotate-90');
        listItems.forEach((item) => {
            if (item.classList.contains('h-0')) {
                item.classList.replace('h-0', 'h-6');
                item.classList.add('overflow-visible');
                item.classList.toggle('opacity');
                item.style.transition = 'height 0.5s ease';
            } else {
                item.classList.replace('h-6', 'h-0');
                item.classList.remove('overflow-visible');
                item.style.transition = 'height 0.5s ease';
                item.classList.replace('border-brand', 'border-transparent');
            }
        });

        if (liSelector === 'shopItem') {
            closeUl('managementItem', 'arrowManagement');
        } else {
            closeUl('shopItem', 'arrowShop');
        }
    }

    const handleListItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, liSelector: string) => {
        const listItems = document.querySelectorAll<HTMLLIElement>(`.${liSelector}`);
        const item = e.target as HTMLLIElement;

        listItems.forEach((item) => item.classList.replace('border-brand', 'border-transparent'));
        item.classList.replace('border-transparent', 'border-brand');
    };

    function closeUl(liSelector: string, arrowSelector: string) {
        const arrowBtn = document.querySelector<HTMLElement>(`.${arrowSelector}`)!;
        const isUlOpened = arrowBtn.classList.contains('rotate-90');
        const listItems = document.querySelectorAll<HTMLLIElement>(`.${liSelector}`);

        if (isUlOpened) {
            arrowBtn.classList.remove('rotate-90');
            listItems.forEach((item) => {
                item.classList.replace('h-6', 'h-0');
                item.classList.remove('overflow-visible');
                item.style.transition = 'height 0.5s ease';
                item.classList.replace('border-brand', 'border-transparent');
            });
        }
    }

    return (
        <nav className="p-4">
            <div className="flex flex-col items-center">
                <button className="flex items-end" onClick={() => handleTitleClick('shopItem', 'arrowShop')}>
                    Shop
                    <MdKeyboardArrowRight className="arrowShop" />
                </button>
                <ul className="flex flex-col items-center text-center">
                    <li
                        className="shopItem h-0 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => handleListItemClick(e, 'shopItem')}
                    >
                        Men
                    </li>
                    <li
                        className="shopItem h-0 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => handleListItemClick(e, 'shopItem')}
                    >
                        Women
                    </li>
                    <li
                        className="shopItem h-0 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => handleListItemClick(e, 'shopItem')}
                    >
                        Accessaries
                    </li>
                    <li
                        className="shopItem h-0 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => handleListItemClick(e, 'shopItem')}
                    >
                        Shoes
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <button
                    className="flex items-end"
                    onClick={() => handleTitleClick('managementItem', 'arrowManagement')}
                >
                    Management
                    <MdKeyboardArrowRight className="arrowManagement" />
                </button>
                <ul className="flex flex-col items-center text-center">
                    <li
                        className="managementItem h-0 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => handleListItemClick(e, 'managementItem')}
                    >
                        Analytics
                    </li>
                    <li
                        className="managementItem h-0 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => handleListItemClick(e, 'managementItem')}
                    >
                        Add Product
                    </li>
                </ul>
            </div>
        </nav>
    );
}
