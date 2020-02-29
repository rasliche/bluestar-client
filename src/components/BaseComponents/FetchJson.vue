<script>
import Api from '@/services/Api'

export default {
  name: 'FetchJson',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      json: null
    }
  },
  async created() {
    try {
      const { data } = await Api.get(this.url)
      this.json = data
      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  },
  render() {
      return this.$scopedSlots.default({
          json: this.json,
          loading: this.loading
      })
  }
}
</script>
