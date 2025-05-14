import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import React, { useState } from 'react'
import Modal from './Modal'

function ModalTestWrapper() {
  const [open, setOpen] = useState<'block' | 'none'>('block')
  return (
    <Modal
      open={open}
      handleClose={() => setOpen('none')}
      changeColor={() => {}}
    />
  )
}

describe('Modal', () => {
  it('should render', () => {
    render(<ModalTestWrapper />)
    const modal = screen.getByText('Elegir un color para pintarr')
    expect(modal).toBeDefined()
  })

  it('should close modal when click in close button', () => {
    render(<ModalTestWrapper />)
    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)
    // esperar un segundo despues de cerrar el modal
    setTimeout(() => {
        expect(screen.queryByText('Elegir un color para pintar')).toBeNull()
    }, 1100)
  })

  it('should change color when click in color picker', () => {
    render(<ModalTestWrapper />)
    const colorPicker = screen.getByTestId('color-picker')
    fireEvent.click(colorPicker)
    const colorBlue = screen.getByTestId('color-blue')
    fireEvent.click(colorBlue)
    expect(colorPicker.textContent).toBe('Azul')
  })
})