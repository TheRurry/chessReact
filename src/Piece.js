import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const whites = {
  r: '♖',
  n: '♘',
  b: '♗',
  q: '♕',
  k: '♔',
  p: '♙'
}

const blacks = {
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  p: '♟',
}

const pieces = {
  w: whites,
  b: blacks
}

const pieceSource = {
  beginDrag(props) {
    return props.position;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Piece extends Component {
  componentDidMount() {
    this.props.connectDragPreview()
  }

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div style={{
        width: '100%',
        height: '100%',
        fontSize: '12vh',
        cursor: 'move',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: '100%',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'

      }}>
        {pieces[this.props.color][this.props.type]}
      </div>
    );
  }
}

Piece.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
};

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(Piece);