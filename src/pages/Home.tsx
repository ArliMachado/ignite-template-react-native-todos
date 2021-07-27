import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type TaskEditProps = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const existingTaskTitle = tasks.find(task => task.title === newTaskTitle);

    if (!!existingTaskTitle) {
      Alert.alert(
        'Task já cadastrada', 
        'Você não pode cadastrar uma task com o mesmo nome');
    }else {
      const task = { 
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, task])

    }
  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(task => ({ ...task }));

    updatedTasks.map(task => task.id === id && (task.done = !task.done));

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: "cancel",
        },
        {
          text: 'Sim',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
          } 
        }
      ]
    )    
  }

  function handleEditTask({taskId, taskNewTitle}: TaskEditProps) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    updatedTasks.map(task => task.id === taskId && (task.title = taskNewTitle));

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})