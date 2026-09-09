// 1. Ambil output mentah
let rawText = $input.first().json.output || "";

/**
 * FUNGSI PEMBERSIH UTAMA (Bracket Counter Logic)
 * Fungsi ini membuang log tools seperti [Used tools: ...]
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

// 2. Jalankan pembersihan artifact Tools
rawText = removeSmartly(rawText, "[Used tools:");

// 3. Hapus sisa-sisa artifact di awal kalimat
rawText = rawText.replace(/^[\s\}\]"]+/g, '');

// 4. Hapus artifact JSON n8n
rawText = rawText.replace(/\{"to":.*?\}/g, '');

// ============================================================
// 5. LANGKAH BARU: FORMATTING FIX (MARKDOWN -> HTML TELEGRAM)
// ============================================================

// A. Ubah Header Markdown (### Judul) menjadi <b>Judul</b>
// Flag 'gm' agar berlaku per baris (multiline)
rawText = rawText.replace(/^#{1,6}\s+(.*)$/gm, '<b>$1</b>');

// B. Ubah Bold Markdown (**text**) menjadi <b>text</b>
rawText = rawText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

// C. Ubah Code Block (`text`) menjadi <code>text</code>
rawText = rawText.replace(/`(.*?)`/g, '<code>$1</code>');

// D. Perbaikan List (Agar tidak menumpuk/clumping)
// Jika ada bullet point (-) yang menempel dengan baris atasnya, beri jarak
rawText = rawText.replace(/([^\n])\n-/g, '$1\n\n-');

// ============================================================

// 6. Trim spasi kosong akhir
const cleanText = rawText.trim();

return {
  json: {
    output: cleanText
  }
};
