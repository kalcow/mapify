const ms_to_string = (ms: number) => {
    const total_seconds = ms/1000; 
    const minutes = Math.floor(total_seconds/60); 
    const seconds = Math.floor(total_seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default ms_to_string; 