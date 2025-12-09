# n8n-nodes-kerokero

[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE.md)

Este paquete contiene nodos comunitarios de n8n para integrar la funcionalidad de Kero-Kero (WhatsApp API).

## Nodos Incluidos

- **KeroKero**: Nodo principal para enviar mensajes y realizar acciones.
- **KeroKeroTrigger**: Nodo trigger para recibir eventos (mensajes entrantes, cambios de estado).

## Desarrollo Local

1. Instalar dependencias:
```bash
npm install
```

2. Construir el proyecto:
```bash
npm run build
```

3. Vincular localmente con n8n (para pruebas):
```bash
# En este directorio
npm link

# En el directorio de instalación de n8n (o directorio de configuración ~/.n8n/custom)
npm link n8n-nodes-kerokero
```

## Publicación en NPM

Para publicar este paquete en el registro de NPM para que sea accesible públicamente:

1. **Preparar la cuenta NPM**:
   - Asegúrate de tener una cuenta en [npmjs.com](https://www.npmjs.com/).
   - Inicia sesión en tu terminal:
     ```bash
     npm login
     ```

2. **Actualizar Versión**:
   - Asegúrate de actualizar la versión en `package.json` antes de publicar.
   - Puedes usar `npm version patch`, `npm version minor`, o `npm version major`.

3. **Construir y Publicar**:
   ```bash
   npm run build
   npm publish --access public
   ```

   > **Nota**: Si es la primera vez que publicas un paquete con scope (ej. `@tu-usuario/paquete`), asegúrate de usar `--access public`. Si el nombre no tiene scope, `--access public` es el defecto pero no está de más.

## Instalación en n8n

Una vez publicado, los usuarios pueden instalar el nodo desde la configuración de n8n o mediante:

```bash
npm install n8n-nodes-kerokero
```
```

## Licencia

Este proyecto está bajo la Licencia GPLv3 (GNU General Public License v3). Ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
