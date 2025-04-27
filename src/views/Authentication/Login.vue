<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

// Estado reactivo para saber si el usuario está autenticado
const isAuthenticated = ref(
  !!localStorage.getItem('userEmail') && !!localStorage.getItem('userRole'),
)

// Función para manejar login
const handleLogin = async () => {
  const userData = {
    email: email.value,
    password: password.value,
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al iniciar sesión')
    }

    const data = await response.json()
    console.log('Inicio de sesión exitoso:', data)

    // Guardar datos en localStorage
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('userRole', data.user.role)

    // Disparar evento para actualizar otros componentes
    window.dispatchEvent(new Event('auth-change'))

    router.push('/products')
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    alert(error.message)
  }
}

// Función para manejar logout
const handleLogout = () => {
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userRole')
  window.dispatchEvent(new Event('auth-change'))
  router.push('/')
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="text-center text-light">Iniciar Sesión</h2>

      <!-- Formulario de inicio de sesión -->
      <form v-if="!isAuthenticated" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email" class="text-light">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            required
            placeholder="Ingresa tu correo"
          />
        </div>

        <div class="form-group">
          <label for="password" class="text-light">Contraseña</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button type="submit" class="btn btn-outline-light btn-block">
          <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
        </button>
      </form>

      <!-- Botón de cerrar sesión -->
      <div v-else class="text-center mt-3">
        <button @click="handleLogout" class="btn btn-outline-light btn-block">
          <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
        </button>
      </div>

      <!-- Enlace de registro -->
      <div class="text-center mt-3" v-if="!isAuthenticated">
        <RouterLink to="/signup" class="text-light">¿No tienes una cuenta? Regístrate</RouterLink>
      </div>

      <!-- Enlace para recuperación de contraseña -->
      <div class="text-center mt-3" v-if="!isAuthenticated">
        <RouterLink to="/password-recovery" class="text-light"
          >¿Olvidaste tu contraseña?</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<style scoped>
/* Fondo de la página */
.login-container {
  height: 100vh;
  background: linear-gradient(135deg, #6a0dad, #000);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

/* Caja de login */
.login-box {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #fff;
  font-weight: bold;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
  background-color: #222;
  border: none;
  color: #fff;
  border-radius: 5px;
  width: 100%;
}

input:focus {
  outline: none;
  border: 2px solid #8a2be2;
}

button {
  background-color: #8a2be2;
  color: #fff;
  padding: 12px 0;
  border-radius: 50px;
  font-weight: bold;
  width: 100%;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #6a0dad;
}

/* Estilo del enlace */
.text-light {
  color: #fff !important;
}

.text-light:hover {
  color: #8a2be2;
}
</style>
