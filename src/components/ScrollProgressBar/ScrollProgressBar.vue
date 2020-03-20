<template>
  <div
    class="fixed top-0 left-0 w-full"
    :class="display"
    :style="{
      background: containerColor,
      zIndex
    }"
  >
    <div
      :class="barClass"
      :style="{
        width: `${width}%`,
        height: height,
        background: backgroundColor
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'VueScrollProgressBar',
  props: {
    height: {
      type: String,
      default: '.5rem'
    },
    zIndex: {
      type: String,
      default: '50'
    },
    backgroundColor: {
      type: String,
      default: 'linear-gradient(to right, #38C172, #51D88A)'
    },
    containerColor: {
      type: String,
      default: 'transparent'
    },
    barClass: {
      type: Object,
      default: () => {}
    },
    containerClass: {
      type: Object,
      default: () => {}
    },
    // Extra props
    useVerticalOffset: {
      type: Boolean,
      default: false
    },
    offsetElement: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      width: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.dispatchEvent(new Event('scroll'))
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    display() {
      return this.width > 0 ? 'block' : 'hidden'
    }
  },
  methods: {
    handleScroll() {
      // my changes
      // this.$el - can this be used to only scroll the item?
      let offsetHeight = 0
      if (this.useVerticalOffset) {
        offsetHeight = document.getElementById(this.offsetElement).scrollHeight
      }
      //add the - offsetHeight
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight -
        offsetHeight
      //add the - offsetHeight
      this.width = ((window.scrollY - offsetHeight) / height) * 100
      const eventWidth = Math.ceil(this.width)
      if (eventWidth === 0) {
        this.$emit('begin')
      }
      if (eventWidth === 50) {
        this.$emit('halfway')
      }
      if (eventWidth === 100) {
        this.$emit('complete')
      }
    }
  }
}
</script>