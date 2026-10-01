export const categorias = ['Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias'] as const;
export type Categoria = (typeof categorias)[number];

export type Moto = {
  identificador: number;
  modelo: string;
  marca: string;
  categoria: Categoria;
  cilindrada: number;
  precio: number;
  imagenLink: string;
  stock: number;
  descripcion: string;
};
