import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjectModal } from '../../store/selectors';
import { checkProjectModal, hideModalView } from '../../store/actions';
import ModalBody from './modal-body';
import ModalHeader from './modal-header';
import { Button } from '@mui/material';

const styleBig = {
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
const styleSmall = {
  position: 'absolute' as 'absolute',
  boxSizing: 'border-box',
  right: 0,
  bottom: '5rem',
  minWidth: 320,
  width: '100%',
  maxWidth: 360,
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
  bgcolor: 'background.paper',
};

export default function CreateProjectModal() {
  const dispatch = useDispatch();
  const modal = useSelector(selectProjectModal);
  const handleClose = () => dispatch(checkProjectModal(false));
  const modalStyles =
    modal.view === 'small'
      ? {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          top: 'unset',
        }
      : {
          top: '0',
        };
  return (
    <div
      style={
        modal.isHidden
          ? {
              position: 'absolute',
              bottom: '5rem',
              right: 0,
            }
          : {
              display: 'block',
            }
      }
    >
      <Modal
        open={modal.isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        BackdropProps={{
          style: modalStyles,
        }}
        sx={
          modal.view === 'big'
            ? { top: 0, bottom: 0, right: 0, left: 0 }
            : {
                top: 'unset',
              }
        }
      >
        <Box sx={modal.view === 'big' ? styleBig : styleSmall}>
          <ModalHeader />
          <ModalBody />
        </Box>
      </Modal>
      {modal.isHidden && (
        <Button
          sx={{ width: '12rem' }}
          variant='contained'
          onClick={() => {
            dispatch(checkProjectModal(true));
            dispatch(hideModalView(false));
          }}
        >
          Summary
        </Button>
      )}
    </div>
  );
}
