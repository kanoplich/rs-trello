import { bodyUserType, userType } from "./types";
import * as qs from 'qs'
import { json } from "stream/consumers";

export const bases = 'https://srv-trello-clone.onrender.com';



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

  /*export const changeUser =async (user:bodyUserType):Promise<userType>=> (await fetch ( `${bases}`, {
    credentials: 'include',
    method: "Put",
    body: qs.stringify(user),
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })).json();*/

  export const getProjects = async (id:string)=> await fetch (`${bases}/projects/${id}`).then(res=> res.json());
 /* export const addProject =async (user:bodyUserType):Promise<userType>=> await fetch ( `${bases}`, {
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
  }).catch(rej=>console.log(rej));*/
  export const getColumn = async (id:string)=> await fetch (`${bases}/projects/columns/${id}`).then(res=> res.json());
  export const getCard = async (id:string)=> await fetch (`${bases}/projects/columns/cards/${id}`).then(res=> res.json());