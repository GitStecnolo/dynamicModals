# Blog Dinámico con Modal y Carrusel

Este proyecto es un blog dinámico simple con entradas de blog generadas a partir de datos JSON. Cada entrada de blog tiene un modal asociado que muestra un carrusel de imágenes.

## Características

- Generación dinámica de entradas de blog a partir de datos JSON
- Modal con carrusel de imágenes para cada entrada de blog
- Diseño responsivo utilizando Bootstrap 5
- Opciones para descargar y ver imágenes en tamaño completo

## Cómo usar

1. Clona este repositorio
2. Configura `js/dynamicModals.js`
   const config = {
   autoplay: true, // Inicia el cambio de diapositivas dinámicamente
   showIndicators: true, // Muestra los indicadores de posición de la diapositiva.
   useCrossFade: true, // Usar el slide por defecto o cambiar a Crossfade.
   includeDownload: false, // Muestra un botón para descargar la imagen.
   includeView: true, // Muestra un botón para ver la imagencompleta en otra página.
   horizontalBlogDisplay: true, // Muestra la el blog en tarjetas horizontales o verticales.
   };

3. Cambia los valores en `css/dynamicModals.css` según tus preferencias.
4. Abre `index.html` en tu navegador
5. ¡Disfruta del blog!

Para modificar las entradas del blog, edita el array `data-blog-posts` en el archivo `index.html`.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.3
- Bootstrap Icons 1.7.2

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios mayores antes de crear un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Créditos

Este proyecto fue creado en colaboración con Claude, un modelo de lenguaje de IA desarrollado por Anthropic.
