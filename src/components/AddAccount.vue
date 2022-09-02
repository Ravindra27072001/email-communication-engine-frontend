<template>
    <section class="body">
        <NavBar />

        <div class="container  p-5">
            <h1 class="mb-3 pb-3 text-center fw-bolder text-white">Add an account</h1>
            <div class="row d-flex justify-content-center align-items-center ">
                <div class="col col-xl-8">
                    <div class="card rounded">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="../images/addAccount.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;padding: 10px; margin-left: 10px; margin-top: 50px; margin-bottom: 40px;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center ">
                                <div class="card-body rounded">
                                    <form @submit.prevent="submit">

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Company Name</label>
                                            <input type="text" class="form-control" v-model.trim=companyName
                                                name="name" />

                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Email address</label>
                                            <input type="email" class="form-control" v-model.trim="$v.email.$model"
                                                :class="{
                                                    'is-invalid': $v.email.$error,
                                                    'is-valid': !$v.email.$invalid,
                                                }" name="email" />
                                            <div class="valid-feedback">Your email is valid</div>
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.email.required">email is required</span>
                                                <span v-if="!$v.email.isUnique">This email is wrong</span>
                                            </div>
                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Password</label>
                                            <input type="password" class="form-control"
                                                v-model.trim="$v.password.$model" name="password" />
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.password.required">password is required</span>
                                                <!-- <span v-if="!$v.email.validatePassword">Password should contains minimum
                                                    8 characters and
                                                    atleast 1 uppercase, lowercase, and special
                                                    character</span> -->
                                            </div>
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-danger btn-lg btn-block" :disabled="$v.$invalid">
                                                Add
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center text-white mt-3">
                    <p> Please enther the app password which is provided by the email </p>
                    <p>Please follow the steps mentioned below to get the app password</p>
                    <p> 1) Open gmail -> Manage your Google Account -> Security -> 2-Step Verification -> On </p>
                    <p>2) Open gmail -> Manage your Google Account -> Security -> App password -> Create Password </p>
                </div>

            </div>
        </div>

    </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import NavBar from './NavBar.vue';
import { AddAccount } from '@/services/mailAccounts'
export default {
    name: "AddAccount",
    components: { NavBar },
    data() {
        return {
            email: '',
            password: '',
            companyName: '',
            userId: '',
        }
    },
    validations: {
        email: {
            required,
            email,
            isUnique(value) {
                if (value === "") return true;
                var email_regex =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(email_regex.test(value));
                    }, 350 + Math.random() * 300);
                });
            },
        },
        password: {
            required,
        },
    },
    methods: {
        async submit() {
            this.$v.$touch();
            console.log('touched')
            const credentials = {
                userId: localStorage.getItem("userId"),
                companyName: this.companyName,
                email: this.email,
                password: this.password,
            }
            console.log(credentials)
            AddAccount(credentials).then((result) => {
                console.log("result is: ", result.data)
                if (result.data.status === "FAILED") {
                    this.$toasted.show(result.data.message, {
                        type: 'error'
                    });
                } else {
                    this.$toasted.show(result.data.message, {
                        type: 'success'
                    });
                    this.$router.push({ name: 'mailAccounts' })
                }
            })
        }
    },
}
</script>

<style>
</style>