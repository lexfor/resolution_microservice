CREATE TABLE IF NOT EXISTS resolutions (
id VARCHAR(255),
value VARCHAR(255),
delay INTEGER,
created_time VARCHAR(255),
patient_id VARCHAR(255),
doctor_name VARCHAR(255),
doctor_specialization VARCHAR(255),
PRIMARY KEY (id),
FOREIGN KEY (patient_id) REFERENCES patients(id));
