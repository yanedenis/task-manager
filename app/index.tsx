import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB, IconButton, Menu, Text } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTaskModal from "@/components/AddTaskModal";
import TaskList from "@/components/TaskList";
import { TodoTaskType } from "@/types/TodoTaskType";
import { colors } from "@/constants/colors";
import Toast from "react-native-toast-message";

export default function Index() {
  const { bottom } = useSafeAreaInsets();

  const [todoList, setTodoList] = useState<TodoTaskType[]>([]);
  const [sortBy, setSortBy] = useState<"status" | "date" | null>(null);
  const [modalState, setModalState] = useState<boolean>(false);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const sortedTasks = [...todoList].sort((a, b) => {
    if (sortBy === "status") {
      const order = ["In Progress", "Completed", "Cancelled"];
      return order.indexOf(a.status) - order.indexOf(b.status);
    }
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

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
    if (todoList.length === 0) {
      setSortBy(null);
    }
    AsyncStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const addTask = (task: { title: string, description: string, date: string, location: string | null }) => {
    const newId = Date.now()
    setTodoList((prevTasks) => [...prevTasks, {
      status: "In Progress",
      ...task,
      id: newId,
    }])
    Toast.show({
      type: "success",
      text1: "Successfully created note! ✅",
      text1Style: {
        fontSize: 18
      },
      visibilityTime: 2000
    })
  }
  const deleteTask = (taskId: number) => {
    setTodoList(prevTasks => prevTasks.filter(task => task.id !== taskId))
    Toast.show({
      type: "success",
      text1: "Task deleted ❌",
      text1Style: {
        fontSize: 18
      },
      visibilityTime: 2000
    })
  };
  const changeTaskStatus = (taskId: number, newStatus: 'In Progress' | 'Completed' | 'Cancelled') => {
    setTodoList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleModalState = () => {
    setModalState(prev => !prev)
  }

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<IconButton icon="filter" onPress={openMenu} disabled={todoList.length === 0} />}
          anchorPosition="bottom">
          <Menu.Item onPress={() => { setSortBy('status'); closeMenu() }} title="Sort by Status" />
          <Menu.Item onPress={() => { setSortBy('date'); closeMenu() }} title="Sort by Date" />
          <Menu.Item onPress={() => { setSortBy(null); closeMenu() }} title="Clear sort" />
        </Menu>
        {sortBy && <Text variant="headlineSmall">Sorted by {sortBy}</Text>}
      </View>
      {todoList.length === 0
        ? <Text variant="titleLarge">There is no tasks yet</Text>
        : <TaskList todoList={sortedTasks} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} />
      }
      <FAB icon="plus" color={colors.textDark} style={[styles.fab, { bottom: 16 + bottom }]} onPress={handleModalState} />
      <AddTaskModal visibility={modalState} addTask={addTask} closeModal={handleModalState} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    backgroundColor: colors.primary,
  },
})