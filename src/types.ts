export interface ProjectType {
  name: string;
  key: string;
  lead: string;
  type: string;
  id: number;
  checked: boolean;
  columns: unknown;
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
