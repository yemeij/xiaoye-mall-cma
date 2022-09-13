<template>
  <div class="menu">
    <page-content page-name='menu' :content-table-config='contentTableConfig' right-add-btn-name='添加菜单'></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'

import {contentTableConfig} from './config/content-config'

export default defineComponent({
  name: 'mj-menu',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
