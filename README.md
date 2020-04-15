# IxT & Technology 2 - Challenge 2
april 2020 - Dit is een project voor het vak IxT & Technology 2. 

## Inleiding
Het doel van deze opdracht is om de mars kolonisten terug naar aarde toe te sturen. Hiervoor moet een landingsysteem gemaakt worden. Met dit landsysteem moeten zij een geschikte plek kunnen vinden om daarna de omgeving onveilig te maken. 

## Werking 
De omgeving laat een map zien van de verschillende locaties waar ze naar toe kunnen gaan. Dit zijn London, Parijs en Berlijn. Wanneer ze daar geland zijn kunnen ze via dit systeem een restaurant uitzoek in één van deze steden. Wanneer ze op een restaurant in de linkerkolom klikken gaat de map naar deze locatie toe. Ze krijgen actuele informatie over locatie zoals de stad, datum, temperatuur en het soort weer (in de vorm van teks en een icon). 

Dit is gemaakt door gebruik te maken van twee API systemen namelijk: openweathermap en Mapbox. Deze twee API systemen werken ook samen in op deze website. Dit gebeurd doormiddel van de coordinaten die opgegeven van de verschillende locaties. Mapbox gebruikt deze coordinaten om een marker te plaatsen op de kaart. Open Weather map gebruikt deze coordinaten voor het actuele weer op deze locatie. Om te zorgen dat beiden API's de juiste coordinaten gebruiken wordt het object waarin de gegevens over het restaurant staat, gebruikt om juiste coordinaten op te halen voor open weather map. 

## Uitstraling 
De uistraling van het systeem komt overeen met deze van de vorige challenges. Wel ziet we website er anders uit. Ik heb er voor gekozen dat de website een andere layout heeft. Dit omdat het systeem maar 1 keer gebruikt hoeft te worden (bij het terugkeren naar aarde) en niet toegepast wordt tijdens het verblijf op mars. 

