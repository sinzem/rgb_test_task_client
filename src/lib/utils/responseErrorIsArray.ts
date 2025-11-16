export const responseErrorIsArray = (str: {message: string} | string[] | undefined) => {
    const messages = Array.isArray(str) 
                    ? str 
                    : typeof str?.message === "string" 
                    ? [str?.message] 
                    : [];

    return messages;
}