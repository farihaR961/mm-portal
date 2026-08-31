// This module is the ONLY place UI components should import fake data or
// data-access functions from. When a real backend exists, swap the
// implementations in this folder for real fetch calls — component code
// should not need to change.

export * from '../types'
export * from './catalogue'
export * from './students'
export * from './calendar'
export * from './notifications'
export * from './jobs'
export * from './csv'
