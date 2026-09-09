function cleanName(name){
 return name
  .toLowerCase()
  .replace(/[^a-z0-9]/g,"_")
  .replace(/_+/g,"_")
  .replace(/^_|_$/g,"")
}

function sqlValue(v){
 if(v === null) return "NULL"
 if(typeof v === "boolean") return v ? "TRUE" : "FALSE"
 if(typeof v === "number") return v
 return `'${v}'`
}

const rows = $('Cleaning Tabular Data').first().json.cleaned_rows

const table = $('AI Agent Labelling').first().json.output.table_name

const recordManagerId = $('Create Row in Record Manager').first().json.id

const columns = Object.keys(rows[0])

const cleanColumns = columns.map(c => cleanName(c))

// tambahkan kolom record_manager_id
const finalColumns = [...cleanColumns, "record_manager_id"]

let valuesSQL = []

for(const row of rows){

 const values = columns.map(c => sqlValue(row[c]))

 // tambahkan value record_manager_id di setiap row
 values.push(sqlValue(recordManagerId))

 valuesSQL.push(`(${values.join(",")})`)
}

const insertSQL = `
INSERT INTO public.${table}
(${finalColumns.join(",")})
VALUES
${valuesSQL.join(",\n")}
;
`

return [{
 json:{
  insert_sql: insertSQL
 }
}]
