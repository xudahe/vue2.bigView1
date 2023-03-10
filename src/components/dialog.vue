<template>
  <div v-show="show" class="xa-popup">
    <div class="layer"></div>
    <div ref="popup" class="popup">
      <div ref="title" :class="title.className || 'xa-bg-eee'" class="title">
        <div class="name">{{ title.text || title }}</div>
        <div size="small" @click="close" class="close"></div>
        <div icon="android-done" circle size="small" @click="changemax(false)" class="close closemin" style="right: 35px"
          v-show="bodyshow"></div>
        <div icon="android-done" circle size="small" @click="changemax(true)" class="close closemax" style="right: 35px"
          v-show="!bodyshow"></div>
      </div>
      <div ref="main" class="main" v-show="bodyshow">
        <slot></slot>
      </div>
      <div v-show="buttons.length" class="buttons">
        <div v-for="btn in buttons" @click="setEvent(btn)" :class="btn.className" class="button" :key="btn.text">
          {{ btn.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../eventBus";
var drag = (dragBox, moveBox = dragBox) => {
  var mapview = document.getElementById("appComponts"); //地图界面窗口id
  dragBox.onmousedown = (e) => {
    var disX = e.clientX - moveBox.offsetLeft + mapview.offsetLeft;
    var disY = e.clientY - moveBox.offsetTop + mapview.offsetTop;
    document.onmousemove = (e) => {
      e.preventDefault();
      var l = e.clientX - disX;
      var t = e.clientY - disY; //'appComponts'

      var x = mapview.clientWidth - moveBox.offsetWidth;
      var y = mapview.clientHeight - moveBox.offsetHeight;
      l = l < 0 ? 0 : l > x ? x : l;
      t = t < 0 ? 0 : t > y ? y : t;
      moveBox.style.left = l + mapview.offsetLeft + "px";
      moveBox.style.top = t + mapview.offsetTop + "px";
      return false;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      return false;
    };
    return false;
  };
  var x = mapview.clientWidth - moveBox.offsetWidth + mapview.offsetLeft;
  var y = mapview.offsetTop;
  moveBox.style.left = x + "px";
  moveBox.style.top = y + "px";
};
export default {
  data() {
    return {
      isshow: false,
    };
  },
  methods: {
    // 弹框适配屏幕居中
    autosize() {
      this.$nextTick(() => {
        var dom = this.$refs.popup;
        var CHeight = document.documentElement.clientHeight;
        var CWidth = document.documentElement.clientWidth;
        var PHeight = dom.offsetHeight;
        var PWidth = dom.offsetWidth;
        this.$refs.main.style.maxHeight = CHeight - 100 + "px";
        dom.style.top = "50px";
        dom.style.left = "100px";
      });
    },
    retresize() {
      this.$nextTick(() => {
        var mapview = document.getElementById("appComponts");
        var x =
          mapview.clientWidth -
          this.$refs.popup.offsetWidth +
          mapview.offsetLeft;
        var y = mapview.offsetTop;
        this.$refs.popup.style.left = "2.2rem";
        this.$refs.popup.style.top = "0.9rem";
      });
    },
    retresizeSearch() {
      this.$nextTick(() => {
        this.$refs.popup.style.left = "540px";
        this.$refs.popup.style.top = "64px";
      });
    },
    retresizeTool() {
      this.$nextTick(() => {
        this.$refs.popup.style.left = "0.5rem";
        this.$refs.popup.style.top = "0.5rem";
      });
    },
    retresizeNew() {
      this.$nextTick(() => {
        this.$refs.popup.style.left = "13.5rem";
        this.$refs.popup.style.top = "1.0rem";
      });
    },
    retresize_wrj() {
      this.$nextTick(() => {
        this.$refs.popup.style.left = "7.5rem";
        this.$refs.popup.style.top = "0.9rem";
      });
    },
    retresize_outlet() {
      this.$nextTick(() => {
        this.$refs.popup.style.left = "10.5rem";
        this.$refs.popup.style.top = "0.9rem";
      });
    },
    setEvent(btn) {
      this.$emit(btn.clickEvent);
      this.$emit("onbtnclick", btn);
    },
    close() {
      this.$emit("input", false);
    },
    changemax(val) {
      // this.$emit('maxormin', val);
      this.$parent.dialog.bodyshow = val;
    },
  },
  props: {
    title: {
      default: "",
    },
    value: {
      type: Boolean,
      default: false,
    },
    buttons: {
      type: Array,
      default() {
        return [];
      },
    },
    bodyshow: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    show() {
      return this.value;
    },
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      drag(this.$refs.title, this.$refs.popup);
    });
  },
  created() {
    this._getLess("/components/dialog.less");
  },
};
</script>
<style lang="less" scoped>
/*dialog*/
</style>