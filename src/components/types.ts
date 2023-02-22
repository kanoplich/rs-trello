export type userType = {
    id: number,
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
    id: string,
    name: string,
    key: string,
    lead: string,
    type: string,
    checked: boolean,
    columns: ProjectColumnsType[]|string[],
  };
  
  export type bodyProjectType= {
    name: string,
    key: string,
    lead: string,
    type: string,
    checked: boolean,
    columns: ProjectColumnsType[]|string[],
  };
  
  export type ProjectColumnsType ={
    title: string,
    id: string,
    cards: ProjectCardType[]|string[]
  };
  
  export type bodyProjectColumnsType ={
    title: string,
    cards: ProjectCardType[]|string[]
  };
  
  export type ProjectCardType= {
    id: string,
    text: string
  }
  
  export type bodyProjectCardType= {
    text: string
  }
  
