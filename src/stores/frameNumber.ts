export const useFrameNumber = defineStore('frameNumber', () => {
    const currentFrameNumber = ref(0)
    const minFrameNumber = ref(0)
    const maxFrameNumber = ref(1000)
    const stepSize = ref(1)

    //computed values
    const frameCount = computed(() => maxFrameNumber.value - minFrameNumber.value)

    function increment() {
        currentFrameNumber.value += stepSize.value
        //loop when running forwards
        if (currentFrameNumber.value > maxFrameNumber.value) {
            currentFrameNumber.value = 0
        }

        //loop when running backwards
        if (currentFrameNumber.value < 0) {
            currentFrameNumber.value = maxFrameNumber.value
        }
    }

    function setMinFrameNumber(newMinFrameNumber: number) {
        if (newMinFrameNumber < 0) {
            newMinFrameNumber = 0
        }
        if (newMinFrameNumber > maxFrameNumber.value) {
            newMinFrameNumber = maxFrameNumber.value - 1
        }
        minFrameNumber.value = newMinFrameNumber
        console.debug(`Min frame number set to: ${minFrameNumber.value}`)
    }

    function setMaxFrameNumber(newMaxFrameNumber: number) {
        if (newMaxFrameNumber < 1) {
            newMaxFrameNumber = 1
        }
        if (newMaxFrameNumber > maxFrameNumber.value) {
            newMaxFrameNumber = maxFrameNumber.value
        }
        maxFrameNumber.value = newMaxFrameNumber
        console.debug(`Max frame number set to: ${maxFrameNumber.value}`)
    }

    function setStepSize(newStepSize: number) {
        if (newStepSize > frameCount.value) {
            newStepSize = frameCount.value
        }
        stepSize.value = newStepSize
        console.debug(`Step size set to: ${stepSize.value}`)
    }

    return {
        currentFrameNumber,
        increment,
        maxFrameNumber,
        setMaxFrameNumber,
        minFrameNumber,
        setMinFrameNumber,
        stepSize,
        setStepSize
    }
})
