import { shallowMount } from "@vue/test-utils";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal.vue";

describe("ConfirmModal.vue", () => {
  it("should emit confirmModalResponse function with true when clicked confirm-btn-yes button ", async () => {
    const wrapper = shallowMount(ConfirmModal);
    const buttonYes = wrapper.find(".confirm-btn-yes");

    await buttonYes.trigger("click");

    expect(wrapper.emitted().confirmModalResponse[0]).toEqual([true]);
  });

  it("should emit confirmModalResponse function with false when clicked confirm-btn-no button ", async () => {
    const wrapper = shallowMount(ConfirmModal);
    const buttonYes = wrapper.find(".confirm-btn-no");

    await buttonYes.trigger("click");

    expect(wrapper.emitted().confirmModalResponse[0]).toEqual([false]);
  });
});
