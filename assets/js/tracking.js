/* ============================================
   META PIXEL - Tracking de eventos
   Se carga primero para capturar PageView temprano
   ============================================ */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '1531946768367827');
fbq('track', 'PageView');

/* Helper global para trackear eventos de forma segura */
window.trackEvent = function(eventName, params = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, params);
        console.log(`📊 Meta: ${eventName}`, params);
    }
};