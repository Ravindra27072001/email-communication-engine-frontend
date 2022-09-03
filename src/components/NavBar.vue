<template>
    <div class="body">

        <div id="nav">
            <nav class="navbar navbar-expand-lg navbar-light tables">

                <div class="container-fluid">

                    <router-link to="/home" class="text-decoration-none">
                        <span class="colorClass p-2">Email</span>
                    </router-link>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">

                            <router-link to="/mailAccounts" class="text-decoration-none">
                                <span class="nav-link text-dark">Accounts</span>
                            </router-link>

                            <router-link to="/sendEmail" class="text-decoration-none">
                                <span class="nav-link text-dark ms-2">Send Email</span>
                            </router-link>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-dark ms-2" href="#" id="navbarDropdownMenuLink"
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

                        <div class="d-flex ms-auto">
                            <p class="mt-3"> Hello- </p>
                            <p class="text-danger email mt-3">{{ email }}</p>
                        </div>

                        <router-link to="/" class="text-decoration-none">
                            <span class="nav-link text-dark ms-2 p-2" @click="logout()">Logout</span>
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
    background-color: white;
    width: 90%;
}

.colorClass {
    font-weight: bold;
    font-size: 25px;
    color: firebrick;
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

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

@media(max-width: 990px) {
    .email {
        display: none;
    }

    .nav-link {
        text-align: center;
    }
}
</style>