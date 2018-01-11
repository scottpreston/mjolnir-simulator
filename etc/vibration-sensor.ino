int vibr_Pin =3;

void setup(){
  pinMode(vibr_Pin, INPUT); //set vibr_Pin input for measurment
  Serial.begin(9600); //init serial 9600
  Serial.println("----------------------Vibration demo------------------------");
}
void loop(){
  long measurement =TP_init();
  delay(10);
  //Serial.print("measurment = ");
  Serial.print(measurement);
  Serial.println(",");
}

long TP_init(){
  long measurement=pulseIn (vibr_Pin, HIGH);  //wait for the pin to get HIGH and returns measurement
  return measurement;
}
