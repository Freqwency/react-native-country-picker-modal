import React, { ReactNode } from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  Text,
} from 'react-native'
import CloseButton from './CloseButton'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

interface HeaderModalProps {
  withFilter?: boolean
  withCloseButton?: boolean
  closeButtonImage?: ImageSourcePropType
  closeButtonStyle?: StyleProp<ViewStyle>
  closeButtonImageStyle?: StyleProp<ImageStyle>
  isMultiple?: boolean
  onClose(): void
  renderFilter(props: HeaderModalProps): ReactNode
}
export const HeaderModal = (props: HeaderModalProps) => {
  const {
    withFilter,
    withCloseButton,
    closeButtonImage,
    closeButtonStyle,
    closeButtonImageStyle,
    onClose,
    renderFilter,
    isMultiple,
  } = props
  return (
    <View style={styles.container}>
      {withCloseButton && (
        <CloseButton
          image={closeButtonImage}
          style={closeButtonStyle}
          imageStyle={closeButtonImageStyle}
          onPress={onClose}
        />
      )}
      {withFilter && renderFilter(props)}
      {isMultiple && (
        <TouchableOpacity onPress={onClose}>
          <Text>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

HeaderModal.defaultProps = {
  withCloseButton: true,
}
