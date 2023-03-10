import {
  bodyUserType,
  userType,
  bodyProjectCardType,
  bodyProjectColumnsType,
  bodyProjectType,
  ProjectCardType,
  ProjectColumnsType,
  ProjectType,
} from './types';
import * as qs from 'qs';
import {
  addUser,
  getUser,
  getProjects,
  getColumn,
  getCard,
  addProject,
  addColumn,
  addCard,
  changeCard,
  changeColumn,
  changeProject,
  changeUser,
  deleteCard,
  deleteColumn,
  deleteProject,
} from './api';
import { user } from './registrationForm';
export const bases = 'https://srv-trello-clone.onrender.com';

export const getFullDataUser = async (user: userType) => {
  if (
    user.projects &&
    user.projects.length !== 0 &&
    (user.projects as string[]).filter(pr => pr !== undefined || null)
      .length !== 0
  ) {
    user.projects.map(async (el, ind) => {
      const newPr: ProjectType = await getProjects(el as string);
      user.projects.splice(ind, 1, newPr as ProjectType);
      if (
        (user.projects[ind] as ProjectType).columns &&
        (user.projects[ind] as ProjectType).columns.length !== 0 &&
        ((user.projects[ind] as ProjectType).columns as string[]).filter(
          pr => pr !== undefined || null
        ).length !== 0
      ) {
        (user.projects[ind] as ProjectType).columns.map(async (elm, indx) => {
          const newCol: ProjectColumnsType = await getColumn(elm as string);
          (user.projects[ind] as ProjectType).columns.splice(
            indx,
            1,
            newCol as ProjectColumnsType
          );
          if (
            (
              (user.projects[ind] as ProjectType).columns[
                indx
              ] as ProjectColumnsType
            ).cards &&
            (
              (user.projects[ind] as ProjectType).columns[
                indx
              ] as ProjectColumnsType
            ).cards.length !== 0 &&
            (
              (
                (user.projects[ind] as ProjectType).columns[
                  indx
                ] as ProjectColumnsType
              ).cards as string[]
            ).filter(pr => pr !== undefined || null).length !== 0
          ) {
            (
              (user.projects[ind] as ProjectType).columns[
                indx
              ] as ProjectColumnsType
            ).cards.map(async (e, i) => {
              const newCard: ProjectCardType = await getCard(e as string);
              (
                (user.projects[ind] as ProjectType).columns[
                  indx
                ] as ProjectColumnsType
              ).cards.splice(i, 1, newCard as ProjectCardType);
            });
          }
        });
      }
    });
  }
  return user;
};

export const addProjectToUser = async (
  user: userType,
  project: bodyProjectType
) => {
  const newProject = await addProject(project);
  const projectString: string[] = (user.projects as ProjectType[]).map(
    item => item._id
  );
  const newProjectStirng = [...projectString, newProject._id];
  const { _id, login, password, name, surname } = user;
  let changedUser = await getFullDataUser(
    await changeUser(_id, {
      login,
      password,
      name,
      surname,
      projects: newProjectStirng,
    })
  );
  return changedUser;
};

export const addColumnToUser = async (
  user: userType,
  idProject: number,
  column: bodyProjectColumnsType
) => {
  const project: ProjectType = (user.projects as ProjectType[]).find(
    el => el.id === idProject
  )!;
  const projectColumns = project.columns as ProjectColumnsType[];
  const newColumn = await addColumn(column);
  const newProjectColumns = [...projectColumns, newColumn].map(
    item => item._id
    );
  const { id, name, key, lead, type, checked } = project;
  const _id = project._id;
  const changedProject = await changeProject(_id, {
    id,
    name,
    key,
    lead,
    type,
    checked,
    columns: !newProjectColumns.length ? [] : newProjectColumns,
  });
  return await getFullDataUser(await getUser(user.login));
  // (project.columns as ProjectColumnsType[]).push(await addColumn(column));
  // const index = (user.projects as ProjectType[]).findIndex(
  //   project => project._id === _id
  // );
  // (user.projects as ProjectType[]).splice(index, 1, changedProject);
  // const projecta: string[] = (user.projects as ProjectType[]).map(
  //   (project: ProjectType) => {
  //     return project._id;
  //   }
  // );

};

export const addCardToUser = async (
  user: userType,
  idProject: number,
  idColumn: number,
  card: bodyProjectCardType
) => {
  const project: ProjectType = (user.projects as ProjectType[]).filter(
    el => el.id === idProject
  )[0];
  const column: ProjectColumnsType = (
    project.columns as ProjectColumnsType[]
  ).filter(el => el.id === idColumn)[0];
  const newCard= await addCard(card);
  const columnCards=(project.columns as ProjectColumnsType[]);
  const newColumnCards = [...columnCards, newCard].map(
    item => item._id
    );
    const {id, title} =column;
    const _id = column._id;
    const changedColumn = await changeColumn(_id, {
      id,
      title,
      cards: !newColumnCards.length ? [] : newColumnCards,
    });
    return await getFullDataUser(await getUser(user.login));
    /*const index = (user.projects as ProjectType[]).findIndex(
      proj => proj._id === project._id
    );*/
    /*const indexCol = (project.columns as ProjectColumnsType[]).findIndex(
      col => col._id === column._id
    );
    
    (column.cards as ProjectCardType[]).push()*/
    /*(project.columns as ProjectColumnsType[]).splice(indexCol, 1, changedColumn);
  const colunmString = (project.columns as ProjectColumnsType[]).map(
    col => col._id
    );
  const { id, name, key, lead, type, checked } = project;
  const changedProject = await changeProject(project._id, {
    id,
    name,
    key,
    lead,
    type,
    checked,
    columns: colunmString,
  });
  (user.projects as ProjectType[]).splice(index, 1, changedProject);
  const projecta: string[] = (user.projects as ProjectType[]).map(
    (project: ProjectType) => {
      return project._id;
    }
  );
  const changedUser = await getFullDataUser(
    await changeUser(user._id, {
      login: user.login,
      password: user.password,
      name: user.name,
      surname: user.surname,
      projects: projecta,
    })
  );
  return changedUser;*/
};

export const changeProjectToUser = async (
  user: userType,
  idProject: number
) => {
  const project: ProjectType = (user.projects as ProjectType[]).filter(
    el => el.id === idProject
  )[0];

  const bodyProject = {
    id: project.id,
    name: project.name,
    key: project.key,
    lead: project.lead,
    type: project.type,
    checked: !project.checked,
    columns: (project.columns as ProjectColumnsType[]).map(item => item._id),
  };
  await changeProject(project._id, bodyProject);
  return await getFullDataUser(await getUser(user.login));
};

export const deleteProjectToUser = async (
  user: userType,
  idProject: number
) => {
  const project: ProjectType = (user.projects as ProjectType[]).filter(
    el => el.id === idProject
  )[0];
  const index = (user.projects as ProjectType[]).findIndex(
    proj => proj._id === project._id
  );
  console.log(await deleteProject(project._id));
  const projectString: string[] = (user.projects as ProjectType[])
    .filter((project: ProjectType) => project.id !== idProject)
    .map(item => item._id);
  console.log(user.projects);
  const { _id, login, password, name, surname } = user;

  let changedUser = await changeUser(_id, {
    login,
    password,
    name,
    surname,
    projects: !projectString.length ? [] : projectString,
  });
  await getFullDataUser(changedUser);
  return changedUser;
};

export const changeColumnToUser = async (
  user: userType,
  idProject: number,
  idColumn: number
) => {
  const project: ProjectType = (user.projects as ProjectType[]).filter(
    el => el.id === idProject
  )[0];
  const column: ProjectColumnsType = (
    project.columns as ProjectColumnsType[]
  ).filter(el => el.id === idColumn)[0];
  const bodyColumn = {
    id: column.id,
    title: column.title,
    cards: (column.cards as ProjectCardType []).map(item => item._id),
  };
  
  await changeColumn(column._id, bodyColumn)
  return await getFullDataUser(await getUser(user.login));
  /*const index = (user.projects as ProjectType[]).findIndex(
    proj => proj._id === project._id
  );*/
  /*const indexCol = (project.columns as ProjectColumnsType[]).findIndex(
    col => col._id === column._id
  );*/
  /*(user.projects as ProjectType[])[index].columns.splice(
    indexCol,
    1,*/
  /*);

  const changedUser = await changeProjectToUser(user, project.id);
  return changedUser;*/
};

export const deleteColumnToUser = async (
  user: userType,
  idProject: number,
  idColumn: number
) => {
  const project: ProjectType = (user.projects as ProjectType[]).filter(
    el => el.id === idProject
  )[0];

  const column: ProjectColumnsType = (
    project.columns as ProjectColumnsType[]
    ).filter(el => el.id === idColumn)[0];
    console.log(await deleteColumn(column._id));
    
    const newProjectColumns: string[] = (project.columns as ProjectColumnsType[])
    .filter((column: ProjectColumnsType) => column.id !== idColumn)
    .map(item => item._id);
    const { id, name, key, lead, type, checked } = project;
    const _id = project._id;
    const changedProject = await changeProject(_id, {
      id,
      name,
      key,
      lead,
      type,
      checked,
      columns: !newProjectColumns.length ? [] : newProjectColumns,
    });
    return await getFullDataUser(await getUser(user.login));
    /*const index = (user.projects as ProjectType[]).findIndex(
      proj => proj._id === project._id
    );*/
  /*const indexCol = (project.columns as ProjectColumnsType[]).findIndex(
    col => col._id === column._id
  );*/
  /*(user.projects as ProjectType[])[index].columns.splice(indexCol, 1);*/
    /*(user.projects as ProjectType[])[index].columns = columnString;*/

  /*const changedUser = await changeProjectToUser(
    user,
    (user.projects[index] as ProjectType).id
  );
  return changedUser;*/

};

export const deleteCardToUser = async (
  user: userType,
  idProject: number,
  idColumn: number,
  idCard: number
) => {
  const project: ProjectType = (user.projects as ProjectType[]).filter(
    el => el.id === idProject
  )[0];
  const column: ProjectColumnsType = (
    project.columns as ProjectColumnsType[]
    ).filter(el => el.id === idColumn)[0];
    const card: ProjectCardType = (column.cards as ProjectCardType[]).filter(
      el => el.id === idCard
      )[0];
      console.log(await deleteCard(card._id));
      const newColumnCards: string[] = (column.cards as ProjectCardType[])
      .filter((card: ProjectCardType) => card.id !== idCard)
      .map(item => item._id);
      
      const {id, title} =column;
      const _id = column._id;
      const changedColumn = await changeColumn(_id, {
        id,
        title,
        cards: !newColumnCards.length ? [] : newColumnCards,
      });
      return await getFullDataUser(await getUser(user.login));
    
     /* const index = (user.projects as ProjectType[]).findIndex(
        proj => proj._id === project._id
      );*/
  /*const indexCol = (project.columns as ProjectColumnsType[]).findIndex(
    col => col._id === column._id
  );*/
  /*const indCard = (
    ((user.projects as ProjectType[])[index].columns as ProjectColumnsType[])[
      indexCol
    ].cards as ProjectCardType[]
  ).findIndex(c => c._id === card._id);*/
  /*((user.projects as ProjectType[])[index].columns as ProjectColumnsType[])[
    indexCol
  ].cards.splice(indCard, 1);*/
  /*const cardString: string[] = (
    ((user.projects as ProjectType[])[index].columns as ProjectColumnsType[])[
      indexCol
    ].cards as ProjectCardType[]
  ).map((c: ProjectCardType) => c._id);
  ((user.projects as ProjectType[])[index].columns as ProjectColumnsType[])[
    indexCol
  ].cards = cardString;
  const changedUser = await changeColumnToUser(
    user,
    (user.projects[index] as ProjectType).id,
    (
      (user.projects[index] as ProjectType).columns[
        indexCol
      ] as ProjectColumnsType
    ).id
  );
  return changedUser;*/


};
