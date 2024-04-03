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

PUT http://localhost:3000/api/users/edit/46

{

	"firstName": "admin yudith",
	"lastName": null,
	"email": "admintyudith1@gmail.com",
	"isActive": true
	
}


● Creación de citas.

POST http://localhost:3000/api/cita/create

{
	"id": 41,
	"day_date": "2026-03-17T07:44:47.000Z",
	"description": "Cursus asporto corporis commodo super cenaculum.",
	"price": 8224,
	"Tatuador": 4,
	"Cliente": 13
}

● Editar citas.

PUT http://localhost:3000/api/cita/4

{
	"id": "4",
	"day_date": "2024-08-21T03:14:51.000Z",
	"description": "Subiungo volaticus aspernatur.",
	"price": "5026"
}


● Eliminación de citas

DELETE http://localhost:3000/api/cita/4

{
	"id": "4",
	"day_date": "2024-08-21T03:14:51.000Z",
	"description": "Subiungo volaticus aspernatur.",
	"price": "5026"
}

● Ver todas las citas que tengo como cliente (solo las propias).

GET http://localhost:3000/api/cita/cliente/cita

{
           
    "email": "Chase.Schimmel72@gmail.com",
    "password": "12345678"
                
 }


[
	{
		"id": 29,
		"day_date": "2025-01-05T07:24:50.000Z",
		"description": "Arma solium baiulus molestiae debilito vulnero veritas aperiam verto.",
		"price": 2982,
		"Tatuador": {
			"id": 4,
			"user": {
				"firstName": "Ursula",
				"email": "Natalie.Terry@gmail.com"
			}
		},
		"cliente": {
			"id": 1,
			"user": {
				"firstName": "Clement",
				"email": "Chase.Schimmel72@gmail.com"
			}
		}
	}
]

● Ver todas las citas existentes conmigo (role tatuador).

GET http://localhost:3000/api/cita/tatuador/cita

{
           
    "email": "Antonietta_Grady46@hotmail.com",
    "password": "12345678"
                
 }



[
	{
		"id": 1,
		"day_date": "2024-07-23T22:01:29.000Z",
		"description": "Confido ceno solus acsi adversus cruciamentum volva terminatio quisquam.",
		"price": 6320,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 18,
			"user": {
				"firstName": "Juvenal",
				"email": "Terrill_Barton@yahoo.com"
			}
		}
	},
	{
		"id": 2,
		"day_date": "2025-03-17T07:44:47.000Z",
		"description": "Cursus asporto corporis commodo super cenaculum.",
		"price": 8224,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 13,
			"user": {
				"firstName": "Kaleigh",
				"email": "Corine.Hintz48@hotmail.com"
			}
		}
	},
	{
		"id": 3,
		"day_date": "2024-09-12T20:39:10.000Z",
		"description": "Sortitus suadeo damno apparatus asper amissio.",
		"price": 4050,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 12,
			"user": {
				"firstName": "Emanuel",
				"email": "Sandra.Sanford17@yahoo.com"
			}
		}
	},
	{
		"id": 6,
		"day_date": "2024-08-21T01:11:56.000Z",
		"description": "Defleo ratione condico pecto virga aureus acsi.",
		"price": 2286,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 4,
			"user": {
				"firstName": "Hal",
				"email": "Cecelia_Becker@hotmail.com"
			}
		}
	},
	{
		"id": 11,
		"day_date": "2024-04-11T20:32:03.000Z",
		"description": "Cognomen volubilis cur fugit vesper degenero acer charisma canis cibus.",
		"price": 8852,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 39,
			"user": {
				"firstName": "Myron",
				"email": "Terence.Purdy@hotmail.com"
			}
		}
	},
	{
		"id": 12,
		"day_date": "2025-01-13T18:09:15.000Z",
		"description": "Capitulus vivo aliquam arguo crudelis.",
		"price": 2087,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 29,
			"user": {
				"firstName": "Madonna",
				"email": "Adeline.Haag35@hotmail.com"
			}
		}
	},
	{
		"id": 18,
		"day_date": "2024-06-29T14:46:21.000Z",
		"description": "Creta depromo tendo conitor cupiditate spiritus vilitas.",
		"price": 9195,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 32,
			"user": {
				"firstName": "Cierra",
				"email": "Devin_McLaughlin87@yahoo.com"
			}
		}
	},
	{
		"id": 32,
		"day_date": "2025-03-11T16:37:03.000Z",
		"description": "Commemoro cupio doloribus vigor recusandae.",
		"price": 7413,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 11,
			"user": {
				"firstName": "Lukas",
				"email": "Hector.Langosh89@yahoo.com"
			}
		}
	},
	{
		"id": 35,
		"day_date": "2025-02-08T11:16:40.000Z",
		"description": "Depraedor deinde validus peior tyrannus decimus conforto vesica vulticulus.",
		"price": 7002,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 28,
			"user": {
				"firstName": "Electa",
				"email": "Thalia.Kuhn@hotmail.com"
			}
		}
	},
	{
		"id": 37,
		"day_date": "2024-09-30T05:21:50.000Z",
		"description": "Veritas vereor capillus depraedor trans vitae coruscus decumbo.",
		"price": 4884,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 36,
			"user": {
				"firstName": "Gloria",
				"email": "Alvena62@yahoo.com"
			}
		}
	},
	{
		"id": 38,
		"day_date": "2024-06-16T10:49:50.000Z",
		"description": "Patria vapulus viriliter cum attero acies praesentium velociter corrigo.",
		"price": 9873,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 40,
			"user": {
				"firstName": "Lola",
				"email": "Arlie.Spinka@hotmail.com"
			}
		}
	},
	{
		"id": 39,
		"day_date": "2024-06-10T11:41:26.000Z",
		"description": "Cattus totam perspiciatis ancilla sulum earum.",
		"price": 2801,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 30,
			"user": {
				"firstName": "Hilton",
				"email": "Jared1@hotmail.com"
			}
		}
	},
	{
		"id": 40,
		"day_date": "2024-05-27T11:21:19.000Z",
		"description": "Solium utpote curtus caecus porro.",
		"price": 6440,
		"Tatuador": {
			"id": 1,
			"user": {
				"firstName": "Jamison",
				"email": "Antonietta_Grady46@hotmail.com"
			}
		},
		"cliente": {
			"id": 29,
			"user": {
				"firstName": "Madonna",
				"email": "Adeline.Haag35@hotmail.com"
			}
		}
	}
]


● Listar tatuadores


GET http://localhost:3000/api/tatuadores



## Endpoints