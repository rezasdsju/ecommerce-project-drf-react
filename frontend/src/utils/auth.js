export const saveToken = (token)=>{
    // console.log('token.access: ',token.access)
    // console.log('token.refresh: ',token.refresh)
    localStorage.setItem('access_token',token.access)
    localStorage.setItem('refresh_token',token.refresh)
}


export const getAccessToken = ()=>{
    const token = localStorage.getItem('access_token')

    // console.log('get access token: ',token)
    return token
}

export const getRefreshToken = ()=>{
    const token = localStorage.getItem('refresh_token')
    // console.log('refreshToken: ',token)
    return token
}



export const clearTokens = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}