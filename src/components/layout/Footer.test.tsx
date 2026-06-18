import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the copyright with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`${year} PetStore`, 'i'))
    ).toBeInTheDocument()
  })

  it('renders the quick links', () => {
    render(<Footer />)
    expect(screen.getByText('All Products')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
  })

  it('renders social links with accessible names', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument()
  })
})
