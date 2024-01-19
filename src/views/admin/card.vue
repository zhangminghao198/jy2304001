<template>
  <el-form :inline="true" :model="query" class="demo-form-inline">
    <el-form-item label="车牌号码">
      <el-input v-model="query.carNumber" placeholder="请输入内容" clearable />
    </el-form-item>
    <el-form-item label="车主姓名">
      <el-input v-model="query.personName" placeholder="请输入内容" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="query.cardStatus" placeholder="全部" style="width: 100px;" clearable>
        <el-option label="有效" value="0" />
        <el-option label="无效" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <div style="display: flex;">
    <el-button type="primary" @click="add">添加月卡</el-button>
    <el-button>批量删除</el-button>
  </div>

  <el-table ref="multipleTableRef" :data="list" style="width: 100%;text-align: center;">
    <el-table-column type="selection" width="55" />
    <el-table-column type="index" label="序号" />
    <el-table-column property="personName" label="车主名称" />
    <el-table-column property="phoneNumber" label="联系方式" />
    <el-table-column property="carNumber" label="车牌号码" />
    <el-table-column property="carBrand" label="车辆品牌" />
    <el-table-column property="totalEffectiveDate" label="剩余有效天数" />
    <el-table-column property="cardStatus" label="状态">
      <template #default="scope">
        <p v-if="scope.row.cardStatus">无效</p>
        <p v-else>有效</p>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <span style="color: #88a0ea;margin: 05px;">续费</span>
        <span style="color: #88a0ea;margin: 05px;">查看</span>
        <span style="color: #88a0ea;margin: 05px;">编辑</span>
        <span style="color: #88a0ea;margin: 05px;" @click="del(scope.row)">删除</span>
      </template>
    </el-table-column>
  </el-table>

  <div style="float: right;">
    <el-pagination v-model:current-page="query.page" v-model:page-size="query.pageSize" :page-sizes="[1, 3, 5, 10]"
      layout="total, prev, pager, next, " :total="total" @size-change="getList" @current-change="getList" />
  </div>
</template>

<script lang="ts" setup>
import { delsApi, listApi } from '@/api/api';
import router from '@/router';
import { ElTable } from 'element-plus'
import { ref, reactive } from "vue";


const onSubmit = () => {
  getList()
}


const list = ref<any[]>([])
const total = ref(0)

const query = reactive({
  page: 1,
  pageSize: 5,
  carNumber: '',
  personName: '',
  cardStatus: ''
})

const getList = () => {
  listApi(query).then((res: any) => {
    console.log(res);
    if (res.code == 10000) {
      list.value = res.data.rows
      total.value = res.data.total
    }
  })
}
getList()

const add = () => {
  router.push('/add')
}

const arr = reactive<any[]>([])
const del = (row: any) => {
  
}

</script>

<style lang="scss" ></style>