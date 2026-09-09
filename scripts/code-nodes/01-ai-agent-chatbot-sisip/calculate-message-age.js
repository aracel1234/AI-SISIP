// 1. Ambil Timestamp dari Payload WAHA
const item = $input.first();
const json = item.json;

// Ambil raw timestamp (bisa dari payload.timestamp atau timestamp langsung)
let rawTimestamp = json.payload?.timestamp || json.timestamp || 0;

// 2. NORMALISASI: Ubah SEMUA ke satuan DETIK
// Logika: Jika angkanya besar sekali (lebih dari tahun 2286 dalam detik), pasti itu Milidetik.
// Angka 10000000000 adalah batas aman (11 digit).
let normalizedMsgTime = Number(rawTimestamp);

if (normalizedMsgTime > 10000000000) {
  // Jika 13 digit (Milidetik), bagi 1000 agar jadi Detik
  normalizedMsgTime = Math.floor(normalizedMsgTime / 1000);
}

// 3. Ambil Waktu Server Sekarang (dalam Detik)
const serverTime = Math.floor(Date.now() / 1000);

// 4. Hitung Umur Pesan (Selisih dalam Detik)
const ageInSeconds = serverTime - normalizedMsgTime;

// 5. Tentukan Batas Toleransi
// Toleransi: Pesan dianggap basi jika lebih tua dari 120 detik (2 menit)
// Toleransi Future: Pesan dianggap aneh jika dari masa depan > 10 detik (beda jam server)
const isTooOld = ageInSeconds > 120;
const isFuture = ageInSeconds < -10; 

// Logika Stop
let expired = false;
let reason = "New message";

if (isTooOld) {
  expired = true;
  reason = `Message too old (Age: ${ageInSeconds}s)`;
} else if (isFuture) {
  expired = true;
  reason = `Message from future (Diff: ${ageInSeconds}s)`;
}

// Return data beserta Debug Info agar Anda bisa cek
return { 
  json: { 
    ...json, 
    expired: expired,
    debug_filter: {
      status: expired ? "BLOCKED" : "ALLOWED",
      reason: reason,
      time_of_msg_original: rawTimestamp,        // 1770871132851 in millisecs
      time_of_msg_normalized: normalizedMsgTime, // 1770871132 in secs (Sudah dipotong)
      time_of_server: serverTime,                // 1770871347
      age_in_seconds: ageInSeconds                  // 215
    }
  } 
};
