import { CartItemType } from '../../types/cart';
import { OrderType } from '../../types/order';

type OrderData = { date: string; cartItemIds: number[] }[];

export function getSalesData(dateRange: Date[], periodOrder: OrderType[], cartItem: CartItemType[]) {
    const existDates = periodOrder.map((data) => new Date(data.createdAt!));
    const orderedData: OrderData = dateRange.map((date) => ({
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        cartItemIds: [],
    }));

    for (let i = 0; i < dateRange.length; i++) {
        for (let k = 0; k < existDates.length; k++) {
            if (
                dateRange[i].getFullYear() === existDates[k].getFullYear() &&
                dateRange[i].getMonth() === existDates[k].getMonth() &&
                dateRange[i].getDate() === existDates[k].getDate()
            ) {
                orderedData[i].cartItemIds.push(...JSON.parse(periodOrder[k].cartItemIds!));
            }
        }
    }
    const salesData = findTotalPriceFromCartItem(orderedData, cartItem);
    const sum = salesData.reduce((prev, curr) => prev + curr, 0);
    const temp = sum / dateRange.length;
    const average = Array(salesData.length).fill(temp);
    return { salesData, average };
}

function findTotalPriceFromCartItem(orderedData: OrderData, cartItem: CartItemType[]) {
    const processedData = Array(orderedData.length).fill(0);

    for (let i = 0; i < orderedData.length; i++) {
        for (const id of orderedData[i].cartItemIds) {
            for (let k = 0; k < cartItem.length; k++) {
                if (id === cartItem[k].id) {
                    processedData[i] += cartItem[k].totalPricePerProduct;
                }
            }
        }
    }
    return processedData;
}
