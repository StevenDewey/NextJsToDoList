import { Button, Container, List, TextField, Typography } from '@mui/material';
import Link from 'next/link'
import React, { useState } from 'react';
import Layout from '../components/Layout'
import ToDoItem from '../components/ToDoItem'
import styles from '../components/ToDo.module.css'
import { addNewItem, getItems, ToDoTask } from '../services/firebaseService';


const ToDo = () => {
  const [toDoItem, setToDoItem] = useState('');
  const initialToDos:ToDoTask[] = [];
  const [toDoList, setToDoList] = useState<ToDoTask[]>(initialToDos);

  getItems().then((result) => {
    setToDoList(result);
  });

  const handleChange = (event) => {
    setToDoItem(event.target.value);
  }

  const handleSubmit = (event) => {
    //const newList = toDoList.slice();
    //newList.push(toDoItem);
    //setToDoList(newList);
    event.preventDefault();
    addNewItem(toDoItem);
    setToDoItem('');
  }
  return(
  <Layout title="To Do List">
    <br></br>
    <Typography variant="h3" component="div" gutterBottom>To Do</Typography>
    <Container className={styles.ToDoContainer} maxWidth="sm">
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <TextField className={styles.formElement}  id="standard-basic" label="To Do Item" variant="standard" type="text" value={toDoItem} onChange={handleChange} />
        <Button className={styles.formElement}  variant="contained" type="submit" >Submit</Button>
      </form>

      {toDoList.length > 0 ? <Typography variant="h5" component="div" gutterBottom>To Do Items</Typography> : null}
      <List >
        {toDoList.map((x, i) =>
          <ToDoItem index={i} item={x} toDoList={toDoList} setToDoList={setToDoList}></ToDoItem>
        )}
      </List>
    </Container>

    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)}

export default ToDo
