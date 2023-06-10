import React from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    query: '',
  };

  onInputChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onFormSubmit}>
          <button type='submit' className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>
          <input className={css.searchFormInput} type='text' autoComplete='off' autoFocus placeholder='Search images and photos' value={this.state.query} onChange={this.onInputChange} />
        </form>
      </header>
    );
  }
}
