import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";
import { buttonTypeEnum } from "@/common/enums/buttonTypeEnum";

describe("Button.vue", () => {
  it("if button type is NewGame it should emit newGame function when clicked ", async () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: buttonTypeEnum.NewGame,
      },
    });
    const button = wrapper.find(".custom-button");

    await button.trigger("click");

    expect(wrapper.emitted().newGame).toBeTruthy();
  });

  it("if button type is Hint it should emit hint function when clicked ", async () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: buttonTypeEnum.Hint,
      },
    });
    const button = wrapper.find(".custom-button");

    await button.trigger("click");

    expect(wrapper.emitted().hint).toBeTruthy();
  });
});

// import { shallowMount } from "@vue/test-utils";
// import NewGameButton from "@/components/NewGameButton.vue";

// describe("NewGameButton.vue", () => {
//   it("When click to New Game button location should reload", async () => {
//     Object.defineProperty(window, "location", {
//       writable: true,
//       value: { reload: jest.fn() },
//     });

//     const wrapper = shallowMount(NewGameButton);
//     const button = wrapper.find(".new-game-btn");

//     await button.trigger("click");

//     expect(window.location.reload).toHaveBeenCalled();
//   });
// });
