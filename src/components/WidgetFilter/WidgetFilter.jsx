import React from 'react';
import './widgetFilter.scss';
import Select from '~/components/Select/Select';

const WidgetFilter = () => {
    return (
        <div className="filter-widget background-white">
            <div className="w-100">
                <div className="row">
                    <div className="col-3">
                        <Select />
                    </div>
                    <div className="col-3">
                        <Select />
                    </div>
                    <div className="col-3">
                        <Select />
                    </div>
                    <div className="col-3">
                        <Select />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WidgetFilter;
