import React, {Component, PropTypes} from 'react'
import { result } from 'lodash'
import * as actions from '../../Redux/actions'
import { connect } from 'react-redux'
import ToolTip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

class Content extends Component {

  contentToComponent (overWrite) {
    const { selected, content, character, level, editable, key } = Object.assign({}, this.props, overWrite)
    if (Array.isArray(content)) {
      return content.map((b, idx) => this.contentToComponent({ content: b, key: idx }))
    } else if (typeof content === 'object')
      return <Block {...content} character={character} level={level + 1} key={key || 0} selected={selected} />
    else if (typeof content === 'string') {
      if (content[0] === '$') {
        const value = result(character, content.slice(1))
        let rendered = null

        if (editable) {
          rendered = <input key={key || 0} onChange={(event) => this.props[editable](selected, { [content.slice(1)]: event.target.value })} value={value.stat || value} />
        } else {
          rendered = <span>{value.stat || value}</span>
        }
        if (typeof value === 'object') {
          rendered = <ToolTip placement='top' trigger={['hover']} overlay={<span>{value.description}</span>}>{rendered}</ToolTip>
        }
        return rendered
      } else {
        return <div key={key || 0} >{content}</div>
      }
    }
  }

  render () {
    const { styles, title, level } = this.props

    return (
      <div style={Object.assign({ display: 'inline-block' }, styles)}>
        {title
          ? level < 7
            ? React.createElement(`h${level}`, {children: title})
            : <span>{title}</span>
          : null}
        {this.contentToComponent()}
      </div>
    )
  }
}

Content.propTypes = {
  selected: PropTypes.string,
  editable: PropTypes.string,
  level: PropTypes.number,
  styles: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.any,
  character: PropTypes.object
}

const Block = connect(() => ({

}), actions)(Content)

export default Block
