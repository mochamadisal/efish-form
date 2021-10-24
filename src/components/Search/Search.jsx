import React from 'react';
import {useDispatch} from 'react-redux';
import {SEARCH_PRODUCT_LIST} from '~/redux/actions/typeAction';

import './search.scss';

const Search = () => {
    const dispatch = useDispatch();

    const searchData = (param) => {
        dispatch({type: SEARCH_PRODUCT_LIST, data: param});
    };
    return (
        <div className="form-search">
            <input type="text" placeholder="Search Data..." className="form-control" onChange={(e) => searchData(e.target.value)} />
        </div>
    );
};
export default Search;
