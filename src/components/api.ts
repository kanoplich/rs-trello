import { bodyUserType, userType } from "./types";

export const bases = 'https://srv-trello-clone.onrender.com/';



export const getUser = async (login:string)=> (await fetch (`${bases}/${login}`,
{mode: 'no-cors',
method: "GET",
}));

export const addUser = async (user:bodyUserType) => (await fetch ( `${bases}/`, {
    mode: 'no-cors',
    method: "POST",
    body: JSON.stringify(user),
    headers: {
        'Content-Type':"application/json"
    },
  }))
