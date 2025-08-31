
export type ParcelFormData = {
  name: string
  crop: string
  areaHa: number
  location?: string
  farmId: string
}

export type RecordFormData = {
  date: string
  type: 'SIEMBRA'|'FERTILIZACION'|'RIEGO'|'TRATAMIENTO'|'COSECHA'|'OTRO'
  product?: string
  dose?: number
  units?: string
  notes?: string
  fieldId: string
}
