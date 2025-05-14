import React from 'react';

interface Props {
    open: 'block' | 'none'
    handleClose: () => void
    changeColor: (color: string) => void
}

const colores = ["red", "blue", "pink", "green", "gray"];
const colores_spanish = ["Rojo", "Azul", "Rosa", "Verde", "Gris"];


const Modal = ({open, handleClose, changeColor}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(colores[0]);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    changeColor(color);
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      handleClose();
      setIsClosing(false);
    }, 1000);
  };

  return (
    <div 
      id="myModal" 
      style={{display: open}} 
      className={`modal ${isClosing ? 'fadeInDown-animation' : 'fadeInUp-animation'}`}
    >
      <div className="modal-content">
        <span onClick={handleCloseModal} className="close">&times;</span>
        <h3>Elegir un color para pintar</h3>
        <div style={{position: 'relative', width: 150, margin: '0 auto'}}>
          <div
            data-testid="color-picker"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: selectedColor,
              borderRadius: '2px'
            }}></span>
            {colores_spanish[colores.indexOf(selectedColor)]}
          </div>
          {isOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: 'white',
              zIndex: 1000
            }}>
              {colores.map((color, index) => (
                <div
                  key={color}
                  data-testid={`color-${color}`}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: color,
                    borderRadius: '2px'
                  }}></span>
                  {colores_spanish[index]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal