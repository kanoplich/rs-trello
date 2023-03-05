import * as React from 'react';
import { getFullDataUser } from './function-API';
import { user } from './registrationForm';

import {
  bodyUserType,
  ProjectTypeNew,
  ProjectType,
  BoardsType,
  CardsType,
  userType,
  ProjectColumnsType,
  ProjectCardType,
} from './types';





export function adapterFromServer (user:userType) {
 /* user=  getFullDataUser(user);*/
  let projNotServer:ProjectTypeNew[]=[];
  const projCount:number= user.projects.length;
  if (projCount!==0) {
    for (let i=0; i<projCount; i++) {
    const p=user.projects[i] as ProjectType;
     const projectN: ProjectTypeNew={id:p.id,
                                 name: p.name,
                                 key: p.key,
                                 lead: p.lead,
                                 type: p.type,
                                 checked: p.checked,
                                 columns:[]
                                };
    const colCount = p.columns.length;
    const ColumnsNotServer:BoardsType[]=[];
    for (let j=0; j<colCount; j++) {
      const cardsNotServer:CardsType[]=[];
      const n=((user.projects[i] as ProjectType).columns[j] as ProjectColumnsType);
      const columnN:BoardsType={id: n.id,
                                title: n.title,
                                cards:[]
                               };
      n.cards.map(el=>{
        const {id, text}=el as ProjectCardType;
        cardsNotServer.push({id,text});
      })
      columnN.cards=(cardsNotServer);
      ColumnsNotServer.push(columnN);
   }
  projectN.columns=ColumnsNotServer;
  projNotServer.push(projectN);
   }
  }
 return projNotServer
}




 /* let proj: ProjectType []=[];
 (user.projects as ProjectServerType[]).map(project=>{
   let columns: BoardsType []=[];
   (project.columns as BoardsType[])=(project.columns as ProjectServerColumnsType[]).map(column=>{
     let cards: CardsType []=[];
     (column.cards as ProjectServerCardType[]).map(card=>{
       const {id, text} = card;
       cards.push({id,  text});
    })
    console.log(cards);
    (column.cards as CardsType[])=cards;
    return column
  })

  })*/


    

  

/*
    const {id, title, cards} = el;
    columns.push({id,  title, cards});
  })
   const {id, name, key, lead, type, checked, columns} = el;
   proj.push({id, name, key, lead, type, checked, columns});
 })
 return proj
}
/*
export function adapterUserColumns (proj:ProjectType) {
  let columns: BoardsType []=[];
 (proj.columns as ProjectServerColumnsType[]).map(el=>{
   const {id, title, cards} = el;
   columns.push({id,  title, cards});
 })
 return columns
}

export function adapterUserCards (column:BoardsType) {
  let cards: CardsType []=[];
 (column.cards as ProjectServerCardsType[]).map(el=>{
   const {id, text} = el;
   cards.push({id,  text});
 })
 return cards
}*/

