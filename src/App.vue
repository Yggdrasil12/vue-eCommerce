<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Estado reactivo para verificar si el usuario está autenticado
const isAuthenticated = ref(
  !!localStorage.getItem('userEmail') && !!localStorage.getItem('userRole'),
)
console.log('Inicial isAuthenticated:', isAuthenticated.value)

// Método para cerrar sesión
const handleLogout = () => {
  console.log('function handleLogout')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userRole')
  isAuthenticated.value = false
  window.dispatchEvent(new Event('auth-change'))
}

// Función para actualizar el estado cuando cambie el localStorage
const handleAuthChange = () => {
  isAuthenticated.value = !!localStorage.getItem('userEmail') && !!localStorage.getItem('userRole')
}

// Escuchar eventos personalizados
onMounted(() => {
  window.addEventListener('auth-change', handleAuthChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('auth-change', handleAuthChange)
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link class="navbar-brand text-light" to="/">Inicio</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link text-light" to="/products">Productos</router-link>
              </li>
            </ul>
            <!-- Botón que cambia dependiendo si el usuario está autenticado -->
            <div>
              <router-link v-if="!isAuthenticated" to="/login">
                <button class="btn btn-outline-light">Iniciar Sesión</button>
              </router-link>
              <button v-else @click="handleLogout" class="btn btn-outline-light">
                <i class="bi bi-box-arrow-right"></i>
              </button>
            </div>
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
}
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
  padding: 8px 15px; /* Ajuste de padding para un ícono más pequeño */
}

.btn-outline-light:hover {
  background-color: #8a2be2;
  color: #fff;
}

/* Estilo del ícono dentro del botón */
.btn-outline-light i {
  font-size: 1.5rem; /* Tamaño del ícono */
}
</style>
