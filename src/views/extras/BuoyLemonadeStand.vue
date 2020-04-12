<template>
  <main>
    <PageHeading>Run the Buoy Team</PageHeading>
    <div class="flex justify-around mb-4">
      <ButtonPrimary @click="nextDay">Next Day</ButtonPrimary>
    </div>
    <div class="border rounded-md">
      Day {{ days }}
    </div>
    <div class="border rounded-md">
      <p>Buoys Available: {{ buoys.available }}</p>
      <p>Coverage: {{ buoyCoverage }}%</p>
    </div>
    <div>
      <h3>Event Log</h3>
      <p v-for="(event, index) in eventLog" :key="index">{{ event }}</p>
    </div>
  </main>
</template>

<script>
import { PageHeading, ButtonPrimary } from '@/components/BaseUI'

const HURRICANE_CHANCE = .1
const WEATHERED_OUT_CHANCE = .3

export default {
  name: 'BlueStarBingo',
  components: {
    PageHeading,
    ButtonPrimary
  },
  data() {
    return {
      days: 0,
      staff: 6,
      buoys: {
        total: 900,
        available: 750
      },
      eventLog: []
    }
  },
  computed: {
    buoyCoverage() {
      return this.buoys.available / this.buoys.total * 100
    }
  },
  methods: {
    loseBuoys() {
      const lost = 1
      this.buoys.available -= lost
      this.eventLog.push(`Lost ${lost} buoys.`)
    },
    installAndReplaceBuoys() {

    },
    checkForHurricane() {

    },
    nextDay() {
      this.loseBuoys()
      this.days++
    }
  }
}
</script>