<template>
  <div>
    <div class="action-container">
      <input v-model="dataCount" />
      <button @click="updateDataSource">Update</button>
    </div>
    <div style="width: 100%; display: flex; justify-content: center">
      <VitualTable :data="dataSource" dataKey="name" :height="height" style="width: 80%" :columnHeight="columnHeight" border>
        <TableColumn field="name" title="Name" v-slot="{ row }" :align="align">
          <div>{{ row.name }}</div>
        </TableColumn>
        <TableColumn v-if="showEmail" field="email" title="Email" :align="align"> </TableColumn>
        <TableColumn field="address" title="Address" :align="align"> </TableColumn>
      </VitualTable>
    </div>
    <!-- <div class="list-container">
      <VueVirtualList :data="dataSource">
        <template v-slot="{ item, index }">
          <div class="item-container">
            <div class="cell cell-index">{{ index + 1 }}</div>
            <div class="cell">{{ item.name }}</div>
            <div class="cell">{{ item.email }}</div>
            <div class="cell">{{ item.address }}</div>
          </div>
        </template>
      </VueVirtualList>
    </div> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import VueVirtualList from '@/virtual-list/VirtualList.tsx'
  import { mock } from './utils'
  import VitualTable from '@/virtual-table/VirtualTable.tsx'
  import columns from './colums'
  import TableColumn from './virtual-table/TableCloumn.tsx'

  export default defineComponent({
    name: 'App',
    data() {
      return {
        tableColumn: [...columns]
      }
    },
    setup() {
      const dataSource = ref(mock(500))
      const dataCount = ref(500)
      const height = ref('500px')
      const align = ref('left')
      const showEmail = ref(true)
      const columnHeight = ref(40)

      return { dataSource, dataCount, height, align, showEmail, columnHeight }
    },
    components: {
      VueVirtualList,
      VitualTable,
      TableColumn
    },
    methods: {
      updateDataSource() {
        this.dataSource = mock(this.dataCount)
      }
    }
  })
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .list-container {
    width: 800px;
    height: 600px;
    border: 2px solid #4caf50;
    margin: 0 auto;
  }
  .item-container {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .cell {
    margin: 0 8px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
    &.cell-index,
    &.cell-img {
      flex: none;
      min-width: 60px;
    }
  }
  .action-container {
    margin-bottom: 16px;
    button {
      margin-left: 10px;
    }
  }
</style>
