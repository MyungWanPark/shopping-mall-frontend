import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

type ListItemSelector = 'shopItem' | 'managementItem';
type ArrowSelector = 'arrowShop' | 'arrowManagement';

export default function SideBar() {
    const navigate = useNavigate();

    function handleTitleClick(liSelector: ListItemSelector, arrowSelector: ArrowSelector) {
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

        closeUl(liSelector, arrowSelector);
    }

    const handleListItemClick = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        liSelector: ListItemSelector,
        arrowSelector: ArrowSelector
    ) => {
        const listItems = document.querySelectorAll<HTMLLIElement>(`.${liSelector}`);
        const item = e.target as HTMLLIElement;

        listItems.forEach((item) => item.classList.replace('border-brand', 'border-transparent'));
        item.classList.replace('border-transparent', 'border-brand');

        closeUl(liSelector, arrowSelector);
    };

    function closeUl(liSelector: ListItemSelector, arrowSelector: ArrowSelector) {
        let arrowBtn;
        let listItems;

        if (liSelector === 'shopItem') {
            arrowBtn = document.querySelector<HTMLElement>('.arrowManagement')!;
            listItems = document.querySelectorAll<HTMLLIElement>('.managementItem');
        } else {
            arrowBtn = document.querySelector<HTMLElement>('.arrowShop')!;
            listItems = document.querySelectorAll<HTMLLIElement>('.shopItem');
        }

        arrowBtn.classList.remove('rotate-90');
        listItems.forEach((item) => {
            item.classList.replace('h-6', 'h-0');
            item.classList.remove('overflow-visible');
            item.style.transition = 'height 0.5s ease';
            item.classList.replace('border-brand', 'border-transparent');
        });
    }

    return (
        <nav className="p-4">
            <div className="flex flex-col items-center">
                <button className="flex items-end font-bold" onClick={() => handleTitleClick('shopItem', 'arrowShop')}>
                    Shop
                    <MdKeyboardArrowRight className="arrowShop rotate-90" />
                </button>
                <ul className="flex flex-col items-center text-center">
                    <li
                        className="shopItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'shopItem', 'arrowShop');
                            navigate('/products/men');
                        }}
                    >
                        Men
                    </li>
                    <li
                        className="shopItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'shopItem', 'arrowShop');
                            navigate('/products/women');
                        }}
                    >
                        Women
                    </li>
                    <li
                        className="shopItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'shopItem', 'arrowShop');
                            navigate('/products/accessaries');
                        }}
                    >
                        Accessaries
                    </li>
                    <li
                        className="shopItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'shopItem', 'arrowShop');
                            navigate('/products/shoes');
                        }}
                    >
                        Shoes
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <button
                    className="flex items-end font-bold"
                    onClick={() => handleTitleClick('managementItem', 'arrowManagement')}
                >
                    Management
                    <MdKeyboardArrowRight className="arrowManagement rotate-90" />
                </button>
                <ul className="flex flex-col items-center text-center">
                    <li
                        className="managementItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand flex items-center"
                        onClick={(e) => {
                            handleListItemClick(e, 'managementItem', 'arrowManagement');
                            navigate('/analytics');
                        }}
                    >
                        <GoGraph />
                        Analytics
                    </li>
                    <li
                        className="managementItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'managementItem', 'arrowManagement');
                            navigate('/products/new');
                        }}
                    >
                        Add Product
                    </li>
                </ul>
            </div>
        </nav>
    );
}
