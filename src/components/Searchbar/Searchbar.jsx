import {useState} from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const onInputChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};
