import { shallowMount } from "@vue/test-utils";
import Question from "@/components/quiz/Question.vue";

describe("Question.vue", () => {
  it("emits correctAnswer when given index of correct answer", () => {
    const wrapper = shallowMount(Question, {
        propsData: {
            question: "question text",
            answers: [
                {
                    text: "wrong answer",
                    isRight: false
                },
                {
                    text: "correct answer",
                    isRight: true
                }
            ],
            reviewText: 'text',
            showReviewText: false
        },
        scopedSlots: {
            default: '<p>{{props.index}},{{props.text}}</p>'
          }
    });
    // wrapper.vm.handleAnswer(0)
    wrapper.vm.handleAnswer(1)
    // expect(wrapper.emitted().correctAnswer).toBe(2)
    expect(wrapper.emitted().correctAnswer).toBeTruthy()
    // expect(wrapper.emitted().correctAnswer[1]).toBe("correctAnswer")
  });
});

// EXAMPLE QUIZ.questions
// questions: [
//     {
//       text:
//         "The Florida Keys National Marine Sanctuary is part of a _________ system of marine protected areas, managed by the _________.",
//       answers: [
//         {
//           text:
//             "statewide, Florida Fish and Wildlife Conservation Commission",
//           isRight: false
//         },
//         { text: "regional, National Park Service", isRight: false },
//         { text: "national, National Park Service", isRight: false },
//         {
//           text:
//             "regional, National Oceanic and Atmospheric Administration",
//           isRight: false
//         },
//         {
//           text:
//             "national, National Oceanic and Atmospheric Administration",
//           isRight: true
//         }
//       ],
//       theMoreYouKnow:
//         "The Florida Keys National Marine Sanctuary is one of 13 sanctuaries located across the nation and managed by the National Oceanic and Atmospheric Administration, or NOAA. NOAA is a federal agency housed under the U.S. Department of Commerce. NOAA programs and services assist citizens across the entire nation."
//     },
// ]

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
