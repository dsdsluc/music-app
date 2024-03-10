import unidecode  from "unidecode"

export const convertStringToSlug = (text: string): string=>{
    const textUnidecode = unidecode(text.trim())
    const textSlug = textUnidecode.replace(/\s+/g, "-");
    
    return textSlug
}