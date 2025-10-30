const $ = id => document.getElementById(id);

function parseDateInput(value) {
    if (!value) return null;
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) return null;
    // 4 basamak kontrolü
    if (y < 1000 || y > 9999) return null;
    return Date.UTC(y, m - 1, d);
}

function daysBetween(ms1, ms2) {
    const DAY = 24 * 60 * 60 * 1000;
    const diff = ms2 - ms1;
    return Math.floor(diff / DAY);
}

function showResult(html) {
    $('result').innerHTML = html;
}

function calculate() {
    const d1v = $('date1').value;
    const d2v = $('date2').value;

    const ms1 = parseDateInput(d1v);
    const ms2 = parseDateInput(d2v);

    if (!ms1 || !ms2) {
        showResult('<span class="err">Lütfen her iki tarihi de 4 basamaklı yıl ile seçin.</span>');
        return;
    }

    if (ms1 > ms2) {
        showResult('<span class="err">Başlangıç tarihi, bitiş tarihinden daha ileri olamaz.</span>');
        return;
    }

    const days = daysBetween(ms1, ms2);
    const d1s = new Date(ms1).toISOString().slice(0, 10);
    const d2s = new Date(ms2).toISOString().slice(0, 10);

    showResult(`<strong>${days}</strong> gün<br><small>(${d1s} — ${d2s})</small>`);
}

function clearAll() {
    $('date1').value = '';
    $('date2').value = '';
    showResult('');
}

window.addEventListener('DOMContentLoaded', () => {
    $('calc').addEventListener('click', calculate);
    $('clear').addEventListener('click', clearAll);

    ['date1', 'date2'].forEach(id => {
        $(id).addEventListener('keydown', e => {
            if (e.key === 'Enter') calculate();
        });
    });
});