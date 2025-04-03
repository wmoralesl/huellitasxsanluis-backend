# huellitasxsanluis-backend
Backend para la aplicacion web de Huellitas por San Luis; una organización dedicada a ayudar a perros y gatos en situación de calle

## Organizacion de Endpoints REST


### 1. Autenticación (/Auth)
|Método|Endpoint|Descripción|
|------|--------|-----------|
|`POST`|`/api/auth/register`| Registra un nuevo usuario |
|`POST`|`/api/auth/login`| Iniciar sesión y recibir un token|
|`POST`|`/api/auth/logout`| Cerrar Sesión (Revoca token)|
|`GET`|`/api/auth/me`|Obtiene la informacion del usuario autenticado|

### 2. Usuarios (/users)
|Método|Endpoint|Descripción|
|------|--------|-----------|
|`GET`|`/api/users`| Obtiene listado de usuarios (admin) |
|`GET`|`/api/users/{user_id}`| Obtener detalle de un usuario|
|`PUT`|`/api/users/{user_id}`| Actualiza un usuario |
|`DELETE`|`/api/users/{user_id}`| Elimina(is_active=False) un usuario (admin)|

### 3. Mascotas (/animals)
|Método|Endpoint|Descripción|
|------|--------|-----------|
|`GET`|`/api/animals`| Obtiene listado de las mascotas |
|`GET`|`/api/animals/{animal_id}`| Obtener detalle de una mascota|
|`POST`|`/api/animals/`| Registra una nueva mascota (autenticado) |
|`PUT`|`/api/animals/{animal_id}`| Actualiza una mascota |
|`DELETE`|`/api/animals/{animal_id}`| Elimina(is_active=False) una mascota (admin)|
