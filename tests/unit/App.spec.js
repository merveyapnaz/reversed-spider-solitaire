import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import SpiderSolitaire from "@/views/SpiderSolitaire.vue";
import app from "@/common/constants/app";

describe("App.vue", () => {
  it("When the page loads must include the spider solitaire component.", () => {
    const localVue = createLocalVue();
    localVue.use(app);

    const wrapper = shallowMount(App, {
      localVue,
    });

    expect(wrapper.getComponent(SpiderSolitaire));
  });
});
