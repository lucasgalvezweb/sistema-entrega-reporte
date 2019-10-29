<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $consulta = "DELETE FROM producto WHERE id_product=$id";
        $resultado = mysqli_query($conexiondb, $consulta);

        if(!$resultado){
            die('Error al eliminar producto');
        }
        echo "Producto eliminada satisfactoriamente";
    }
?>