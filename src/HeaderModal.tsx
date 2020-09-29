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
import { TranslationLanguageCode } from './types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerAR: {
    flexDirection: 'row-reverse',
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
  translation?: TranslationLanguageCode
  onClose(): void
  onDone(): void
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
    translation,
    onDone,
  } = props
  return (
    <View style={translation === 'urd' ? styles.containerAR : styles.container}>
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
        <TouchableOpacity onPress={onDone}>
          <Text>{translation === 'urd' ? 'تم' : 'Done'}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

HeaderModal.defaultProps = {
  withCloseButton: true,
}
