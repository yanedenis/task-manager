import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Portal, TextInput, Modal, Button, HelperText, Text } from 'react-native-paper'

type Props = {
  visibility: boolean,
  addTask: (task: { title: string, description: string, date: string, location: string | null }) => void,
  closeModal: () => void;
}

export default function AddTaskModal({ visibility, addTask, closeModal }: Props) {
  const [titleInput, setTitleInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [locationInput, setLocationInput] = useState<string>('');

  // ERROR
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const handleSaveBtn = () => {
    const d = new Date()

    if (!titleInput) {
      setTitleError(true)
      return
    }
    if (!descriptionInput) {
      setDescriptionError(true)
      return
    }

    setTitleError(false)
    setDescriptionError(false)
    const newTask = {
      title: titleInput,
      description: descriptionInput,
      date: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`,
      location: locationInput
    }
    addTask(newTask)
    setTitleInput('')
    setDescriptionInput('')
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
            <HelperText
              type='error'
              visible={titleError}
              padding='none'>
              Title is empty
            </HelperText>

            <TextInput
              label="Task description"
              mode='outlined'
              onChangeText={setDescriptionInput}
              value={descriptionInput} />
            <HelperText
              type='error'
              visible={descriptionError}
              padding='none'>
              Description is empty
            </HelperText>

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
            onPress={handleSaveBtn}>
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: "80%",
    height: "auto",
    alignSelf: "center",
    backgroundColor: "white",
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
  },
})