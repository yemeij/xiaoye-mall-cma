<template>
  <div class='page-content'>
    <mj-table :list-data='dataList' :list-count='dataTotalCount' v-bind='contentTableConfig' v-model:page='pageInfo'>

      <!--header中的插槽-->
      <template v-slot:headerHandler>
        <el-button type='primary' v-if='isCreate' @click='handleNewClick'>{{ rightAddBtnName }}</el-button>
        <!--<el-button><el-icon><RefreshLeft /></el-icon></el-button>-->
      </template>

      <!--表格列中的插槽-->
      <template #status='scope'>
        <template v-if='scope.row.enable === 1'>
          <el-button size='small' plain type='success'>启用</el-button>
        </template>
        <template v-else-if='scope.row.status === 1'>
          <el-button size='small' plain type='success'>上架</el-button>
        </template>
        <template v-else-if='scope.row.status === 0'>
          <el-button size='small' plain type='success'>下架</el-button>
        </template>
        <template v-else>
          <el-button size='small' plain type='danger'>禁用</el-button>
        </template>
      </template>
      <template v-slot:createAt='scope'>
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template v-slot:updateAt='scope'>
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template v-slot:handler='scope'>
        <div class='handle-btns'>
          <el-button v-if='isUpdate' type='primary' size='small' @click='handleEditClick(scope.row)'>编辑</el-button>
          <el-button v-if='isUpdate' size='small' type='danger' @click='handleDeleteClick(scope.row)'>删除</el-button>
        </div>
      </template>

      <!--在page-content中动态插入剩余的插槽-->
      <!--  获取从goods组件获取其它组件传递过来的自定义的动态插槽-->
      <!--  要将从goods组件获取其它组件传递过来的自定义的动态插槽最终和插入到mj-table组件中的
            在插入mj-table中goods组件获取其它组件传递过来的自定义的动态插槽要和mj-table中的动态插槽要一一对应起来(goods(slotName ===-> mj-table中的动态slotName))
            -->
      <template v-for='item in otherPrpSlots' :key='item.prop' #[item.slotName]='scope'>
        <template v-if='item.slotName'>
          <slot :name='item.slotName' :row='scope.row'></slot>
        </template>
      </template>
    </mj-table>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

import MjTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    rightAddBtnName: {
      type: String,
      default: ''
    }
  },
  components: {
    MjTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取该用户具备的操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo(从vuex中获取currentPage和pageSize)
    const pageInfo = ref(store.state.systemModule.pageQueryInfo)
    // 监听pageInfo当pageInfo发送改变时重新去请求列表数据
    watch(pageInfo, () => {
      getPageData()
    })

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return  // 当没有查询的权限时直接return请求
      store.dispatch('systemModule/getPageListActions', {
        pageName: props.pageName,
        queryInfo: {
          // 当请求数据时扁移量的计算为（当前页-1） * 每页要显示多少条数据
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.size,
          size: pageInfo.value.size,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.拿到vuex中的userList和userCount的数据
    // 通过根据props.pageName去拿到模块中表格所要展示的数据
    const dataList = computed(() => store.getters[`systemModule/pageListData`](props.pageName))
    const dataTotalCount = computed(() => store.getters[`systemModule/pageListCount`](props.pageName))

    // 4.获取其它的动态插槽
    const otherPrpSlots = props.contentTableConfig?.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    // 5.监听删除/编辑/新建按钮的操作
    const handleDeleteClick = (item: any) => {
      console.log(item)
      store.dispatch('systemModule/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      dataTotalCount,
      pageInfo,
      otherPrpSlots,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})

</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
