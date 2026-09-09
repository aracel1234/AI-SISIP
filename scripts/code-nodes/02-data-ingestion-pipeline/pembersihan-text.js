// Ambil teks dari berbagai kemungkinan field
let text = $json.text ?? $json.content ?? $json.cleaned_text ?? $json.data ?? "";

// Jika masih bukan string, konversi
if (typeof text !== 'string') {
  text = String(text ?? "");
}

// Jika kosong, return langsung agar tidak error
if (text.trim() === "") {
  return [{ json: { cleaned_text: "" } }];
}

// ========== TAMBAHAN UNTUK FIX UNICODE ERROR ==========
// Hapus karakter null (\u0000)
text = text.replace(/\0/g, '');

// Perbaiki atau hapus lone surrogate (Unicode invalid)
if (typeof text.toWellFormed === 'function') {
    text = text.toWellFormed();
} else {
    text = text.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g, '')
               .replace(/(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '');
}
// =====================================================

// normalize newline
text = text.replace(/\r/g, "\n");

// remove excessive whitespace
text = text.replace(/[ \t]+/g, " ");

// remove multiple newlines
text = text.replace(/\n{3,}/g, "\n\n");

// remove page numbers
text = text.replace(/halaman\s*\d+\s*(dari|\/)\s*\d+/gi, "");

// remove standalone page numbers
text = text.replace(/\n\d+\n/g, "\n");

// fix bullet list
text = text.replace(/\n\d+\.\s*\n/g, "\n- ");

// remove weird characters
text = text.replace(/[•▪■□]/g, "-");

// trim
text = text.trim();

// Section untuk setiap bab
text = text.replace(/BAB\s+[IVX]+/gi, "\n\n[SECTION] $&");

// mempertahankan nomor dan perihal surat 
text = text.replace(/nomor\s*:/gi, "\nNomor:");
text = text.replace(/perihal\s*:/gi, "\nPerihal:");

return [{ json: { cleaned_text: text } }];
