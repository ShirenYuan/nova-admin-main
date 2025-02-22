<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { local } from '@/utils'
import { useAuthStore } from '@/store'
const authStore = useAuthStore()
const emit = defineEmits(['update:modelValue'])
function toLogin() {
  emit('update:modelValue', 'login')
}
const { t } = useI18n()

const isRemember = ref(false)
const isLoading = ref(false)
const rules = {
  account: {
    required: true,
    trigger: 'blur',
    message: t('login.accountRuleTip'),
  },
  pwd: {
    required: true,
    trigger: 'blur',
    message: t('login.passwordRuleTip'),
  },
  rePwd: {
    required: true,
    trigger: 'blur',
    message: t('login.checkPasswordRuleTip'),
  },
}
const formValue = ref({
  account: 'admin',
  pwd: '000000',
  rePwd: '000000',
})

const isRead = ref(false)

const formRef = ref<FormInst | null>(null)
function handleRegister() {
  console.log('handleRegister')
  formRef.value?.validate(async (errors) => {
    if (errors)
      return

    isLoading.value = true
    const { account, pwd } = formValue.value

    if (isRemember.value)
      local.set('loginAccount', { account, pwd })
    else local.remove('loginAccount')

    await authStore.login(account, pwd)
    isLoading.value = false
  })
}
</script>

<template>
  <div>
    <n-h2 depth="3" class="text-center">
      {{ $t('login.registerTitle') }}
    </n-h2>
    <n-form
      :rules="rules"
      :model="formValue"
      :show-label="false"
      size="large"
      ref="formRef"
    >
      <n-form-item path="account">
        <n-input
          v-model:value="formValue.account"
          clearable
          :placeholder="$t('login.accountPlaceholder')"
        />
      </n-form-item>
      <n-form-item path="pwd">
        <n-input
          v-model:value="formValue.pwd"
          type="password"
          :placeholder="$t('login.passwordPlaceholder')"
          clearable
          show-password-on="click"
        >
          <template #password-invisible-icon>
            <icon-park-outline-preview-close-one />
          </template>
          <template #password-visible-icon>
            <icon-park-outline-preview-open />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="rePwd">
        <n-input
          v-model:value="formValue.rePwd"
          type="password"
          :placeholder="$t('login.checkPasswordPlaceholder')"
          clearable
          show-password-on="click"
        >
          <template #password-invisible-icon>
            <icon-park-outline-preview-close-one />
          </template>
          <template #password-visible-icon>
            <icon-park-outline-preview-open />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item>
        <n-space
          vertical
          :size="20"
          class="w-full"
        >
          <n-checkbox v-model:checked="isRead">
            {{ $t('login.readAndAgree') }} <n-button
              type="primary"
              text
            >
              {{ $t('login.userAgreement') }}
            </n-button>
          </n-checkbox>
          <n-button
            block
            type="primary"
            @click="handleRegister"
          >
            {{ $t('login.signUp') }}
          </n-button>
          <n-flex justify="center">
            <n-text>{{ $t('login.haveAccountText') }}</n-text>
            <n-button
              text
              type="primary"
              @click="toLogin"
            >
              {{ $t('login.signIn') }}
            </n-button>
          </n-flex>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<style scoped></style>
