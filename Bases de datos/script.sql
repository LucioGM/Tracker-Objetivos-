CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(100),
    contraseña VARCHAR(100),
    fecha_registro DATE
);

CREATE TABLE Objetivo (
    id_objetivo INT PRIMARY KEY,
    id_usuario INT,
    titulo VARCHAR(100),
    descripcion VARCHAR(255),
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Hito (
    id_hito INT PRIMARY KEY,
    id_objetivo INT,
    fecha_estimada DATE,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    completado BOOLEAN,
    FOREIGN KEY (id_objetivo) REFERENCES Objetivo(id_objetivo)
);

CREATE TABLE Tarea (
    id_tarea INT PRIMARY KEY,
    id_hito INT,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    fecha_limite DATE,
    completado BOOLEAN,
    estado VARCHAR(50),
    FOREIGN KEY (id_hito) REFERENCES Hito(id_hito)
);

CREATE TABLE Registro_Progreso (
    id_registro INT PRIMARY KEY,
    id_objetivo INT,
    fecha DATE,
    progreso VARCHAR(100),
    comentarios VARCHAR(255),
    FOREIGN KEY (id_objetivo) REFERENCES Objetivo(id_objetivo)
);

CREATE TABLE Categoria (
    id_categoria INT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(255)
);

CREATE TABLE Recordatorio (
    id_recordatorio INT PRIMARY KEY,
    id_usuario INT,
    id_objetivo INT,
    mensaje VARCHAR(255),
    fecha_hora DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_objetivo) REFERENCES Objetivo(id_objetivo)
);
