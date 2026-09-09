// 1. Ambil output mentah
let rawText = $input.first().json.output || "";

/**
 * FUNGSI PEMBERSIH UTAMA (Bracket Counter Logic)
 * Fungsi ini menghitung jumlah kurung buka '[' dan tutup ']'
 * untuk mencari pasangan penutup yang SEBENARNYA, bukan yang di tengah jalan.
 */
function removeSmartly(text, startMarker) {
    if (!text.includes(startMarker)) return text;

    let startIndex = text.indexOf(startMarker);
    let depth = 0;
    let foundStart = false;
    let endIndex = -1;

    // Scan karakter satu per satu mulai dari posisi marker
    for (let i = startIndex; i < text.length; i++) {
        if (text[i] === '[') {
            depth++;
            foundStart = true;
        } else if (text[i] === ']') {
            depth--;
        }

        // Jika depth kembali ke 0 (artinya semua kurung buka sudah ditutup)
        if (foundStart && depth === 0) {
            endIndex = i;
            break; 
        }
    }

    // Jika blok sampah ditemukan dan tertutup sempurna
    if (endIndex !== -1) {
        // Ambil sisa teks SETELAH blok sampah
        let remainingText = text.substring(endIndex + 1);
        // Cek lagi secara rekursif (siapa tahu ada 2 blok Used Tools)
        return removeSmartly(remainingText, startMarker);
    }

    return text;
}

// 2. Jalankan pembersihan Cerdas
rawText = removeSmartly(rawText, "[Used tools:");

// 3. TAHAP FINAL: Hapus sisa-sisa artifact (jika ada spasi/simbol tertinggal di awal)
// Regex ini membersihkan jika masih ada sisa "}]" atau tanda kutip di awal kalimat jawaban
rawText = rawText.replace(/^[\s\}\]"]+/g, '');

// 4. Hapus artifact JSON spesifik n8n yang kadang bandel
rawText = rawText.replace(/\{"to":.*?\}/g, '');

// 5. Trim spasi kosong
const cleanText = rawText.trim();

return {
  json: {
    output: cleanText
  }
};
