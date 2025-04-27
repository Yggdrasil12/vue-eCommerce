<template>
  <div class="profile-edit-container">
    <div class="profile-edit-form-container">
      <h2 class="text-center text-light mb-4">Editar Perfil</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label text-light">Nombre</label>
          <input type="text" class="form-control" id="name" v-model="user.name" required />
          <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label text-light">Correo Electrónico</label>
          <input type="email" class="form-control" id="email" v-model="user.email" readonly />
          <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label text-light">Contraseña</label>
          <input type="password" class="form-control" id="password" v-model="user.password" />
          <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label text-light">Teléfono</label>
          <input type="text" class="form-control" id="phone" v-model="user.phone" />
          <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label text-light">Dirección</label>
          <input type="text" class="form-control" id="address" v-model="user.address" />
          <span v-if="errors.address" class="text-danger">{{ errors.address }}</span>
        </div>

        <div class="text-center mt-4">
          <button type="submit" class="btn btn-outline-light w-100">Guardar Cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileEdit',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      },
      errors: {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      },
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    // Método para obtener los datos del usuario desde la API
    async fetchUser() {
      try {
        const email = localStorage.getItem('userEmail')
        const response = await fetch(`http://127.0.0.1:8000/api/users/${email}`, {
          method: 'GET',
        })

        const data = await response.json()
        console.log(data)
        this.user = data
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
      }
    },

    // Método que maneja el envío del formulario
    async handleSubmit() {
      // Resetear errores antes de la validación
      this.errors = {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      }

      // Validación de los campos del formulario
      if (!this.user.name) {
        this.errors.name = 'El nombre es obligatorio.'
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!emailPattern.test(this.user.email)) {
        this.errors.email = 'Por favor, ingresa un correo electrónico válido.'
      }

      if (!this.user.phone) {
        this.errors.phone = 'El teléfono es obligatorio.'
      }

      if (!this.user.address) {
        this.errors.address = 'La dirección es obligatoria.'
      }

      // Si hay errores, no proceder con la actualización
      if (Object.values(this.errors).some((error) => error !== '')) {
        return
      }

      // Verifica los datos antes de enviar la solicitud
      console.log('Datos a enviar:', this.user)

      // Enviar los datos actualizados al backend
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${this.user.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegúrate de pasar el token
          },
          body: JSON.stringify({
            name: this.user.name,
            password: this.user.password,
            phone: this.user.phone,
            address: this.user.address,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Respuesta de la API:', data)
          alert('Perfil actualizado correctamente')
          this.$router.push('/profile') // Redirigir al perfil de usuario
        } else {
          const data = await response.json()
          console.error('Error al actualizar el perfil:', data)
          alert('Error al actualizar el perfil')
        }
      } catch (error) {
        console.error('Error al actualizar los datos:', error)
      }
    },
  },
}
</script>

<style scoped>
.profile-edit-container {
  background: linear-gradient(135deg, #6a0dad, #000); /* Fondo morado */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-edit-form-container {
  background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro para el formulario */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 400px;
}

.profile-edit-form-container input {
  background-color: #222;
  color: #fff;
  border: 1px solid #444;
}

.profile-edit-form-container input:focus {
  border-color: #8a2be2; /* Color morado al enfocar los inputs */
}

.profile-edit-form-container button {
  background-color: #8a2be2;
  border: none;
}

.profile-edit-form-container button:hover {
  background-color: #6a0dad;
}

.profile-edit-form-container p {
  color: #ddd;
}

.profile-edit-form-container a {
  color: #8a2be2;
}

.profile-edit-form-container a:hover {
  text-decoration: underline;
}
</style>
