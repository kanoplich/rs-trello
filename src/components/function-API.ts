import { bodyUserType, userType, bodyProjectCardType, bodyProjectColumnsType, bodyProjectType, ProjectCardType, ProjectColumnsType, ProjectType } from "./types";
import * as qs from 'qs'
import { addUser, getUser, getProjects, getColumn, getCard, 
  addProject, addColumn, addCard, changeCard, changeColumn, 
  changeProject, changeUser, deleteCard, deleteColumn, deleteProject} from './api';
  import { user } from "./registrationForm";
export const bases = 'https://srv-trello-clone.onrender.com';



export const  getFullDataUser = async (user:userType) => {
  if ((user.projects)&&(user.projects.length!==0)&&((user.projects as string[]).filter((pr)=>pr!==undefined||null).length!==0)) {
  user.projects.map(async (el, ind) =>{
    const  newPr:ProjectType = await getProjects(el as string);
    user.projects.splice(ind, 1,(newPr as ProjectType));
    if (((user.projects[ind] as ProjectType).columns)&&
      ((user.projects[ind] as ProjectType).columns.length!==0) 
          &&(((user.projects[ind] as ProjectType).columns as string[]).filter((pr)=>pr!==undefined||null).length!==0)) {
     (user.projects[ind] as ProjectType).columns.map(async (elm, indx) =>{
       const  newCol:ProjectColumnsType = await getColumn(elm as string);
       (user.projects[ind] as ProjectType).columns.splice(indx, 1, (newCol as ProjectColumnsType));
       if ((((user.projects[ind] as ProjectType).columns[indx] as ProjectColumnsType).cards)&&
        (((user.projects[ind] as ProjectType).columns[indx] as ProjectColumnsType).cards.length!==0)
              && ((((user.projects[ind] as ProjectType).columns[indx] as ProjectColumnsType).cards as string[]).filter((pr)=>pr!==undefined||null).length!==0)) {
       ((user.projects[ind] as ProjectType).columns[indx] as ProjectColumnsType).cards.map(async (e, i) =>{
          const  newCard:ProjectCardType = await getCard(e as string);
          ((user.projects[ind] as ProjectType).columns[indx] as ProjectColumnsType).cards.splice(i, 1, (newCard as ProjectCardType));
         })}
 })}
})}
return user
}

export const  addProjectToUser = async ( user:userType, project:bodyProjectType) =>{

 /*const newProject:ProjectType= await addProject(project);
 console.log(newProject);*/
 (user.projects as ProjectType[]).push(await addProject(project));
 /*const array=  (user.projects as ProjectType[]);*/
 const projectString:string[] =(user.projects as ProjectType[]).map((project:ProjectType) => project._id);
 const {_id, login, password, name, surname} =user;
 let changedUser= /*await changeUser(_id, {login, password, name, surname,  projects:projectString});*/
 await getFullDataUser(await changeUser(_id, {login, password, name, surname,  projects:projectString}));
 return changedUser
}

export const  addColumnToUser = async ( user:userType, idProject:number, column:bodyProjectColumnsType) =>{
  const project:ProjectType = ((user.projects as ProjectType[]).filter(el=> el.id===idProject))[0];
 /* const newColumn:ProjectColumnsType= await addColumn(column);
  console.log(newColumn);*/
  (project.columns as ProjectColumnsType[]).push( await addColumn(column));
  const { id, name, key, lead, type, checked, columns} =project;
  const _id=project._id;
  const changedProject=await changeProject (_id, { id, name, key, lead, type, checked, columns});
  const index=(user.projects as ProjectType[]).findIndex(project=> project._id===_id);
  (user.projects as ProjectType[]).splice(index, 1, changedProject);
  const projecta:string[] =(user.projects as ProjectType[]).map((project:ProjectType) => {
    return   project._id});
  const changedUser= await changeUser(user._id, {login:user.login, password: user.password, name: user.name, surname:user.surname,  projects:projecta});
  await getFullDataUser(changedUser);
  return changedUser
 }

 export const  addCardToUser = async ( user:userType, idProject:number, idColumn:number, card:bodyProjectCardType) =>{
  const project:ProjectType = ((user.projects as ProjectType[]).filter(el=> el.id===idProject))[0];
  const index=(user.projects as ProjectType[]).findIndex(proj=> proj._id===project._id);
  const column:ProjectColumnsType = ((project.columns as ProjectColumnsType[]).filter(el=> el.id===idColumn))[0];
  const indexCol=(project.columns as ProjectColumnsType[]).findIndex(col=>col._id===column._id);

 /* const newCard:ProjectCardType= await addCard(card);*/
  (column.cards as ProjectCardType[]).push(await addCard(card));
  const cardString= (column.cards as ProjectCardType[]).map(col=>col._id);
  const changedColumn= await changeColumn (column._id, { id:column.id, title:column.title, cards:cardString});
  (project.columns as ProjectColumnsType[]).splice(indexCol, 1, changedColumn);
  const colunmString= (project.columns as ProjectColumnsType[]).map(col=>col._id);
  const { id, name, key, lead, type, checked,} =project;
  const changedProject=await changeProject (project._id, { id, name, key, lead, type, checked, columns:colunmString});
  (user.projects as ProjectType[]).splice(index, 1, changedProject);
  const projecta:string[] =(user.projects as ProjectType[]).map((project:ProjectType) => {;
    return   project._id});
  const changedUser=/* await changeUser(user._id, {login:user.login, password: user.password, name: user.name, surname:user.surname,  projects:projecta});*/
  await getFullDataUser(await changeUser(user._id, {login:user.login, password: user.password, name: user.name, surname:user.surname,  projects:projecta}));
  return changedUser
 }

 export const  changeProjectToUser = async ( user:userType, idProject:number) =>{
  const project:ProjectType = ((user.projects as ProjectType[]).filter(el=> el.id===idProject))[0];
  /*const newProject:ProjectType= await addProject(project);
  console.log(newProject);*/
  const bodyProject= {id:project.id, 
                      name:project.name,  
                      key:project.key, 
                      lead:project.lead, 
                      type:project.type , 
                      checked:project.checked, 
                      columns:project.columns};
  const index= (user.projects as ProjectType[]).findIndex(proj=> proj._id===project._id);
  (user.projects as ProjectType[]).splice(index, 1, (await changeProject(project._id, bodyProject )));
  /*const array=  (user.projects as ProjectType[]);*/
  const projectString:string[] =(user.projects as ProjectType[]).map((project:ProjectType) => project._id);
  const {_id, login, password, name, surname} =user;
  let changedUser= /*await changeUser(_id, {login, password, name, surname,  projects:projectString});*/
  await getFullDataUser(await changeUser(_id, {login, password, name, surname,  projects:projectString}));
  return changedUser
 }

 export const  deleteProjectToUser = async ( user:userType, idProject:number) =>{
  /*const newProject:ProjectType= await addProject(project);
  console.log(newProject);*/
  const project:ProjectType = ((user.projects as ProjectType[]).filter(el=> el.id===idProject))[0];
  const index= (user.projects as ProjectType[]).findIndex(proj=> proj._id===project._id);
  (user.projects as ProjectType[]).splice(index, 1);
  console.log(await deleteProject(project._id));
  const projectString:string[] =(user.projects as ProjectType[]).map((project:ProjectType) => project._id);
  /*const array=  (user.projects as ProjectType[]);*/
  console.log(user.projects);
  const {_id, login, password, name, surname} =user;

  let changedUser= await changeUser(_id, {login, password, name, surname,  projects:projectString});
  await getFullDataUser(changedUser);
  return changedUser
 }


 export const  changeColumnToUser = async ( user:userType, idProject:number, idColumn:number) =>{
  const project:ProjectType = ((user.projects as ProjectType[]).filter(el=> el.id===idProject))[0];
  const index=(user.projects as ProjectType[]).findIndex(proj=> proj._id===project._id);
  const column:ProjectColumnsType = ((project.columns as ProjectColumnsType[]).filter(el=> el.id===idColumn))[0];
  const indexCol=(project.columns as ProjectColumnsType[]).findIndex(col=>col._id===column._id);

  /*const newProject:ProjectType= await addProject(project);
  console.log(newProject);*/
  const bodyColumn= {id: column.id,
                      title: column.title,
                      cards: column.cards};

  (user.projects as ProjectType[])[index].columns.splice(indexCol, 1, (await changeColumn(column._id, bodyColumn )));

  const changedUser = await changeProjectToUser (user, project.id);
  return changedUser
 }

 export const  deleteColumnToUser = async ( user:userType,idProject:number, idColumn:number) =>{
  const project:ProjectType = ((user.projects as ProjectType[]).filter(el=> el.id===idProject))[0];

  const index=(user.projects as ProjectType[]).findIndex(proj=> proj._id===project._id);
  const column:ProjectColumnsType = ((project.columns as ProjectColumnsType[]).filter(el=> el.id===idColumn))[0];
  const indexCol=(project.columns as ProjectColumnsType[]).findIndex(col=>col._id===column._id);

  /*const newProject:ProjectType= await addProject(project);
  console.log(newProject);*/
  (user.projects as ProjectType[])[index].columns.splice(indexCol, 1);
  console.log(await deleteColumn(column._id));
  const columnString:string[] =((user.projects as ProjectType[])[index].columns as ProjectColumnsType[]).map(
    (col:ProjectColumnsType) =>column._id);
  (user.projects as ProjectType[])[index].columns= columnString;
  const changedUser = await changeProjectToUser (user, (user.projects[index] as ProjectType).id);
  return changedUser
 }

 export const  deleteCardToUser = async ( user:userType, idProject:number, idColumn:number, idCard:number) =>{
  const project:ProjectType = ((user.projects as ProjectType[]).filter(el=> el.id===idProject))[0];

  const index=(user.projects as ProjectType[]).findIndex(proj=> proj._id===project._id);
  const column:ProjectColumnsType = ((project.columns as ProjectColumnsType[]).filter(el=> el.id===idColumn))[0];
  const indexCol=(project.columns as ProjectColumnsType[]).findIndex(col=>col._id===column._id);
  const card:ProjectCardType = ((column.cards as ProjectCardType []).filter(el=> el.id===idCard))[0];
  const indCard = (((user.projects as ProjectType[])[index].columns as ProjectColumnsType[])[indexCol].cards as ProjectCardType[])
    .findIndex(c=> c._id===card._id);
  /*const newProject:ProjectType= await addProject(project);
  console.log(newProject);*/
  
  ((user.projects as ProjectType[])[index].columns as ProjectColumnsType[])[indexCol].cards.splice(indCard, 1);
  console.log(await deleteCard(card._id));

  const cardString:string[] =(((user.projects as ProjectType[])[index]
    .columns as ProjectColumnsType[])[indexCol].cards as ProjectCardType[]).map(
    (c:ProjectCardType) =>c._id);
  ((user.projects as ProjectType[])[index].columns as ProjectColumnsType[])[indexCol].cards= cardString;
  const changedUser = await changeColumnToUser (user, 
                                               (user.projects[index] as ProjectType).id, 
                                               ((user.projects[index] as ProjectType).columns[indexCol] as ProjectColumnsType).id);
  return changedUser
 }
