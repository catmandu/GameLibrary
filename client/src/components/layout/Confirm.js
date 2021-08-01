import React, { useContext } from 'react';
import Modal from 'react-modal';
import ConfirmContext from '../../context/confirm/confirmContext';

const Confirm = () =>
{
    const { confirm, RemoveConfirm } = useContext(ConfirmContext);
    
    return  confirm !== null && <Modal className='modal' isOpen={confirm !== null} overlayClassName='overlay' shouldCloseOnOverlayClick={true}>
                                    <div className='modal-header'>
                                        <h2>{confirm.title}</h2>
                                    </div>
                                    <div className='modal-content'>                                        
                                        <p>{confirm.message}</p>
                                    </div>
                                    <div className='modal-footer'>
                                        <button className='btn btn-block btn-primary' onClick={() => confirm.Action()}>Yes</button>
                                        <button className='btn btn-block' onClick={() => RemoveConfirm()}>No</button>
                                    </div>
                                </Modal>;   
};

export default Confirm;