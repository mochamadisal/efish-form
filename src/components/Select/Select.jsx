import React, {Fragment} from 'react';
import Select from 'react-select';

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];

const Select2 = () => {
    return (
        <Fragment>
            <p className="font-14 font-600 mb-4p">Filter Province</p>
            <Select options={options} />
        </Fragment>
    );
};
export default Select2;
