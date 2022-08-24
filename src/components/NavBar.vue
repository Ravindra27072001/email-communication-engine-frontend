<template>
    <nav class="navbar navbar-expand-lg bg-warning p-3">
        <a class="navbar-brand" href="#">Email Communication</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <!-- <li class="nav-item active">
                    <a class="nav-link" href="/mailAccounts">Mail Account</a>
                </li> -->

                <router-link to="/mailAccounts" class=" text-decoration-none">
                    <li class="nav-item active">
                        <span class="nav-link">Mail Account</span>
                    </li>
                </router-link>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Features
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <router-link to="/allLists" class="text-decoration-none">
                            <span class="dropdown-item">Lists</span>
                        </router-link>
                        <router-link to="/addEmail" class="text-decoration-none">
                            <span class="dropdown-item">Users Emails</span>
                        </router-link>
                        <router-link to="/sendEmail" class="text-decoration-none">
                            <span class="dropdown-item">Write Email</span>
                        </router-link>
                    </div>
                </li>

                <li class="nav-item dropdown">
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


                <li class="nav-item">
                    <router-link to="/" class="text-decoration-none">
                        <span class="nav-link" @click="logout()">Logout</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>

</template>

<script>
export default {
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
</style>