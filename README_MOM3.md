### README för Blogg-applikation
Den här applikationen är en bloggplattform där användare kan logga in för att skapa, uppdatera och radera blogginlägg. Användare kan också läsa detaljerade blogginlägg. Applikationen använder React för frontend och en backend för hantering av användardata och bloggposter.

### Teknologier som används

Frontend: React (med hooks som useState, useEffect, useContext och useParams).

Backend: Node.js API som erbjuder autentisering och CRUD-operationer för bloggposter.

Routing: react-router-dom för att hantera navigering och skyddade sidor.

State Management: Context API för autentisering och hantering av användarens session.

### Funktioner

Inloggning: Användare kan logga in via ett formulär, och om autentiseringen lyckas, sparas en token i localStorage.

Skyddade sidor: Endast inloggade användare kan få åtkomst till sidor som till exempel adminpanelen.

CRUD för bloggposter: Användare med rätt behörighet kan skapa, uppdatera eller radera sina blogginlägg.

Visning av blogginlägg: Blogginlägg kan läsas av alla användare, och detaljer om varje inlägg visas inklusive författare, titel och beskrivning.

Tokenvalidering: Användartoken valideras vid varje sidladdning för att säkerställa att användaren fortfarande är inloggad.

### Installationsinstruktioner

För att köra denna applikation lokalt behöver du följande:

Klona projektet:

git clone https://github.com/BrodinGustav/dt210g_react_mom3.git

Installera beroenden: Gå till projektmappen och installera alla nödvändiga beroenden:

npm install

För att starta applikationen i utvecklingsläge:

npm start

Applikationen kommer att vara tillgänglig på http://localhost:3000.

### Funktionalitet och Arkitektur

## Komponenter:

BlogPostDetail: Hämtar och visar ett specifikt blogginlägg baserat på ett ID från URL:en. Om inlägget inte kan hämtas eller om användaren inte har en giltig token, visas ett felmeddelande.

Header: Visar navigeringen för applikationen, inklusive länk till startsidan, adminpanel, och en logga ut-knapp om användaren är inloggad.

Layout: Wrapper-komponent som håller Header, renderar barnkomponenter och lägger till sidfot.

ProtectedRoute: En wrapper-komponent som skyddar sidor som kräver autentisering. Om användaren inte är inloggad omdirigeras de till login-sidan.

AuthContext: Hanterar autentisering av användare och lagrar information om den aktuella användaren och token. Den tillhandahåller också funktioner för att logga in och logga ut.

### Tjänster (Services):

bloggServices: Innehåller funktioner för att skapa, uppdatera och radera blogginlägg genom att anropa backend API:t. Alla funktioner kräver att användaren är autentiserad (via en giltig token).

publicContext: Innehåller funktioner för att hämta alla bloggposter och presentera dem för användaren.

### Typer:
authTypes: Definierar typer för användardata, inloggningsuppgifter och autentiseringens svar från backend.

public.types: Definierar typer för blogginlägg, inklusive titel, beskrivning, skapad datum och författarinformation.

### Routing
Applikationen använder react-router-dom för att definiera olika sidor och navigering:

/ - Startsidan, där alla bloggposter listas.

/admin - Adminpanel där användare kan skapa, uppdatera och radera bloggposter. Denna ruta är skyddad av ProtectedRoute och kräver att användaren är inloggad.

/login - Inloggningssidan där användare kan logga in för att få åtkomst till skyddade sidor.

/blog/:id - Detaljsidan för ett specifikt blogginlägg.

### För att använda applikationen

Logga in: För att skapa, uppdatera eller ta bort inlägg måste användaren logga in. Användarens autentisering sker med en email och ett lösenord.

Skapa ett blogginlägg: Som inloggad användare kan du skapa nya inlägg genom att fylla i ett formulär i adminpanelen.

Visa och hantera inlägg: Alla användare kan läsa blogginlägg, men endast inloggade användare kan skapa, uppdatera eller ta bort sina egna inlägg.

Logga ut: Användare kan logga ut från applikationen via en knapp i Header-komponenten.

### API och Backend
Applikationen interagerar med ett backend API som hanterar autentisering och CRUD-operationer för bloggposter. API:et erbjuder följande slutpunkter:

/api/auth/login: POST-förfrågan för att logga in och få en token.

/api/validate: GET-förfrågan för att validera om en användartoken är giltig.

/api/blogg: GET-förfrågan för att hämta alla blogginlägg och POST-förfrågan för att skapa ett nytt inlägg.

/api/blogg/:id: PUT-förfrågan för att uppdatera ett inlägg och DELETE-förfrågan för att ta bort ett inlägg.


Applikationens frontend finns uppladgt via Netlify kopplad till applikationens backend via Render

### URL Netlify
https://dt210gmom3.netlify.app/