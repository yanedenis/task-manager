import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Portal, TextInput, Modal, Button, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';

type Props = {
  visibility: boolean,
  addTask: (task: { title: string, description: string, date: string, location: string | null }) => void,
  closeModal: () => void;
}

export default function AddTaskModal({ visibility, addTask, closeModal }: Props) {
  const [titleInput, setTitleInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [locationInput, setLocationInput] = useState<string>('');

  const handleSaveBtn = () => {
    const d = new Date()

    if (!titleInput && !descriptionInput) {
      Toast.show({
        type: "error",
        text1: "Fill all fields",
        text1Style: {
          fontSize: 18,
        }
      })
      return
    }

    const newTask = {
      title: titleInput,
      description: descriptionInput,
      date: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`,
      location: locationInput
    }
    addTask(newTask)
    setTitleInput('')
    setDescriptionInput('')
    setLocationInput('')
    closeModal()
  }

  return (
    <Portal>
      <Modal
        visible={visibility}
        onDismiss={closeModal}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text variant='titleLarge'>New task</Text>
            <IconButton icon="close" onPress={closeModal} />
          </View>
          <View style={styles.modalBody}>
            <TextInput
              label="Task title"
              mode='outlined'
              onChangeText={setTitleInput}
              value={titleInput} />
            <TextInput
              label="Task description"
              mode='outlined'
              onChangeText={setDescriptionInput}
              value={descriptionInput} />
            <TextInput
              label="Location"
              mode='outlined'
              onChangeText={setLocationInput}
              value={locationInput} />
          </View>
          <Button
            mode='contained'
            style={styles.saveBtn}
            labelStyle={{ fontSize: 18 }}
            onPress={handleSaveBtn}
            textColor={colors.textDark}
            hitSlop={50}>
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    backgroundColor: colors.backgroundLightened,
    marginBlock: "auto",
    paddingInline: 14,
    paddingBlock: 12,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalBody: {
    gap: 10,
    marginBottom: 16,
  },
  saveBtn: {
    alignSelf: "flex-end",
    borderRadius: 8
  },
})