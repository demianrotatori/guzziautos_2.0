/* ============================================
   APP - Inicialización, header y utilidades
   ============================================ */

/* ---------- Toast Notifications ---------- */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-brand-red';
    
    toast.className = `${bgColor} text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium toast-enter pointer-events-auto`;
    toast.innerText = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transition = 'opacity 0.3s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ---------- Menú Mobile ---------- */
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

/* ---------- Header scroll effect ---------- */
function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-brand-dark/95', 'shadow-lg');
        } else {
            header.classList.remove('bg-brand-dark/95', 'shadow-lg');
        }
    });
}

/* ---------- Tracking de búsquedas ---------- */
function initSearchTracking() {
    const searchInput = document.getElementById('filter-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (e.target.value.length > 2) {
                trackEvent('Search', { 
                    search_string: e.target.value, 
                    currency: 'USD' 
                });
            }
        });
    }
}

/* ---------- Inicialización al cargar el DOM ---------- */
window.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderCatalog(CARS);
    updateSimulator();
    initHeaderScroll();
    initSearchTracking();
});