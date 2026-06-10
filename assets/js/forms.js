/* ============================================
   FORMULARIOS - Envío y redirección a WhatsApp
   ============================================ */

function submitExpressQuery(event, vehicleName, price) {
    event.preventDefault();
    
    trackEvent('Lead', {
        content_name: vehicleName,
        content_category: 'Consulta Auto',
        value: price,
        currency: 'USD'
    });
    
    closeModal();
    showToast("✅ Consulta enviada");
    event.target.reset();
}

function submitFinancing(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    trackEvent('Lead', {
        content_name: 'Pre-Aprobación de Crédito',
        content_category: 'Financiacion',
        value: 100.00,
        currency: 'USD'
    });

    const mensaje = `Hola Guzzi Autos! Quiero solicitar una pre-aprobación de crédito.%0A%0A` +
                    `💰 *Valor del auto:* ${document.getElementById('fin-modal-val').innerText}%0A` +
                    `🤑 *Anticipo:* ${document.getElementById('fin-modal-down').innerText}%0A` +
                    `📅 *Plazo:* ${document.getElementById('fin-modal-term').innerText}%0A` +
                    `💳 *Cuota estimada:* ${document.getElementById('fin-modal-payment').innerText}%0A%0A` +
                    `👤 *Mis datos:*%0A` +
                    `Nombre: ${formData.get('fin_name')}%0A` +
                    `DNI: ${formData.get('fin_dni')}%0A` +
                    `WhatsApp: ${formData.get('fin_phone')}`;
    
    window.open(`https://wa.me/${CONFIG.WHATSAPP_GUZZI}?text=${mensaje}`, '_blank');
    closeFinancingModal();
    showToast("✅ ¡Redirigiendo a WhatsApp!");
    form.reset();
}

function submitTasacion(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    // Obtener el formulario
    const form = event.target;
    
    // Obtener los valores de los campos
    const brand = form.brand.value;
    const model = form.model.value;
    const year = form.year.value;
    const kilometers = form.kilometers.value;
    const condition = form.condition.value;
    const client_name = form.client_name.value;
    const client_phone = form.client_phone.value;
    
    // TU NÚMERO DE WHATSAPP (cambialo por el tuyo)
    // Formato: código de país + número (sin el + ni espacios)
    // Ejemplo Argentina: 5492231234567 (54 = país, 9 = celular, 223 = zona, resto = número)
    const tuNumeroWhatsApp = '5492235254339'; // ⚠️ CAMBIA ESTO POR TU NÚMERO REAL
    
    // Crear el mensaje
    const mensaje = `*🚗 CONSULTA DE COTIZACIÓN - GUZZI AUTOS*%0A%0A` +
                    `*Datos del Auto:*%0A` +
                    `📌 Marca: ${brand}%0A` +
                    `📌 Modelo: ${model}%0A` +
                    `📌 Año: ${year}%0A` +
                    `📌 Kilometraje: ${kilometers}%0A` +
                    `📌 Estado: ${condition}%0A%0A` +
                    `*Datos del Cliente:*%0A` +
                    `👤 Nombre: ${client_name}%0A` +
                    `📞 Teléfono: ${client_phone}%0A%0A` +
                    `Quisiera saber el valor de cotización. Gracias!`;
    
    // Crear la URL de WhatsApp
    const whatsappURL = `https://wa.me/${tuNumeroWhatsApp}?text=${mensaje}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
    
    // Opcional: Mostrar mensaje de éxito y limpiar el formulario
    alert('¡Perfecto! Te redirigimos a WhatsApp para completar la consulta.');
    form.reset();
}

function submitContacto(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    trackEvent('Lead', {
        content_name: formData.get('subject') || 'Consulta General',
        content_category: 'Contacto',
        value: 30.00,
        currency: 'USD'
    });

    const mensaje = `Hola Guzzi Autos! Tengo una consulta.%0A%0A` +
                    `📌 *Asunto:* ${formData.get('subject')}%0A` +
                    `👤 *Nombre:* ${formData.get('name')}%0A` +
                    `📧 *Email:* ${formData.get('email')}%0A` +
                    ` *Mensaje:* ${formData.get('message')}`;
    
    window.open(`https://wa.me/${CONFIG.WHATSAPP_GUZZI}?text=${mensaje}`, '_blank');
    showToast("✅ ¡Redirigiendo a WhatsApp!");
    form.reset();
}