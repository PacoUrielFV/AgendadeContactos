<?php include 'inc/layout/header.php' ?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="" id="contacto" action="#">
        <legend>Añana un Contacto <span>Todos los campos son obligatorios</span></legend>
        <div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input type="text" placeholder="Nombre Contacto" id="nombre">
            </div>
            <div class="campo">
                <label for="empresa">Nombre:</label>
                <input type="text" placeholder="Nombre Empresa" id="empresa">
            </div>
            <div class="campo">
                <label for="telefono">Teléfono:</label>
                <input type="tel" placeholder="Nombre Contacto" id="telefono">
            </div>
            <div class="campo enviar">
                <input type="submit" value="Añadir">
            </div>
        </div>
    </form>
</div>

<?php include 'inc/layout/footer.php' ?>