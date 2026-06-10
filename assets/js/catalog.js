/* ============================================
   CATÁLOGO - Renderizado, filtros y modal
   ============================================ */

function renderCatalog(carsList) {
    const grid = document.getElementById('catalog-grid');
    const noResults = document.getElementById('no-results');
    grid.innerHTML = "";

    if (carsList.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    carsList.forEach(car => {
        const card = document.createElement('div');
        card.className = "bg-brand-card rounded-2xl border border-white/5 overflow-hidden shadow-xl transition-all duration-300 group hover:-translate-y-1 neon-card-hover flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <div class="relative h-56 w-full overflow-hidden bg-zinc-900">
                    <img src="${car.image}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    <div class="absolute top-3 left-3 bg-brand-dark/75 backdrop-blur-md text-brand-gold text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border border-white/5">
                        ${car.type}
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start gap-2 mb-2">
                        <h3 class="font-serif font-semibold text-lg text-brand-cream group-hover:text-brand-gold transition-colors line-clamp-1">${car.brand} ${car.model}</h3>
                        <span class="bg-brand-red/10 text-brand-redNeon text-xs font-semibold px-2.5 py-1 rounded border border-brand-red/20">${car.year}</span>
                    </div>
                    <p class="text-xs text-brand-muted mb-4 font-mono">${car.engine} | ${car.kilometers}</p>
                </div>
            </div>
            <div class="p-6 border-t border-white/5 bg-brand-dark/20 flex items-center justify-between">
                <div>
                    <span class="block text-[10px] text-brand-muted uppercase tracking-wider font-semibold">Precio Efectivo</span>
                    <span class="text-xl font-bold text-brand-cream">USD ${car.price.toLocaleString('es-ES')}</span>
                </div>
                <button onclick="openModal(${car.id})" class="px-4 py-2 bg-zinc-800 hover:bg-brand-red hover:text-white text-zinc-300 text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1.5">
                    Ver Detalles <i data-lucide="arrow-right" class="h-3 w-3"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function applyFilters() {
    const query = document.getElementById('filter-search').value.toLowerCase();
    const type = document.getElementById('filter-type').value;
    const sort = document.getElementById('filter-sort').value;

    let filtered = CARS.filter(car => {
        const matchesSearch = car.brand.toLowerCase().includes(query) || car.model.toLowerCase().includes(query);
        const matchesType = type === "" || car.type === type;
        return matchesSearch && matchesType;
    });

    if (sort === 'precio-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'precio-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'anio-desc') filtered.sort((a, b) => b.year - a.year);

    renderCatalog(filtered);
}

function clearFilters() {
    document.getElementById('filter-search').value = "";
    document.getElementById('filter-type').value = "";
    document.getElementById('filter-sort').value = "destacado";
    renderCatalog(CARS);
}

function openModal(id) {
    const car = CARS.find(c => c.id === id);
    if (!car) return;

    // Tracking: vista de contenido
    trackEvent('ViewContent', {
        content_name: `${car.brand} ${car.model}`,
        content_category: car.type,
        content_ids: [car.id],
        value: car.price,
        currency: 'USD'
    });

    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12">
            <div class="lg:col-span-6 relative bg-zinc-900 min-h-[300px]">
                <img src="${car.image}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover">
            </div>
            <div class="lg:col-span-6 p-8 flex flex-col justify-between">
                <div>
                    <span class="text-xs font-bold text-brand-redNeon tracking-wider uppercase block mb-1">${car.brand}</span>
                    <h3 class="font-serif font-bold text-2xl text-brand-cream mb-4">${car.model}</h3>
                    <div class="bg-brand-dark p-4 rounded-xl border border-white/5 mb-6">
                        <span class="text-[10px] text-brand-muted block uppercase">Valor Total</span>
                        <span class="text-2xl font-bold text-brand-gold">USD ${car.price.toLocaleString('es-ES')}</span>
                    </div>
                    <ul class="text-xs text-brand-muted space-y-2 mb-6">
                        <li><strong>Motor:</strong> ${car.engine}</li>
                        <li><strong>Transmisión:</strong> ${car.transmission}</li>
                        <li><strong>Kilometraje:</strong> ${car.kilometers}</li>
                    </ul>
                </div>
                <form onsubmit="submitExpressQuery(event, '${car.brand} ${car.model}', ${car.price})" class="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-white/5 pt-4">
                    <input type="text" name="exp_name" required placeholder="Tu Nombre" class="bg-brand-dark border border-white/10 rounded-lg p-2 text-xs text-brand-cream">
                    <input type="tel" name="exp_phone" required placeholder="WhatsApp" class="bg-brand-dark border border-white/10 rounded-lg p-2 text-xs text-brand-cream">
                    <button type="submit" class="bg-brand-red text-white text-xs font-bold uppercase rounded-lg py-2">Consultar</button>
                </form>
            </div>
        </div>
    `;
    document.getElementById('car-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('car-modal').classList.add('hidden');
}