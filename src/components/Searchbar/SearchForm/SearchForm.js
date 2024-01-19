import { useState } from 'react';

import css from './searchform.module.css';

const SearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      search: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <button type="submit" className={css.button}>
        <span className={css.button_label}>Search</span>
      </button>

      <input
        onChange={handleChange}
        value={state.search}
        className={css.input}
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
};

export default SearchForm;
