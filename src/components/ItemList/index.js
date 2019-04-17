import React from 'react';
import Item from "../Item";

const renderPictures = (items, renderImageModal) => {
    if (items) {
        let column1 = [];
        let column2 = [];
        items.map((item, index, array) => {
            if (index < array.length / 2) {
                column1.push(<Item item={item} key={item.id} onClick={() => renderImageModal(index)} />);
            } else {
                column2.push(<Item item={item} key={item.id} onClick={() => renderImageModal(index)} />);
            }
        })
        return (
            <>
                <div className="col-sm-12 col-md-6 no-padding-sides">
                    {column1}
                </div>
                <div className="col-sm-12 col-md-6 no-padding-sides">
                    {column2}
                </div>
            </>
        )
    } else {
        return (<h1>Loading...</h1>)
    }
}
export default function ItemList({ items , renderImageModal}) {
    // Declare a new state variable, which we'll call "count"
    return (
        <div className="row">
            {renderPictures(items, renderImageModal)}
        </div>
    );
}