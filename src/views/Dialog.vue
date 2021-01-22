<template>
  <div class="layer" v-if="value">
    <div class="layer-body">
      <div class="layer-body-title">
        {{ title }}
        <span @click="$emit('input', false)">
          <a href="javascript:;" style="color: red"> X </a></span
        >
      </div>
      <div class="layer-body-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
  },
  components: {},
};
</script>

<style>
.layer {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.layer-body {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 512px;
  height: 290px;
  background: #ffff;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 15px #ddd;
}

.layer-body-title {
  position: relative;
  width: 100%;
  margin-top: 27px;
  font-size: 25px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.layer-body-title span {
  position: absolute;
  right: 0px;
  top: -28px;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: red;
  font-size: 20px;
}

.layer-body-input label {
  float: left;
  width: 90px;
  padding-right: 10px;
  text-align: right;
  height: 35px;
  line-height: 100px;
}

.layer-body-input input.list-input {
  float: left;
  margin-top: 30px;
  line-height: 35px;
  width: 350px;
  height: 35px;
  border: 1px solid #ebebeb;
  text-indent: 5px;
}

.layer-body-button {
  position: absolute;
  width: 30%;
  margin: 170px 0px 0px 320px;
  line-height: 35px;
}

.layer-body-button button {
  border: 1px solid #ebebeb;
  background-color: transparent;
  border-radius: 5px;
  width: 60px;
  height: 35px;
  margin-right: 10px;
  text-align: center;
}
</style>