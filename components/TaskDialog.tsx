import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper'
import { TodoTaskType } from '@/types/TodoTaskType';
import { colors } from '@/constants/colors';

type Props = {
  visibility: boolean,
  onClose: () => void,
  task: TodoTaskType | null,
}

export default function TaskDialog({ visibility, onClose, task }: Props) {
  return (
    <Portal>
      <Dialog visible={visibility} onDismiss={onClose} style={styles.dialog}>
        <Dialog.Title>
          <View style={styles.title}>
            <Text style={{color: colors.textDark}}>{task?.title}</Text>
            <Text style={{color: colors.textDark}}>{task?.status}</Text>
          </View>
        </Dialog.Title>
        <Dialog.Content>
          <ScrollView>
            <Text variant='bodyLarge' style={{color: colors.textDark}}>{task?.description}</Text>
          </ScrollView>
          <Text style={{ textAlign: "right", color: colors.textDark }} variant='labelLarge'>
            {task?.location}<br />
            {task?.date}
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  dialog: {
    width: "90%",
    maxHeight: "70%",
    alignSelf: "center",
    backgroundColor: colors.primaryTinted,
    borderRadius: 10,
  },
  title: {
    width: "100%", 
    flexDirection: "row", 
    justifyContent: "space-between"
  }
})