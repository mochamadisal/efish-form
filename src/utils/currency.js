import currency from 'currency.js';

export const rupiah = (price) => {
    return currency(price, {separator: ',', symbol: 'Rp ', precision: 0}).format();
};
