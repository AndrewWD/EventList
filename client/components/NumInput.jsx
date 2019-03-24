import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/NumInput.module.css'

class NumInput extends Component {
  state = {
    inputNum: '',
  }

  onInputChange = e => {
    this.setState({
      inputNum: e.target.value
    })
  }

  onButtonClick = e => {
    e.preventDefault()
    const { reloadEventList } = this.props
    const { inputNum } = this.state
    const inputInt = parseInt(inputNum)
    const limit = (isNaN(inputInt) || inputInt <= 0) ? 10 : inputInt
    reloadEventList(limit)
  }

  render() {
    const { inputNum } = this.state
    return (
      <form className={this.props.className} >
        <label className={styles.label}>Show Events:</label>
        <input type="text" className={styles.input} value={inputNum} onChange={this.onInputChange}/>
        <input type="submit" className={styles.button} value="⟳" onClick={this.onButtonClick}/>
      </form>
    )
  }
}

NumInput.propTypes = {
  reloadEventList: PropTypes.func,
}

export default NumInput