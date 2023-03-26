create database consultas_actividad5;
use consultas_actividad5;

create table consultas
(
	id int not null primary key auto_increment,
    autor varchar(255),
    titulo varchar(255),
    year int,
    fecha_ingreso date
);
