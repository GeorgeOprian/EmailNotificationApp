import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ModalComponentTypes } from './modal.component.types';
import { observer } from 'mobx-react-lite';
import { GlobalState } from '../../mobx/globalState';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = observer(({
    body,
    isOpen
}: ModalComponentTypes) => {


  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {body}
        </Box>
      </Modal>
    </div>
  );
})

export default ModalComponent;