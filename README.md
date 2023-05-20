# **E-commerce API**

## Endpoints para el super administrador

`/api/admin`

- ✅ GET - para solicitar los usuarios registrados. [Se require jwt y rol de super administrador]
- ⌛ POST - para crear usuarios con privilegios. [Se require jwt y rol de super administrador]
- ⌛ PATCH - para modificar datos de cualquier usuario. [Se require jwt y rol de super administrador]
- ⌛ DELETE - para borrar cualquier usuario. [Se require jwt y rol de super administrador]

---

## Endpoints para administradores

`/api/products`

- ✅ POST - para crear productos. [Se require jwt y rol de administrador]
- ⏳ PATCH - para modificar productos. [Se require jwt y rol de administrador]
- ✅ DELETE - para eliminar productos. [Se require jwt y rol de administrador]

---

## Endpoints para usuarios

`/api/users`

- ⏳ GET - para solicitar sus propios datos. [Se require uid y jwt]
- ✅ POST - para registrarse en la aplicación.
- ✅ PATCH - para cambiar su propia contraseña. [Se require uid y jwt]
- ✅ DELETE - para desactivar su propia cuenta. [Se require uid y jwt]

`/api/products`

- ⌛ patch para cambiar el stock del producto. [Solo cuando se complete una compra]

---

## endpoints públicos

- ✅ GET - para solicitar los productos. [Público pero controlado por cors]
