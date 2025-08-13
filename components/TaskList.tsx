import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, IconButton, Menu, Text, TouchableRipple } from 'react-native-paper'
import TaskDialog from './TaskDialog'
import { TodoTaskType } from '@/types/TodoTaskType'
import { colors } from '@/constants/colors'

type Props = {
  todoList: TodoTaskType[],
  deleteTask: (taskId: number) => void,
  changeTaskStatus: (taskId: number, status: 'In Progress' | 'Completed' | 'Cancelled') => void;
}

export default function TaskList({ todoList, deleteTask, changeTaskStatus }: Props) {
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TodoTaskType | null>(null);
  const [statusMenuTaskId, setStatusMenuTaskId] = useState<number | null>(null);

  const openTask = (task: TodoTaskType) => {
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
              <Menu
                visible={statusMenuTaskId === task.id}
                onDismiss={() => setStatusMenuTaskId(null)}
                anchor={
                  <Button onPress={() => setStatusMenuTaskId(task.id)}>
                    {task.status}
                  </Button>
                }
                anchorPosition='bottom'
              >
                <Menu.Item
                  onPress={() => {
                    changeTaskStatus(task.id, "In Progress");
                    setStatusMenuTaskId(null);
                  }}
                  title="In Progress"
                />
                <Menu.Item
                  onPress={() => {
                    changeTaskStatus(task.id, "Completed");
                    setStatusMenuTaskId(null);
                  }}
                  title="Completed"
                />
                <Menu.Item
                  onPress={() => {
                    changeTaskStatus(task.id, "Cancelled");
                    setStatusMenuTaskId(null);
                  }}
                  title="Cancelled"
                />
              </Menu>
              <Text variant='titleMedium'>{task.date}</Text>
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
    backgroundColor: colors.backgroundLightened,
    paddingInline: 10,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  taskInfo: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  }
})