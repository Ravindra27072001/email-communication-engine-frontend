<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center align-items-center">

            <h1 class="mb-3 pb-3 text-center text-danger fst-italic fw-bolder ">
                Email Communication Engine
            </h1>

            <div class="col col-xl-10 m-3">
                <div class="m-auto p-5" id="newClass">
                    <div class="row d-flex justify-content-center align-items-center">

                        <div class="col-md-6 col-lg-5 d-none d-md-block">
                            <img src="../images/verifyEmail.png" alt="login form" class="img-fluid" />
                        </div>

                        <div class="col-md-6 col-lg-7 d-flex align-items-center">
                            <div class="card-body">

                                <h2 class="mb-3 pb-3 text-light text-center fw-bolder">
                                    Verify your account
                                </h2>

                                <form @submit.prevent="sendOTP">


                                    <div class="form-outline">
                                        <label class="form-label text-white" for="form-control">Email address</label>
                                        <input type="email" class="form-control" v-model.trim="$v.email.$model"
                                            name="email">
                                        <div class="invalid-feedback">
                                            <span v-if="!$v.email.required">email is required</span>
                                        </div>
                                    </div>

                                    <div v-show="showOTP" class="form-outline">
                                        <label class="form-label text-white" for="form-control">Enter the OTP</label>
                                        <input v-model="otp" type="text" class="form-control" name="otp" />
                                    </div>

                                    <div class="mt-3">
                                        <button v-show="showSendButton" class="btn btn-danger" :disabled="$v.$invalid">
                                            Send OTP
                                        </button>
                                    </div>

                                    <div v-show="showSpinner" class="spinner-border text-light" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                </form>

                                <div class="mt-3">
                                    <button @click="verifyOTP()" v-show="showOTPButton" class="btn btn-info"
                                        :disabled="$v.$invalid">
                                        Verify OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators'
import { ResendOTPVerification } from "@/services/resendOTPVerification"
import { VerifyOTP } from "@/services/verifyOTP"

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            otp: '',
            userId: '',
            showSpinner: false,
            showOTP: false,
            showOTPButton: false,
            showSendButton: true,
        }
    },
    validations: {
        email: {
            required,
            email,
        },
    },
    methods: {
        async sendOTP() {
            this.showSpinner = true;
            this.showSendButton = false;
            const credentials = {
                email: this.email,
            }
            console.log(credentials);

            try {
                let result = await ResendOTPVerification(credentials);

                console.log(result);

                this.$toasted.show(result.data.message, {
                    type: 'success'
                });
                this.showSpinner = false;
                this.showOTPButton = true;
                this.showOTP = true;
                this.showSendButton = false;
                this.userId = result.data.data.userId

            } catch (error) {
                console.log("dfkjsdjfjdssdfsdf", error);
                this.showSpinner = false;
                this.showSendButton = true;
                this.$toasted.show(error.response.data.message, {
                    type: 'error'
                });
            }
        },
        async verifyOTP() {

            const credentials = {
                userId: this.userId,
                otp: this.otp,
            }

            try {
                const response = await VerifyOTP(credentials);
                this.$toasted.show(response.data.message, {
                    type: 'success'
                });
                this.$router.push({ name: 'login' })
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