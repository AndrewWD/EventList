import React, { Component } from 'react'
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
    const limit = inputNum.length === 0 || parseInt(inputNum) <= 0  ? 10 : parseInt(inputNum)
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

export default NumInput