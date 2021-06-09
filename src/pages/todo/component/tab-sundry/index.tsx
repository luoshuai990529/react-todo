import React from 'react';
import MoreSvg from '@/art/moreSvg';
import OrderSvg from '@/art/orderSvg';
import AddSvg from '@/art/addSvg';
import './index.less';

function TabSundry() {
    return (
        <div className="tab-sundry">
            <div className="tab-header">
                <h1 className="title">
                    <span>杂事箱</span>
                </h1>
                <div className="operator">
                    <OrderSvg />
                    <MoreSvg />
                </div>
            </div>
            <div className="sundry-list"></div>
            <div className="add-event">
                <span className="add-svg">
                    <AddSvg />
                </span>
                <span className="desc">添加任务</span>
            </div>
        </div>
    );
}

export default TabSundry;
