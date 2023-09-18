import './Button.scss';
import PropTypes from 'prop-types';

export const Button = ({ onClick, isVisible }) => {
  return isVisible ? (
    <button type="button" className="button-load" onClick={onClick}>
      Load more
    </button>
  ) : null;
};


Button.propTypes = {
  onClick: PropTypes.func,
};