import { useState, useEffect } from "react"
import Modal from "./components/Modal";

interface Grilla {
  index: number,
  color: string,
  selected: boolean
}


const COLUMNS = 100;
const cellWidth = window.innerWidth / COLUMNS;
const cellHeight = cellWidth;
const rows = Math.floor(window.innerHeight / cellHeight);
const totalCells = rows * COLUMNS;

function getInitGrilla(): Grilla[] {
  const arr: Grilla[] = [];
  for (let i = 0; i < totalCells; i++) {
    arr[i] = {
      index: i,
      color: 'white',
      selected: false
    };
  }
  return arr;
}

function App() {
  const [grilla, setGrilla] = useState<Grilla[]>(getInitGrilla())
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('red');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setGrilla(getInitGrilla());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pintar = (key: number) => {
    const new_grilla = [...grilla];
    new_grilla[key] = {
      ...new_grilla[key],
      color: selectedColor
    };
    setGrilla(new_grilla);
  }

  const openModal = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setModalOpen(true)
    e.preventDefault()
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const changeColor = (color: string) => {
    setSelectedColor(color)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>, key: number) => {
    if (e.button === 0) {
      setIsDrawing(true);
      pintar(key);
    }
  };

  const handleMouseEnter = (key: number) => {
    if (isDrawing) {
      pintar(key);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDrawing(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <>
      <Modal open={modalOpen ? 'block': 'none'} handleClose={handleClose} changeColor={changeColor} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(100, 1fr)',
        width: '100vw',
        height: '100vh',
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      }}>
      {
        grilla.map((item, key)  => (
          <span 
            key={key}
            onContextMenu={openModal}
            data-testid="cell"
            onMouseDown={(e) => handleMouseDown(e, key)}
            onMouseEnter={() => handleMouseEnter(key)}
            style={{
              aspectRatio: '1/1',
              border: '1px solid black', 
              backgroundColor: item.color, 
              padding: 0, 
              margin: 0,
              userSelect: 'none'
            }}
          />
        ))
      }
      </div>
    </>
  )
}

export default App
