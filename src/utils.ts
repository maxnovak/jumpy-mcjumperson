export const isJump = (key: string): boolean =>{
    if (key === " " || key === "w" || key === "ArrowUp") {
        return true;
    }

    return false;
    
}

export const isRight = (key: string): boolean =>{
    if (key === "d" || key === "ArrowRight") {
        return true;
    }

    return false;
    
}

export const isLeft = (key: string): boolean =>{
    if (key === "a" || key === "ArrowLeft") {
        return true;
    }

    return false;
    
}
