<?php
    include('database.php');

    if(isset($_POST['nombre'])){
        $nombre = $_POST['nombre'];
        $categoria = $_POST['categoria'];
        $entregado = $_POST['entregado'];

        $consulta = "INSERT INTO producto(nombre_producto, id_categoria, entregado) VALUES ('$nombre','$categoria', '$entregado')";

        $resultado = mysqli_query($conexiondb, $consulta);
        
        if(!$resultado) {
            die('La insercion ha fallado');
        }
        echo "El producto se ha guardado correctamente";
    }
?>