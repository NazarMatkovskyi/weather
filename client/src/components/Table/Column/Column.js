import React from 'react';
import './Column.scss';

const Column = props => {

  const renderingData = Object
    .keys(props.data)
    .map(key => <p className="table__cell" key={key}>{props.data[key]}</p>);

  return (
    <div className="table__column">
      {renderingData}
    </div>
  );
}

export default Column;
