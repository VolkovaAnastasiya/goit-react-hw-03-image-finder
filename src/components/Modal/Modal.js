import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleBackdropClick);
  }

  handleEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClick();
    }
  };

  render() {
    const { onClick, image } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={onClick}>
        <div className={s.modal}>
          <img src={image} alt={image.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

// Modal.propTypes = {
//   onClick: PropTypes.func,
//   image: string,
//   closeModal: PropTypes.func,
// };
