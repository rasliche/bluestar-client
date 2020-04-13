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
    <div class="border rounded-md">
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
      const lost = Math.floor(Math.random() * 3)
      this.buoys.available -= lost
      this.eventLog.push(`Lost ${lost} buoy${lost > 1 ? 's': ''}.`)
    },
    installAndReplaceBuoys() {
      const divers = this.staff + Math.floor(Math.random() * 5 - 7)
      let installed = 0
      let replaced = 0
      if (divers >= 4) {
        installed += Math.floor(Math.random() * 2)
      } else {
        replaced += Math.floor(Math.random() * 8)
      }
      this.buoys.available += (installed + replaced)
      this.eventLog.push(`Fixed ${replaced} buoy${replaced > 1 ? 's': ''}.`)
      this.buoys.total += installed
      this.eventLog.push(`Installed ${installed} buoy${installed > 1 ? 's': ''}.`)
    },
    checkForHurricane() {

    },
    nextDay() {
      this.loseBuoys()
      this.installAndReplaceBuoys()
      this.days++
    }
  }
}
</script>