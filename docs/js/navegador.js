// Detectar Samsung Internet Browser
function isSamsungBrowser() {
    const ua = navigator.userAgent;
    return /SamsungBrowser/i.test(ua);
}

// Función para redirigir a Chrome
function redirectToChrome() {
    const currentUrl = window.location.href;
    
    // Intent URL para abrir en Chrome en Android
    const chromeIntent = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`;
    
    // Mostrar mensaje al usuario
    const userConfirm = confirm(
        "Para una mejor experiencia, te recomendamos abrir este sitio en Google Chrome. ¿Deseas abrirlo ahora?"
    );
    
    if (userConfirm) {
        // Intentar abrir en Chrome
        window.location.href = chromeIntent;
        
        // Fallback: Si no funciona después de 2 segundos, mostrar instrucciones
        setTimeout(() => {
            alert("Por favor, copia esta URL y ábrela en Google Chrome para continuar.");
        }, 2000);
    }
}

// Ejecutar al cargar la página
if (isSamsungBrowser()) {
    redirectToChrome();
}