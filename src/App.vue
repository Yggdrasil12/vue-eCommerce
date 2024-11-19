<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link class="navbar-brand text-light" to="/">Inicio</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link text-light" to="/products">Productos</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-light" to="/cart">Carrito</router-link>
              </li>
            </ul>
            <!-- Botón de inicio de sesión -->
            <router-link to="/login">
              <button class="btn btn-outline-light">Iniciar Sesión</button>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped>
/* Navbar personalizado */
.navbar-dark .navbar-nav .nav-link {
  color: #fff;
  font-weight: bold;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: #8a2be2; /* Color morado para hover */
}

.navbar-dark .navbar-brand {
  color: #fff;
  font-weight: bold;
}

.navbar-dark .navbar-toggler-icon {
  background-color: #fff;
}

.btn-outline-light {
  border-color: #fff;
  color: #fff;
}

.btn-outline-light:hover {
  background-color: #8a2be2;
  color: #fff;
}
</style>
