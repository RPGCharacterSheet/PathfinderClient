import React, {Component, PropTypes} from 'react'
import { result } from 'lodash'
class Block extends Component {

  contentToComponent (content, character, level) {
    if (Array.isArray(content)) {
      return content.map((b, idx) => this.contentToComponent(b, character, level))
    } else if (typeof content === 'object')
      return <Block {...content} character={character} level={level + 1} />
    else if (typeof content === 'string') {
      if (content[0] === '$') {
        return result(character, content.slice(1))
      } else {
        return <div>{content}</div>
      }
    }
  }

  render () {
    const { styles, title, content, character, level } = this.props

    return (
      <div style={Object.assign({ display: 'inline-block' }, styles)}>
        {title
          ? level < 7
            ? React.createElement(`h${level}`, {children: title})
            : <span>{title}</span>
          : null}
        {this.contentToComponent(content, character, level)}
      </div>
    )
  }
}

Block.propTypes = {
  level: PropTypes.number,
  styles: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.any,
  character: PropTypes.object
}

export default Block
