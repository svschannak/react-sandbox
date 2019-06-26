import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

const StockDisplay = ({ data }) => {
    return (
        <div style={{
            width: "250px",
            height: "250px",
            textAlign: "center",
            border: "3px solid black"
        }}>
            <div className="symbol" style={{
                fontSize: "36px"
            }}>{data.symbol}</div>
            <div
                className="price"
                style={{
                    fontSize: "24px"
                }}
            >
                <div key={`${data.price}`}>{data.price}</div>
            </div>
        </div>
    )
}

export default StockDisplay;