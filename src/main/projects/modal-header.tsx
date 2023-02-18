import { Button } from '@mui/material';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {
  checkProjectModal,
  refreshColumnsInModal,
  refreshProjectModal,
} from '../../store/actions';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { selectProjectModal } from '../../store/selectors';
import { useSelector } from 'react-redux';

const controlStyle = {
  color: 'black',
  minWidth: 32,
};
export default function ModalHeader() {
  const dispatch = useDispatch();
  const modal = useSelector(selectProjectModal);
  return (
    <>
      <div className='modal_header'>
        <h2 className='modal_header_text'>Create Project</h2>
        <div className='modal_btns'>
          <Button sx={controlStyle}>
            <MinimizeIcon />
          </Button>
          <Button sx={controlStyle}>
            <UnfoldLessIcon sx={{ transform: 'rotate(45deg)' }} />
          </Button>
          <Button
            sx={controlStyle}
            onClick={() => {
              dispatch(checkProjectModal(false));
              dispatch(
                refreshProjectModal({
                  columnName: '',
                  projectName: '',
                  typeField: '',
                  teamLead: '',
                })
              );
              dispatch(refreshColumnsInModal(modal.defaultColumns));
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
