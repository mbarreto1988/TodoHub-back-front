import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Home } from '../index'

describe('Home', () => {
  test('se renderiza correctamente', () => {
    render(<Home />)
    expect(screen.getByText('Bienvenido a TodoHub')).toBeInTheDocument()
  })
})
