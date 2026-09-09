// 1. Ambil item pertama
const item = $input.first();
let fullText = "";
let debugInfo = "File document.xml tidak ditemukan.";

// 2. Pastikan ada binary data
if (item.binary) {
    const binaries = item.binary;
    
    // 3. Loop semua kunci binary untuk mencari 'document.xml'
    for (const key of Object.keys(binaries)) {
        const fileObj = binaries[key];
        
        // Cek apakah ini file document.xml
        if (fileObj.fileName === 'document.xml') {
            debugInfo = "Ditemukan dan diproses dari key: " + key;
            
            // 4. Decode Base64 ke String
            const b64Data = fileObj.data;
            const xmlString = Buffer.from(b64Data, 'base64').toString('utf8');

            // --- BAGIAN LOGIKA BARU YANG LEBIH KUAT ---
            
            // Regex ini mencari tag <w:t ... > ISI TEKS </w:t>
            // [\s\S]*? artinya: Ambil semua karakter TERMASUK enter (newline)
            const regex = /<w:t[\s\S]*?>(.*?)<\/w:t>/g;
            
            let match;
            let textChunks = [];

            while ((match = regex.exec(xmlString)) !== null) {
                // match[1] adalah isi teksnya
                // Kita tambahkan pembersih ekstra: .replace(/<[^>]+>/g, '') 
                // untuk membuang jika ada sisa tag xml yang nyangkut di dalam teks
                let cleanChunk = match[1].replace(/<[^>]+>/g, '');
                
                // Tambahkan spasi agar teks tidak menempel
                if (cleanChunk.trim().length > 0) {
                     textChunks.push(cleanChunk);
                }
            }

            // Gabungkan semua potongan dengan spasi atau enter
            fullText = textChunks.join(' \n ');
            
            break; 
        }
    }
}

return [
  {
    json: {
      content: fullText, // Ini harusnya sekarang teks bersih
      debug_status: debugInfo
    }
  }
];
