import React from 'react'
import { TextInput, StyleSheet, TextInputProps, Platform } from 'react-native'
import { useTheme } from './CountryTheme'

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: '70%',
    ...Platform.select({
      web: {
        outlineWidth: 0,
        outlineColor: 'transparent',
        outlineOffset: 0,
      },
    }),
  },
})

export interface CountryFilterProps extends TextInputProps {
  translation: string
}

export const CountryFilter = (props: CountryFilterProps) => {
  const { translation } = props
  const {
    filterPlaceholderTextColor,
    fontFamily,
    fontSize,
    onBackgroundTextColor,
  } = useTheme()
  return (
    <TextInput
      testID='text-input-country-filter'
      autoCorrect={false}
      placeholderTextColor={filterPlaceholderTextColor}
      style={[
        styles.input,
        { fontFamily, fontSize, color: onBackgroundTextColor },
        translation === 'urd' && { textAlign: 'right' },
      ]}
      placeholder={
        translation === 'urd' ? 'أدخل اسم الدولة' : 'Enter country name'
      }
      {...props}
    />
  )
}

CountryFilter.defaultProps = {
  autoFocus: false,
}
