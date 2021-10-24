import React from 'react';
import JsonToForm from 'json-reactform';
import model from '~/constants/shemaSearch';
import './search.scss';

const submit = (params) => {
    console.log(params);
};

const Search = () => {
    return (
        <div className="form-search">
            <JsonToForm model={model} onSubmit={submit}/>
        </div>
    );
};
export default Search;
