<template>
    <div>
        <NavBar />

        <div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-body">
                                Do you really want to delete the Meeting ?
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                @click="removeMeeting()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>

                <h1 class="mb-3 pb-3 text-center text-dark fw-bolder mt-5">Scheduled Emails</h1>

                <div class="d-flex justify-content-center m-3">
                    <router-link to="/home" class="text-decoration-none">
                        <button class="btn bg-info">Everyone</button>
                    </router-link>

                    <router-link to="/individualScheduledEmails" class="text-decoration-none">
                        <button class="btn bg-secondary ms-5">Individual</button>
                    </router-link>
                </div>


                <div class="d-flex justify-content-center">
                    <div v-show="showSpinner" class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div v-show="showEmails" class="text-center mt-5">
                    <div id="main">
                        <div class="fof">
                            <h1>OOPS</h1>
                            <p class="mt-3">No scheduled email is there</p>
                        </div>
                    </div>
                </div>

                <div class="row d-flex justify-content-center m-auto p-3">

                    <div v-for="list in lists" v-bind:key="list._id" class="col col-lg-3 col-md-3 p-3 m-3"
                        style="min-width:355px; box-shadow: 7px 10px 20px 6px; background-color: #303E48;">

                        <h2 class="text-light">{{ list.subject }}</h2>

                        <hr class="text-light">

                        <div class="d-flex">
                            <h5 style="color:aqua">Meeting Date: </h5>
                            <p class="text-light ms-2">{{ list.meetingDate }}</p>
                        </div>

                        <div class="d-flex">
                            <h5 style="color:#2aff00">Meeting Time: </h5>
                            <p class="text-light ms-2">{{ list.startTime }} to {{ list.endTime }}</p>
                        </div>

                        <div class="d-flex">
                            <h5 style="color:#fcf903">Admin: </h5>
                            <p class="text-light ms-2">{{ list.from }}</p>
                        </div>

                        <div>
                            <button type="button" class="btn btn-danger btn-block mt-3" data-bs-toggle="modal"
                                data-bs-target="#exampleModal" @click="getMeetingId(list._id)">
                                Delete
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import NavBar from "./NavBar.vue";
import { ScheduledEmails, DeleteMeeting } from '../services/homePage'

export default {
    components: {
        NavBar
    },
    name: "HomePage",
    data() {
        return {
            lists: "",
            members: "",
            meetingId: "",
            showEmails: false,
            showSpinner: true,
            userId: localStorage.getItem("userId")
        };
    },
    methods: {
        viewMember() {
            this.$toasted.show("result.data.message", {
                type: 'error',
            });
        },

        getMeetingId(id) {
            this.meetingId = id;
        },

        async removeMeeting() {
            try {
                const result = await DeleteMeeting(this.meetingId);
                this.$toasted.show(result.data.message, {
                    type: 'success',
                });
                let response = await ScheduledEmails(this.userId);
                this.lists = response.data.data;
            } catch (error) {
                this.$toasted.show(error.response.data.message, {
                    type: 'error',
                });
                this.showSpinner = false;
                this.showEmails = true;
            }
        }
    },
    async mounted() {

        try {
            let result = await ScheduledEmails(this.userId);
            this.showSpinner = false,
                this.lists = result.data.data;
        } catch (error) {
            this.showSpinner = false;
            this.showEmails = true;
        }
    },
}
</script>

<style scoped>
#main {
    display: table;
    width: 100%;
    text-align: center;
    margin-top: 100px;
}

.fof p {
    font-size: 25px;
}

.fof {
    display: table-cell;
    vertical-align: middle;
}

.fof h1 {
    font-size: 100px;
    display: inline-block;
    padding-right: 12px;
    animation: type .5s alternate infinite;
}

@keyframes type {

    from {
        box-shadow: inset 5px 5px 5px grey
    }

    to {
        box-shadow: inset -5px -5px 5px transparent;
    }

}
</style>