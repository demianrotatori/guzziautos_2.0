/* ============================================
   SIMULADOR DE FINANCIACIÓN
   ============================================ */

let selectedTerm = 24;

function updateSimulator() {
    const valVehicle = parseInt(document.getElementById('simulator-val-vehicle').value);
    const valDownpaymentInput = document.getElementById('simulator-val-downpayment');

    let minDown = Math.round(valVehicle * 0.3);
    let maxDown = Math.round(valVehicle * 0.8);
    valDownpaymentInput.min = minDown;
    valDownpaymentInput.max = maxDown;

    if (parseInt(valDownpaymentInput.value) < minDown) valDownpaymentInput.value = minDown;
    if (parseInt(valDownpaymentInput.value) > maxDown) valDownpaymentInput.value = maxDown;

    let valDownpayment = parseInt(valDownpaymentInput.value);
    let amountToFinance = valVehicle - valDownpayment;

    document.getElementById('simulator-val-vehicle-txt').innerText = `USD ${valVehicle.toLocaleString('es-ES')}`;
    document.getElementById('simulator-val-downpayment-txt').innerText = `USD ${valDownpayment.toLocaleString('es-ES')}`;
    document.getElementById('sim-financed-amount').innerText = `USD ${amountToFinance.toLocaleString('es-ES')}`;

    let r = CONFIG.TASA_INTERES / 12;
    let n = selectedTerm;
    let monthlyPayment = amountToFinance > 0 
        ? amountToFinance * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) 
        : 0;

    document.getElementById('sim-monthly-payment').innerText = `USD ${Math.round(monthlyPayment).toLocaleString('es-ES')}/mes`;
}

function setInstallmentTerm(months) {
    selectedTerm = months;
    [12, 24, 36, 48].forEach(m => {
        document.getElementById(`btn-term-${m}`).className = m === months 
            ? "py-3 text-sm font-semibold rounded-xl bg-brand-red text-white border border-brand-red" 
            : "py-3 text-sm font-semibold rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-white/5";
    });
    updateSimulator();
}

function openFinancingModal() {
    document.getElementById('fin-modal-val').innerText = document.getElementById('simulator-val-vehicle-txt').innerText;
    document.getElementById('fin-modal-down').innerText = document.getElementById('simulator-val-downpayment-txt').innerText;
    document.getElementById('fin-modal-term').innerText = `${selectedTerm} Meses`;
    document.getElementById('fin-modal-payment').innerText = document.getElementById('sim-monthly-payment').innerText;
    document.getElementById('financing-modal').classList.remove('hidden');
}

function closeFinancingModal() {
    document.getElementById('financing-modal').classList.add('hidden');
}