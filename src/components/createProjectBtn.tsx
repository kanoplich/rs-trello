import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export let openCreateProject = false;
export default function CreateBtn({text}:{text:string}){
    const navigate = useNavigate()
    return  <Button variant="text" sx={{color:"inherit",maxHeight:"2.25rem",margin:"auto 0"}} onClick={() => {
        navigate('/projects')
    }}>{text}</Button>
}
