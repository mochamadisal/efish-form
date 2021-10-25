import {SET_PRODUCT_LIST, SEARCH_PRODUCT_LIST, SET_MODAL_ISOPEN, SET_PROVINCE_DATA, SET_CITY_DATA, SET_SIZE_DATA, SORT_DATA, FILTER_DATA, SET_SORT_FILTER} from '../actions/typeAction';

const initialState = {
    listProduct: [],
    bankDataProduct: [],
    modalIsOpen: false,
    listOfProvince: [],
    listOfCity: [],
    listOfSize: [],
    sortFilter: {},
};

const sortingData = ( firstEl, secondEl, name, order) => {
    const objA = (name === 'size' || name === 'price' ? parseInt(firstEl[name]) : firstEl[name]);
    const objB = (name === 'size' || name === 'price' ? parseInt(secondEl[name]) : secondEl[name]);
    if ( order === 'asc' ) {
        if (objA < objB) {
            return -1;
        }
        if (objA > objB) {
            return 1;
        }
        return 0;
    }

    if (objA > objB) {
        return -1;
    }
    if (objA < objB) {
        return 1;
    }
    return 0;
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
    case SET_MODAL_ISOPEN:
        return {
            ...state,
            modalIsOpen: action.data,
        };
    case SET_PROVINCE_DATA:
        return {
            ...state,
            listOfProvince: action.data,
        };
    case SET_CITY_DATA:
        return {
            ...state,
            listOfCity: action.data,
        };
    case SET_SIZE_DATA:
        return {
            ...state,
            listOfSize: action.data,
        };
    case SORT_DATA:
        const sort = action.data;
        const sorting = sort.split('-');
        const sortFilterData = {
            ...state.sortFilter,
            [sort]: sort,
        };
        return {
            ...state,
            listProduct: state.listProduct.sort((firstEl, secondEl) => sortingData(firstEl, secondEl, sorting[0], sorting[1])),
            sortFilter: sortFilterData,
        };
    case FILTER_DATA:
        const filter = action.data.value;
        const filterModel = action.data.model;

        const sortFilter = {
            ...state.sortFilter,
            [filterModel]: filter,
        };

        const provinceFilter = (sortFilter['province'] ? sortFilter['province'].toLowerCase() : '');
        const cityFilter = (sortFilter['city'] ? sortFilter['city'].toLowerCase() : '');
        const sizeFilter = (sortFilter['size'] ? sortFilter['size'].toLowerCase() : '');

        const filterList = state.bankDataProduct.filter((row) => (
            (row.area_provinsi && row.area_provinsi.toLowerCase().indexOf(provinceFilter) > -1) &&
            (row.area_kota && row.area_kota.toLowerCase().indexOf(cityFilter) > -1) &&
            (row.size && row.size.toLowerCase().indexOf(sizeFilter)) > -1
        ));
        return {
            ...state,
            listProduct: filterList,
            sortFilter: sortFilter,
        };
    case SET_SORT_FILTER:
        return {
            ...state,
            sortFilter: action.data,
        };
    default:
        return state;
    }
};

