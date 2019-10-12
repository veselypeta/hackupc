import React, { Component } from 'react';
import './FinalScore.css';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

class FinalScore extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        modalIsOpen: true
      };
  
      this.openModal =this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
  
    openModal() {
      this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }
  
    render() {  
      return (
        <div> 
        <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            className="FinalScore"
          >
            <div className="header">
              <text> Your final score </text>
            </div>
            <div className="body">
              <p> Your final score is {this.props.score} </p>
              <p>
                <text> The flights which you selected to travel from {this.props.start} to {this.props.destination} were: </text>
                {this.props.flights.map(flight => (
                    <div> {flight} </div>
                ))}
              </p>
            </div>
            <div className="footer">
              <button 
                className="button"
                type="button"
                onClick={this.closeModal}
              > 
                Play again 
              </button>
            </div>
        </Modal>
        </div>
      );
    }
}

FinalScore.propTypes = {
    score: PropTypes.number.isRequired,
    flights: PropTypes.array.isRequired,
    destination: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
}

export default FinalScore;