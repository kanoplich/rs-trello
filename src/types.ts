export interface ProjectType {
  name: string;
  key: string;
  lead: string;
  type: string;
  id: number;
  checked: boolean;
  columns: BoardsType[];
}
// {
//   // [keyof: string]: string[] | string;
// };

export type ProjectModalType = {
  projectName: string;
  columnName: string;
  typeField: string;
  teamLead: string;
};

export interface BoardsType {
  title: string;
  id: number;
  cards: CardsType[];
  idProject?: number;
}

export interface CardsType {
  id: number;
  text: string;
  idProject?: number;
  idCard?: number;
}

export interface ISort {
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
  idProject: number;
}