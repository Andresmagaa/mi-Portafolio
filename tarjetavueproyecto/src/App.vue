<template>
  <div class="container" id="cuerpo">
    <div v-if="item_pago === null && !pago_realizado">
      <listado v-if="item_seleccionado === null" @seleccionado="mostrar_propiedad" :propiedades="listado"></listado>
      <reservar @terminado="proceder_pago" v-if="item_seleccionado !== null" :inmueble="item_seleccionado"></reservar>
    </div>
    <pago-tarjeta :item="item_pago" @pago_ok="confirmar_pago" @pago_error="informar_error" :laravel_token="laravel_token" :stripe_key="llave_stripe" v-if="item_pago !== null && !pago_realizado"></pago-tarjeta>
    <pago-exitoso v-if="pago_realizado" @volver-inicio="Volver"></pago-exitoso>
  </div>
  </template>

<script>
import ListadoPropiedad from './components/ListadoPropiedad.vue';
import ReservarPropiedad from './components/ReservarPropiedad.vue';
import PagoTarjeta from './components/PagoTarjeta.vue';
import PagoExitoso from './components/PagoExitoso.vue';
import 'font-awesome/css/font-awesome.css';

export default {
  name: 'App',
  data() {
    return {
      nombre: 'Andres Magaña Alvarado',
      item_seleccionado: null,
      item_pago: null,
      llave_stripe: '',
      laravel_token: '',
      pago_realizado: false,
      listado: [
        {
        

        }
      ] // Aquí almacenaremos las propiedades obtenidas desde la base de datos
    };
  }
  ,methods: {
    mostrar_propiedad(propiedad) {
      this.item_seleccionado = propiedad;
    },
    proceder_pago(datos) {
      this.item_pago = datos;
      console.log('Aquí debería verse el id',this.item_pago);
      this.item_seleccionado = null;
    },
    Volver:function() {
      window.location.reload();
    },
    confirmar_pago(info_pago) {
      this.info_pago_exitoso = info_pago;
      this.pago_realizado = true;
    },
    informar_error() {
      alert('Hubo un error en el pago');
    },
    obtener_info:function() {
      var xhr = new XMLHttpRequest();
      // Configuramos la conexión
      xhr.open('GET','http://127.0.0.1:8000/obtener_propiedades',true);
      var self = this;

      console.log('1.- Muestra el this',this);
      xhr.onreadystatechange = function() {
        
        console.log('2.- Muestra el this',self);
        if(this.readyState == 4) {
          if(this.status == 200) {
            // Convierto la cadena JSON del backend en variable y la guardo en el estado
            self.listado=JSON.parse(this.responseText);
          }
        }
      }
      xhr.send();
        }
    },
    computed: {},
    components: {
      'listado': ListadoPropiedad,
      'reservar': ReservarPropiedad,
      'pago-tarjeta': PagoTarjeta,
      'pago-exitoso': PagoExitoso
    },
    created() {
      this.llave_stripe = window.stripe_key;
      this.laravel_token = window.laravel_token;
      this.obtener_info(); // Cargamos las propiedades cuando se crea el componente
    }
};
</script>

<style>
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>