// 1. Ambil output mentah
let rawText = $input.first().json.output || "";

/**
 * FUNGSI PEMBERSIH UTAMA (Bracket Counter Logic)
 * Fungsi ini membersihkan log [Used tools: ...]
 */
function removeSmartly(text, startMarker) {
    if (!text.includes(startMarker)) return text;

    let startIndex = text.indexOf(startMarker);
    let depth = 0;
    let foundStart = false;
    let endIndex = -1;

    for (let i = startIndex; i < text.length; i++) {
        if (text[i] === '[') {
            depth++;
            foundStart = true;
        } else if (text[i] === ']') {
            depth--;
        }

        if (foundStart && depth === 0) {
            endIndex = i;
            break; 
        }
    }

    if (endIndex !== -1) {
        let remainingText = text.substring(endIndex + 1);
        return removeSmartly(remainingText, startMarker);
    }

    return text;
}

// 2. Jalankan pembersihan Cerdas (Hapus Tools Log)
rawText = removeSmartly(rawText, "[Used tools:");

// 3. TAHAP FINAL: Hapus sisa-sisa artifact 
rawText = rawText.replace(/^[\s\}\]"]+/g, '');

// 4. Hapus artifact JSON spesifik n8n
rawText = rawText.replace(/\{"to":.*?\}/g, '');

// ============================================================
// 5. LANGKAH BARU: FORMATTING KHUSUS WHATSAPP
//    (Mengubah HTML/Markdown menjadi WA Style)
// ============================================================

// A. Handle Newlines HTML (<br> dan </p>)
rawText = rawText.replace(/<br\s*\/?>/gi, '\n');
rawText = rawText.replace(/<\/p>/gi, '\n\n');
rawText = rawText.replace(/<p>/gi, '');

// B. Ubah Header Markdown (### Judul) menjadi *JUDUL* (Tebal & Kapital)
//    WA tidak punya heading, jadi kita akali dengan huruf kapital tebal
rawText = rawText.replace(/^#{1,6}\s+(.*)$/gm, (match, p1) => {
    return `*${p1.toUpperCase()}*`;
});

// C. Ubah BOLD: 
//    HTML (<b>, <strong>) & Markdown (**) -> WhatsApp (*)
rawText = rawText.replace(/<b>(.*?)<\/b>/gi, '*$1*');
rawText = rawText.replace(/<strong>(.*?)<\/strong>/gi, '*$1*');
rawText = rawText.replace(/\*\*(.*?)\*\*/g, '*$1*');

// D. Ubah ITALIC: 
//    HTML (<i>, <em>) -> WhatsApp (_)
rawText = rawText.replace(/<i>(.*?)<\/i>/gi, '_$1_');
rawText = rawText.replace(/<em>(.*?)<\/em>/gi, '_$1_');

// E. Ubah MONOSPACE/CODE: 
//    HTML (<pre>, <code>) & Markdown (`) -> WhatsApp (```)
rawText = rawText.replace(/<pre>(.*?)<\/pre>/gs, '```$1```');
rawText = rawText.replace(/<code>(.*?)<\/code>/g, '```$1```');
rawText = rawText.replace(/`(.*?)`/g, '```$1```');

// F. Ubah List HTML (<li>) menjadi strip biasa
rawText = rawText.replace(/<li>(.*?)<\/li>/gi, '- $1\n');
rawText = rawText.replace(/<\/?ul>/gi, '');
rawText = rawText.replace(/<\/?ol>/gi, '');

// G. Bersihkan tag HTML lain yang tersisa (misal <span>, <div>)
rawText = rawText.replace(/<[^>]*>/g, '');

// ============================================================

// 6. Trim spasi kosong akhir
const cleanText = rawText.trim();

return {
  json: {
    text: cleanText
  }
};
