# language: es
Característica: Compra de productos en SauceDemo
  Como usuario de SauceDemo
  Quiero poder comprar productos
  Para completar mis compras de manera exitosa

  Escenario: Camino feliz - Compra exitosa de un producto
    Dado que el usuario está en la página de login de SauceDemo
    Cuando el usuario inicia sesión con credenciales válidas
    Y el usuario agrega "sauce-labs-backpack" al carrito
    Y el usuario completa el checkout con los datos:
      | firstName | lastName  | postalCode |
      | John      | Doe       | 12345      |
    Entonces el usuario debe ver el mensaje de confirmación "Thank you for your order!"

  Escenario: Negativo - Login fallido con usuario bloqueado
    Dado que el usuario está en la página de login de SauceDemo
    Cuando el usuario intenta iniciar sesión con usuario "locked_out_user" y contraseña "secret_sauce"
    Entonces el usuario debe ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."

  Escenario: Agregar múltiples productos al carrito y verificar el contador
    Dado que el usuario está en la página de login de SauceDemo
    Cuando el usuario inicia sesión con credenciales válidas
    Y el usuario agrega "sauce-labs-backpack" al carrito
    Y el usuario agrega "sauce-labs-bike-light" al carrito
    Y el usuario agrega "sauce-labs-bolt-t-shirt" al carrito
    Entonces el contador del carrito debe mostrar "3" productos
