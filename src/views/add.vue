<template>
  <div class="box">
    <div class="top" style="display: flex; background-color: white;">
      <p style="margin: 0 10px;">
        <el-icon>
          <Back />
        </el-icon>
        返回
      </p>
      |
      <p style="margin: 0 10px;">新增月卡</p>
    </div>
    <div class="bto">
      车辆信息
      <el-form ref="ruleFormRef" :inline="true" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize"
        status-icon>
        <el-form-item label="车主姓名" prop="personName">
          <el-input v-model="ruleForm.personName" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
          <el-input v-model="ruleForm.phoneNumber" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="车辆号码" prop="carNumber">
          <el-input v-model="ruleForm.carNumber" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="车辆品牌" prop="carBrand">
          <el-input v-model="ruleForm.carBrand" style="width: 400px;" />
        </el-form-item>
      </el-form>
    </div>
    <div class="bto">
      最新一次月卡缴费信息
      <el-form ref="ruleFormRef" :inline="true" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize"
        status-icon>
        <el-form-item label="有效时间" prop="cardStartDate">
          <el-date-picker v-model="value1" type="daterange" range-separator="To" start-placeholder="开始时间"
            end-placeholder="结束时间" :size="size" @change="time" />
        </el-form-item>
        <el-form-item label="支付金额" prop="paymentAmount">
          <el-input v-model="ruleForm.paymentAmount" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select v-model="ruleForm.paymentMethod" placeholder="请选择">
            <el-option label="支付宝" value="Alipay" />
            <el-option label="微信" value="WeChat" />
            <el-option label="线下" value="Cash" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button @click="cz">重置</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Back } from "@element-plus/icons-vue";
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { addApi } from "@/api/api";
import { useRouter } from "vue-router";

const router = useRouter()

interface RuleForm {
  personName: string
  phoneNumber: string
  carNumber: string
  carBrand: string
  cardStartDate: string
  cardEndDate: string
  paymentAmount: string
  paymentMethod: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  personName: '',
  phoneNumber: '',
  carNumber: '',
  carBrand: '',
  cardStartDate: '',
  cardEndDate: '',
  paymentAmount: '',
  paymentMethod: '',
})

const rules = reactive<FormRules<RuleForm>>({
  personName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  phoneNumber: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  carNumber: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  carBrand: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  cardStartDate: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  cardEndDate: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  paymentMethod: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addApi(ruleForm).then((res: any) => {
        console.log(res);
        ElMessage.success(res.msg)
        router.push('/card')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')


const time = (e: any) => {
  ruleForm.cardStartDate = e[0]
  ruleForm.cardEndDate = e[1]
  console.log(ruleForm.cardStartDate, ruleForm.cardEndDate);
}

const cz = () => {
  ruleForm.personName = '',
    ruleForm.phoneNumber = '',
    ruleForm.carNumber = '',
    ruleForm.carBrand = '',
    ruleForm.cardStartDate = '',
    ruleForm.cardEndDate = '',
    ruleForm.paymentAmount = '',
    ruleForm.paymentMethod = ''
}


</script>

<style lang="scss" >
.box {
  width: 100%;
  height: 100vh;
  background-color: #f4f6f8;
  position: relative;

  .top {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .bto {
    width: 90%;
    height: 200px;
    margin: 20px auto;
    background-color: white;
    padding: 20px;
  }

  .button {
    position: fixed;
    bottom: 0;
    height: 60px;
    line-height: 60px;
    background-color: white;
    width: 100%;
    text-align: center;
  }
}
</style>