import { Component } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, descr } = this.props;

    return (
      <div className='overlay' onClick={this.handleOverlayClick}>
        <div className='modal'>
          <img src={largeImageURL} alt={descr} />
        </div>
      </div>
    );
  }
}


Modal.propType = {
  largeImageURL: PropTypes.string,
  descr: PropTypes.string,
  handleOverlayClick: PropTypes.func,
};