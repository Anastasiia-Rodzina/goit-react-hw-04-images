import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  useEffect(() => {
    const closeModal = ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [close]);

  return createPortal(
    <div onClick={close} className={css.overlay}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

// class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       this.props.close();
//     }
//   };

//   render() {
//     const { closeModal } = this;
//     const { children } = this.props;

//     return createPortal(
//       <div onClick={closeModal} className={css.overlay}>
//         <div className={css.modal}>{children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

export default Modal;
