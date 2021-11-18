import React from 'react';
import './Table.scss';
import Column from '../Column/Column';

const Table = props => {

  const columns = props.columns.map((columnData, index) => <Column key={index} data={columnData} />);

  return (
    <div className="table">
      {columns}
    </div>
  );
}

export default Table;
