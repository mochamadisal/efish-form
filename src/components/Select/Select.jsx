import React, {Fragment} from 'react';
import Select from 'react-select';


const Select2 = ({title, data, action, model, filter}) => {
    const selectData = (event) => {
        action(event.value, model);
    };

    return (
        <Fragment>
            <p className="font-14 font-600 mb-4p">{title}</p>
            <Select options={data} onChange={(e) => selectData(e)} filterOption={filter ? (param) => ( param.data.province == filter) : null}/>
        </Fragment>
    );
};
export default Select2;
