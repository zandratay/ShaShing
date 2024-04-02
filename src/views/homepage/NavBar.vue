<template>
    <div class="nav-container">

        <div class="profile-information">
            <img id="duck-ui" src="/logo.jpg" alt="Duck UI">
            <strong> Sha-Shing </strong>
        </div>

        <nav class="left-nav">
            <ul>
                <li><router-link to="/" style="color: #164f92; text-decoration: none;"> Overview </router-link></li>
                <li><router-link to="/repository" style="color: #164f92; text-decoration: none;"> Financial Reports </router-link></li>
                <li><router-link to="/newspage" style="color: #164f92; text-decoration: none;">Financial News</router-link></li>
                
            </ul>
            <button class="signOutBtn" @click="handleSignOut" v-if="isLoggedIn"> Sign out</button>
            <router-view />
        </nav>
    
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    })
})
const handleSignOut= () => {
    signOut(auth).then(() => {
        router.push('/login')
    })
}


</script>