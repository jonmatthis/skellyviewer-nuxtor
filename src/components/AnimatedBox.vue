<template>
  <TresMesh ref="boxRef">
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>

<script setup>

const boxRef = shallowRef()
const frameNumberStore = useFrameNumber()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  boxRef.value.rotation.y += delta
  boxRef.value.rotation.x = elapsed
  boxRef.value.position.x = Math.sin(elapsed)
  boxRef.value.position.y = Math.cos(elapsed)
  frameNumberStore.increment()

})
</script>

