import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import BoardSquare from './BoardSquare';
import Piece from './Piece';
import { convertPosition } from './Game';

class Board extends Component {

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%'}}>
        <BoardSquare x={x}
                     y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }
  
  renderPiece(x, y) {
    let pos = {
      "x": x,
      "y": y
    }
    let piece = this.props.chess.get(convertPosition(pos));
    if (piece) {
      return <Piece type={piece.type} color={piece.color} position={pos}/>;
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {squares}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
// export default DragDropContext(TouchBackend({enableMouseEvents: true, enableTouchEvents: true}))(Board);