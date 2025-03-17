# Consultas e Índices en MongoDB

Este proyecto utiliza MongoDB para gestionar transacciones y optimizar el rendimiento de las consultas mediante el uso de índices. Este ejercicio nos da una idea más amplica sobre el impacto que tienen los indices para mejorar la eficiencia de las cosultas y hacer de nuestro trabajo mejor. Vamos a comparar y tener algunas concluciones sobre el uso de estos indices y si mejora o no nuestra consulta. Debemos resaltar que muchas veces no hace buen uso de estos indices así que debemos tener en cuenta y ser muy certeros a la hora de implementarlos en nuestras consutas.
### 1. Consulta: `MontoCategoriaFecha`

**Descripción:**  
Esta consulta busca transacciones cuyo monto esté entre 1000 y 5000, y cuya categoría sea "Electrónica". Además, las transacciones se ordenan por la fecha de la transacción en orden descendente.

Consulta 1.
![consulta1](/assets/evidencia/consulta1.png)


### 2. Consulta: `DescuentoMetodoEstado`

**Descripción:**  
Esta consulta filtra transacciones que tienen un descuento mayor a 20, un método de pago "Tarjeta", y un estado de transacción "Completada".

Consulta 2.
![consulta2](/assets/evidencia/consulta2.png)



### 3. Consulta: `TopProductosPorFecha`

**Descripción:**  
Esta consulta obtiene los 5 productos más vendidos durante el año 2024. Filtra las transacciones por fecha, agrupa las transacciones por codigo_producto y suma las ocurrencias de cada producto.

Consulta 3.
![consulta3](/assets/evidencia/consulta3.png)


**Consultas sin inides Ejecutadas**


Consulta 1.
![sinIndices](/assets/sinIndices/1.png)

Consulta 2.
![sinIndices](/assets/sinIndices/2.png)

Consulta 3.
![sinIndices](/assets/sinIndices/3.png)


**Creacion de índice**

### Resumen de Índices Utilizados:

Indices Creados.
Consulta 3.
![crearIndices](/assets/crearIndices.png)
![crearIndices](/assets/evidencia/creacionIndexMongo.png)

1. **Índice en `fecha_transaccion`:**  

   - **Descripción:**  
     Este índice optimiza el filtrado y ordenamiento de las transacciones por fecha, especialmente en consultas que involucran rangos de fechas o requieren ordenamientos por fecha de transacción.

2. **Índice compuesto en `monto` y `categoria`:**  
    
   - **Descripción:**  
     Este índice permite realizar búsquedas rápidas cuando se filtra por `monto` y `categoria`, mejorando el rendimiento de las consultas que utilizan estos dos campos.

3. **Índice compuesto en `descuento_aplicado`, `metodo_pago` y `estado_transaccion`:**  

   - **Descripción:**  
     Este índice optimiza las consultas que filtran por los tres campos (`descuento_aplicado`, `metodo_pago`, `estado_transaccion`), siendo esencial para mejorar el rendimiento de la consulta `DescuentoMetodoEstado`.

4. **Índice en `fecha_transaccion` (Orden descendente):**  
    
   - **Descripción:**  
     Este índice optimiza el ordenamiento de las transacciones en orden descendente según la fecha de la transacción, útil para consultas que requieren el orden de los datos en esa dirección.

5. **Índice en `codigo_producto`:**  

   - **Descripción:**  
     Este índice mejora el rendimiento de las operaciones de agregación, especialmente en la consulta `TopProductosPorFecha`, al agrupar y contar las transacciones por producto.

6. **Índice de texto en `categoria`:**  

   - **Descripción:**  
     Este índice de texto permite realizar búsquedas de texto completo en el campo `categoria`, mejorando el rendimiento de las consultas que realizan búsquedas por categorías usando texto.

**Consultas con índice Ejecutadas**


Consulta 1.
![Consulta1](/assets/conIndices/1.png)

Consulta 2.
![Consulta2](/assets/conIndices/2.png)

Consulta 3.
![Consulta3](/assets/conIndices/3.png)


## Análisis del Impacto de los Índices

Se realizaron tres consultas con y sin índices, evaluando el tiempo de ejecución y el número de documentos examinados.

### **Resultados**
#### **Sin índices:**
1. `executionTimeMillis`: **165ms**, `totalDocsExamined`: **50,000**
2. `executionTimeMillis`: **38ms**, `totalDocsExamined`: **50,000**
3. `executionTimeMillis`: **41ms**, `totalDocsExamined`: **50,000**

#### **Con índices:**
1. `executionTimeMillis`: **9ms**, `totalKeysExamined`: **2,569**, `totalDocsExamined`: **2,482**
2. `executionTimeMillis`: **109ms**, `totalKeysExamined`: **50,000**, `totalDocsExamined`: **500,000**
3. `executionTimeMillis`: **8ms**, `totalKeysExamined`: **0**, `totalDocsExamined`: **0**

### **Conclusiones**

El uso de índices en MongoDB tuvo un impacto significativo en la eficiencia de las consultas. Sin índices, cada consulta examinó aproximadamente 50,000 documentos, lo que representaba una carga considerable para el motor de consulta. En contraste, con índices, la primera consulta solo examinó 2,482 documentos, reduciendo drásticamente el esfuerzo requerido y mejorando la velocidad y se logró un acceso más eficiente a los datos. Sin embargo, en el caso de la segunda consulta con índices, se examinaron 50,000 claves y 500,000 documentos, lo que evidencia que el índice utilizado no fue óptimo, ya que su eficiencia no alcanzó el nivel esperado. Esto se puede mejorar optimizando en un futuro los indices y saber cuando y cuando no usar los indices ya que estos en ves de mejorar relentizaran la consulta y no se lograra el objetivo el cual es la eficiencia de esta. Cabe recalcar que para ejemplos practicos dejamos asi ese indice para demostrar que debemos aprender a usar nuestros indices. 

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
