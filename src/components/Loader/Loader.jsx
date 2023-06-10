import { ImSpinner2 } from 'react-icons/im';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.spinner}>
      <ImSpinner2 />
    </div>
  );
};
