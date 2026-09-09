function excelDateToISO(serial){
 if(typeof serial !== "number") return serial
 if(serial < 40000 || serial > 50000) return serial
 const excelEpoch = new Date(Date.UTC(1899,11,30))
 const date = new Date(excelEpoch.getTime() + serial*86400000)
 return date.toISOString().slice(0,10)
}

function cleanString(value){
 if(value === null || value === undefined) return null
 if(typeof value !== "string") return value
 let v = value.trim()
 if(v === "") return null
 // escape single quote supaya aman di SQL
 v = v.replace(/'/g,"''")
 return v
}

function convertKompeten(value){
 if(value === null || value === undefined) return null
 const v = String(value).trim().toUpperCase()
 if(v === "K") return true
 if(v === "BK") return false
 return null
}

function cleanValue(value){
 if(value === "" || value === undefined) return null
 // Excel serial date
 if(typeof value === "number"){
  const converted = excelDateToISO(value)
  return converted
 }
 if(!isNaN(value) && Number(value) > 40000 && Number(value) < 50000){
  return excelDateToISO(Number(value))
 }
 return cleanString(value)
}

// ======================
// MAIN
// ======================

let rows = $('Set Text (Flow Merged)').first().json.data_rows
if(typeof rows === "string"){
 rows = JSON.parse(rows)
}
if(!Array.isArray(rows)){
 rows = [rows]
}

const cleanedRows = []
for(const row of rows){
 const newRow = {}
 for(const key of Object.keys(row)){
  const val = row[key]
  // khusus kolom K/BK
if(key.toLowerCase().includes("k/bk")){
   newRow[key] = convertKompeten(val)
   continue
  }
  newRow[key] = cleanValue(val)
 }
 cleanedRows.push(newRow)
}
return [{
 json:{
  cleaned_rows: cleanedRows
 }
}]
