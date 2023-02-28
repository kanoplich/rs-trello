export type userType = {
    _id: string,
    login: string,
    password: string,
    name: string,
    surname: string,
    projects: Array<string>|Array<ProjectType>
  };
  
  export type bodyUserType = {
    login: string,
    password: string,
    name: string,
    surname: string,
    projects: string[]
  };
  
  export type ProjectType ={
    _id: string,
    id: number,
    name: string,
    key: string,
    lead: string,
    type: string,
    checked: boolean,
    columns: ProjectColumnsType[]|string[],
  };
  
  export type bodyProjectType= {
    id: number,
    name: string,
    key: string,
    lead: string,
    type: string,
    checked: boolean,
    columns: ProjectColumnsType[]|string[],
  };
  
  export type ProjectColumnsType ={
    id: number,
    title: string,
    _id: string,
    cards: ProjectCardType[]|string[]
  };
  
  export type bodyProjectColumnsType ={
    id: number,
    title: string,
    cards: ProjectCardType[]|string[]
  };
  
  export type ProjectCardType= {
    id: number,
    _id: string,
    text: string
  }
  
  export type bodyProjectCardType= {
    id: number,
    text: string
  }
  
  export type ProjectTypeNew= {
    name: string;
    key: string;
    lead: string;
    type: string;
    id: number;
    checked: boolean;
    columns: BoardsType[];
  }
  
 
  export type BoardsType = {
    title: string;
    id: number;
    cards: CardsType[];
    idProject?: number;
  }
  
  export type CardsType = {
    id: number;
    text: string;
    idProject?: number;
    idCard?: number;
  }
  
  