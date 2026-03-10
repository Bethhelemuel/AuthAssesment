// Form validation schemas
export const LOGIN_SCHEMA = {
  email: 'Invalid email address',
  password: 'Password must be at least 6 characters',
} as const

export const REGISTER_SCHEMA = {
  firstName: 'First name is required',
  lastName: 'Last name is required',
  email: 'Invalid email address',
  password: 'Password must be at least 6 characters',
  confirmPassword: 'Please confirm your password',
  passwordMatch: 'Passwords do not match',
} as const

// Form field names
export const LOGIN_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const

export const REGISTER_FIELDS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
} as const

// Initial form values
export const LOGIN_INITIAL_VALUES = {
  email: '',
  password: '',
} as const

export const REGISTER_INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
} as const

// Error messages
export const AUTH_ERRORS = {
  LOGIN_FAILED: 'Invalid email or password',
  REGISTER_FAILED: 'Registration failed. Email may already exist.',
  NETWORK_ERROR: 'Network error. Please try again.',
} as const

// Success messages
export const AUTH_SUCCESS = {
  REGISTER_SUCCESS: 'Registration successful! Redirecting to login...',
  LOGIN_SUCCESS: 'Login successful!',
} as const

// Form labels and placeholders
export const LOGIN_LABELS = {
  EMAIL: 'Email',
  PASSWORD: 'Password',
} as const

export const LOGIN_PLACEHOLDERS = {
  EMAIL: 'example@email.com',
  PASSWORD: 'At least 6 characters',
} as const

export const REGISTER_LABELS = {
  FIRST_NAME: 'Firstname',
  LAST_NAME: 'Surname',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
} as const

export const REGISTER_PLACEHOLDERS = {
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  EMAIL: 'example@email.com',
  PASSWORD: 'At least 6 characters',
  CONFIRM_PASSWORD: 'Repeat your password',
} as const

// Form layout content
export const LOGIN_CONTENT = {
  TITLE: 'Login',
  DESCRIPTION: "Don't you have an account?",
  SWITCH_TEXT: 'Sign up',
  BUTTON_TEXT: 'Login',
} as const

export const REGISTER_CONTENT = {
  TITLE: 'Register',
  DESCRIPTION: 'Already have an account?',
  SWITCH_TEXT: 'Log in',
  BUTTON_TEXT: 'Register',
} as const

// Image assets
export const LOGIN_IMAGE = {
  SRC: '/src/assets/login.jpg',
  ALT: 'Login illustration',
  BG_COLOR: 'bg-[#FFE89C]',
} as const

export const REGISTER_IMAGE = {
  SRC: '/src/assets/register.jpg',
  ALT: 'Register illustration',
  BG_COLOR: 'bg-[#BCFFFC]',
} as const

// Focus field names
export const AUTO_FOCUS_FIELDS = {
  LOGIN: 'email',
  REGISTER: 'firstName',
} as const
