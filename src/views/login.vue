<template>
    <div class="op">
        <div class="left"></div>
        <div class="right">
            <p>智慧园区-登录</p>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="登录" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi } from '@/api/api'
import { useRouter } from 'vue-router'

const router = useRouter()

interface RuleForm {
    username: string
    password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: 'demo',
    password: 'zh@hm#23',
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 6, message: '账号长度3到6位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入Miami', trigger: 'blur' },
        { min: 3, max: 8, message: '密码长度3到8位', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            loginApi(ruleForm).then((res: any) => {
                console.log(res);
                if (res.code == 10000) {
                    localStorage.setItem('token', res.data.token)
                    router.push('/admin')
                    ElMessage({
                        showClose: true,
                        message: '登录成功',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    })
                }
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}


</script>

<style lang="scss">
.op {
    height: 100vh;
    width: 100%;
    display: flex;

    .left {
        width: 70%;
        background-color: #4873c4;
    }

    .right {
        flex: 1;
        padding: 20px;
        margin: auto;

        p {
            margin: 30px 0;
        }
    }
}
</style>