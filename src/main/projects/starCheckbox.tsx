import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export default function StarCheckBox({ check }: { check: boolean }) {
  return (
    <div>
      <Checkbox
        icon={<StarBorderOutlinedIcon />}
        checkedIcon={<StarOutlinedIcon />}
        checked={check}
      />
    </div>
  );
}
