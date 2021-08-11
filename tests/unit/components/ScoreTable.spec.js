import { shallowMount } from "@vue/test-utils";
import ScoreTable from "@/components/ScoreTable.vue";

describe("ScoreTable.vue", () => {
  it("When the moveCount prop is updated, the score should be moveCount * movePoint", async () => {
    const wrapper = shallowMount(ScoreTable);

    const moveCount = 5;
    await wrapper.setProps({ moveCount: moveCount });

    expect(wrapper.vm.score).toBe(moveCount * wrapper.vm.movePoint);
  });

  it("When the deckCount prop is updated, the score should be deckCount * deckPoint", async () => {
    const wrapper = shallowMount(ScoreTable);

    const deckCount = 2;
    await wrapper.setProps({ deckCount: deckCount });

    expect(wrapper.vm.score).toBe(deckCount * wrapper.vm.deckPoint);
  });

  it("When the deckCount and moveCount props are updated, the score should be  moveCount * movePoint + deckCount * deckPoint", async () => {
    const wrapper = shallowMount(ScoreTable);

    const deckCount = 2;
    const moveCount = 5;
    const calculatedValue =
      deckCount * wrapper.vm.deckPoint + moveCount * wrapper.vm.movePoint;

    await wrapper.setProps({ deckCount: deckCount, moveCount: moveCount });

    expect(wrapper.vm.score).toBe(calculatedValue);
  });

  it("When isGameEnd props update true, the score value should be (moveCount * movePoint + deckCount * deckPoint) - timerValue", async () => {
    const moveCount = 50;
    const deckCount = 8;
    const timerValue = 2400;

    const wrapper = shallowMount(ScoreTable);

    await wrapper.setProps({
      isGameEnd: true,
      moveCount: moveCount,
      timerValue: timerValue,
      deckCount: deckCount,
    });

    const calculatedValue =
      moveCount * wrapper.vm.movePoint +
      deckCount * wrapper.vm.deckPoint -
      timerValue;

    expect(wrapper.vm.score).toBe(calculatedValue);
  });
});
