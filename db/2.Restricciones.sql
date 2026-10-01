\connect "catalogoMotos"

ALTER TABLE administrador
    ALTER COLUMN identificador SET NOT NULL;

ALTER TABLE administrador
    ADD CONSTRAINT chk_administrador_usuario_longitud CHECK (CHAR_LENGTH(usuario) <= 15),
    ADD CONSTRAINT chk_administrador_contrasena_longitud CHECK (CHAR_LENGTH(contrasena) <= 60);

ALTER TABLE administrador
    ADD CONSTRAINT pk_administrador PRIMARY KEY (identificador);

ALTER TABLE moto
    ALTER COLUMN identificador SET NOT NULL;

ALTER TABLE moto
    ADD CONSTRAINT chk_moto_marca CHECK (marca = 'Power Motorcycle'),
    ADD CONSTRAINT chk_moto_categoria CHECK (categoria IN ('Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias')),
    ADD CONSTRAINT chk_moto_cilindrada_no_negativa CHECK (cilindrada >= 0),
    ADD CONSTRAINT chk_moto_precio_no_negativo CHECK (precio >= 0),
    ADD CONSTRAINT chk_moto_stock_no_negativo CHECK (stock >= 0);

ALTER TABLE moto
    ADD CONSTRAINT pk_moto PRIMARY KEY (identificador);

ALTER TABLE moto
    ALTER COLUMN marca SET DEFAULT 'Power Motorcycle',
    ALTER COLUMN stock SET DEFAULT 0;
