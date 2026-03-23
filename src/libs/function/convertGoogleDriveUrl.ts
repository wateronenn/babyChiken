export function convertGoogleDriveUrl(url?: string) {
    if (!url || url.trim() === "") return "/img/logo.png"
  
    const trimmed = url.trim()
  
    // แปลง &amp; ให้เป็น &
    const decoded = trimmed.replace(/&amp;/g, "&")
  
    // รองรับ open?id= , uc?id= , ...?id=
    const idMatch = decoded.match(/[?&]id=([^&]+)/)
    if (idMatch) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`
    }
  
    // รองรับ /file/d/ID
    const fileMatch = decoded.match(/\/file\/d\/([^/]+)/)
    if (fileMatch) {
      return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1000`
    }
  
    return decoded
  }