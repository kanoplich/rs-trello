import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

type DrawerProps = {
  boardOpen: boolean,
  closeBoard: () => void,
}


export function ProjectAside(props: DrawerProps) {
  const {
    boardOpen,
    closeBoard,
  } = props

  return (
    <Drawer
      anchor="left"
      open={boardOpen}
      onClose={closeBoard}
    >
      <List sx={{ width: "220px" }}>
        <ListItemText primary="Board" />
      </List>
    </Drawer>
  );
}