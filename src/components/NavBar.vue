<template>
    <div class="body">
        <nav class="tables">

            <button class="navbar-toggler" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="d-flex justify-content-between" id="navbarNavDropdown">
                <ul class="d-flex">
                    <!-- <li class="nav-item active">
                    <a class="nav-link" href="/mailAccounts">Mail Account</a>
                </li> -->

                    <router-link to="/home" class="text-decoration-none">
                        <span class="nav-link text-dark">Home</span>
                    </router-link>

                    <li class="nav-item list-inline dropdown ms-3">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Features
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link to="/allLists" class="text-decoration-none">
                                <span class="dropdown-item">Lists</span>
                            </router-link>
                            <router-link to="/addEmail" class="text-decoration-none">
                                <span class="dropdown-item">Add Member</span>
                            </router-link>
                            <router-link to="/sendEmail" class="text-decoration-none">
                                <span class="dropdown-item">Write Email</span>
                            </router-link>
                        </div>
                    </li>

                    <li class="nav-item list-inline dropdown ms-3">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Accounts
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                            <router-link to="/mailAccounts" class="text-decoration-none">
                                <span class="dropdown-item">Mail Accounts</span>
                            </router-link>
                            <router-link to="/addAccount" class="text-decoration-none">
                                <span class="dropdown-item">Add Account</span>
                            </router-link>
                        </div>
                    </li>


                    <li class="nav-item list-inline ms-3">
                        <router-link to="/" class="text-decoration-none">
                            <span class="nav-link text-dark" @click="logout()">Logout</span>
                        </router-link>
                    </li>
                </ul>

                <!-- <div>Hello {{ email }}</div> -->
            </div>
        </nav>

    </div>
</template>

<script>
export default {
    data() {
        return {
            email: localStorage.getItem('email')
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        },
    },
}
</script>

<style>
.body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
}

.tables {
    background-color: lightblue;
}
</style>