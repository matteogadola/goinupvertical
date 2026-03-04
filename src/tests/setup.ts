import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock di window.scrollTo se necessario (spesso usato in Next.js)
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

// Qui puoi aggiungere altri mock globali (es. IntersectionObserver)
