import { todoTaskType } from '@/types/TodoTaskType';
import React from 'react'
import { ScrollView,  View } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper'

type Props = {
  visibility: boolean,
  onClose: () => void,
  task: todoTaskType | null,
}

export default function TaskDialog({ visibility, onClose, task }: Props) {
  return (
    <Portal>
      <Dialog visible={visibility} onDismiss={onClose} style={{ width: "90%", maxHeight: "70%", alignSelf: "center" }}>
        <Dialog.Title>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{task?.title}</Text>
            <Text>{task?.status}</Text>
          </View>
        </Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <Text variant='bodyLarge'>{task?.description}</Text>
          </ScrollView>
          <Text style={{textAlign: "right"}} variant='labelLarge'>{task?.date}</Text>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  )
}