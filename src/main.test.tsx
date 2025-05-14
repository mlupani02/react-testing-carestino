import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

function AppTestWrapper() {
    return <App />
}

describe('App', () => {
    it('should render', () => {
        render(<AppTestWrapper />)
        expect(screen.getByText('Elegir un color para pintar')).toBeDefined()
    })
})
