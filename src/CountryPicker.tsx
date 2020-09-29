import React, { ReactNode, useState, useEffect } from 'react'
import {
  ModalProps,
  FlatListProps,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native'
import { CountryModal } from './CountryModal'
import { HeaderModal } from './HeaderModal'
import { Country, CountryCode, FlagType, Region, Subregion } from './types'
import { CountryFilter, CountryFilterProps } from './CountryFilter'
import { FlagButton } from './FlagButton'
import { useContext } from './CountryContext'
import { CountryList } from './CountryList'

interface State {
  visible: boolean
  countries: Country[]
  selectedCountries: Country[]
  filter?: string
  filterFocus?: boolean
}

const renderFlagButton = (
  props: FlagButton['props'] & CountryPickerProps['renderFlagButton'],
): ReactNode =>
  props.renderFlagButton ? (
    props.renderFlagButton(props)
  ) : (
    <FlagButton {...props} />
  )

const renderFilter = (
  props: CountryFilter['props'] & CountryPickerProps['renderCountryFilter'],
): ReactNode =>
  props.renderCountryFilter ? (
    props.renderCountryFilter(props)
  ) : (
    <CountryFilter {...props} />
  )

interface CountryPickerProps {
  countryCode?: CountryCode
  region?: Region
  subregion?: Subregion
  countryCodes?: CountryCode[]
  excludeCountries?: CountryCode[]
  preferredCountries?: CountryCode[]
  modalProps?: ModalProps
  filterProps?: CountryFilterProps
  flatListProps?: FlatListProps<Country>
  withEmoji?: boolean
  withCountryNameButton?: boolean
  withCurrencyButton?: boolean
  withCallingCodeButton?: boolean
  withFlagButton?: boolean
  withCloseButton?: boolean
  withFilter?: boolean
  withAlphaFilter?: boolean
  withCallingCode?: boolean
  withCurrency?: boolean
  withFlag?: boolean
  withModal?: boolean
  disableNativeModal?: boolean
  visible?: boolean
  placeholder?: string
  containerButtonStyle?: StyleProp<ViewStyle>
  closeButtonImage?: ImageSourcePropType
  closeButtonStyle?: StyleProp<ViewStyle>
  closeButtonImageStyle?: StyleProp<ImageStyle>
  isMultiple?: boolean
  renderFlagButton?(props: FlagButton['props']): ReactNode
  renderCountryFilter?(props: CountryFilter['props']): ReactNode
  onSelect(country: Country[]): void
  onOpen?(): void
  onClose?(): void
}

export const CountryPicker = (props: CountryPickerProps) => {
  const {
    countryCode,
    region,
    subregion,
    countryCodes,
    renderFlagButton: renderButton,
    renderCountryFilter,
    filterProps,
    modalProps,
    flatListProps,
    onSelect,
    withEmoji,
    withFilter,
    withCloseButton,
    withCountryNameButton,
    withCallingCodeButton,
    withCurrencyButton,
    containerButtonStyle,
    withAlphaFilter,
    withCallingCode,
    withCurrency,
    withFlag,
    withModal,
    disableNativeModal,
    withFlagButton,
    onClose: handleClose,
    onOpen: handleOpen,
    closeButtonImage,
    closeButtonStyle,
    closeButtonImageStyle,
    excludeCountries,
    placeholder,
    preferredCountries,
    isMultiple,
  } = props
  const [state, setState] = useState<State>({
    visible: props.visible || false,
    countries: [],
    selectedCountries: [],
    filter: '',
    filterFocus: false,
  })
  const { translation, getCountriesAsync } = useContext()
  const { visible, filter, countries, filterFocus, selectedCountries } = state

  useEffect(() => {
    if (state.visible !== props.visible) {
      setState({ ...state, visible: props.visible || false })
    }
  }, [props.visible])

  useEffect(() => {
    setState({ ...state, selectedCountries: [] })
  }, [isMultiple])

  const onOpen = () => {
    setState({ ...state, visible: true })
    if (handleOpen) {
      handleOpen()
    }
  }
  const onClose = () => {
    setState({ ...state, filter: '', visible: false })
    if (handleClose) {
      handleClose()
    }
  }
  const onDone = () => {
    setState({ ...state, filter: '', visible: false })
    if (handleClose) {
      handleClose()
    }
    onSelect(selectedCountries)
  }
  const setFilter = (filter: string) => setState({ ...state, filter })
  const setCountries = (countries: Country[]) =>
    setState({ ...state, countries })
  const onSelectClose = (country: Country) => {
    onSelect([country])
    onClose()
  }
  const onSelectMultiple = (country: Country) => {
    const temp = selectedCountries
    const available = temp.findIndex(element => {
      return element.cca2 === country.cca2
    })
    available === -1 ? temp.push(country) : temp.splice(available, 1)
    setState({ ...state, selectedCountries: temp })
  }
  const onFocus = () => setState({ ...state, filterFocus: true })
  const onBlur = () => setState({ ...state, filterFocus: false })
  const flagProp = {
    countryCode,
    withEmoji,
    withCountryNameButton,
    withCallingCodeButton,
    withCurrencyButton,
    withFlagButton,
    renderFlagButton: renderButton,
    onOpen,
    containerButtonStyle,
    placeholder,
  }

  useEffect(() => {
    getCountriesAsync(
      withEmoji ? FlagType.EMOJI : FlagType.FLAT,
      translation,
      region,
      subregion,
      countryCodes,
      excludeCountries,
      preferredCountries,
      withAlphaFilter,
    )
      .then(setCountries)
      .catch(console.warn)
  }, [translation, withEmoji])

  return (
    <>
      {withModal && renderFlagButton(flagProp)}
      <CountryModal
        {...{ visible, withModal, disableNativeModal, ...modalProps }}
        onRequestClose={onClose}
        onDismiss={onClose}
      >
        <HeaderModal
          {...{
            withFilter,
            onClose,
            closeButtonImage,
            closeButtonImageStyle,
            closeButtonStyle,
            withCloseButton,
            isMultiple,
            translation,
            onDone,
          }}
          renderFilter={(props: CountryFilter['props']) =>
            renderFilter({
              ...props,
              renderCountryFilter,
              onChangeText: setFilter,
              value: filter,
              onFocus,
              onBlur,
              translation,
              ...filterProps,
            })
          }
        />
        <CountryList
          {...{
            onSelect: isMultiple ? onSelectMultiple : onSelectClose,
            data: countries,
            selectedCountries,
            letters: [],
            withAlphaFilter: withAlphaFilter && filter === '',
            withCallingCode,
            withCurrency,
            withFlag,
            withEmoji,
            filter,
            filterFocus,
            flatListProps,
            translation,
          }}
        />
      </CountryModal>
    </>
  )
}

CountryPicker.defaultProps = {
  withModal: true,
  withAlphaFilter: false,
  withCallingCode: false,
  placeholder: 'Select Country',
}
