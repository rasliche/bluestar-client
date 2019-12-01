import { Node } from 'tiptap'

export default class Iframe extends Node {

  get name() {
    return 'iframe';
  }

  get schema() {
    return {
      attrs: {
        src: {
          default: "https://youtube.com/embed/IHv0nVxnycw",
        },
      },
      group: 'block',
      selectable: false,
      parseDOM: [{
        tag: 'iframe',
        getAttrs: dom => ({
          src: dom.getAttribute('src'),
        }),
      }],
      toDOM: node => [
        'iframe', {
          // class: "mx-auto",
          src: node.attrs.src,
          frameborder: 0,
          allowfullscreen: 'true',
          allow:
              "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
          width: "560",
          height: "315",
        }
      ],
    }
  }

  // get view() {
  //   return {
  //     props: ['node', 'updateAttrs', 'view'],
  //     computed: {
  //       src: {
  //         get() {
  //           return this.node.attrs.src
  //         },
  //         set(src) {
  //           this.updateAttrs({
  //             src,
  //           })
  //         },
  //       },
  //     },
  //   }
  // }

  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state;
      const position = selection.$cursor 
        ? selection.$cursor.pos 
        : selection.$to.pos;
      const node = type.create(attrs);
      const transaction = state.tr.insert(position, node);
      dispatch(transaction);
    }
  }
}