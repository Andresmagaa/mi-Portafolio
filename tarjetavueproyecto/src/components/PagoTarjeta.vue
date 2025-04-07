<template>
  <div class="row">
    <div class="col-md-6">
      <div class="caja_propiedad">
        <div class="row">
          <div class="col-md-12">
            <div class="tarjeta-propiedad"></div>
            <img :src="'/imagen/' + item.imagen" class="img-fluid" alt="Imagen de la propiedad">
            <div class="detalles-resumen"></div>
            <h2>{{ item.nombre }}</h2>
            <div class="detalle"></div>
            <h3>{{ item.descripcion }}</h3>
          </div>
          <div class="col-md-12">
            <h4>Precio por noche: ${{ item.precio }}</h4>
            <h3>Por pagar: ${{ item.total }}</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <!-- <h4>Fecha de llegada: {{ item.checkin }}</h4>
            <h4>Fecha de salida: {{ item.checkout }}</h4> -->
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12">
          <v-credit-card @cardChanged="guardar_tipo" @change="guardar_tarjeta" :trans="translations" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button @click="pagar" class="btn btn-info button" :disabled="loading">
            <span v-if="!loading">Pagar</span>
            <span v-if="loading">
              <!-- Aquí agregamos el ícono de carga -->
              <i class="fas fa-spinner fa-spin"></i> Pagando...
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'PagoTarjeta',
  props: ['item', 'stripe_key', 'laravel_token'],
  data() {
    return {
      translations: {
        name: {
          label: 'Nombre',
          placeholder: 'Nombre completo'
        },
        card: {
          label: 'Número de tarjeta',
          placeholder: 'Número de tarjeta'
        },
        expiration: {
          label: 'Expiración'
        },
        security: {
          label: 'Código de seguridad',
          placeholder: 'Código'
        }
      },
      // Info de la tarjeta
      name: '',
      cardNumber: '',
      expiration: '',
      security: '',
      cardName: '',
      loading: false // Aseguramos que esta variable controle el estado de carga
    }
  },
  methods: {
    guardar_tarjeta(values) {
      for (const key in values) {
        this[key] = values[key];
      }
    },
    guardar_tipo(cardName) {
      this.cardName = cardName;
    },
    pagar() {
      this.loading = true; // Activamos el estado de carga
      console.log(this.cardNumber);
      var tmp = this.expiration.split('/');
      var self = this;

      Stripe.createToken({
        number: this.cardNumber,
        cvc: this.security,
        exp_month: tmp[0],
        exp_year: tmp[1]
      },
      function(status, response) {
        if (response.error) {
          alert('Error en el pago');
          self.loading = false;
          return;
        }
        console.log('Este es el token:', response['id']);

        // Petición asíncrona al backend
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/inmuebles/comprar');
        xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
            self.loading = false;
            if (this.status == 200) {
              var fg = JSON.parse(this.responseText);
              if (fg.status == 'OK') {
                self.$emit('pago_ok', fg);
              } else {
                self.$emit('pago_error', fg);
              }
            }
          }
        };
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({
          token_stripe: response['id'],
          idinmueble: self.item.id, 
          total: self.item.total,
          nombre: self.item.nombre,
          cantidad: self.item.cantidad,
          _token: self.laravel_token,
          item_number: self.item.item_number
        }));
      });
    }
  },
  created() {
    // Iniciar el stripe
    Stripe.setPublishableKey(this.stripe_key);
    console.log('Prop item en PagoTarjeta:', this.item);
  }
}
</script>

<style>
.caja_propiedad {
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #CCCCCC;
  box-shadow: rgba(0, 0, 0, .16) 0px 1px 4px;
  overflow: hidden;
}

/* Estilos para el ícono de carga */
.fas.fa-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Ajustes para el botón de pagar */
button {
  width: 100%; /* Aseguramos que el botón esté al 100% de su contenedor */
  padding: 10px 0; /* Padding adecuado para que sea más grande */
  text-align: center;
  margin-top: 15px; /* Espacio entre el formulario y el botón */
}
</style>
