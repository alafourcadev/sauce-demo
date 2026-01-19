# 🚀 Proyecto de Automatización E2E + API - SauceDemo

**Diplomado en Automatización Inteligente de Pruebas de Software**
**Consultor:** Michael Andres Peña Gonzalez
**Estudiante:** Alejandro Lafourcade
**Reto:** Fundamentos QA para la Automatización

---

## 📋 Descripción del Proyecto

Este proyecto implementa una suite de pruebas automatizadas que combina:

- ✅ **Pruebas E2E (End-to-End)** para la aplicación SauceDemo
- ✅ **Pruebas de API** usando DummyJSON
- ✅ **Patrón de diseño Screenplay** para arquitectura de pruebas
- ✅ **BDD con Cucumber** para escenarios en español
- ✅ **CI/CD con GitHub Actions** para ejecución automática
- ✅ **Playwright** como framework de automatización

---

## 🏗️ Arquitectura del Proyecto

### Patrón Screenplay

El proyecto implementa el **Screenplay Pattern**, que separa las pruebas en:

```
Screenplay Pattern
├── Actors (Quién realiza la acción)
│   └── Actor.ts
├── Abilities (Qué puede hacer)
│   ├── BrowseTheWeb.ts
│   └── CallAnAPI.ts
├── Interactions (Acciones básicas)
│   ├── Navigate.ts
│   ├── Click.ts
│   ├── Fill.ts
│   └── SendRequest.ts
├── Tasks (Tareas de negocio)
│   ├── Login.ts
│   ├── AddProductToCart.ts
│   ├── CompleteCheckout.ts
│   └── AuthenticateAPI.ts
└── Questions (Validaciones)
    ├── Text.ts
    └── Response.ts
```

### Estructura de Carpetas

```
.
├── .github/
│   └── workflows/
│       └── run-tests.yml          # Pipeline CI/CD
├── features/
│   ├── e2e/
│   │   └── purchase.feature       # Escenarios E2E
│   ├── api/
│   │   └── authentication.feature # Escenarios API
│   └── step_definitions/
│       ├── e2e.steps.ts          # Steps E2E
│       └── api.steps.ts          # Steps API
├── src/
│   ├── screenplay/               # Patrón Screenplay
│   │   ├── abilities/
│   │   ├── actors/
│   │   ├── interactions/
│   │   ├── questions/
│   │   └── tasks/
│   ├── pages/                    # Page Objects
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── api/                      # API Testing
│   │   ├── endpoints/
│   │   └── schemas/
│   │       ├── LoginSchema.ts
│   │       └── UserSchema.ts
│   └── utils/
│       └── config.ts
├── reports/                      # Reportes generados
├── .env                          # Variables de entorno
├── .env.example                  # Plantilla de variables
├── package.json
├── tsconfig.json
├── cucumber.js
├── playwright.config.ts
└── README.md
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 20.x | Runtime de JavaScript |
| **TypeScript** | 5.3+ | Tipado estático |
| **Playwright** | 1.41+ | Automatización web y API |
| **Cucumber** | 10.3+ | BDD - Gherkin |
| **Ajv** | 8.12+ | Validación de esquemas JSON |
| **GitHub Actions** | - | CI/CD |

---

## 📦 Instalación

### Prerrequisitos

- Node.js 20.x o superior
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd "Reto 3 Alejandro Lafourcade"
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright:**
   ```bash
   npx playwright install chromium
   ```

4. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

---

## ▶️ Ejecución de Pruebas

### Ejecución Local

#### Todas las pruebas:
```bash
npm test
```

#### Solo pruebas E2E:
```bash
npm run test:e2e
```

#### Solo pruebas de API:
```bash
npm run test:api
```

#### Generar reporte HTML y JSON:
```bash
npm run test:report
```

### Ejecución en CI/CD

Las pruebas se ejecutan automáticamente en GitHub Actions cuando:
- Se hace push a las ramas `main` o `master`
- Se crea un Pull Request
- Se ejecuta manualmente desde la UI de GitHub Actions

---

## 📊 Escenarios de Prueba

### Pruebas E2E (SauceDemo)

#### ✅ Escenario 1: Camino Feliz - Compra Exitosa
```gherkin
Escenario: Camino feliz - Compra exitosa de un producto
  Dado que el usuario está en la página de login de SauceDemo
  Cuando el usuario inicia sesión con credenciales válidas
  Y el usuario agrega "sauce-labs-backpack" al carrito
  Y el usuario completa el checkout con los datos:
    | firstName | lastName | postalCode |
    | John      | Doe      | 12345      |
  Entonces el usuario debe ver el mensaje de confirmación "Thank you for your order!"
```

#### ❌ Escenario 2: Negativo - Login Fallido
```gherkin
Escenario: Negativo - Login fallido con usuario bloqueado
  Dado que el usuario está en la página de login de SauceDemo
  Cuando el usuario intenta iniciar sesión con usuario "locked_out_user" y contraseña "secret_sauce"
  Entonces el usuario debe ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."
```

#### 🛒 Escenario 3: Múltiples Productos
```gherkin
Escenario: Agregar múltiples productos al carrito y verificar el contador
  Dado que el usuario está en la página de login de SauceDemo
  Cuando el usuario inicia sesión con credenciales válidas
  Y el usuario agrega "sauce-labs-backpack" al carrito
  Y el usuario agrega "sauce-labs-bike-light" al carrito
  Y el usuario agrega "sauce-labs-bolt-t-shirt" al carrito
  Entonces el contador del carrito debe mostrar "3" productos
```

### Pruebas de API (DummyJSON)

#### 🔐 Pruebas de Autenticación
- Autenticación exitosa con 3 usuarios diferentes
- Validación de código de estado 200
- Validación de estructura del token

#### 📋 Pruebas de Contrato
- Validación del esquema JSON de respuesta
- Verificación de campos obligatorios:
  - id, username, email
  - firstName, lastName, gender
  - image, token, refreshToken

#### 🔄 Flujo Completo de API
```gherkin
Escenario: Flujo completo de API
  1. Autenticar usuario
  2. Guardar token de acceso
  3. Listar todos los usuarios
  4. Consultar datos del usuario autenticado
```

---

## 📈 Reportes

Los reportes se generan en la carpeta `reports/`:

- **cucumber-report.html**: Reporte HTML interactivo
- **cucumber-report.json**: Reporte JSON para procesamiento
- **Screenshots**: Capturas en caso de fallo (solo en CI)
- **Videos**: Videos de ejecución (solo en CI)

### Ver Reporte Local

Después de ejecutar las pruebas:
```bash
open reports/cucumber-report.html
```

---

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# SauceDemo Credentials
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
SAUCE_USERNAME_LOCKED=locked_out_user
SAUCE_USERNAME_PROBLEM=problem_user

# DummyJSON API
API_BASE_URL=https://dummyjson.com
API_USER1_USERNAME=emilys
API_USER1_PASSWORD=emilyspass
API_USER2_USERNAME=michaelw
API_USER2_PASSWORD=michaelwpass
API_USER3_USERNAME=sophiab
API_USER3_PASSWORD=sophiabpass

# Test Configuration
HEADLESS=false
TIMEOUT=30000
```

---

## 🎯 Cobertura de Requisitos

### Diseño de Arquitectura (25 puntos) ✅
- ✅ Patrón Screenplay implementado
- ✅ Separación clara entre lógica de negocio y pasos BDD
- ✅ Configuración de entorno (.env) con credenciales

### Escenarios BDD (25 puntos) ✅
- ✅ Escenario 1: Camino feliz - Compra completa
- ✅ Escenario 2: Negativo - Login fallido
- ✅ Escenario 3: Múltiples productos al carrito

### Pruebas de API (25 puntos) ✅
- ✅ POST /login con 3 usuarios (validación código 200 y token)
- ✅ Pruebas de contrato del servicio (esquema JSON)
- ✅ Flujo completo: list Users → Token → consulta usuario autenticado
- ✅ Implementado con Playwright APIRequestContext (TypeScript)

### CI/CD GitHub Actions (20 puntos) ✅
- ✅ Archivo `.github/workflows/run-tests.yml`
- ✅ Ejecución automática en push a main/master
- ✅ Ejecución manual desde UI de GitHub Actions
- ✅ Instalación de dependencias y ejecución de pruebas
- ✅ Generación y publicación de reportes

### Ejecución y Evidencias (5 puntos) ✅
- ✅ Ejecución local documentada
- ✅ README.md con instrucciones completas
- ✅ Documentación de herramientas utilizadas
- ✅ Descripción de escenarios cubiertos

---

## 👥 Autor

**Alejandro Lafourcade**
Diplomado en Automatización Inteligente de Pruebas de Software

**Consultor:**
Michael Andres Peña Gonzalez

---

## 📝 Notas Adicionales

### Buenas Prácticas Implementadas

1. **Patrón Screenplay**: Separa responsabilidades y facilita mantenimiento
2. **BDD en Español**: Escenarios legibles para stakeholders
3. **Type Safety**: TypeScript para prevenir errores
4. **Page Objects**: Centralizan selectores y evitan duplicación
5. **Validación de Esquemas**: Aseguran contratos de API
6. **CI/CD**: Ejecución automática y reportes en cada commit
7. **Variables de Entorno**: Configuración flexible sin hardcoding

### Próximas Mejoras Sugeridas

- [ ] Integración con Allure Reports
- [ ] Pruebas de performance con k6
- [ ] Pruebas de accesibilidad
- [ ] Ejecución paralela de escenarios
- [ ] Docker para ejecución aislada

---

## 📞 Soporte

Para preguntas o problemas:
1. Revisar la documentación en este README
2. Verificar los logs de GitHub Actions
3. Contactar al consultor del diplomado

---

**¡Gracias por revisar este proyecto!** 🎉
