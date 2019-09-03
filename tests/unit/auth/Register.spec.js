import { shallowMount } from "@vue/test-utils";
import Register from "@/components/auth/Register.vue";

describe("Register.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(Register);
    expect(wrapper.text()).toMatch();
  });
});

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
