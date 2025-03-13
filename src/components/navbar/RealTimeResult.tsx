import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../types/product';

type Props = {
    products: ProductType[];
    setIsOpen: (val: boolean) => void;
};

export default function RealTimeResult({ products, setIsOpen }: Props) {
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        setIsOpen(false);
        navigate(`/products/${id}`);
    };

    return (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
            {products.map((product, id) => (
                <li key={product.id} className="border-b last:border-none">
                    <button
                        onClick={() => handleClick(product.id!)}
                        className="block w-full px-4 py-2 hover:bg-gray-100 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                        <span className="font-semibold mr-2">{product.name}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
