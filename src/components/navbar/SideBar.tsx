import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { handleListItemClick, handleTitleClick } from '../../utils/sideBarUtils';
import { useAuthContext } from '../../context/AuthContext';

export default function SideBar() {
    const navigate = useNavigate();
    const { user } = useAuthContext();

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
                            navigate('/products?category=men');
                        }}
                    >
                        Men
                    </li>
                    <li
                        className="shopItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'shopItem', 'arrowShop');
                            navigate('/products?category=women');
                        }}
                    >
                        Women
                    </li>
                    <li
                        className="shopItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'shopItem', 'arrowShop');
                            navigate('/products?category=accessaries');
                        }}
                    >
                        Accessaries
                    </li>
                    <li
                        className="shopItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                        onClick={(e) => {
                            handleListItemClick(e, 'shopItem', 'arrowShop');
                            navigate('/products?category=shoes');
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
                    {/* {user && user.isAdmin && ( */}
                    {user && (
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
                    )}
                    {user && (
                        <li
                            className="managementItem h-6 overflow-hidden cursor-pointer border-b border-transparent hover:border-brand"
                            onClick={(e) => {
                                handleListItemClick(e, 'managementItem', 'arrowManagement');
                                navigate('/products/new');
                            }}
                        >
                            Add Product
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
