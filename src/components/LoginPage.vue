<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center align-items-center">

            <h1 class="mb-3 pb-3 text-center text-danger fst-italic fw-bolder ">
                Email Communication Engine
            </h1>
            <div class="col col-xl-10 m-3">

                <div class="m-auto p-3" id="newClass">
                    <div class="row mt-3 d-flex justify-content-center align-items-center">

                        <div class="col col-lg-5 col-md-6 d-none d-md-block">
                            <img src="../images/email.png" alt="login form" class="img-fluid" />
                        </div>

                        <div class="col col-md-6 col-lg-6">

                            <div class="card-body">

                                <h2 class="mb-3 pb-3 text-white text-center fw-bolder">
                                    Signin to your account
                                </h2>

                                <form @submit.prevent="login">

                                    <div class="form-outline">
                                        <label class="form-label text-white" for="form-control">Email</label>
                                        <input type="email" v-model="email" class="form-control" name="email">
                                    </div>

                                    <div class="form-outline">
                                        <label class="form-label text-white" for="form-control">Password</label>
                                        <input type="password" v-model="password" class="form-control" name="password">
                                    </div>

                                    <div class="mt-3">
                                        <button class="btn btn-danger btn-lg btn-block">
                                            Login
                                        </button>
                                    </div>

                                    <p class="mt-5 text-white">
                                        Don't have an account? <a class="text-decoration-none text-info"
                                            href="/register">Register</a>
                                    </p>

                                    <p class="mt-3 text-white">
                                        Didn't verify your account? <a class="text-decoration-none text-info"
                                            href="/OTPVerification">Verify</a>
                                    </p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Signin } from '@/services/signin'
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {

            const credentials = {
                email: this.email,
                password: this.password
            }
            try {
                let response = await Signin(credentials);

                const { authToken, email, userId } = response.data;
                localStorage.setItem('token', authToken);
                localStorage.setItem('email', email);
                localStorage.setItem('userId', userId);

                this.$toasted.show(response.data.message, {
                    type: 'success'
                });
                this.$router.push({ name: 'home' })

            } catch (error) {
                this.$toasted.show(error.response.data.message, {
                    type: 'error'
                });
            }
        }
    }
}
</script>

<style scoped>
#newClass {
    box-shadow: 17px 10px 20px 6px black;
    background-color: #303E48;
    width: 90%;
}
</style>