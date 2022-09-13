<template>
  <div class='mj-table'>
    <!--表格的头部-->
    <div class='header'>
      <slot name='header'>
        <div class='title'>{{title}}</div>
        <div class='handler'>
          <slot name='headerHandler'></slot>
        </div>
      </slot>
    </div>
    <el-table :data='listData' border style='width: 100%' @selection-change='handleSelectionChange' v-bind='childrenProps'>
      <!--是否要显示表格第一列的序号-->
      <el-table-column v-if='showSelectColumn' type='selection' align='center' width='60'></el-table-column>
      <el-table-column v-if='showIndexColumn' type='index' label='序号' align='center' width='80'></el-table-column>
      <template v-for='propItem in propList' :key='propItem.prop'>
        <el-table-column v-bind='propItem' align='center' show-overflow-tooltip>
          <template #default='scope'>
            <slot :name='propItem.slotName' :row='scope.row'>
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!--表格底部的分页部分-->
    <div class='footer'>
      <slot name='footer'>
        <el-pagination
          v-if='showFooter'
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 表格头部的title
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    // 表格底部的总数据条数
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // 通过pageContent组件进行v-model进行双向绑定
    page: {
      type: Object,
      default: () => ({currentPage: 0, pageSize: 10})
    },
    // 通过菜单管理组件中传递过来的tree-props属性来决定表格是否要有展开列的功能
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 是否要显示表格底部的分页栏
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(props, {emit}) {
    // 选中勾选进行多条数据删除的函数
    const handleSelectionChange = (value: any) => {
      console.log(value)
      emit('selectChange', value)
    }

    // 当currentPage发送改变时的回调
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', {...props.page, currentPage})
    }

    // 当pageSize发送改变时的回调
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', {...props.page, pageSize})
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})

</script>

<style scoped lang='less'>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
