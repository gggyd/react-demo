/**
 * i18n.js
 */

import { addLocaleData } from 'react-intl'
import zhLocationData from 'react-intl/locale-data/zh'
import zhTranslationMessage from './translations/zh.json'
import message from './utils/message';
const DEFAULT_LOCALE = 'zh'

addLocaleData(zhLocationData)

export const formatTranslationMessages = (local, messages) => {
  const defaultFormattedMessages = local !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, zhTranslationMessage)
    : { }

  let result = Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && local !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key]

      return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, { });

  return result;
}

export const translationMessages = {
  zh: formatTranslationMessages('zh', zhTranslationMessage)
}