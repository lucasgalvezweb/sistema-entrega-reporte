$(document).ready(function() {
    console.log("JQuery está funcionando");
    $("#product-result").hide();
    fetchProduct();
    fetchCategoria();

    function reset_form() {
        $("#product-form").trigger("reset");
    }

    editado = false;

    $("#search").keyup(function() {
        if ($("#search").val()) {
            let busqueda = $("#search").val();
            $.ajax({
                url: "product-search.php",
                type: "POST",
                data: { busqueda },
                success: function(response) {
                    console.log("llego");
                    let productos = JSON.parse(response);
                    let plantilla = "";
                    productos.forEach(producto => {
                        plantilla += `
                            <tr productId=${producto.id} >
                                <td class="text-center">${producto.id}</td>
                                <td><a href="#" class="product-item">${producto.nombre}</a></td>
                                <td class="product-item text-center">${producto.categoria}</td>
                                <td class="text-center">${producto.entregado}</td>
                                <td>
                                    <button class="product-delete btn btn-danger">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });

                    $(".products").html(plantilla);
                }
            });
        } else {
            fetchProduct();
            reset_form();
        }
    });

    $("#product-form").submit(function(e) {
        const datosPost = {
            nombre: $("#productName").val(),
            categoria: $("#productCategoria").val(),
            entregado: $("#productEstado").val(),
            id: $("#productId").val()
        };

        let url = editado === false ? "product-add.php" : "product-edit.php";

        $.post(url, datosPost, function(response) {
            console.log(response);
            editado = false;
            fetchProduct();
            reset_form();
            $("#search").val("");
        });
        e.preventDefault();
    });

    // Listado de categorias para mostrar en el formulario
    function fetchCategoria() {
        $.ajax({
            url: "categoria-list.php",
            type: "GET",
            success: function(response) {
                let categorias = JSON.parse(response);
                let plantilla = "";

                categorias.forEach(categoria => {
                    plantilla += `
                        <option class="text-primary" value="${categoria.id}">${categoria.categoria}</option>
                `;
                });
                $(".categories").html(plantilla);
            }
        });
    }

    function fetchProduct() {
        $.ajax({
            url: "product-list.php",
            type: "GET",
            success: function(response) {
                let productos = JSON.parse(response);
                let plantilla = "";

                productos.forEach(producto => {
                    plantilla += `
                        <tr productId=${producto.id}>
                            <td class="text-center">${producto.id}</td>
                            <td><a href="#" class="product-item">${producto.nombre}</a></td>
                            <td class="text-center">${producto.categoria}</td>
                            <td class="text-center">${producto.entregado}</td>
                            <td>
                                <button class="product-delete btn btn-danger text-center">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $(".products").html(plantilla);
            }
        });
    }

    $(document).on("click", ".product-delete", function() {
        console.log("Boton eliminar clickeado");
        if (confirm("¿Estas seguro de querer eliminar el producto?")) {
            let filaEntera = $(this)[0].parentElement.parentElement;
            let id = $(filaEntera).attr("productId");
            $.post("product-delete.php", { id }, function(response) {
                fetchProduct();
            });
        }
    });

    $(document).on("click", ".product-item", function() {
        let filaEntera = $(this)[0].parentElement.parentElement;
        let id = $(filaEntera).attr("productId");
        $.post("product-single.php", { id }, function(response) {
            const producto = JSON.parse(response);
            $("#productName").val(producto.nombre);
            $("#productCategoria").val(producto.categoria);
            $("#productEstado").val(producto.entregado);
            $("#productId").val(producto.id);
            editado = true;
        });
    });

    // Reporte por categoria
    $('#reportCategoria').on('change', function(e) {
        console.log('Categoria clickeada');
        let catId = $(this).val();
        console.log(catId);
        $.ajax({
            url: "list-product-category.php",
            type: "POST",
            data: { catId },
            success: function(response) {
                console.log('Pasa al response');
                let productos = JSON.parse(response);
                let plantilla = '';
                productos.forEach(producto => {
                    plantilla += `
                        <tr>
                            <td class="text-center">${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td class="text-center">${producto.categoria}</td>
                            <td class="text-center">${producto.entregado}</td>
                        </tr>
                    `;
                });
                $(".productsByCategory").html(plantilla);
            }
        })
    });

    // Reporte por estado
    $('.reportEstado').on('change', function(e) {
        console.log('Estado clickeada');
        let estado = $(this).val();
        console.log(estado);
        $.ajax({
            url: "list-product-estado.php",
            type: "POST",
            data: { estado },
            success: function(response) {
                console.log('Pasa al response');
                let productos = JSON.parse(response);
                let plantilla = '';
                productos.forEach(producto => {
                    plantilla += `
                        <tr>
                            <td class="text-center">${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td class="text-center">${producto.categoria}</td>
                            <td class="text-center">${producto.entregado}</td>
                        </tr>
                    `;
                });
                $(".productsByCategory").html(plantilla);
            }
        })
    });
});