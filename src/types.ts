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
}

export interface CardsType {
  id: number;
  text: string;
}
