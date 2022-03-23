import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks((state) => [...state, task])
  }

  function handleToggleTaskDone(id: number) {
    setTasks((state) => {
      const arrayId = state.findIndex((task) => task.id === id)

      return [
        ...state.slice(0, arrayId),
        { ...state[arrayId], done: true },
        ...state.slice(arrayId + 1)
      ]
    })
  }

  function handleRemoveTask(id: number) {
    setTasks((state) => state.filter((task) => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
