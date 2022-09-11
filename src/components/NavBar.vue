<template>
    <div class="body">

        <div id="nav">
            <nav class="navbar navbar-expand-lg navbar-light tables">

                <div class="container-fluid align-item-center">

                    <router-link to="/home" class="text-decoration-none">
                        <h2 class="text-danger fw-bolder mt-1 p-2">Email</h2>
                    </router-link>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse text-center" id="navbarNavDropdown">
                        <ul class="navbar-nav">

                            <router-link to="/mailAccounts" class="text-decoration-none">
                                <span class="nav-link text-dark fw-bolder">Accounts</span>
                            </router-link>

                            <router-link to="/sendEmail" class="text-decoration-none">
                                <span class="nav-link text-dark fw-bolder ms-2">Send Email</span>
                            </router-link>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-dark fw-bolder ms-2" href="#" id="navbarDropdownMenuLink"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Features
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <router-link to="/allLists" class="text-decoration-none">
                                        <span class="dropdown-item">Lists</span>
                                    </router-link>
                                    <router-link to="/addEmail" class="text-decoration-none">
                                        <span class="dropdown-item">Add Member</span>
                                    </router-link>
                                    <router-link to="/addAccount" class="text-decoration-none">
                                        <span class="dropdown-item">Add Account</span>
                                    </router-link>

                                </ul>
                            </li>
                        </ul>

                        <div class="ms-auto d-none d-lg-block">
                            <div class="d-flex">
                                <p class="mt-3"> Hello- </p>
                                <p class="text-danger mt-3">{{ email }}</p>
                            </div>

                        </div>

                        <router-link to="/" class="text-decoration-none">
                            <span class="nav-link text-center text-dark fw-bolder ms-2 p-2" @click="logout()">Logout</span>
                        </router-link>

                    </div>
                </div>
            </nav>
        </div>
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
#newClass {
    box-shadow: 17px 10px 20px 6px black;
    background-color: #2f53a538;
    width: 90%;
}

.body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
}

.tables {
    background-color: #6581d07a
}

#nav a:hover {
    background-color: lightgrey;
    border-radius: 5px;
}
</style>