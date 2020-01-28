import { shallowMount } from '@vue/test-utils'
import Quiz from '@/components/quiz/Quiz.vue'

describe('Quiz.vue', () => {
  it('begins with introStage true', () => {
    const wrapper = shallowMount(Quiz, {
      propsData: {
        quiz: {
          title: 'fakeTitle'
        }
      }
    })
    expect(wrapper.vm.introStage).toBe(true)
    expect(wrapper.vm.questionStage).toBe(false)
    expect(wrapper.vm.resultStage).toBe(false)
  })

  it('increases correct count on correctAnswer', () => {
    const wrapper = shallowMount(Quiz, {
      propsData: {
        quiz: {
          title: 'fakeTitle'
        }
      }
    })
    wrapper.vm.correctAnswer()
    wrapper.vm.wrongAnswer()
    wrapper.vm.correctAnswer()
    expect(wrapper.vm.correct).toBe(2)
  })
})

// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });
