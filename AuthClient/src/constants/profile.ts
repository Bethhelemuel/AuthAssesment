// Profile field labels
export const PROFILE_LABELS = {
  EMAIL: 'Your Email',
  PASSWORD: 'Password',
  CREATED: 'Created',
} as const

// Time ago formatting
export const TIME_AGO_LABELS = {
  JUST_NOW: 'Just now',
  MINUTE: 'minute',
  MINUTES: 'minutes',
  HOUR: 'hour',
  HOURS: 'hours',
  DAY: 'day',
  DAYS: 'days',
  MONTH: 'month',
  MONTHS: 'months',
  YEAR: 'year',
  YEARS: 'years',
  AGO: 'ago',
} as const

// Profile content
export const PROFILE_CONTENT = {
  AVATAR_ALT: 'Profile avatar',
  PASSWORD_MASK: '••••••••',
  PASSWORD_VISIBLE: 'MyPassword',
  LOGOUT_BUTTON: 'Logout',
  WELCOME_MESSAGE: 'Hi {firstName}!',
  LOADING_TEXT: 'Loading...',
  ERROR_MESSAGE: 'Failed to load profile',
} as const

// Profile layout
export const PROFILE_LAYOUT = {
  BG_COLOR: 'bg-blue-200',
  CONTAINER_CLASSES: 'bg-white md:rounded-3xl shadow-lg flex w-full md:w-auto md:max-w-sm h-screen md:h-auto overflow-hidden p-6 md:p-8 flex flex-col items-center flex-1',
} as const

// Avatar sizes
export const AVATAR_SIZES = {
  SMALL: 'w-12 h-12',
  MEDIUM: 'w-16 h-16',
  LARGE: 'w-20 h-20',
} as const

// Field styling
export const FIELD_STYLING = {
  CONTAINER: 'flex items-center border border-gray-100 rounded-lg px-4 py-2.5 bg-gray-50 gap-2',
  ICON: 'w-4 h-4 text-gray-400',
  TEXT: 'text-sm text-gray-500',
  PASSWORD_TEXT: 'text-sm text-gray-500 tracking-widest',
  TOGGLE_BUTTON: 'text-gray-400 hover:text-gray-600 transition',
} as const

// Update intervals
export const UPDATE_INTERVALS = {
  TIME_AGO: 60000, // 60 seconds in milliseconds
} as const
