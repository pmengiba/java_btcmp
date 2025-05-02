-- Todas las tablas
CREATE TABLE clientes (
  membresia INTEGER PRIMARY KEY,
  nombre_completo TEXT NOT NULL,
  fecha_nacimiento DATE,
  direccion TEXT,
  telefono INTEGER,
  fecha_inscripcion DATE NOT NULL
);

CREATE TABLE entrenadores (
  id_entrenador INTEGER PRIMARY KEY,
  nombre_completo TEXT NOT NULL,
  experiencia_años INTEGER,
  horario_disponible TEXT
);

CREATE TABLE disciplinas (
  id_disciplina INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  type_id INTEGER REFERENCES disciplina_types(id)
);

CREATE TABLE eventos (
  id_evento INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  lugar TEXT NOT NULL,
  id_disciplina INTEGER REFERENCES disciplinas(id_disciplina),
  id_ganador INTEGER REFERENCES clientes(membresia)
);

CREATE TABLE fact_pagos_recibidos (
  id_pago INTEGER PRIMARY KEY,
  fecha DATE NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  status_id INTEGER NOT NULL REFERENCES pago_status(id),
  membresia INTEGER NOT NULL REFERENCES clientes(membresia)
);

CREATE TABLE socio_disciplina (
  id INTEGER PRIMARY KEY,
  membresia INTEGER NOT NULL REFERENCES clientes(membresia),
  id_disciplina INTEGER NOT NULL REFERENCES disciplinas(id_disciplina),
  UNIQUE(membresia, id_disciplina)
);

CREATE TABLE entrenador_disciplina (
  id INTEGER PRIMARY KEY,
  id_entrenador INTEGER NOT NULL REFERENCES entrenadores(id_entrenador),
  id_disciplina INTEGER NOT NULL REFERENCES disciplinas(id_disciplina),
  UNIQUE(id_entrenador, id_disciplina)
);

CREATE TABLE participacion_evento (
  id INTEGER PRIMARY KEY,
  id_evento INTEGER NOT NULL REFERENCES eventos(id_evento),
  membresia INTEGER NOT NULL REFERENCES clientes(membresia),
  UNIQUE(id_evento, membresia)
);

-- Socios por cada disciplina disciplina
SELECT c.nombre_completo, d.nombre as disciplina 
FROM clientes c
JOIN socio_disciplina sd ON c.membresia = sd.membresia
JOIN disciplinas d ON sd.id_disciplina = d.id_disciplina;

-- Eventos futuros
SELECT e.nombre, e.fecha, e.hora, d.nombre as disciplina
FROM eventos e
JOIN disciplinas d ON e.id_disciplina = d.id_disciplina
WHERE e.fecha > date('now');

-- Pagos pendientes
SELECT c.membresia, c.nombre_completo, p.fecha, p.monto
FROM fact_pagos_recibidos p
JOIN clientes c ON p.membresia = c.membresia
WHERE p.status_id = 2;

CREATE INDEX idx_cliente_nombre ON clientes(nombre_completo);
CREATE INDEX idx_evento_fecha ON eventos(fecha);