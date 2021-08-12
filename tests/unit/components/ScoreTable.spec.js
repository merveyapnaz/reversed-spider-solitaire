import { shallowMount } from "@vue/test-utils";
import ScoreTable from "@/components/ScoreTable.vue";

describe("ScoreTable.vue", () => {
  it("When the score prop is updated, the score text should be updated", async () => {
    const wrapper = shallowMount(ScoreTable);

    const score = 5540;
    await wrapper.setProps({ score: score });

    expect(wrapper.text()).toContain(score.toString());
  });
});
