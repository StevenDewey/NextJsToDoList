import { User } from '../interfaces'
import React, { Dispatch, SetStateAction, useState } from 'react'
import styles from './ToDo.module.css'
import { Button, Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItem, ToDoTask, updateItem } from '../services/firebaseService';

type Props = {
  index: number,
  item: ToDoTask,
  toDoList: ToDoTask[],
  setToDoList: Dispatch<SetStateAction<ToDoTask[]>>
}

const ToDoItem = ({ index, item, toDoList, setToDoList }: Props) => {
  const [isComplete, setIsComplete] = useState(item.isComplete);
  const deleteToDoItem = () => {
    const newToDoList = toDoList.slice();
    deleteItem(newToDoList[index].item);
    //newToDoList.splice(index, 1);
    //setToDoList(newToDoList);
  }

  const completeItem = (): void => {
    updateItem(item.id, item.item, !isComplete);
    setIsComplete(!isComplete);
  }

  return (
  <ListItem key={item.id} secondaryAction={
    <IconButton onClick={deleteToDoItem}>
      <DeleteIcon />
    </IconButton>
  }
  disablePadding>
    <ListItemButton role={undefined} onClick={completeItem} dense>
      <ListItemIcon>
      <Checkbox
        edge="start"
        checked={isComplete}
        tabIndex={-1}
        disableRipple
      />
      </ListItemIcon>
      <ListItemText id={index.toString()} primary={item.item} />
    </ListItemButton>
    {/* <Checkbox onChange={} /><span className={isComplete ? styles.strikeThrough : ''}>{item}</span> */}

  </ListItem>
)}

export default ToDoItem
