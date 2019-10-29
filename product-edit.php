<?php
    include('database.php');

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $entregado = $_POST['entregado'];

    $consulta = "UPDATE producto SET nombre_producto = '$nombre', id_categoria = '$categoria', entregado = '$entregado' WHERE id_product = '$id'";
    $resultado = mysqli_query($conexiondb, $consulta);

    if(!$resultado){
        die('Error al actualizar');
    }

    echo "Datos actualizados correctamente";
?>