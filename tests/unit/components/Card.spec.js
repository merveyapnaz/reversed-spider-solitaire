import { shallowMount } from "@vue/test-utils";
import Card from "@/components/Card/Card.vue";
import { cardTypeEnum } from "@/common/enums/cardTypeEnum";

describe("Card.vue", () => {
  it("when props card type is Holder should no card text in component", () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        card: {
          type: cardTypeEnum.Holder,
        },
      },
    });

    expect(wrapper.text()).toBe("");
  });

  it("when props card type is Distribute should no card text in component", () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        card: {
          type: cardTypeEnum.Distribute,
        },
      },
    });

    expect(wrapper.text()).toBe("");
  });

  it("when props card type is Card, item with number class must contain card number", () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        card: {
          cardNumber: "2",
          isOpen: true,
          deck: 1,
          value: 2,
          type: cardTypeEnum.Card,
        },
      },
    });

    let numberWrapper = wrapper.find(".number");

    expect(numberWrapper.exists()).toBe(true);
    expect(numberWrapper.text()).toBe("2");
  });

  it("when props card type is Complated, item with number class must contain ''A", () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        card: {
          type: cardTypeEnum.Complated,
        },
      },
    });

    let numberWrapper = wrapper.find(".number");

    expect(numberWrapper.exists()).toBe(true);
    expect(numberWrapper.text()).toBe("A");
  });
});
