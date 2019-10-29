<?php
    include('database.php');

    $consulta = "SELECT producto.id_product as id_product, producto.nombre_producto as nombre_producto, categoria.nombre_categoria as id_categoria, producto.entregado as entregado FROM producto inner join categoria on categoria.id_categoria = producto.id_categoria ORDER BY producto.id_product";
    $resultado = mysqli_query($conexiondb, $consulta);

    if(!$resultado){
        die('Error al cargar la lista de productos'. mysqli_error($conexiondb));
    }

    $datosJson = array();

    while($datosEnFila = mysqli_fetch_array($resultado)){
        $datosJson[] = array(
            'nombre' => $datosEnFila['nombre_producto'],
            'categoria' => $datosEnFila['id_categoria'],
            'entregado' => $datosEnFila['entregado'],
            'id' => $datosEnFila['id_product'] 
        );
    }

    $cadenaJson = json_encode($datosJson);
    echo $cadenaJson;
?>