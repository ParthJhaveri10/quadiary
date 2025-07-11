// Security utilities for the application

/**
 * Security configuration for Appwrite
 */
export const securityConfig = {
    // Session settings
    sessionCookieSecure: true,
    sessionSameSite: 'strict',
    
    // CSRF protection
    csrfEnabled: true,
    
    // Content Security Policy headers
    cspDirectives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://cloud.appwrite.io", "https://api.themoviedb.org"],
        fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    }
};

/**
 * Initialize security headers for the application
 */
export const initSecurity = () => {
    // Add security headers if running in production
    if (import.meta.env.PROD) {
        // Add security headers to prevent XSS and other attacks
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = Object.entries(securityConfig.cspDirectives)
            .map(([key, values]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()} ${values.join(' ')}`)
            .join('; ');
        document.head.appendChild(meta);
    }
};

/**
 * Validate environment variables
 */
export const validateEnvironment = () => {
    const requiredEnvVars = [
        'VITE_APPWRITE_ENDPOINT',
        'VITE_APPWRITE_PROJECT_ID',
        'VITE_APPWRITE_DATABASE_ID',
        'VITE_APPWRITE_USER_COLLECTION_ID'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
    
    if (missingVars.length > 0) {
        console.warn('Missing environment variables:', missingVars);
        console.warn('Using fallback values. For production, set these environment variables.');
    }
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    return input
        .replace(/[<>]/g, '') // Remove angle brackets
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();
};

/**
 * Generate secure random string
 */
export const generateSecureId = (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Check if the current environment is using HTTPS
 */
export const isSecureConnection = () => {
    return window.location.protocol === 'https:' || window.location.hostname === 'localhost';
};

/**
 * Initialize security measures
 */
export const initializeAppSecurity = () => {
    validateEnvironment();
    initSecurity();
    
    // Warn if not using HTTPS in production
    if (import.meta.env.PROD && !isSecureConnection()) {
        console.warn('Application is not running over HTTPS. This is required for production.');
    }
};
