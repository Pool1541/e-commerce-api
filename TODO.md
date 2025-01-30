# **E-commerce API**

## Endpoints para el super administrador

`/api/admin`

- ✅ GET - para solicitar los usuarios registrados. [Se require jwt y rol de super administrador]
- ✅ POST - para crear usuarios con privilegios de administrador. [Se require jwt y rol de super administrador]
- ⌛ PATCH - para modificar datos de cualquier usuario. [Se require jwt y rol de super administrador]
- ⌛ DELETE - para borrar/desactivar cualquier usuario. [Se require jwt y rol de super administrador]

---

## Endpoints para administradores

`/api/products`

- ✅ POST - para crear productos. [Se require jwt y rol de administrador]
- ⏳ PATCH - para modificar productos. [Se require jwt y rol de administrador]
- ✅ DELETE - para eliminar productos. [Se require jwt y rol de administrador]

---

## Endpoints para usuarios

`/api/users`

- ✅ GET - para solicitar sus propios datos. [Se require uid y jwt]
- ✅ POST - para registrarse en la aplicación.
- ✅ PATCH - para cambiar su propia contraseña. [Se require uid y jwt]
- ✅ DELETE - para desactivar su propia cuenta. [Se require uid y jwt]

`/api/products`

- ⌛ patch para cambiar el stock del producto. [Solo cuando se complete una compra]

---

## endpoints públicos

- ✅ GET - para solicitar los productos. [Público pero controlado por cors]

## TODO

**_Token de autorización_**: 15 minutos de duración.<br>
**_Refresh token_**: 30 días de duración.

- Insertar refresh Token vía cookies con una duración de 30 días cada vez que el usuario se registre o inicie sesión.
- El frontend no debe guardar el token de autorización en el navegador (localStorage, sessionStorage, cookies).
- Cada vez que el frontend solicite acceder a un endpoint protegido debe enviar el token de autorización mediante los headers.
- Solo si el token de autorización ha expirado, se debe solicitar un nuevo token de autorización mediante el refresh token, enviandolo en una solicitud http al endpoint de refresh correspondiente, si el refresh token es válido, el servidor responderá con un nuevo token de autorización.
- Si el refresh token está vencido o no es válido, se debe solicitar al usuario volver a iniciar sesión para obtener un nuevo refresh token.
- Se debe crear un endpoint para el cierre de sesión.
- Cuando el frontend solicite acceder a ese endpoint(cierre de sesión), desde el backend se borrará la cookie que contiene el refresh token.
