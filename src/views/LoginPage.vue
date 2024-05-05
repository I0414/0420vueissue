<template>
  <div class="container mt-5">
    <FormView class="row justify-content-center needs-validation" novalidate v-slot="{ errors }"
      @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <FieldView
            type="email"
            name="email"
            id="inputEmail"
            class="form-control"
            :class="{ 'is-invalid': errors && errors['email'],
            'is-valid': errors && !errors['email'] }"
            rules="email|required"
            placeholder="Email address"
            required
            v-model="user.username"
          ></FieldView>
          <div v-if="isEmailValid" class="valid-feedback">Looks good!</div>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </FormView>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isEmailValid: false,
    };
  },
  mounted() {
    // 在页面加载时检查电子邮件地址的有效性
    this.isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.username);
  },
  watch: {
    'user.username': {
      handler(newValue) {
        // 当用户输入发生变化时，更新电子邮件地址的有效性
        this.isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);
      },
      deep: true,
    },
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/dashboard/products');
          }
        });
    },
  },
};
</script>
