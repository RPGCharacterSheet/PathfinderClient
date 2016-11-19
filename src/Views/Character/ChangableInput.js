import React, {Component, PropTypes} from 'react'

class ChangableInput extends Component {

  shouldComponentUpdate (next) {
    return next.value !== this.props.value
  }

  render () {
    const { label, value, onChange, type = 'text' } = this.props
    return (
      <div className='changable-input'>
        <label className='input-label'>
          {label}
        </label>
        <input type={type} onChange={event => onChange(event.target.value)} value={value} />
      </div>
    )
  }
}

ChangableInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string
}

export default ChangableInput
