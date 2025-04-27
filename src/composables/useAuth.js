// src/composables/useAuth.js
import { ref, watch } from 'vue'

const isAuthenticated = ref(
  !!localStorage.getItem('userEmail') && !!localStorage.getItem('userRole'),
)

const handleLogin = (email, role) => {
  localStorage.setItem('userEmail', email)
  localStorage.setItem('userRole', role)
  isAuthenticated.value = true
}

const handleLogout = () => {
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userRole')
  isAuthenticated.value = false
}

// Actualizamos cuando cambia el localStorage (opcional si quieres aún más robusto)
watch(
  () => localStorage.getItem('userEmail'),
  () => {
    isAuthenticated.value =
      !!localStorage.getItem('userEmail') && !!localStorage.getItem('userRole')
  },
)

export function useAuth() {
  return { isAuthenticated, handleLogin, handleLogout }
}
