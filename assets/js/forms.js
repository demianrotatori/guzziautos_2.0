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
    event.preventDefault(); 
    
    const form = event.target;
    
    const brand = form.brand.value;
    const model = form.model.value;
    const year = form.year.value;
    const kilometers = form.kilometers.value;
    const condition = form.condition.value;
    const client_name = form.client_name.value;
    const client_phone = form.client_phone.value;
    
    const tuNumeroWhatsApp = '5492235254339'; 
    
    // Usamos códigos Unicode para los emojis (más confiable)
    const mensaje = 
        "\uD83D\uDE97 *CONSULTA DE COTIZACIÓN - GUZZI AUTOS*\n\n" +
        "*Datos del Auto:*\n" +
        "\uD83D\uDCCC Marca: " + brand + "\n" +
        "\uD83D\uDCCC Modelo: " + model + "\n" +
        "\uD83D\uDCCC Año: " + year + "\n" +
        "\uD83D\uDCCC Kilometraje: " + kilometers + "\n" +
        " Estado: " + condition + "\n\n" +
        "*Datos del Cliente:*\n" +
        "\uD83D\uDC64 Nombre: " + client_name + "\n" +
        "\uD83D\uDCE1 Teléfono: " + client_phone + "\n\n" +
        "Quisiera saber el valor de cotización. ¡Gracias!";
    
    const whatsappURL = "https://wa.me/" + tuNumeroWhatsApp + "?text=" + encodeURIComponent(mensaje);
    
    window.open(whatsappURL, '_blank');
    
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