import { shallowMount } from "@vue/test-utils";
import Timer from "@/components/Timer.vue";

jest.useFakeTimers();

describe("Timer.vue", () => {
  it("Timer values after 1 hour 3 minutes 5 seconds from render", async () => {
    const wrapper = shallowMount(Timer);
    jest.runTimersToTime(3785 * 1000);

    await expect(wrapper.vm.hour).toBe(1);
    await expect(wrapper.vm.minute).toBe(3);
    await expect(wrapper.vm.second).toBe(5);
  });

  it("getTimer method should return 3785 after 1 hour 3 minutes 5 seconds from render", async () => {
    const wrapper = shallowMount(Timer);
    jest.runTimersToTime(3785 * 1000);

    let timerValue = wrapper.vm.getTimerValue();

    await expect(timerValue).toBe(3785);
  });

  it("Timer values should not change when isRunning prop is sent true", async () => {
    const wrapper = shallowMount(Timer);

    jest.runTimersToTime(3785 * 1000);

    await wrapper.setProps({ isRunning: false });

    jest.runTimersToTime(3785 * 1000);

    await expect(wrapper.vm.hour).toBe(1);
    await expect(wrapper.vm.minute).toBe(3);
    await expect(wrapper.vm.second).toBe(5);
  });
});
