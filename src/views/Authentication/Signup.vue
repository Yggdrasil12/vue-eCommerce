<template>
  <div class="register-container">
    <div class="register-form-container">
      <h2 class="text-center text-light mb-4">Crea tu Cuenta</h2>
      <form @submit.prevent="handleRegister">
        <!-- Nombre -->
        <div class="mb-3">
          <label for="name" class="form-label text-light">Nombre</label>
          <input type="text" class="form-control" id="name" v-model="name" required />
          <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
        </div>

        <!-- Correo Electrónico -->
        <div class="mb-3">
          <label for="email" class="form-label text-light">Correo Electrónico</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
          <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
        </div>

        <!-- Contraseña -->
        <div class="mb-3">
          <label for="password" class="form-label text-light">Contraseña</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
          <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
        </div>

        <!-- Confirmar Contraseña -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label text-light">Confirmar Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
          <span v-if="errors.confirmPassword" class="text-danger">{{
            errors.confirmPassword
          }}</span>
        </div>

        <!-- Teléfono -->
        <div class="mb-3">
          <label for="phone" class="form-label text-light">Teléfono</label>
          <input type="tel" class="form-control" id="phone" v-model="phone" required />
          <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
        </div>

        <!-- Dirección -->
        <div class="mb-3">
          <label for="address" class="form-label text-light">Dirección</label>
          <input type="text" class="form-control" id="address" v-model="address" required />
          <span v-if="errors.address" class="text-danger">{{ errors.address }}</span>
        </div>

        <button type="submit" class="btn btn-outline-light w-100">Registrar</button>
      </form>
      <p class="text-center text-light mt-3">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-decoration-none">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
      },
    }
  },
  methods: {
    async handleRegister() {
      // Reset errors
      this.errors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
      }

      // Validación de campos
      if (!this.name) {
        this.errors.name = 'El nombre es obligatorio.'
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!emailPattern.test(this.email)) {
        this.errors.email = 'Por favor, ingresa un correo electrónico válido.'
      }

      if (this.password !== this.confirmPassword) {
        this.errors.password = 'Las contraseñas no coinciden.'
        this.errors.confirmPassword = 'Las contraseñas no coinciden.'
      } else if (this.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres.'
      }

      const phonePattern = /^[0-9]{10}$/ // Validación de teléfono (10 dígitos)
      if (!phonePattern.test(this.phone)) {
        this.errors.phone = 'Por favor, ingresa un número de teléfono válido (10 dígitos).'
      }

      if (!this.address) {
        this.errors.address = 'La dirección es obligatoria.'
      }

      // Si hay errores, no proceder
      if (Object.values(this.errors).some((error) => error !== '')) {
        return
      }

      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })

        if (!response.ok) {
          throw new Error('Error al registrar el usuario')
        }

        const data = await response.json()
        console.log('Usuario registrado:', data)

        // Redirigir al login si el registro fue exitoso
        this.$router.push('/login')
      } catch (error) {
        console.error('Error al registrar el usuario:', error)
        alert('Hubo un error al registrar el usuario.')
      }
    },
  },
}
</script>

<style scoped>
.register-container {
  background: linear-gradient(135deg, #6a0dad, #000); /* Fondo morado */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-form-container {
  background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro para el formulario */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 400px;
}

.register-form-container input {
  background-color: #222;
  color: #fff;
  border: 1px solid #444;
}

.register-form-container input:focus {
  border-color: #8a2be2; /* Color morado al enfocar los inputs */
}

.register-form-container button {
  background-color: #8a2be2;
  border: none;
}

.register-form-container button:hover {
  background-color: #6a0dad;
}

.register-form-container p {
  color: #ddd;
}

.register-form-container a {
  color: #8a2be2;
}

.register-form-container a:hover {
  text-decoration: underline;
}
</style>
