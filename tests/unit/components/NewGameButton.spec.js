import { shallowMount } from "@vue/test-utils";
import NewGameButton from "@/components/NewGameButton.vue";

describe("NewGameButton.vue", () => {
  it("When click to New Game button location should reload", async () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { reload: jest.fn() },
    });

    const wrapper = shallowMount(NewGameButton);
    const button = wrapper.find(".new-game-btn");

    await button.trigger("click");

    expect(window.location.reload).toHaveBeenCalled();
  });
});
