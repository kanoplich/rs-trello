import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjectModal } from '../../store/selectors';
import { checkProjectModal } from '../../store/actions';
import ModalBody from './modal-body';
import ModalHeader from './modal-header';

const style = {
  position: 'absolute' as 'absolute',
  boxSizing: 'border-box',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  width: '100%',
  maxWidth: 640,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function CreateProjectModal() {
  const dispatch = useDispatch();
  const modal = useSelector(selectProjectModal);
  const handleClose = () => dispatch(checkProjectModal(false));
  return (
    <div>
      <Modal
        open={modal.isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <ModalHeader />
          <ModalBody />
        </Box>
      </Modal>
    </div>
  );
}
