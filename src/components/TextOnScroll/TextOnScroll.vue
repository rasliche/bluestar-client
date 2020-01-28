<script>
export default {
  name: 'Wavytext',
  props: {
    view: {},
    curve: {
      type: String,
      // required: true,
      default: 'M0 100s269.931 86.612 520 0c250.069-86.612 480 0 480 0'
    },
    textToCurve: {
      type: String,
      default: 'Test Text'
    },
    value: {
      type: String,
      default: 'Test Text'
    }
  },
  created() {
    // const escapeHandler = e => {
    //     if (e.key === "Escape" && this.show) {
    //         this.dismiss()
    //     }
    // }
    // document.addEventListener("keydown", escapeHandler)
    // function onScroll(){
    //     requestAnimationFrame(function(){
    //         var rect = textContainer.getBoundingClientRect();
    //         var scrollPercent = rect.y / window.innerHeight;
    //         console.log(scrollPercent);
    //         updateTextPathOffset( scrollPercent * 2 * pathLength );
    //     });
    // }
    // this.$once("hook:destroyed", () => {
    //     document.removeEventListener("keydown", escapeHandler)
    // })
  },
  render(createElement) {
    return createElement('div', [
      createElement(
        'svg',
        {
          attrs: {
            viewbox: '0 0 1000 200',
            xlmns: 'http://www.w3.org/2000/svg'
          }
        },
        [
          createElement('path', {
            attrs: {
              id: 'text-curve',
              d: 'M0 100s269.931 86.612 520 0c250.069-86.612 480 0 480 0',
              fill: 'none',
              stroke: '#000'
            }
          }),
          createElement(
            'text',
            {
              attrs: {
                y: '40',
                fontSize: '32'
              }
            },
            [
              createElement(
                'textPath',
                {
                  attrs: {
                    startOffset: '200',
                    href: '#text-curve'
                  }
                },
                this.value
              )
            ]
          )
        ]
      ),
      () => {
        if (this.view.editable) {
          createElement('input', {
            attrs: {
              type: 'text',
              placeholder: 'placeholder text'
            },
            domProps: {
              value: this.value
            },
            on: {
              input: function(event) {
                this.$emit('input', event.target.value)
              }
            }
          })
        }
      }
    ])
  }
}
</script>
