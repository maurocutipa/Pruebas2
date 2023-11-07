## Generar claves

Usar el siguiente comando para generar una clave unica

```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
