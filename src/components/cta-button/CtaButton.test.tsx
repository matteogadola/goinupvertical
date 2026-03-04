import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { CtaButton } from './CtaButton'

// Mock Framer Motion to avoid animation issues in tests and simplify DOM structure
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className, ...props }: any) => (
      <button onClick={onClick} className={className} data-testid="cta-button" {...props}>
        {children}
      </button>
    ),
  },
}))

describe('CtaButton Component', () => {
  const scrollIntoViewMock = vi.fn()

  afterEach(() => {
    vi.restoreAllMocks()
    scrollIntoViewMock.mockReset()
  })

  it('renders correctly with given text', () => {
    render(<CtaButton text="Click Me" anchor="target-section" />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
    expect(screen.getByText('↓')).toBeInTheDocument()
  })

  it('scrolls to anchor when clicked', () => {
    // Setup DOM mock
    const targetElement = document.createElement('div')
    targetElement.id = 'target-section'
    targetElement.scrollIntoView = scrollIntoViewMock

    // Mock getElementById
    const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(targetElement)

    render(<CtaButton text="Scroll" anchor="target-section" />)

    const button = screen.getByTestId('cta-button')
    fireEvent.click(button)

    expect(getElementByIdSpy).toHaveBeenCalledWith('target-section')
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('does not crash or scroll if anchor element is missing (Edge Case)', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null)

    render(<CtaButton text="Scroll" anchor="non-existent" />)

    const button = screen.getByTestId('cta-button')
    // Should verify console.error if the component logged it, but it doesn't currently.
    // Just ensuring no throw and no scroll call.
    fireEvent.click(button)

    expect(document.getElementById).toHaveBeenCalledWith('non-existent')
    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it('does not trigger external onClick prop (Side Case: Prop Shadowing)', () => {
    // Current implementation: Props.onClick is shadowed by internal handleScroll
    const externalOnClick = vi.fn()

    // Setup DOM mock so the internal logic proceeds
    const targetElement = document.createElement('div')
    targetElement.scrollIntoView = scrollIntoViewMock
    vi.spyOn(document, 'getElementById').mockReturnValue(targetElement)

    render(<CtaButton text="Scroll" anchor="target-section" onClick={externalOnClick} />)

    const button = screen.getByTestId('cta-button')
    fireEvent.click(button)

    // Verify compliance with current implementation (it ignores the prop)
    expect(externalOnClick).not.toHaveBeenCalled()
  })

  it('applies custom className correctly', () => {
    render(<CtaButton text="Class Test" anchor="test" className="custom-extra-class" />)
    const button = screen.getByTestId('cta-button')
    expect(button).toHaveClass('custom-extra-class')
  })
})
