import { useEffect, useRef } from 'react';
import {createPortal} from 'react-dom'

export default function Modal({children,open,onClose,className=''}){
    const dialog = useRef();

    useEffect(() => {
        //dialog 지정값이 변할 수도 있기 때문에, useEffect에서 처음에 지정한 값을 저장함.
        const modal = dialog.current;
        if(open){
            modal.showModal();
        }

        return () => modal.close();
    },[open]);
    return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>,
    document.getElementById('modal'));
}