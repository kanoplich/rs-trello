import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export default function StarCheckBox() {
  return (
    <div>
      <Checkbox
        icon={<StarBorderOutlinedIcon />}
        checkedIcon={<StarOutlinedIcon />}
      />
    </div>
  );
}