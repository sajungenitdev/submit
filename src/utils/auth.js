// utils/auth.js

export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        console.log('Token stored:', token);
    }
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        console.log('Token retrieved:', token ? `${token.substring(0, 20)}...` : 'No token');
        return token;
    }
    return null;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        
        // Also clear cookies
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        
        console.log('Token and cookies removed');
    }
};

export const setUser = (user) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User stored:', user);
    }
};

export const getUser = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
};

export const isAuthenticated = () => {
    const token = getToken();
    const isAuth = !!token;
    console.log('Is authenticated:', isAuth);
    return isAuth;
};

// NEW: Set both localStorage and cookies for middleware
export const setAuthData = (token, user, rememberMe = false) => {
    if (typeof window !== 'undefined') {
        // localStorage for client-side
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // Cookies for middleware (server-side)
        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
        const cookieOptions = `path=/; max-age=${maxAge}; SameSite=Lax`;
        
        document.cookie = `token=${token}; ${cookieOptions}`;
        document.cookie = `user=${JSON.stringify(user)}; ${cookieOptions}`;
        
        console.log('Auth data stored in localStorage and cookies');
        console.log('Token cookie set, max-age:', maxAge);
    }
};

// NEW: Clear both localStorage and cookies
export const clearAuthData = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        
        // Clear cookies by setting past expiration
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        
        console.log('Auth data cleared from localStorage and cookies');
    }
};