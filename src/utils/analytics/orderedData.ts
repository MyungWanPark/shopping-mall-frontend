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

export function getPieChartData(orderedCartItem: CartItemType[], products: ProductType[]) {
    const salesProducts = orderedCartItem.map((item) => ({
        price: item.totalPricePerProduct,
        productId: item.productId,
    }));
    console.log(`salesProducts in getPieChartData= ${JSON.stringify(salesProducts)}`);
    const result: SalesData = [];

    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < salesProducts.length; j++) {
            if (products[i].id === salesProducts[j].productId) {
                // check array if it already exist
                let isExist = false;
                for (let r = 0; r < result.length; r++) {
                    if (result[r].productName === products[i].name) {
                        isExist = true;
                        result[r].salesAmount += salesProducts[j].price!;
                        break;
                    }
                }
                if (isExist) continue;
                // insert to result
                result.push({
                    productName: products[i].name!,
                    salesAmount: salesProducts[j].price!,
                });
            }
        }
    }
    // console.log(`result in getPieChartData= ${JSON.stringify(result)}`);
    return result;
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
