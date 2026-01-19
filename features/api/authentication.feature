# language: es
Característica: Autenticación de usuarios vía API
  Como sistema
  Quiero poder autenticar usuarios a través de la API de DummyJSON
  Para validar credenciales y obtener tokens de acceso

  Escenario: Autenticación exitosa con usuario 1
    Dado que tengo las credenciales del usuario "emilys"
    Cuando envío una solicitud POST a "/auth/login" con las credenciales
    Entonces la respuesta debe tener código de estado 200
    Y la respuesta debe contener un token de acceso
    Y la respuesta debe cumplir con el esquema de login

  Escenario: Autenticación exitosa con usuario 2
    Dado que tengo las credenciales del usuario "michaelw"
    Cuando envío una solicitud POST a "/auth/login" con las credenciales
    Entonces la respuesta debe tener código de estado 200
    Y la respuesta debe contener un token de acceso
    Y la respuesta debe cumplir con el esquema de login

  Escenario: Autenticación exitosa con usuario 3
    Dado que tengo las credenciales del usuario "sophiab"
    Cuando envío una solicitud POST a "/auth/login" con las credenciales
    Entonces la respuesta debe tener código de estado 200
    Y la respuesta debe contener un token de acceso
    Y la respuesta debe cumplir con el esquema de login

  Escenario: Validación de contrato del servicio de login
    Dado que tengo las credenciales del usuario "emilys"
    Cuando envío una solicitud POST a "/auth/login" con las credenciales
    Entonces la respuesta debe cumplir con el esquema de login
    Y la respuesta debe contener los siguientes campos:
      | campo        |
      | id           |
      | username     |
      | email        |
      | firstName    |
      | lastName     |
      | gender       |
      | image        |
      | accessToken  |
      | refreshToken |

  Escenario: Flujo completo de API - Autenticar, listar usuarios y consultar usuario autenticado
    Dado que tengo las credenciales del usuario "emilys"
    Cuando envío una solicitud POST a "/auth/login" con las credenciales
    Y guardo el token de acceso
    Y envío una solicitud GET a "/users" con el token de autenticación
    Entonces la respuesta debe tener código de estado 200
    Y la respuesta debe contener una lista de usuarios
    Cuando envío una solicitud GET a "/auth/me" con el token de autenticación
    Entonces la respuesta debe tener código de estado 200
    Y la respuesta debe contener los datos del usuario autenticado "emilys"
