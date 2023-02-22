import { bodyUserType, userType, bodyProjectCardType, bodyProjectColumnsType, bodyProjectType, ProjectCardType, ProjectColumnsType, ProjectType } from "./types";
import * as qs from 'qs'
import { json } from "stream/consumers";

export const bases = 'http://localhost:3001';



export const getUser = async (login:string)=> await fetch (`${bases}/${login}`).then(res=> res.json());

export const addUser =async (user:bodyUserType):Promise<userType>=> await fetch ( `${bases}`, {
    credentials: 'include',
    method: "POST",
    body: qs.stringify(user),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));

  export const changeUser =async (id:string, user:bodyUserType):Promise<userType>=> await fetch ( `${bases}/${id}`, {
    credentials: 'include',
    method: "Put",
    body: qs.stringify(user),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));
  


  export const getProjects = async (id:string)=> await fetch (`${bases}/projects/${id}`).then(res=> res.json());

  export const addProject =async (project:bodyProjectType):Promise<ProjectType>=> await fetch ( `${bases}/projects/`, {
    credentials: 'include',
    method: "POST",
    body: qs.stringify(project),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));

 
  export const changeProject =async (id:string, project:bodyProjectType):Promise<ProjectType>=> await fetch ( `${bases}/projects/${id}`, {
    credentials: 'include',
    method: "Put",
    body: qs.stringify(project),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));

  export const deteteProject =async (id:string):Promise<string>=> 
  await fetch ( `${bases}/projects/${id}`, {
    credentials: 'include',
    method: "delete"
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));



  export const getColumn = async (id:string)=> await fetch (`${bases}/projects/columns/${id}`).then(res=> res.json());

  export const addColumn =async (column:bodyProjectColumnsType):Promise<ProjectColumnsType>=>
   await fetch ( `${bases}/projects/columns`, {
    credentials: 'include',
    method: "POST",
    body: qs.stringify(column),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));

  export const changeColumn =async (id:string, column:bodyProjectColumnsType):Promise<ProjectColumnsType>=> 
  await fetch ( `${bases}/projects/columns/${id}`, {
    credentials: 'include',
    method: "Put",
    body: qs.stringify(column),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));

  export const deleteColumn =async (id:string):Promise<string>=> 
  await fetch ( `${bases}/projects/columns/${id}`, {
    credentials: 'include',
    method: "delete",
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));



  export const getCard = async (id:string)=> await fetch (`${bases}/projects/columns/cards/${id}`).then(res=> res.json());

  export const addCard =async (card:bodyProjectCardType):Promise<ProjectCardType>=> 
  await fetch ( `${bases}/projects/columns/cards`, {
    credentials: 'include',
    method: "POST",
    body: qs.stringify(card),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));

  export const changeCard =async (id:string, card:bodyProjectCardType):Promise<ProjectCardType>=> 
  await fetch ( `${bases}/projects/columns/cards/${id}`, {
    credentials: 'include',
    method: "Put",
    body: qs.stringify(card),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));

  export const deleteCard =async (id:string):Promise<string>=> 
  await fetch ( `${bases}/projects/columns/cards/${id}`, {
    credentials: 'include',
    method: "delete",
  }).then(res=>{
    if (res.status<400)
    {return res.json()
    } else {
      return `Error ${res.status}`
    }
  }).catch(rej=>console.log(rej));