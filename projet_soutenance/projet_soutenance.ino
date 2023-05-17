
const int trigPin_presence = 10;
const int echoPin_presence = 11;
const int trigPin_remplissage = A0;
const int echoPin_remplissage = A1;
const int trigPin_bouchonnage = A2;
const int echoPin_bouchonnage = A3;
const int trigPin_compteur = A4;
const int echoPin_compteur = A5;

const int motorTapis = 9;
const int motorRotate = 5;
const int pin8 = 8;
int  D = 7;
int capteur4 = 12;
int capteurCompteur = LOW;
int Compteur = LOW;
int remiseazero = LOW;
int i = 0;
int ledBouchonnage = 2;
int ledTapis = 3;
int ledRemplissage = 4;
int ledCompteur = 12;
void setup(){

  pinMode(ledTapis, OUTPUT);
  pinMode(ledRemplissage, OUTPUT);
  pinMode(ledBouchonnage, OUTPUT);
  pinMode(ledCompteur, OUTPUT);

  pinMode(trigPin_presence, OUTPUT); 
  pinMode(echoPin_presence, INPUT);
  
  pinMode(trigPin_remplissage, OUTPUT); 
  pinMode(echoPin_remplissage, INPUT);

  pinMode(trigPin_bouchonnage, OUTPUT); 
  pinMode(echoPin_bouchonnage, INPUT);
  
  pinMode(trigPin_compteur, OUTPUT); 
  pinMode(echoPin_compteur, INPUT);

  pinMode(motorTapis, OUTPUT);
  pinMode(motorRotate, OUTPUT);
  pinMode(pin8, OUTPUT); // broche d'alimentation du relais
  pinMode(D,INPUT);
  pinMode(capteur4,INPUT); 
  Serial.begin(9600);

}

void loop(){
  Compteur = capteurCompteur;
  capteurCompteur = digitalRead(capteur4);
  remiseazero = digitalRead(D);
 
  long duration1, distance1;
  long duration2, distance2;
  long duration3, distance3;
  long duration4, distance4;


  // Lecture du capteur 1
  digitalWrite(trigPin_presence, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin_presence, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin_presence, LOW);
  duration1 = pulseIn(echoPin_presence, HIGH);
  distance1 = duration1 * 0.034 / 2;

  // Lecture du capteur 2
  digitalWrite(trigPin_remplissage, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin_remplissage, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin_remplissage, LOW);
  duration2 = pulseIn(echoPin_remplissage, HIGH);
  distance2 = duration2 * 0.034 / 2;

  // Lecture du capteur 3
  digitalWrite(trigPin_bouchonnage, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin_bouchonnage, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin_bouchonnage, LOW);
  duration3 = pulseIn(echoPin_bouchonnage, HIGH);
  distance3 = duration3 * 0.034 / 2;

  // Lecture du capteur 4
  digitalWrite(trigPin_compteur, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin_compteur, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin_compteur, LOW);
  duration4 = pulseIn(echoPin_compteur, HIGH);
  distance4 = duration4 * 0.034 / 2;

  // Affichage des résultats
  /*
  Serial.print("Distance Capteur 1: ");
  Serial.print(distance1);
  Serial.println(" cm");
  Serial.print("Distance Capteur 2: ");
  Serial.print(distance2);
  Serial.println(" cm");
  Serial.print("Distance Capteur 3: ");
  Serial.print(distance3);
  Serial.println(" cm");
  Serial.print("Distance Capteur 4: ");
  Serial.print(distance4);
  Serial.println(" cm");
*/
  delay(1000); // Délai entre les mesures
  
//INTERFACE APPLICATION WEB ******************
if (Serial.available() > 0) { // Si des données sont disponibles sur le port série
    static char etat = Serial.read();
  //Serial.print(etat, "/");
  //Serial.println(distance_presence);
 if(etat == '1'){
   while (etat != '2') {
      if(distance1 < 50){
    digitalWrite(ledTapis, HIGH);
    digitalWrite(motorTapis, HIGH);
    Serial.print(3);
    Serial.print("/");
    delay(2000);
      }
      if(distance2 < 50){
    digitalWrite(ledTapis, LOW);
    digitalWrite(motorTapis, LOW);
    digitalWrite(ledRemplissage, HIGH);
    Serial.print(4);
    Serial.print("/");
     delay(500);
    digitalWrite(pin8, HIGH); 
      delay(4000); //remplissage 50ml
    digitalWrite(pin8, LOW);
      delay(500);   
    digitalWrite(motorRotate, HIGH);
      }
      if(distance3 < 50){ 
    digitalWrite(motorRotate, LOW);
    digitalWrite(ledRemplissage, LOW);
    digitalWrite(ledBouchonnage, HIGH);
    Serial.print(5);
    Serial.print("/");
      delay(3000);//temps de bouchonnage par le moteurbouchonnage
    digitalWrite(motorRotate, HIGH);
      delay(500); 
    digitalWrite(ledBouchonnage, LOW);  
    digitalWrite(motorRotate, LOW);
   }
      if(distance4 < 50){
    digitalWrite(ledCompteur, HIGH);
         i++;
    //Serial.print("compteur en cours = ");   
    Serial.println(i);
    digitalWrite(ledCompteur, LOW);

    }
    
     if (Serial.available() > 0) {
          etat = Serial.read();
          
        }

   }

    }
    if(etat == '2'){
      i=0;
    Serial.println(i); 
    digitalWrite(ledTapis, LOW);
    digitalWrite(motorTapis, LOW);
    digitalWrite(ledRemplissage, LOW);
    digitalWrite(ledBouchonnage, LOW);
    digitalWrite(motorRotate, LOW);
    digitalWrite(ledCompteur, LOW);
    } 

//option1
    
      if (Serial.available() > 0) {
          etat = Serial.read();
       if(etat == '3'){
   while (etat != '2' && i<=1) {
      if(distance1 < 50){
    digitalWrite(ledTapis, HIGH);
    digitalWrite(motorTapis, HIGH);
    Serial.print(3);
    Serial.print("/");
      }
      if(distance2 < 50){
    digitalWrite(ledTapis, LOW);
    digitalWrite(motorTapis, LOW);
    digitalWrite(ledRemplissage, HIGH);
    Serial.print(4);
    Serial.print("/");
     delay(500);
    digitalWrite(pin8, HIGH); 
      delay(6000);//remplssage 100ml
    digitalWrite(pin8, LOW);
      delay(500);   
    digitalWrite(motorRotate, HIGH);
      }
      if(distance3 < 50){ 
    digitalWrite(motorRotate, LOW);
    digitalWrite(ledRemplissage, LOW);
    digitalWrite(ledBouchonnage, HIGH);
    Serial.print(5);
    Serial.print("/");
      delay(3000);//temps de bouchonnage par le moteurbouchonnage
    digitalWrite(motorRotate, HIGH);
      delay(500); 
    digitalWrite(ledBouchonnage, LOW);  
    digitalWrite(motorRotate, LOW);
   }
      if(distance4 < 50){
    digitalWrite(ledCompteur, HIGH);
         i++;
    //Serial.print("compteur en cours = ");   
    Serial.println(i);
    digitalWrite(ledCompteur, LOW);

    }
    
     if (Serial.available() > 0) {
          etat = Serial.read();

        }
   }

    }
    //option2
    else if(etat == '4'){
 while (etat != '2' && i<=2) {
         if(distance1 < 50){
    digitalWrite(ledTapis, HIGH);
    digitalWrite(motorTapis, HIGH);
    Serial.print(3);
    Serial.print("/");
      }
      if(distance2 < 50){
    digitalWrite(ledTapis, LOW);
    digitalWrite(motorTapis, LOW);
    digitalWrite(ledRemplissage, HIGH);
    Serial.print(4);
    Serial.print("/");
     delay(500);
    digitalWrite(pin8, HIGH); 
      delay(8000); //remplissage 200ml
    digitalWrite(pin8, LOW);
      delay(500);   
    digitalWrite(motorRotate, HIGH);
      }
      if(distance3 < 50){ 
    digitalWrite(motorRotate, LOW);
    digitalWrite(ledRemplissage, LOW);
    digitalWrite(ledBouchonnage, HIGH);
    Serial.print(5);
    Serial.print("/");
      delay(3000);//temps de bouchonnage par le moteurbouchonnage
    digitalWrite(motorRotate, HIGH);
      delay(500); 
    digitalWrite(ledBouchonnage, LOW);  
    digitalWrite(motorRotate, LOW);
   }
      if(distance4 < 50){
    digitalWrite(ledCompteur, HIGH);
         i++;
    //Serial.print("compteur en cours = ");   
    Serial.println(i);
    digitalWrite(ledCompteur, LOW);

    }
   }
   }else if(etat == '1'){
 while (etat != '2') {
         if(distance1 < 50){
    digitalWrite(ledTapis, HIGH);
    digitalWrite(motorTapis, HIGH);
    Serial.print(3);
    Serial.print("/");
      }
      if(distance2 < 50){
    digitalWrite(ledTapis, LOW);
    digitalWrite(motorTapis, LOW);
    digitalWrite(ledRemplissage, HIGH);
    Serial.print(4);
    Serial.print("/");
     delay(500);
    digitalWrite(pin8, HIGH); 
      delay(5000);
    digitalWrite(pin8, LOW);
      delay(500);   
    digitalWrite(motorRotate, HIGH);
      }
      if(distance3 < 50){ 
    digitalWrite(motorRotate, LOW);
    digitalWrite(ledRemplissage, LOW);
    digitalWrite(ledBouchonnage, HIGH);
    Serial.print(5);
    Serial.print("/");
      delay(3000);//temps de bouchonnage par le moteurbouchonnage
    digitalWrite(motorRotate, HIGH);
      delay(500); 
    digitalWrite(ledBouchonnage, LOW);  
    digitalWrite(motorRotate, LOW);
   }
      if(distance4 < 50){
    digitalWrite(ledCompteur, HIGH);
         i++;
    //Serial.print("compteur en cours = ");   
    Serial.println(i);
    digitalWrite(ledCompteur, LOW);

    }
       if (Serial.available() > 0) {
          etat = Serial.read();

        } 
    }
   }
    if(etat == '2'){
      i=0;
    Serial.println(i); 
    digitalWrite(ledTapis, LOW);
    digitalWrite(motorTapis, LOW);
    digitalWrite(ledRemplissage, LOW);
    digitalWrite(ledBouchonnage, LOW);
    digitalWrite(motorRotate, LOW);
    digitalWrite(ledCompteur, LOW);
    }
          if (Serial.available() > 0) {
          etat = Serial.read();
        }
    
    
        
      
    } 
     
    
}

}
