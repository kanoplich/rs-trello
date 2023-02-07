import React from "react";
import Button from '@mui/material/Button';
import { height } from "@mui/system";

export default function CreateBtn({text}:{text:string}){
return  <Button variant="text" sx={{color:"inherit",maxHeight:"2.25rem",margin:"auto 0"}}>{text}</Button>
}