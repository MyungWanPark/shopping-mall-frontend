import { CartItemType } from '../../types/cart';
import { OrderType } from '../../types/order';
import { ProductType } from '../../types/product';

type OrderData = { date: string; cartItemIds: number[] }[];
type SalesData = {
    productName: string;
    salesAmount: number;
}[];
export function getLineChartData(dateRange: Date[], periodOrder: OrderType[], cartItem: CartItemType[]) {
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

export function getPieChartData(periodOrder: OrderType[], orderedCartItem: CartItemType[], products: ProductType[]) {
    console.log(`orderedCartItem in getPieChartData= ${JSON.stringify(orderedCartItem)}`);
    /* const orderedCartItemIds = [];
    for (let i = 0; i < periodOrder.length; i++) {
        const cartItemIds = JSON.parse(periodOrder[i].cartItemIds!) as number[];
        for (let k = 0; k < cartItemIds.length; k++) {
            orderedCartItemIds.push(cartItemIds[k]);
        }
    } */
    // console.log(`orderedCartItem in getPieChartData = ${JSON.stringify(orderedCartItem)}`);
    // console.log(`products in getPieChartData = ${JSON.stringify(products)}`);
    /*     const salesData: SalesData =[];

    for (let k = 0; k < orderedCartItem.length; k++) {
        for (let r = 0; r < products.length; r++) {
            if (orderedCartItem[k].productId === products[r].id) {
                console.log(`products[r].name! = ${products[r].name!}`);
                console.log(`products[r].id = ${products[r].id}`);
                salesData.push({
                    productName: products[r].name!
    salesAmount: number;
                })
                salesData[k].productName = products[r].name!;
            }
        }

        for (let r = 0; r < cartItem.length; r++) {
            if (orderedCartItemIds[k] === cartItem[r].id) {
                salesData[k].salesAmount = cartItem[r].totalPricePerProduct!;
            }
        }
    }
    console.log(`salesData = ${JSON.stringify(salesData)}`); */
}

function findTotalPriceFromCartItem(orderedData: OrderData, cartItem: CartItemType[]) {
    console.log(`orderedData in func = ${JSON.stringify(orderedData)}`);
    console.log(`cartItem in func = ${JSON.stringify(cartItem)}`);

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
