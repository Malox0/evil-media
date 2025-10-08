import Keycloak from 'keycloak-js'

let keycloak: Keycloak | null = null

export function getKeycloak(): Keycloak {
  if (!keycloak) {
    keycloak = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    })
  }

  return keycloak
}

export async function initKeycloak(onAuthenticated: () => void) {
  const kc = getKeycloak()
  const authenticated = await kc
    .init({
      onLoad: 'check-sso',
      checkLoginIframe: false,
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: 'S256',
    })
    .catch((err) => {
      if (err?.error === 'login_required') {
        return false
      }
      throw err
    })
  setInterval(async () => {
    try {
      await kc.updateToken(30)
    } catch {
      await kc.login({ redirectUri: window.location.origin })
    }
  }, 20000)

  if (authenticated && onAuthenticated) onAuthenticated()

  return authenticated
}
