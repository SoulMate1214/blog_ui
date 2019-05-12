<template>
  <div class="footer">
    <div>
      分享技术，分享生活
    </div>
    <div>
      灵魂伴侣 ©2019 Create by 冫Soul丶
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>
<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>

