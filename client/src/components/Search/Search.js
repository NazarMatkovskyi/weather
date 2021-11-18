import React from 'react';
import './Search.scss';

const Search = props => {

  return (
    <form className="search" onSubmit={props.onSubmit}>
      <input className={"search__input " + (props.validDataFlag || "search__input--alert")} type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
        autoFocus={props.autoFocus} />
    </form>
  );
}

export default Search;
