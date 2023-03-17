import { CartItemType } from '../../types/cart';

type HandleProductDetail = {
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>;
    setCartProduct: (value: React.SetStateAction<CartItemType>) => void;
};

export const handleSize = ({ e, setCartProduct }: HandleProductDetail) => {
    const sizeBtns = document.querySelectorAll('.sizeBtn');
    sizeBtns.forEach((btn) => {
        btn.classList.remove('bg-gray-700');
        btn.classList.remove('text-white');
    });
    const target = e.target as HTMLSpanElement;
    target.classList.add('bg-gray-700');
    target.classList.add('text-white');
    setCartProduct((prev) => ({
        ...prev,
        size: target.textContent!,
    }));
};

export const handleColor = ({ e, setCartProduct }: HandleProductDetail) => {
    const colorBtns = document.querySelectorAll('.colorBtn');
    colorBtns.forEach((btn) => {
        btn.classList.replace('opacity-100', 'opacity-70');
        btn.classList.replace('w-7', 'w-5');
        btn.classList.replace('h-7', 'h-5');
    });
    const target = e.target as HTMLSpanElement;
    target.classList.replace('opacity-70', 'opacity-100');
    target.classList.replace('w-5', 'w-7');
    target.classList.replace('h-5', 'h-7');
    setCartProduct((prev) => ({
        ...prev,
        color: target.id,
    }));
};
