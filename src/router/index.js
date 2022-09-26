import Router from "vue-router";

import RegisterPage from '@/components/RegisterPage';
import VerifyOTP from '@/components/RegisterPage';
import LoginPage from '@/components/LoginPage';
import OTPVerification from '@/components/resendOTP';
import HomePage from '@/components/HomePage';
import MailAccounts from '@/components/MailAccounts';
import AddAccount from '@/components/AddAccount';
import AllLists from '@/components/AllLists';
import AddList from '@/components/AddList';
import AddEmail from '@/components/AddEmail';
import SendEmail from '@/components/SendEmail';
import SendEmailIndividual from '@/components/SendEmailIndividual';
import PageNotFound from '@/components/PageNotFound';
import IndividualScheduledEmails from "@/components/IndividualScheduledEmails";


const router = new Router(
    {
        mode: 'history',
        routes: [
            {
                name: 'register',
                path: '/register',
                component: RegisterPage
            },
            {
                name: 'verifyOTP',
                path: '/VerifyOTP',
                component: VerifyOTP
            },
            {
                name: 'login',
                path: '/',
                component: LoginPage,
            },
            {
                name: 'resendOTP',
                path: '/OTPVerification',
                component: OTPVerification,
            },
            {
                name: 'home',
                path: '/home',
                component: HomePage,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'individualScheduledEmails',
                path: '/individualScheduledEmails',
                component: IndividualScheduledEmails,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'mailAccounts',
                path: '/MailAccounts',
                component: MailAccounts,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'addAccount',
                path: '/AddAccount',
                component: AddAccount,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'allLists',
                path: '/AllLists',
                component: AllLists,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'addList',
                path: '/AddList',
                component: AddList,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'addEmail',
                path: '/AddEmail',
                component: AddEmail,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'sendEmail',
                path: '/sendEmail',
                component: SendEmail,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'sendEmailIndividual',
                path: '/sendEmailIndividual',
                component: SendEmailIndividual,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'pageNotFound',
                path: '*',
                component: PageNotFound
            },
        ]
    },
);

router.beforeEach((to,from,next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(localStorage.getItem('token')){
            next();
        } else{
            next('/')
        }
    }
    else{
        next();
    }
})



export default router;