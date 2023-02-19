import React from "react";
import "./project.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Breadcrumbs, Box, IconButton } from "@mui/material/";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchField from "../../components/searchField";
import { routes } from "../main";
import { ProjectAside } from "./components/projectAside";
import { ProjectBoard } from "./components/projectBoard";
import { useSelector } from "react-redux";
import { getProjectsProjects } from "../../store/selectors";
import { BtnAddCard } from "./components/BtnCardAdd";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { sortDragAndDrop } from "../../store/actions";
import { useDispatch } from "react-redux";


export default function Project() {

  const [isBoardOpen, setBoardOpen] = useState(false);
  const projects = useSelector(getProjectsProjects);
  const { name } = useParams();
  const dispatch = useDispatch();

  let idProject = 1;


  const boards = projects.filter(item => {
    if (item.name === name) {
      idProject = item.id;
      return item.columns;
    }
  });

  console.log(boards)


  const onDragEnd = (result: DropResult) => {

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(sortDragAndDrop({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
      idProject,
    }))

  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          overflowX: 'scroll',
          maxHeight: '100vh',
        }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 2 }}>
          <Link className="breadcrumbs__link"
            to={routes[1].path}
          >
            Projects
          </Link>
          <Link className="breadcrumbs__link"
            to="projects/:name/*"
          >
            {boards[0].name}
          </Link>
        </Breadcrumbs>
        <h2 className="projects__title">{boards[0].key} board</h2>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <IconButton onClick={() => setBoardOpen(true)}>
            <AddCircleIcon />
          </IconButton>
          <SearchField />
        </Box>
        <Box sx={{
          display: "flex",
          alignItems: "baseline",
          gap: "20px",
          paddingBottom: "10px",
          paddingTop: "2px",
        }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <div className="board__container" {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    boards[0].columns.map((elem, index) => <ProjectBoard data={elem} idProject={idProject} key={elem.id} />)
                  }
                </div>
              )}
            </Droppable>
            <BtnAddCard data={boards[0]} />
          </DragDropContext>
        </Box>
      </Container>
      <ProjectAside
        boardOpen={isBoardOpen}
        closeBoard={() => setBoardOpen(false)}
      />
    </>
  );
}
