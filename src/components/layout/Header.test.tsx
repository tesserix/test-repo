import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('renders the brand logo', () => {
    render(<Header />)
    expect(screen.getAllByText('PetStore').length).toBeGreaterThan(0)
  })

  it('renders the primary navigation links', () => {
    render(<Header />)
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Products').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Categories').length).toBeGreaterThan(0)
  })

  it('exposes a cart link with an accessible name', () => {
    render(<Header />)
    expect(
      screen.getByRole('link', { name: /view shopping cart/i })
    ).toBeInTheDocument()
  })

  it('toggles the mobile menu when the menu button is clicked', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)

    expect(
      screen.getByRole('button', { name: /close menu/i })
    ).toHaveAttribute('aria-expanded', 'true')
  })
})
