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
  TextStyle,
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
  headerField: {flex:0.2, alignItems:'center'},
  headerCenter: {flex:0.6}
})

interface HeaderModalProps {
  withFilter?: boolean
  withCloseButton?: boolean
  closeButtonImage?: ImageSourcePropType
  closeButtonStyle?: StyleProp<ViewStyle>
  closeButtonImageStyle?: StyleProp<ImageStyle>
  isMultiple?: boolean
  translation?: TranslationLanguageCode
  doneTextStyle?: StyleProp<TextStyle>
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
    doneTextStyle
  } = props
  return (
    <View style={translation === 'urd' ? styles.containerAR : styles.container}>
      <View style={styles.headerField}>
      {withCloseButton && (
        <CloseButton
          image={closeButtonImage}
          style={closeButtonStyle}
          imageStyle={closeButtonImageStyle}
          onPress={onClose}
        />
      )}
      </View>
      <View style={styles.headerCenter}>
      {withFilter && renderFilter(props)}
      </View>
      <View style={styles.headerField}>
      {isMultiple && (
        <TouchableOpacity onPress={onDone}>
          <Text style={doneTextStyle}>{translation === 'urd' ? 'تم' : 'Done'}</Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
  )
}

HeaderModal.defaultProps = {
  withCloseButton: true,
}
