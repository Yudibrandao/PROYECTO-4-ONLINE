# BACKEND ESTUDIO DE TATUAJE

# OBEJTIVOS DEL PROYECTO
El proyecto fue elaborado para implementar por primera vez un Backend, el ojtivo principal es crear una API que administre las citas, horas de un estudio de tatuaje.

# TECNOLOGIAS UTILIZADAS 
<div alineacion ="center">

<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>

<a href="https://nodejs.org/en">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>

<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>

<a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=white">
</a>

 </div>



# VISTA VISUAL STUDIO CODE
![Imagen](/VisualCodeProyecto4.png)



# DIAGRAMA BACKEND  
![Imagen DB](/DiagramaTatto.png)


# ENDPOINTS DEL PROYECTO

● Registro de usuarios.

POST http://localhost:3000/api/users/create

{
                 "firstName": "admin yudith",
                 "email": "admintyudith1@gmail.com",
                 "password": "12345678",
                 "role": "ADMIN"
            }


● Login de usuarios.

POST http://localhost:3000/api/login

{
           
                 "email": "admintyudith1@gmail.com",
                 "password": "12345678"
                
            }


● Perfil de usuario.

GET http://localhost:3000/api/users/profile

{
	"id": 46,
	"firstName": "admin yudith",
	"lastName": null,
	"email": "admintyudith1@gmail.com",
	"isActive": true,
	"role": {
		"id": 1,
		"name": "admin"
	}
}


● Modificación de datos del perfil.



● Creación de citas.
● Editar citas.
● Eliminación de citas

● Ver todas las citas que tengo como cliente (solo las propias).
● Ver todas las citas existentes conmigo (role tatuador).
● Listar tatuadores

## Endpoints