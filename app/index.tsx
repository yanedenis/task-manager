import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Text } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTaskModal from "@/components/AddTaskModal";
import TaskList from "@/components/TaskList";
import { todoTaskType } from "@/types/TodoTaskType";

export default function Index() {
  const {bottom} = useSafeAreaInsets();

  const [todoList, setTodoList] = useState<todoTaskType[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);

  useEffect(() => {
    const loadList = async () => {
      const storedList = await AsyncStorage.getItem('todoList')
      if (storedList) {
        setTodoList(JSON.parse(storedList))
      }
    }
    loadList()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const addTask = (task: { title: string, description: string, date: string, location: string | null }) => {
    const newId = Date.now()
    setTodoList((prevTasks) => [...prevTasks, {
      id: newId,
      ...task,
      status: "In Progress"
    }])
  }

  const deleteTask = (taskId: number) => {
    setTodoList(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const handleModalState = () => {
    setModalState(prev => !prev)
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {todoList.length === 0
        ? <Text variant="titleLarge">There is no tasks yet</Text>
        : <TaskList todoList={todoList} deleteTask={deleteTask}/>
      }
      <FAB icon="plus" style={[styles.fab, {bottom: 16 + bottom}]} onPress={handleModalState} />
      <AddTaskModal visibility={modalState} addTask={addTask} closeModal={handleModalState} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
  },
})