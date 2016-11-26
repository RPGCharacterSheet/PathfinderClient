import React, {Component, PropTypes} from 'react'
import { result } from 'lodash'
class Block extends Component {

  contentToComponent (content, character) {
    if (Array.isArray(content)) {
      return content.map((b, idx) => this.contentToComponent(b, character))
    } else if (typeof content === 'object')
      return <Block {...content} character={character} />
    else if (typeof content === 'string') {
      if (content[0] === '$') {
        return result(character, content.slice(1))
      } else {
        return <div>{content}</div>
      }
    }
  }

  render () {
    const { styles, title, content, character } = this.props

    return (
      <div style={styles}>
        <h1>{title}</h1>
        {this.contentToComponent(content, character)}
      </div>
    )
  }
}

Block.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.any,
  character: PropTypes.object
}

export default Block
