<template>
    <el-container>
        <el-aside width="200px" style="height: 100vh;">
            <el-menu active-text-color="#ffd04b" background-color="#fff" class="el-menu-vertical-demo" router
                :default-active="$route.path" text-color="#000">
                <el-menu-item :index="'/gzt'">
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>工作台</span>
                </el-menu-item>
                <el-sub-menu :index="item.id" v-for="item, index in list" :key="index">
                    <template #title>
                        <el-icon>
                            <Menu />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item  v-for="e, i in item.children" :key="i" @click="tz(e.id)">{{ e.title
                    }}</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container style="background-color: #f4f6f8;">
            <el-header>Header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { cblApi } from '@/api/api'
import { useRouter } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'

const router = useRouter()
const list = ref<any[]>([])

cblApi().then((res: any) => {
    console.log(res);
    if (res.code == 10000) {
        list.value = res.data
    }
})

const tz = (id:any)=>{
    if(id == 2008){
        console.log(1);
        router.push('/card')
    }
}


</script>

<style lang="scss" >
.el-main {
    margin: 20px;
    height: calc(100vh - 100px);
    background-color: white;
}
</style>