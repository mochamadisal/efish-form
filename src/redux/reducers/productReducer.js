import {SET_PRODUCT_LIST, SEARCH_PRODUCT_LIST} from '../actions/typeAction';

const initialState = {
    listProduct: [],
    bankDataProduct: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
    case SET_PRODUCT_LIST:
        return {
            ...state,
            listProduct: action.data,
            bankDataProduct: action.data,
        };
    case SEARCH_PRODUCT_LIST:
        const search = action.data;
        const filterData = state.bankDataProduct.filter((row) => (
            (row.komoditas && row.komoditas.toLowerCase().indexOf(search) > -1) ||
            (row.area_provinsi && row.area_provinsi.toLowerCase().indexOf(search) > -1) ||
            (row.area_kota && row.area_kota.toLowerCase().indexOf(search) > -1) ||
            (row.size && row.size.toLowerCase().indexOf(search)) > -1 ||
            (row.price && row.price.toLowerCase().indexOf(search)) > -1
        ));
        return {
            ...state,
            listProduct: filterData,
        };
    default:
        return state;
    }
};

