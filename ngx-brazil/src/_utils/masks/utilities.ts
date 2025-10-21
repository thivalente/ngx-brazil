import { placeholderChar as defaultPlaceholderChar } from './constants'

const emptyArray = []

export function convertMaskToPlaceholder(mask: any = emptyArray, localPlaceholderChar: string = defaultPlaceholderChar) {
  if (!isArray(mask)) {
    throw new Error(
      'Text-mask:convertMaskToPlaceholder; The mask property must be an array.'
    )
  }

  if (mask.indexOf(localPlaceholderChar) !== -1) {
    throw new Error(
      'Placeholder character must not be used as part of the mask. Please specify a character ' +
      'that is not present in your mask as your placeholder character.\n\n' +
      `The placeholder character that was received is: ${JSON.stringify(localPlaceholderChar)}\n\n` +
      `The mask that was received is: ${JSON.stringify(mask)}`
    )
  }

  return mask.map((char: any) => {
    return (char instanceof RegExp) ? localPlaceholderChar : char
  }).join('')
}

export function isArray(value: any) {
  return (Array.isArray && Array.isArray(value)) || value instanceof Array
}

export function isString(value: any) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value)
}

export function isNil(value) {
  return typeof value === 'undefined' || value === null
}

const strCaretTrap = '[]'
export function processCaretTraps(mask) {
  const indexes: number[] = []

  let indexOfCaretTrap: number;
  while(indexOfCaretTrap = mask.indexOf(strCaretTrap), indexOfCaretTrap !== -1) { // eslint-disable-line
    indexes.push(indexOfCaretTrap)

    mask.splice(indexOfCaretTrap, 1)
  }

  return {maskWithoutCaretTraps: mask, indexes}
}