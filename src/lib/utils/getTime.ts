export const getTime = (str: Date) => {
    const date = new Date(str);
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth()).padStart(2, "0");
    const y = String(date.getFullYear()).padStart(2, "0"); 
    const h = String(date.getHours()).padStart(2, "0");
    const i = String(date.getMinutes()).padStart(2, "0");

    return `${d}.${m}.${y} ${h}:${i}`;
} 