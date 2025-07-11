# Security Configuration Guide

## Setting Up a Custom Domain for Appwrite

To improve security and eliminate the localStorage warning, you should set up a custom domain for your Appwrite API endpoint.

### Step 1: Configure a Custom Domain in Appwrite Console

1. **Log into your Appwrite Console**
   - Go to [Appwrite Console](https://cloud.appwrite.io/console)
   - Select your project

2. **Navigate to Settings > Domains**
   - Click on "Add Domain"
   - Enter your custom domain (e.g., `api.yourdomain.com`)
   - Follow the DNS configuration instructions provided

3. **DNS Configuration**
   - Add a CNAME record pointing to your Appwrite instance
   - Wait for DNS propagation (usually 24-48 hours)

### Step 2: Update Your Environment Variables

Once your custom domain is set up and verified:

1. **Update `.env.local`**
   ```bash
   # Replace the endpoint with your custom domain
   VITE_APPWRITE_ENDPOINT=https://api.yourdomain.com/v1
   VITE_APPWRITE_PROJECT_ID=6862698e00345f18c415
   VITE_APPWRITE_DATABASE_ID=68626a58000925218dd0
   VITE_APPWRITE_USER_COLLECTION_ID=68626ca9001f1e45a5d3
   ```

2. **Restart your development server**
   ```bash
   npm run dev
   ```

### Step 3: Production Deployment

For production deployments:

1. **Set environment variables** in your hosting platform (Vercel, Netlify, etc.)
2. **Ensure HTTPS** is enabled for your custom domain
3. **Test the connection** to verify everything works

### Alternative: Using Appwrite Self-Hosted

If you prefer full control, you can self-host Appwrite:

1. **Install Appwrite** on your server
2. **Configure your domain** to point to your server
3. **Set up SSL certificates**
4. **Update the endpoint** in your environment variables

### Security Features Implemented

- ✅ Environment variable configuration
- ✅ Content Security Policy headers
- ✅ Input sanitization utilities
- ✅ HTTPS enforcement warnings
- ✅ Environment validation
- ✅ Secure session configuration

### Benefits of Custom Domain

- **Enhanced Security**: Eliminates localStorage security warnings
- **Better Performance**: Potentially faster response times
- **Professional Setup**: Custom branding and domain control
- **SSL/TLS Control**: Full control over certificate management
- **Compliance**: Better for enterprise and compliance requirements

### Troubleshooting

If you encounter issues:

1. **Check DNS propagation**: Use tools like `nslookup` or online DNS checkers
2. **Verify SSL certificate**: Ensure your custom domain has a valid SSL certificate
3. **Check firewall settings**: Ensure ports 80 and 443 are open
4. **Review Appwrite logs**: Check the Appwrite console for any error messages

### Current Configuration

The application is currently configured to use environment variables with fallbacks to the default Appwrite cloud endpoint. This provides flexibility while maintaining security best practices.

```javascript
// Current fallback configuration
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || '6862698e00345f18c415';
```

### Next Steps

1. Set up your custom domain in Appwrite Console
2. Update your environment variables
3. Test thoroughly in development
4. Deploy to production with the new configuration
5. Monitor for any security warnings or issues

For more detailed instructions, refer to the [Appwrite Documentation](https://appwrite.io/docs/advanced/self-hosting).
