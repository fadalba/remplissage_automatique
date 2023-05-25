#include <Servo.h>

// Déclaration des objets Servo pour chaque servomoteur
Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;

// Broches de commande des servomoteurs pour le bras gauche
int servoPin1 = 9;
int servoPin2 = 10;

// Broches de commande des servomoteurs pour le bras droit
int servoPin3 = 11;
int servoPin4 = 12;

// Positions initiales des servomoteurs
int pos1 = 90;
int pos2 = 90;
int pos3 = 90;
int pos4 = 90;

void setup() {
  // Attache les servomoteurs aux broches de commande pour le bras gauche
  servo1.attach(servoPin1);
  servo2.attach(servoPin2);

  // Attache les servomoteurs aux broches de commande pour le bras droit
  servo3.attach(servoPin3);
  servo4.attach(servoPin4);

  // Définit les positions initiales des servomoteurs
  servo1.write(pos1);
  delay(1000);
  servo2.write(pos2);
  delay(1000);
  servo3.write(pos3);
  delay(1000);
  servo4.write(pos4);

 
}

void loop() {
  for (int angle = 90; angle >= 0; angle--) {
    servo1.write(angle);
    delay(15); // Attendre un court instant pour que le servomoteur atteigne la position désirée
  }
  delay(2000);
    for (int angle = 90; angle >= 35; angle--) {
    servo2.write(angle);
    delay(15); // Attendre un court instant pour que le servomoteur atteigne la position désirée
  }
    delay(2000);
     for (int angle = 90; angle >= 0; angle--) {
    servo3.write(angle);
    servo4.write(angle);
    delay(15); // Attendre un court instant pour que le servomoteur atteigne la position désirée
  }  
  delay(2000);
    for (int angle = 35; angle <= 90; angle++) {
    servo2.write(angle);
    delay(15); // Attendre un court instant pour que le servomoteur atteigne la position désirée
  }
      delay(2000);
    for (int angle = 0; angle <= 180; angle++) {
    servo1.write(angle);
    delay(15); // Attendre un court instant pour que le servomoteur atteigne la position désirée
  }
    delay(2000);
    for (int angle = 90; angle >= 35; angle--) {
    servo2.write(angle);
    delay(15); // Attendre un court instant pour que le servomoteur atteigne la position désirée
  }
      delay(2000);
     for (int angle = 0; angle <= 90; angle++) {
    servo3.write(angle);
    servo4.write(angle);
    delay(15); // Attendre un court instant pour que le servomoteur atteigne la position désirée
  }  
  delay(2000);
    servo1.write(pos1);
  delay(1000);
  servo2.write(pos2);
  delay(1000);
  servo3.write(pos3);
  delay(1000);
  servo4.write(pos4);
  delay(5000);
}