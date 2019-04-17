import React from 'react';
import './style.css';

export default function Item({ item , onClick}) {
    // Declare a new state variable, which we'll call "count"
    return (
        <div
            className="picture-wrapper col-sm-12"
            onClick={onClick}>
            <img style={{
                width: '100%'
            }}
                src={item.urls.small}
                alt={item.alt_description} />
            <div className="picture-info">
                <div
                    className="position-absolute"
                >
                    <h4 className="text-left">{'Author: ' + item.user.username}</h4>
                    <p className="text-left">{item.alt_description}</p>
                </div>
            </div>
        </div>
    );
}