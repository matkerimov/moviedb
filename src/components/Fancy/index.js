import React, {useState} from 'react';
import ModalVideo from 'react-modal-video'

const Fancy = ({id}) => {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)}/>
            <button className="btn-primary" onClick={() => setOpen(true)}>VIEW Trailers</button>
        </>
    );
};

export default Fancy;