<?php
    include('database.php');

    $consulta = 'SELECT id_categoria, nombre_categoria FROM categoria';
    $resultado = mysqli_query($conexiondb, $consulta);

    if (!$resultado) {
        die('Error al mostrar categorias desde la base de datos'. mysqli_error($conexiondb));
    }

    $datosJson = array();

    while($datosEnFila = mysqli_fetch_array($resultado)){
        $datosJson[] = array(
            'categoria' => $datosEnFila['nombre_categoria'],
            'id' => $datosEnFila['id_categoria']
        );
    }

    $cadenaJson = json_encode($datosJson);
    echo $cadenaJson;