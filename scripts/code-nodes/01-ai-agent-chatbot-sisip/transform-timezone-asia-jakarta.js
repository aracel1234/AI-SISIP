// Ambil timestamp dari data masuk (sesuaikan path)
const timestampMs = $('Extract Sender Information').first().json.timestamp;

// Konversi ke Date object (dalam UTC)
const date = new Date(timestampMs);

// Format tanggal dan waktu WIB
const optionsDate = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta' };

const tanggal = date.toLocaleDateString('id-ID', optionsDate);
const waktu = date.toLocaleTimeString('id-ID', optionsTime);

// Output
return {
  ...$input.item.json,
  timestampWIB: `${tanggal}, pukul ${waktu} WIB`,
  tanggalWIB: tanggal,
  jamWIB: waktu
};
