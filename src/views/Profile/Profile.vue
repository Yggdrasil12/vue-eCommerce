<template>
  <div class="profile-container">
    <div class="profile-form-container">
      <h2 class="text-center text-light mb-4">Perfil de Usuario</h2>

      <div class="mb-3">
        <label for="name" class="form-label text-light">Nombre</label>
        <input type="text" class="form-control" id="name" v-model="user.name" disabled />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label text-light">Correo Electrónico</label>
        <input type="email" class="form-control" id="email" v-model="user.email" disabled />
      </div>

      <div class="mb-3">
        <label for="role" class="form-label text-light">Rol</label>
        <input type="text" class="form-control" id="role" v-model="user.role" disabled />
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label text-light">Teléfono</label>
        <input type="text" class="form-control" id="phone" v-model="user.phone" disabled />
      </div>

      <div class="mb-3">
        <label for="address" class="form-label text-light">Dirección</label>
        <input type="text" class="form-control" id="address" v-model="user.address" disabled />
      </div>

      <div class="text-center mt-4">
        <router-link to="/profile/edit" class="btn btn-outline-light w-100 mb-2">
          Editar Perfil
        </router-link>

        <button class="btn btn-outline-danger w-100" @click="deleteProfile">Eliminar Perfil</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: '',
        email: '',
        role: '',
        phone: '',
        address: '',
      },
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const email = localStorage.getItem('userEmail')

        const response = await fetch(`http://127.0.0.1:8000/api/users/${email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          this.user = data
        } else {
          console.error('Error al obtener el usuario:', response.statusText)
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error)
      }
    },

    async deleteProfile() {
      if (
        !confirm(
          '¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.',
        )
      ) {
        return
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${this.user.email}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.ok) {
          alert('Perfil eliminado correctamente')
          localStorage.removeItem('token')
          localStorage.removeItem('userEmail')
          this.$router.push('/login') // Redirige al login u otra página
        } else {
          const data = await response.json()
          console.error('Error al eliminar el perfil:', data)
          alert('Error al eliminar el perfil')
        }
      } catch (error) {
        console.error('Error al eliminar el perfil:', error)
      }
    },
  },
}
</script>

<style scoped>
.profile-container {
  background: linear-gradient(135deg, #6a0dad, #000); /* Fondo morado */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-form-container {
  background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro para el formulario */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 400px;
}

.profile-form-container input {
  background-color: #222;
  color: #fff;
  border: 1px solid #444;
}

.profile-form-container input:focus {
  border-color: #8a2be2; /* Color morado al enfocar los inputs */
}

.profile-form-container button {
  background-color: #8a2be2;
  border: none;
}

.profile-form-container button:hover {
  background-color: #6a0dad;
}

.profile-form-container p {
  color: #ddd;
}

.profile-form-container a {
  color: #8a2be2;
}

.profile-form-container a:hover {
  text-decoration: underline;
}
</style>
