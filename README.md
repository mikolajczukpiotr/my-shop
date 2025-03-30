# MyShop Development Setup

## Local HTTPS and Custom Hostname Setup

This project uses a custom hostname (`shop.local`) with HTTPS for development. Follow these steps to set up your environment:

1. **Add the hostname to your hosts file**:
   ```bash
   sudo sh -c 'echo "127.0.0.1 shop.local" >> /etc/hosts'
   ```

2. **Generate self-signed SSL certificates**:
   ```bash
   mkdir -p ./.cert
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./.cert/key.pem -out ./.cert/cert.pem -subj "/CN=shop.local" -addext "subjectAltName=DNS:shop.local"
   ```

3. **Verify your .env file contains**:
   ```
   HOST=shop.local
   HTTPS=true
   SSL_CRT_FILE=./.cert/cert.pem
   SSL_KEY_FILE=./.cert/key.pem
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Open https://shop.local:3000 in your browser. You may need to accept the security warning for self-signed certificates.

---
