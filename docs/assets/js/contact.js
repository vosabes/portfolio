// Este código va en contact.js

const form = document.getElementById('contact-form');

if (form) {
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const mensaje = document.getElementById('mensaje');
  const successMsg = document.getElementById('successMsg');
  const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  form.addEventListener('submit', e => {
    e.preventDefault();
    limpiar();

    let ok = true;
    if (!nombre.value.trim()) {
      error('errorNombre', 'Por favor ingresa tu nombre');
      ok = false;
    }
    if (!correo.value.trim()) {
      error('errorCorreo', 'Ingresa un correo');
      ok = false;
    } else if (!emailRegex.test(correo.value)) {
      error('errorCorreo', 'Formato de correo no válido');
      ok = false;
    }
    if (!mensaje.value.trim()) {
      error('errorMensaje', 'El mensaje no puede estar vacío');
      ok = false;
    }

    if (ok) {
      // Enviar el formulario con EmailJS
      emailjs.sendForm('service_fhkj6zo', 'template_c9jzowk', form)
        .then(() => {
          successMsg.textContent = '¡Gracias por contactarme! Responderé pronto.';
          form.reset();
        }, (error) => {
          successMsg.textContent = 'Error al enviar el mensaje, intenta nuevamente.';
          console.error('EmailJS error:', error);
        });
    }
  });

  function error(id, msg) {
    document.getElementById(id).textContent = msg;
  }

  function limpiar() {
    ['errorNombre', 'errorCorreo', 'errorMensaje'].forEach(id => document.getElementById(id).textContent = '');
    successMsg.textContent = '';
  }
}