import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

export default function Item({ item , onClick}) {
    // Declare a new state variable, which we'll call "count"
    return (
        <div
            className="modal-image position-fixed picture-wrapper col-sm-12">
            <img 
                src={item.urls.full}
                alt={item.alt_description} />
            <FontAwesomeIcon icon="times" onClick={onClick}/>
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