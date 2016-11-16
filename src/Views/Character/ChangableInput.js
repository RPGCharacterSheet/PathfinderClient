import React, {Component, PropTypes} from 'react'

class ChangableInput extends Component {

  shouldComponentUpdate (next) {
    return next.value !== this.props.value
  }

  render () {
    const { label, value, onChange } = this.props
    return (
      <div>
        <label>
          {label}
        </label>
        <input onChange={onChange} value={value} />
      </div>
    )
  }
}

ChangableInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default ChangableInput
