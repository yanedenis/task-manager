import { todoTaskType } from '@/types/TodoTaskType'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text, TouchableRipple } from 'react-native-paper'
import TaskDialog from './TaskDialog'

type Props = {
  todoList: todoTaskType[],
  deleteTask: (taskId: number) => void,
}

export default function TaskList({ todoList, deleteTask }: Props) {
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<todoTaskType | null>(null);

  const openTask = (task: todoTaskType) => {
    setDialogState(true)
    setSelectedTask(task)
  }

  const closeTask = () => {
    setDialogState(false)
  }

  return (
    <>
      {todoList.map(task => (
        <TouchableRipple key={task.id} onPress={() => openTask(task)}>
          <View style={styles.task}>
            <Text variant='titleLarge'>{task.title}</Text>
            <View style={styles.taskInfo}>
              <Text variant='titleLarge'>{task.status}</Text>
              <Text variant='titleLarge'>{task.date}</Text>
              <IconButton icon="trash-can-outline" onPress={() => deleteTask(task.id)} />
            </View>
          </View>
        </TouchableRipple>
      ))}
      <TaskDialog visibility={dialogState} onClose={closeTask} task={selectedTask} />
    </>
  )
}

const styles = StyleSheet.create({
  task: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  taskInfo: {
    flexDirection: "row", 
    gap: 12,
    alignItems: "center",
  }
})