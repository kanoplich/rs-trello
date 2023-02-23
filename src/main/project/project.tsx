import React, { useEffect } from "react";
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
import { getProjectsProjects, getActiveProjectId, getSearchCards, getActiveProjectIndex } from "../../store/selectors";
import { BtnAddCard } from "./components/BtnCardAdd";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { sortDragAndDrop, setActiveProjectIndex } from "../../store/actions";
import { useDispatch } from "react-redux";


export default function Project() {

  const [isBoardOpen, setBoardOpen] = useState(false);
  const projects = useSelector(getProjectsProjects);
  let idProject = useSelector(getActiveProjectId);
  let indexProject = useSelector(getActiveProjectIndex);
  const { name } = useParams();
  const dispatch = useDispatch();
  const searchCards = useSelector(getSearchCards);

  const boards = projects.filter((item, index) => {
    if (idProject && item.id === idProject) {
      indexProject = index;
      return item.columns;
    } else if (!idProject && item.name === name) {
      idProject = item.id;
      indexProject = index;
      return item.columns;
    }
  });
  
  useEffect(() => {
    dispatch(setActiveProjectIndex(indexProject))
  })

  const onDragEnd = (result: DropResult) => {

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    dispatch(sortDragAndDrop({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
      indexProject,
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
          <div className="breadcrumbs__link">
            {boards[0].name}
          </div>
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
                    boards[0].columns.map((elem, i) => <ProjectBoard searchParams={searchCards[i]} data={elem} idProject={idProject} key={elem.id} />)
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
