<template>
  <div class="container-fluid d-flex justify-content-center">
    <main class=" box-auth d-flex flex-column align-items-center">
      <h1>Login</h1>
      <div class="space"></div>
      <h2 class=" align-self-start">Hi, Welcome Back</h2>
      <div class="space"></div>
      <form @submit.prevent="login">
        <label for="email" class=" align-self-start">Email</label>
        <input type="email" id="email" v-model="email" maxlength="64" required>
        <div class="space"></div>
        <label for="password" class=" align-self-start">Password</label>
        <input type="password" id="password" v-model="password" minlength="8" maxlength="64" required>
        <div class="space"></div>
        <h3 class=" align-self-end">Forgot Password</h3>
        <div class="space"></div>
        <button type="submit">Login</button>
        <div class="space"></div>
      </form>
      <div class="d-flex w-100 align-items-center">
        <div class="line-muted flex-grow-1"></div>
        <h4>Login with</h4>
        <div class="line-muted flex-grow-1"></div>
      </div>
      <div class="space"></div>
      <button class="google" @click.prevent="">Google</button>
      <div class="space"></div>
      <h5>Don’t have an account? <span @click="goSignup">Sign Up</span></h5>
      <div class="space"></div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    localData (userInfo) {
      const parsed = JSON.stringify({
        id: userInfo.data.id,
        token: userInfo.token,
        isLogin: true
      })
      localStorage.setItem('user', parsed)
    },
    login (e) {
      const email = this.email
      const password = this.password
      e.preventDefault()
      console.log(process.env.VUE_APP_URL_API)
      axios
        .post(`${process.env.VUE_APP_SERVICE_API}/user/login`, {
          email,
          password
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            const userInfo = res.data
            this.localData(userInfo)
            this.email = ''
            this.password = ''
            this.$router.push('/room')
          }
          Swal.fire('Success Login', 'welcome back', 'success')
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire('Oops...', err.response.data.messages, 'error')
        })
    },
    goSignup () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style lang="scss" scoped>

.container-fluid {
  padding: 100px 0;
  background: #F6F6F6;
  // height: 100vh;
}

.space {
  width: 100%;
  height: 35px;
}

h1 {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #7E98DF;
}

h2 {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #232323;
}

h3 {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #7E98DF;
  cursor: pointer
}

h3:hover {
  opacity: .8;
}

h4 {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #848484;
  margin: 0 40x;
  width: fit-content;
  padding-left: 10%;
  padding-right: 10%;
}

h5 {
  text-align: center;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #313131;
  span {
    color: #7E98DF;
    cursor: pointer;
  }
  span:hover {
    opacity: .8;
  }
}

.line-muted {
  height: 1px;
  background-color: #848484;
}

form {
  width: 100%;
}

label {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #848484;
  opacity: 0.75;
}

input {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #232323;
  border-bottom: 1px solid #adadad;
  padding: 15px 0;
  width: 100%;
}

#password {
  letter-spacing: 5px;
}

button {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #FFFFFF;
  width: 100%;
  height: 60px;
  background: #7E98DF;
  border-radius: 70px;
}

button:hover {
  opacity: .8;
}

.google {
  background: #FFFFFF;
  border: 1px solid #7E98DF;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #7E98DF;
}

@media (min-height: 910px) {
  .container-fluid {
    height: 100vh;
  }
}

</style>
