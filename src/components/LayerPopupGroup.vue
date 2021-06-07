<template>
  <div class="layerPopupGroup">
    <layer-popup
      v-for="layerInfo in layerGroupInfo"
      :key="layerInfo.id"
      class="shadow"
      :p-config="layerConfig[layerInfo.page][layerInfo.id]"
    ></layer-popup>
  </div>
</template>

<script>
import layerPopup from './LayerPopup'
export default {
  name: 'LayerPopupGroup',
  components: { layerPopup },
  props: {
    pLayerGroupInfo: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({}),
  computed: {
    layerGroupInfo() {
      return this.pLayerGroupInfo
    },
    layerConfig() {
      return this.$configs.layerPopup
    },
  },
  mounted() {
    console.log('Layer Popup Group Mounted!')
    const classCCC = document.querySelectorAll('.ccc')
    for (const ccc of classCCC) {
      ccc.addEventListener('click', () => {
        alert('class ccc clicked!!!')
      })
    }
    // window.addEventListener('resize', (event) => {
    //   console.log('window resized!')
    //   const width = event.target.screen.width
    //   const layerRight = Number(this.pConfig.right.split('px')[0])
    //   const layerWidth = Number(this.pConfig.width.split('px')[0])
    //   if (width < layerWidth + layerRight) {
    //     console.log('window가 너무 작아요!')
    //   }
    // })
  },
}
</script>

<style lang="scss" scoped>
// web
.layerPopupGroup {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  // height: 100%;
}

// mobile
.layerPopupGroup.mobile {
  flex-direction: column;
  align-items: center;
}
</style>
