/* ============================================
   BASE DE DATOS DE VEHÍCULOS
   ============================================ */
const CARS = [
    {
        id: 1,
        brand: "Audi",
        model: "R8 V10 Coupe Performance",
        year: 2021,
        kilometers: "12.000 km",
        price: 165000,
        transmission: "Automática S-Tronic",
        fuel: "Nafta",
        type: "Deportivo",
        engine: "5.2 FSI V10 610cv",
        color: "Gris Nardo",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800",
        features: ["Frenos cerámicos", "Tracción integral Quattro", "Escape Performance"]
    },
    {
        id: 2,
        brand: "Toyota",
        model: "Hilux SRX 4x4",
        year: 2022,
        kilometers: "45.000 km",
        price: 38500,
        transmission: "Automática",
        fuel: "Diesel",
        type: "Pickup",
        engine: "2.8 D-4D 204cv",
        color: "Blanco Perlado",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
        features: ["Cámara 360", "Audio Premium JBL", "Toyota Safety Sense"]
    },
    {
        id: 3,
        brand: "Mercedes-Benz",
        model: "C300 Coupe AMG Line",
        year: 2020,
        kilometers: "32.000 km",
        price: 54000,
        transmission: "Automática 9G-Tronic",
        fuel: "Nafta",
        type: "Sedán",
        engine: "2.0 Turbo 258cv",
        color: "Negro Obsidiana",
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800",
        features: ["Techo Panorámico", "Kit Estético AMG", "Faros Multibeam LED"]
    }
];

/* Configuración global */
const CONFIG = {
    WHATSAPP_GUZZI: "5492235254339",
    TASA_INTERES: 0.125, // 12.5% TNA
};