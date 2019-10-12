import React, { Component } from 'react';
import './Destination.css';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

class Destination extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        modalIsOpen: true
      };
  
      this.openModal =this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
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
            className="Destination"
          >
            <div className="header">
              <text> Your final destination </text>
            </div>
            <div className="body">
              <p> Your aim is to reach {this.props.destination} with the lowest number of points. </p>
              <p> 
                Points are calculated according to the time taken to reach the destination, the cost of the flights you select, and most importantly, the carbon emissions of your journey.
              </p>
            </div>
            <div className="footer">
              <button 
                className="button"
                type="button"
                onClick={this.closeModal}
              > 
                Let's play 
              </button>
            </div>
        </Modal>
        </div>
      );
    }
}

Destination.propTypes = {
    destination: PropTypes.string.isRequired,
}

export default Destination;