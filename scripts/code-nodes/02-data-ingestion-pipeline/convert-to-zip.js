// Cek apakah item ini punya binary data dengan nama key 'data'
if ($input.item.binary && $input.item.binary.data) {
  
  // Ubah metadata jadi ZIP langsung di objek .data
  $input.item.binary.data.fileName = 'document.zip';
  $input.item.binary.data.fileExtension = 'zip';
  $input.item.binary.data.mimeType = 'application/zip';
  
}

return $input.item;
