<template>
  <v-lazy>
    <v-card
      v-if="layerDisplay"
      class="cLayerPopup"
      :style="`width: ${pConfig.width}; top: ${pConfig.top};`"
    >
      <v-card-title
        v-if="pConfig.headerText"
        :style="`color: ${
          pConfig.headerTextColor ? pConfig.headerTextColor : undefined
        }; background-color: orange`"
        >{{ pConfig.headerText }}</v-card-title
      >
      <v-card-text>
        <v-img
          v-if="pConfig.type === 'image'"
          :src="pConfig.content ? pConfig.content : ''"
          contain
        ></v-img>
        <span
          v-if="pConfig.type === 'html'"
          :class="`html-viewer-${pConfig.id}`"
          :style="`zoom: ${pConfig.zoom}`"
        ></span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- 오늘 하루 이 창을 더 이상 열지 않음 -->
        <v-checkbox
          v-if="pConfig.doNotOpenToday"
          :id="`${laylerId}--chkbx`"
          v-model="doNotOpenToday"
          label="오늘 하루 이 창을 더 이상 열지 않음"
          :name="`${laylerId}--chkbx`"
          hide-details
        ></v-checkbox>
        <v-spacer></v-spacer>
        <v-btn
          class="cBtn__stats"
          color="transparent"
          depressed
          @click="layerDisplay = false"
        >
          <v-icon class="cLayerPopup--close" style="color: grey">
            mdi-close
          </v-icon>
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-lazy>
</template>

<script>
export default {
  name: 'LayerPopup',
  components: {},
  props: {
    // pId: {
    //   type: String,
    //   default: 'layer_#default',
    //   required: true,
    // },
    // pDisplay: {
    //   type: String,
    //   default: 'none',
    //   required: true,
    // },
    pConfig: {
      type: Object,
      required: true,
      default: () => ({
        id: undefined,
        headerText: undefined,
        headerTextColor: undefined,
        headerBgColor: undefined,
        doNotOpenToday: true,
        footerTextColor: undefined,
        footerBgcolor: undefined,
        width: undefined,
        height: undefined,
        top: undefined,
        right: undefined,
      }),
    },
  },
  data: () => ({
    // key: 'value',
    layerDisplay: false,
    doNotOpenToday: false,
  }),
  computed: {
    laylerId() {
      return this.pConfig.id
    },
  },
  watch: {
    doNotOpenToday: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.$setPopupCookie(this.pConfig.id)
        } else {
          this.$delPopupCookie(this.pConfig.id)
        }
      },
    },
  },
  mounted() {
    console.log('Layer Popup Mounted!')
    this.checkDoNotOpenToday()
    this.checkTypeHtml()
  },
  methods: {
    checkDoNotOpenToday() {
      try {
        const cookie = this.$getPopupCookie(this.pConfig.id)[2]
        // doNotOpenToday cookie가 존재하면 팝업을 띄우지 않음
        if (cookie === 'doNotOpenToday') {
          this.layerDisplay = false
        } else {
          this.layerDisplay = true
        }
      } catch (error) {
        console.log('[VUE] LayerPopup > checkDoNotOpenToday() Error:', error)
      }
    },
    checkTypeHtml() {
      try {
        setTimeout(() => {
          // config 내용 중 html 항목이 있으면 htmlBinder 함수 호출
          const htmlViewer = document.querySelector(
            `.html-viewer-${this.pConfig.id}`
          )
          if (htmlViewer) {
            this.$htmlBinder(htmlViewer, this.pConfig.content)
          }
        }, 100)
      } catch (error) {
        console.log('[VUE] LayerPopup > checkTypeHtml() Error:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// web
.cLayerPopup {
  // position: absolute;
  display: inline-block;
  margin-left: 10px;

  .card-header {
    border-radius: 0;
  }

  .cLayerPopup--close {
    color: grey;
  }
}

// mobile
.cLayerPopup.mobile {
  margin-bottom: 10px;
  margin-left: 0;
}
</style>
