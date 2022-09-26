<template>
    <div>
        <NavBar />

        <div class="pt-5">
            <h1 class="mb-3 pb-3 text-center fw-bolder text-dark">Send Email to Individual</h1>
            <div class="d-flex justify-content-center m-3">
                <router-link to="/sendEmail" class="text-decoration-none">
                    <button class="btn bg-secondary">To everyone</button>
                </router-link>

                <router-link to="/sendEmailIndividual" class="text-decoration-none">
                    <button class="btn bg-info ms-5">To individual</button>
                </router-link>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="col col-xl-8">
                    <div class="tables m-auto" id="newClass">

                        <form class="p-3" @submit.prevent="submit">

                            <div class="form-outline mt-2">
                                <label class="form-label text-white" for="form-control">Subject</label>
                                <input type="text" class="form-control" v-model.trim="$v.subject.$model" name="name" />
                            </div>

                            <div class="form-outline mt-2">
                                <label class="form-label text-white" for="form-control">From</label>
                                <select v-model.trim="$v.from.$model" class="form-select form-outline" name="from">
                                    <option v-for="account in accounts" :key="account._id">{{ account.email
                                    }}</option>
                                </select>
                            </div>

                            <div class="form-outline mt-2">
                                <label class="form-label text-white" for="form-control">To</label>
                                <input type="email" class="form-control" v-model.trim="$v.to.$model" :class="{
                                    'is-invalid': $v.to.$error,
                                    'is-valid': !$v.to.$invalid,
                                }" name="to" />
                                <div class="valid-feedback">Your email is valid</div>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.to.required">email is required</span>
                                    <span v-if="!$v.to.email">Email is not valid</span>
                                </div>
                            </div>

                            <div class="form-outline mt-2 w-50">
                                <label class="form-label text-white" for="form-control">Date</label>
                                <input type="date" class="form-control" v-model.trim="date" name="date" />
                                <div class="invalid-feedback">
                                    <span v-if="!$v.to.required">Required</span>
                                </div>
                            </div>

                            <div class="form-outline mt-2 w-50">
                                <label class="form-label text-white" for="form-control">Start time</label>
                                <input type="time" class="form-control" v-model.trim="startTime" name="startTime" />
                                <div class="invalid-feedback">
                                    <span v-if="!$v.to.startTime">Required</span>
                                </div>
                            </div>

                            <div class="form-outline mt-2 w-50">
                                <label class="form-label text-white" for="form-control">End time</label>
                                <input type="time" class="form-control" v-model.trim="endTime" name="endTime" />
                                <div class="invalid-feedback">
                                    <span v-if="!$v.to.endTime">Required</span>
                                </div>
                            </div>

                            <div class="form-outline mt-2">
                                <label class="form-label text-white" for="form-control">When do you want to send the
                                    email</label>
                                <select v-model.trim="reminder" class="form-select form-outline">
                                    <option>Before 1 hour of the meeting</option>
                                    <option>Before 6 hours of the meeting</option>
                                    <option>Before 12 hours of the meeting</option>
                                    <option>Before 1 day of the meeting</option>
                                    <option>Immediately</option>
                                </select>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.reminder.required">Required</span>
                                </div>
                            </div>

                            <div class="form-outline mt-2">
                                <label class="form-label text-white" for="form-control">Description</label>
                                <textarea type="text" class="form-control" v-model.trim="$v.description.$model"
                                    name="description" rows="15"></textarea>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.description.required">Required</span>
                                </div>
                            </div>

                            <div v-show="showSpinner" class="spinner-border text-light mt-3" role="status">
                                <span class="sr-only"></span>
                            </div>

                            <div class="mt-3">
                                <button v-show="showSendButton" class="btn btn-info btn-lg btn-block"
                                    :disabled="$v.$invalid"> Send </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import NavBar from './NavBar.vue';
import { required, email } from 'vuelidate/lib/validators'
import { SendEmailIndividual } from '../services/sendEmail'
import { SearchAccounts } from '../services/mailAccounts'

export default {

    name: "AddAccount",
    components: { NavBar },
    data() {
        return {
            accounts: '',
            subject: '',
            description: ``,
            from: '',
            to: '',
            date: '',
            reminder: '',
            startTime: '',
            endTime: '',
            userId: localStorage.getItem('userId'),
            showSpinner: false,
            showSendButton: true,
        }
    },
    validations: {
        description: {
            required,
        },
        subject: {
            required,
        },
        from: {
            required,
        },
        to: {
            email,
            required,
        },
        startTime: {
            required,
        },
        endTime: {
            required
        },
        date: {
            required,
        },
        reminder: {
            required,
        },
    },
    methods: {

        async submit() {

            const getHour = (time) => {
                return time[0] + time[1];
            };
            const getMin = (time) => {
                return time[3] + time[4];
            };

            const startTimeHour = getHour(this.startTime);
            const startTimeMin = getMin(this.startTime);
            const endTimeHour = getHour(this.endTime);
            const endTimeMin = getMin(this.endTime);

            const startTimeObj = {
                hours: startTimeHour,
                minutes: startTimeMin,
            };
            const endTimeObj = {
                hours: endTimeHour,
                minutes: endTimeMin,
            };

            const credentials = {
                subject: this.subject,
                from: this.from,
                to: this.to,
                description: this.description,
                date: this.date,
                reminder: this.reminder,
                startTime: startTimeObj,
                endTime: endTimeObj,
                userId: this.userId
            }

            this.showSendButton = false;
            this.showSpinner = true;

            try {
                const result = await SendEmailIndividual(credentials);
                this.showSpinner = false;
                this.$toasted.show(result.data.message, {
                    type: 'success'
                });
                this.$router.push({ name: 'home' })
            } catch (error) {
                this.showSpinner = false;
                this.showSendButton = true;
                this.$toasted.show(error.response.data.message, {
                    type: 'error'
                });
            }

            // SendEmailIndividual(credentials).then((result) => {

            //     if (result.data.status == "FAILED") {
            //         this.showSpinner = false;
            //         this.showSendButton = true;
            //         this.$toasted.show(result.data.message, {
            //             type: 'error'
            //         });
            //     }
            //     else {
            //         this.showSpinner = false;
            //         this.$toasted.show(result.data.message, {
            //             type: 'success'
            //         });
            //         this.$router.push({ name: 'home' })
            //     }
            // })
        }
    },
    mounted() {
        SearchAccounts(this.userId).then((response) => {
            this.accounts = response.data.data;
        });
    },
}
</script>

<style scoped>
#newClass {
    box-shadow: 17px 10px 20px 6px black;
    background-color: #303E48;
    width: 90%;
}
</style>