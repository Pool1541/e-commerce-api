const { readFileSync, accessSync, constants } = require('fs');

/**
 * Extracts the content of a secret from either a Docker secrets file path or direct value
 * @param {string} secret - The secret string or Docker secrets file path
 * @returns {string|undefined} The extracted secret value or undefined if error occurs
 * @throws {Error} If the secret file cannot be accessed or read
 * @example
 * // Direct secret value
 * const value1 = extractSecret('mysecret123');
 * 
 * // Docker secrets file path
 * const value2 = extractSecret('/run/secrets/db_password');
 * 
 * // Error handling
 * try {
 *   const secret = extractSecret('/run/secrets/missing_file');
 * } catch (error) {
 *   console.error('Failed to load secret:', error);
 *   process.exit(1);
 * }
 */
function extractSecret(secret) {
  try {
    if (!secret) return undefined;
    
    if (secret.startsWith('/run/secrets/')) {
      try {
        accessSync(secret, constants.R_OK);
        const secretValue = readFileSync(secret, 'utf8');
        return secretValue.trim();
      } catch (error) {
        console.error(`Error al leer secreto en ${secret}:`, error.message);
        process.exit(1);
      }
    }
    
    return secret.trim();
  } catch (error) {
    console.error('Error procesando secreto:', error.message);
    return undefined;
  }
}

function loadEnvironmentVariables() {
  const envVariables = {
    PORT: extractSecret(process.env.PORT),
    MONGODB_CONNECTION: extractSecret(process.env.MONGODB_CONNECTION),
    PRIVATE_KEY: extractSecret(process.env.PRIVATE_KEY),
    PRIVATE_REFRESH_KEY: extractSecret(process.env.PRIVATE_REFRESH_KEY),
    FRONTEND_URL: extractSecret(process.env.FRONTEND_URL),
    CLOUDINARY_URL: extractSecret(process.env.CLOUDINARY_URL),
    CRYPTO_SECRET_KEY: extractSecret(process.env.CRYPTO_SECRET_KEY),
    NODE_ENV: extractSecret(process.env.NODE_ENV)
  };

  Object.entries(envVariables).forEach(([key, value]) => {
    if (!value) console.warn(`Warning: Environment variable ${key} is not set`);
  });

  return envVariables;
}

module.exports = loadEnvironmentVariables();
