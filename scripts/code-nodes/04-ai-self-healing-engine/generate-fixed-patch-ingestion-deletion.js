// 1. Ambil data dengan syntax n8n v1+ yang lebih stabil (menggunakan $items)
const workflowData = $items("Get Workflow (Ingestion & Deletion)")[0].json;
const aiResponse = $items("AI Agent (Ingestion & Deletion)")[0].json.output;

// 2. JANGAN GUNAKAN structuredClone ATAU JSON.parse. 
// Kita gunakan teknik "Shallow Copy" agar Sandbox tidak memory leak.
const newNodes = [];
let fixedParameter = 'none';

// 3. Ekstrak data AI dengan aman
const patch = aiResponse && aiResponse.patch ? aiResponse.patch : null;
const targetNodeName = patch ? patch.nodeName : null;
const paramToFix = patch ? patch.parameterName : null;
const newValue = patch ? patch.newValue : null;

const shouldPatch = targetNodeName && targetNodeName !== "N/A" && paramToFix !== "N/A";

// 4. Looping array
for (let i = 0; i < workflowData.nodes.length; i++) {
  const originalNode = workflowData.nodes[i];
  
  if (shouldPatch && originalNode.name === targetNodeName) {
    const patchedNode = { ...originalNode };
    patchedNode.parameters = { ...(patchedNode.parameters || {}) };
    
    // --- PERBAIKAN DI SINI ---
    // 1. Terapkan nilai baru ke parameter yang benar
    patchedNode.parameters[paramToFix] = newValue;
    
    // 2. Hapus parameter yang salah jika ada (PENTING!)
    // Jika AI bilang harus fix 'id', kita pastikan 'idd' dihapus agar tidak bentrok
    if (paramToFix === 'id' && patchedNode.parameters.hasOwnProperty('idd')) {
      delete patchedNode.parameters['idd'];
    }
    // -------------------------
    
    patchedNode.notes = `🛠 AI AUTO-FIX: Changed ${paramToFix} to ${newValue} and removed 'idd'`;
    newNodes.push(patchedNode);
    fixedParameter = paramToFix;
    
  } else {
    newNodes.push(originalNode);
  }
}

// 5. Rakit kembali struktur workflow utama
const updatedWorkflow = {
  ...workflowData,     // Pertahankan data 'connections', 'settings', dll
  nodes: newNodes      // Ganti array nodes dengan yang sudah diperbarui
};

// 6. Kembalikan data sesuai standar n8n
return [{
  json: {
    workflowJSON: updatedWorkflow, 
    diagnosis: aiResponse?.diagnosis || "Tidak ada diagnosis valid",
    fixedParam: fixedParameter,
    success: true
  }
}];
