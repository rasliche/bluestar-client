import { Node } from 'tiptap'
import TextOnScroll from '@/components/TextOnScroll/TextOnScroll'

export default class WavyTextNode extends Node {
  get name() {
    return 'wavytext'
  }

  get schema() {
    return {
      // here you have to specify all values that can be stored in this node
      //   attrs: {

      //   },
      group: 'block',
      selectable: false
      // parseDOM and toDOM is still required to make copy and paste work
      //   parseDOM: [{
      //     tag: 'svg',
      //   }],
      //   toDOM: node => ['svg', {
      //   }],
    }
  }

  // return a vue component
  // this can be an object or an imported component
  get view() {
    return TextOnScroll
  }

  commands({ type }) {
    return (attrs) => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
}
