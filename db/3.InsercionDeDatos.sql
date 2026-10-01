INSERT INTO administrador (identificador, usuario, contrasena)
VALUES (1, 'sabino007', '$2b$08$VOxe1gbgYEZJk1hmWitR9.PmuiNRAPvrRTP73cFDQhJgYFNc7h68W');

INSERT INTO moto
    (identificador, modelo, marca, categoria, cilindrada, precio, imagenlink, stock, descripcion)
VALUES
    (1, 'BROZZ-250', 'Power Motorcycle', 'Aventura', 250, 58999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/brozz-250.webp', 8, 'Motocicleta deportiva de 250 cc con diseño agresivo y buen rendimiento urbano.'),
    (2, 'FOX RS-250', 'Power Motorcycle', 'Deportiva', 250, 62999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/fox-rs-250-1.webp', 6, 'Motocicleta deportiva de 250 cc, ligera y orientada a una conducción dinámica.'),
    (3, 'NXR-250', 'Power Motorcycle', 'Aventura', 250, 64999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/nxr-250.webp', 5, 'Motocicleta multipropósito de 250 cc para ciudad y recorridos de aventura.'),
    (4, 'LIBERTY-200', 'Power Motorcycle', 'Deportiva', 200, 48999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/liberty-200.webp', 10, 'Scooter de 200 cc, práctico y cómodo para desplazamientos urbanos.'),
    (5, 'BIT-150', 'Power Motorcycle', 'Automaticas', 150, 37999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/bit-150.webp', 12, 'Motocicleta automática de 150 cc, económica y funcional para la ciudad.'),
    (6, 'CGL-150', 'Power Motorcycle', 'utilitarias', 150, 35999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/cgl-150.webp', 15, 'Motocicleta utilitaria de 150 cc para uso diario y trabajo.'),
    (7, 'CGL-150E', 'Power Motorcycle', 'utilitarias', 150, 36999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/cgl-150-e-1.webp', 9, 'Versión utilitaria de 150 cc con consumo eficiente y mantenimiento sencillo.'),
    (8, 'CB1-150', 'Power Motorcycle', 'utilitarias', 150, 38999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/cb1-150.webp', 7, 'Motocicleta automática de 150 cc, ágil para el tráfico urbano.'),
    (9, 'BLITZ-135', 'Power Motorcycle', 'Scoter', 135, 33999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/blitz-135.webp', 11, 'Motocicleta compacta de 135 cc para trayectos urbanos.'),
    (10, 'BIS-135', 'Power Motorcycle', 'Scoter', 135, 34999.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/bis-135.webp', 10, 'Scooter de 135 cc, maniobrable y eficiente para la movilidad diaria.');

SELECT setval(pg_get_serial_sequence('administrador', 'identificador'), COALESCE((SELECT MAX(identificador) FROM administrador), 1), true);
SELECT setval(pg_get_serial_sequence('moto', 'identificador'), COALESCE((SELECT MAX(identificador) FROM moto), 1), true);
