export const saveToken = (token)=>{
    localStorage.setItem('access_token',token.access)
    localStorage.setItem('refresh_token',token.refresh)
}


export const getAccessToken = ()=>{
    const token = localStorage.getItem('access_token')
    return token
}

export const getRefreshToken = ()=>{
    const token = localStorage.getItem('refresh_token')
    return token
}



export const clearTokens = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}