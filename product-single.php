<?php
    include('database.php');

    $id = $_POST['id'];

    if(!empty($id)){
        $consulta = "SELECT * FROM producto WHERE id_product = $id";
        $resultado = mysqli_query($conexiondb, $consulta);

        if (!$resultado) {
            die('Error en la consulta a la BD'.mysqli_error($conexiondb));
        }

        $datosJson = array();

        while ($datoEnFila = mysqli_fetch_array($resultado)) {
            $datosJson[] = array(
                'id' => $datoEnFila['id_product'],
                'nombre' => $datoEnFila['nombre_producto'],
                'categoria' => $datoEnFila['id_categoria'],               
                'entregado' => $datoEnFila['entregado']               
            );
        }

        $cadenaJson = json_encode($datosJson[0]);
        echo $cadenaJson;
    }
?>