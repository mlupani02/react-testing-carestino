import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import React, { act } from 'react'
import App from './App'

describe('App', () => {

    beforeEach(() => {
        cleanup();
        vi.restoreAllMocks();
    })

    afterEach(() => {
        vi.resetModules();
        vi.restoreAllMocks();
    })

    it('Check if the default color is red', () => {
        const useStateSpy = vi.spyOn(React, 'useState');
        render(<App />)
        expect(useStateSpy).toHaveBeenCalledWith('red');
        useStateSpy.mockRestore();
    })

    it('Check if the state of modal is close for default', () => {
        const useStateSpy = vi.spyOn(React, 'useState');
        render(<App />)
        expect(useStateSpy).toHaveBeenCalledWith(false);
        useStateSpy.mockRestore();
    })

    it('check if isDrawing is false for default', () => {
        const useStateSpy = vi.spyOn(React, 'useState');
        render(<App />)
        expect(useStateSpy).toHaveBeenCalledWith(false);
        useStateSpy.mockRestore();
    })

    it('check if the total cells is corrected rendered', async () => {
        const COLUMNS = 100;
        const cellWidth = window.innerWidth / COLUMNS;
        const cellHeight = cellWidth;
        const rows = Math.floor(window.innerHeight / cellHeight);
        const totalCells = rows * COLUMNS;
        render(<App />)
        const result = await screen.findAllByTestId('cell');
        expect(result.length).toBe(totalCells);
    })

    it('check if span is painted with color red', () => {
        render(<App />)
        const cells = screen.getAllByTestId('cell')
        fireEvent.mouseDown(cells[0]);
        expect(cells[0].style.backgroundColor).toBe('red');
    })

    it('check if after change color, the cell is painted with the new color', () => {
        render(<App />)
        const cells = screen.getAllByTestId('cell')
        fireEvent.click(cells[0], { button: 2 });
        const colorPicker = screen.getByTestId('color-picker')
        fireEvent.click(colorPicker);
        const selectedColor = screen.getByTestId('color-blue')
        fireEvent.click(selectedColor);
        fireEvent.mouseDown(cells[0]);
        expect(cells[0].style.backgroundColor).toBe('blue');
    })

    it('check if the cell is painted with the new color when the mouse is over the cell and the button is pressed', () => {
        render(<App />)
        const cells = screen.getAllByTestId('cell')
        fireEvent.click(cells[0], { button: 2 });
        const colorPicker = screen.getByTestId('color-picker')
        fireEvent.click(colorPicker);
        const selectedColor = screen.getByTestId('color-blue')
        fireEvent.click(selectedColor);
        fireEvent.mouseDown(cells[0]);
        fireEvent.mouseEnter(cells[1]);
        expect(cells[1].style.backgroundColor).toBe('blue');
    })

    it('should reset grilla when window is resized', () => {
        render(<App />);
        // Pinta una celda para simular que el usuario ya interactuó
        const cells = screen.getAllByTestId('cell');
        fireEvent.mouseDown(cells[0]);
        expect(cells[0].style.backgroundColor).toBe('red'); // Confirmamos que cambió

        // Simula el evento de resize
        window.dispatchEvent(new Event('resize'));

        setTimeout(async() => {
            // Busca de nuevo las celdas (puede que se hayan re-renderizado)
            const newCells = await screen.findAllByTestId('cell');
            // Ahora la celda debería estar en blanco otra vez
            expect(newCells[0].style.backgroundColor).toBe('white');
        }, 1000);
    });

    it('check if click in cell with button right should open modal', () => {
        render(<App />);
        const cells = screen.getAllByTestId('cell')
        act(() => {
            fireEvent.contextMenu(cells[0]);
        })
        const closeButton = screen.getByText('×')
        act(() => {
            fireEvent.click(closeButton);
        })
        setTimeout(() => {
            expect(screen.getByText('Elegir un color para pintar')).not.toBeDefined();
        }, 1500);
    })

    it('check if setDrawing is call with false when mouse is up', () => {
        const setDrawingSpy = vi.fn();
        const fakeGrilla = [
          { index: 0, color: 'white', selected: false },
          { index: 1, color: 'white', selected: false }
        ];
        const useStateMock = vi.spyOn(React, 'useState')
            .mockImplementationOnce(() => [fakeGrilla, vi.fn()]) // grilla
            .mockImplementationOnce(() => [false, vi.fn()]) // modalOpen
            .mockImplementationOnce(() => ['red', vi.fn()]) // selectedColor
            .mockImplementationOnce(() => [false, setDrawingSpy]); // isDrawing
        render(<App />)
        window.dispatchEvent(new Event('mouseup'));
        setTimeout(() => {
            expect(setDrawingSpy).toHaveBeenCalledWith(false);
            useStateMock.mockRestore();
        }, 1000);
    })

    // it('check if call setModalOpen with false when the modal is closed', () => {
    //     const setModalOpenSpy = vi.fn();
    //     const fakeGrilla = [
    //         { index: 0, color: 'white', selected: false },
    //         { index: 1, color: 'white', selected: false }
    //     ];
    //     const useStateMock = vi.spyOn(React, 'useState')
    //     .mockImplementationOnce(() => [fakeGrilla, vi.fn()]) // grilla
    //     .mockImplementationOnce(() => [false, setModalOpenSpy]) // modalOpen
    //     .mockImplementationOnce(() => ['red', vi.fn()]) // selectedColor
    //     .mockImplementationOnce(() => [false, vi.fn()]); // isDrawing
    //     render(<App />)
    //     const cells = screen.getAllByTestId('cell')
    //     fireEvent.contextMenu(cells[0]);
    //     const closeButton = screen.getByText('×')
    //     fireEvent.click(closeButton);
    //     // setTimeout(() => {
    //     //     expect(setModalOpenSpy).toHaveBeenCalledWith(false);
    //     //     useStateMock.mockRestore();
    //     // }, 1000);
    //     useStateMock.mockRestore();
    // })
})

