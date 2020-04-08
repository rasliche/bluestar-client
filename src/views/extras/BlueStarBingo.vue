<template>
  <main>
      <PageHeading>Blue Star Bingo</PageHeading>
      <div class="flex justify-around mb-4">
        <ButtonPrimary @click="shuffleSquares">Shuffle</ButtonPrimary>
        Click shuffle and then click the free square.
      </div>
      <div class="grid grid-cols-5 gap-2 w-auto text-center">
          <div
            @click="markSquare(index)"
            class="border border-2 border-gray-600" 
            :class="{ 'bg-green-400': square.marked }" 
            v-for="(square, index) in squares" :key="index"
            >
              <p v-if="index === 12">
                FREE!
            </p>
            <p v-else>
                {{ square.text }}
            </p>
          </div>
      </div>
  </main>
</template>

<script>
import { PageHeading, ButtonPrimary } from '@/components/BaseUI'

export default {
    name: 'BlueStarBingo',
    components: {
        PageHeading,
        ButtonPrimary
    },
    data() {
        return {
            squares: [
                {
                    text: "Someone opens a drink",
                    marked: false },
                {
                    text: "Dog Barks",
                    marked: false },
                {
                    text: "Ear-splitting mic feedback",
                    marked: false },
                {
                    text: '"I forgot I was on mute"',
                    marked: false },
                {
                    text: 5,
                    marked: false },
                {
                    text: 6,
                    marked: false },
                {
                    text: 7,
                    marked: false },
                {
                    text: 8,
                    marked: false },
                {
                    text: 9,
                    marked: false },
                {
                    text: 10,
                    marked: false },
                {
                    text: 11,
                    marked: false },
                {
                    text: 12,
                    marked: false },
                {
                    text: 13,
                    marked: false },
                {
                    text: 14,
                    marked: false },
                {
                    text: 15,
                    marked: false },
                {
                    text: 16,
                    marked: false },
                {
                    text: 17,
                    marked: false },
                {
                    text: 18,
                    marked: false },
                {
                    text: 19,
                    marked: false },
                {
                    text: 20,
                    marked: false },
                {
                    text: 21,
                    marked: false },
                {
                    text: 22,
                    marked: false },
                {
                    text: 23,
                    marked: false },
                {
                    text: 24,
                    marked: false },
                {
                    text: 25,
                    marked: false },
            ]
        }
    },
    // created() {
    //     this.shuffleSquares()
    // },
    methods: {
        shuffleSquares() {
            for (let i = (this.squares.length - 1); i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = this.squares[i]
                this.squares[i] = this.squares[j]
                this.squares[j] = temp
            }
        },
        markSquare(index) {
            this.squares[index].marked = !this.squares[index].marked
        }
    }
}
</script>