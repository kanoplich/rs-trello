import { bodyUserType, userType, bodyProjectCardType, bodyProjectColumnsType, bodyProjectType, ProjectCardType, ProjectColumnsType, ProjectType } from "./types";
import * as qs from 'qs'
import { addUser, getUser, getProjects, getColumn, getCard, 
  addProject, addColumn, addCard, changeCard, changeColumn, 
  changeProject, changeUser, deleteCard, deleteColumn, deleteProject} from './api';
export const bases = 'http://localhost:3001';



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

export const  addColumnToUser = async ( user:userType, project:ProjectType, column:bodyProjectColumnsType) =>{
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

 export const  addCardToUser = async ( user:userType, project:ProjectType, column:ProjectColumnsType, card:bodyProjectCardType) =>{
 /* const newCard:ProjectCardType= await addCard(card);*/
  (column.cards as ProjectCardType[]).push(await addCard(card));
  const cardString= (column.cards as ProjectCardType[]).map(col=>col._id);
  const changedColumn= await changeColumn (column._id, { id:column.id, title:column.title, cards:cardString});
  const indexCol=(project.columns as ProjectColumnsType[]).findIndex(col=>col._id===column._id);
  (project.columns as ProjectColumnsType[]).splice(indexCol, 1, changedColumn);
  const colunmString= (project.columns as ProjectColumnsType[]).map(col=>col._id);
  const { id, name, key, lead, type, checked,} =project;
  const changedProject=await changeProject (project._id, { id, name, key, lead, type, checked, columns:colunmString});
  const index=(user.projects as ProjectType[]).findIndex(proj=> proj._id===project._id);
  (user.projects as ProjectType[]).splice(index, 1, changedProject);
  const projecta:string[] =(user.projects as ProjectType[]).map((project:ProjectType) => {;
    return   project._id});
  const changedUser=/* await changeUser(user._id, {login:user.login, password: user.password, name: user.name, surname:user.surname,  projects:projecta});*/
  await getFullDataUser(await changeUser(user._id, {login:user.login, password: user.password, name: user.name, surname:user.surname,  projects:projecta}));
  return changedUser
 }

 export const  changeProjectToUser = async ( user:userType, project:ProjectType) =>{
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

 export const  deleteProjectToUser = async ( user:userType, project:ProjectType) =>{
  /*const newProject:ProjectType= await addProject(project);
  console.log(newProject);*/
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
 