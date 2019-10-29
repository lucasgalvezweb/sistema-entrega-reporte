<?php
    include('database.php');

    $id = $_POST['catId'];

    if(!empty($id)){

        $consulta = "
        SELECT  producto.id_product as id_product,
                producto.nombre_producto as nombre_producto,
                categoria.nombre_categoria as nombre_categoria,
                producto.entregado as entregado
        FROM producto inner join categoria on categoria.id_categoria = producto.id_categoria
        WHERE categoria.id_categoria = '$id' ORDER BY producto.id_product";
        $resultado = mysqli_query($conexiondb, $consulta);

        if(!$resultado){
            die('Error al realizar el reporte');
        }
    
        $datosJson = array();

        while($datosEnFila = mysqli_fetch_array($resultado)){
            $datosJson[] = array(
                'id' => $datosEnFila['id_product'],
                'nombre' => $datosEnFila['nombre_producto'],
                'categoria' => $datosEnFila['nombre_categoria'],
                'entregado' => $datosEnFila['entregado']
            );
        }

    $cadenaJson = json_encode($datosJson);
    echo $cadenaJson;
    }

?>