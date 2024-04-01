let tareas = [
    {
        id: 1,
        tarea: "Limpiar casa",
        completado: false
    },
    {
        id: 2,
        tarea: "Acomodar cuarto",
        completado: false
    },
    {
        id: 3,
        tarea: "Bañar perro",
        completado: false
    }
];

let tabla = document.querySelector("#tabla");
let contador = document.querySelector("#contador");
let InputTarea = document.querySelector('#NuevaTarea')
let html = "";
let cantidadtarea = tareas.length;

console.log("entre a js")

/* Template para tablas */

let template_tabla = function (tarea) {

    let template = ""  /* Declaro variable local */
    if (tarea.completado === true){
        /* Si la tarea es completada, se talla la misma */
        template = ` 
    <tr>
        <td class="tabla_id">${tarea.id}</td> 
        <td class="tabla_tarea"><span style="text-decoration:line-through;">${tarea.tarea}</span></td> 
        <td><input type="checkbox" id="ChkBox_${tarea.id}" onclick="TareaFinalizada(${tarea.id});" checked></td> 
        <td><i class="fa-solid fa-xmark otros_td" style="color: #ff0000;" onclick="TareaEliminada(${tarea.id});"></i></td>
    </tr>
    `
    } else {
        /* Caso contrario, se coloca la tarea sin estilo*/
    template = ` 
    <tr>
        <td class="tabla_id">${tarea.id}</td> 
        <td class="tabla_tarea">${tarea.tarea}</td> 
        <td><input class = "otros_td" type="checkbox" id="ChkBox_${tarea.id}" onclick="TareaFinalizada(${tarea.id});"></td> 
        <td><i class="fa-solid fa-xmark otros_td" style="color: #ff0000; " onclick="TareaEliminada(${tarea.id});"></i></td>
    </tr>
    `
    }
    return template;
}

/* Template el texto de resumen*/

let template_resumen = function (total, realizados) {

    let template = ""

    template = ` 
            <div class="resumen_cont">
                <p>Total:<span>
                    <strong>${total}</strong>
                    </span></p>
                </div>
            <div class="resumen_cont">
                <p >Realizada:<span>
                    <strong>${realizados}</strong>
                    </span></p>
            </div>
    `
    return template;
}
/*Renderizado de pagina*/

let Renderizar_info = function () {
    let tarea_realizada = 0
    console.log (tareas , "Como entra en array para renderizar")
    if (tareas.length == 0){
        html = ""
        tabla.innerHTML = html

    } else {
    for (let tarea of tareas) {

        html += template_tabla(tarea)
        tabla.innerHTML = html
        if (tarea.completado === true) {
            tarea_realizada += 1
        }
    }
    html=""

    }   
    renderizar_resumen (tarea_realizada);
}

/*Renderizado de resumen*/
let renderizar_resumen = function (tareas_realizadas=0) {

    let total = 0;
    total = tareas.length;
    html = template_resumen(total,tareas_realizadas)
    contador.innerHTML = html
    html=""

}

/* AFuncion para agregar un tarea*/
let AgregarTarea = function(){

    const nuevatarea = InputTarea.value;

    tareas_realizadas = 0
    console.log (nuevatarea , "nueva tarea")

    if (nuevatarea === "") {
        alert("No se puede agregar un tarea en blanco")
    } else {
    
    cantidadtarea += 1;
    PushTarea (cantidadtarea,nuevatarea,false);

    InputTarea.value = ""
    Renderizar_info();
    html =""
    }
}

/* Funcion para agregar un elemento al objeto*/
let PushTarea = function(id_ag,tarea_ag,completado_ag) {
    tareas.push(
        {
            id: id_ag,
            tarea:tarea_ag,
            completado:completado_ag
        }
    )
    tareas = tareas.sort (function(a, b){return a.id - b.id})
}

/* funcion para tareas finalizadas*/
let TareaFinalizada = function(id){

    const IndiceFinalizado = tareas.findIndex(tarea => tarea.id === id);
    const Chkbox_paso = "ChkBox_"+id;
    const chk_box = document.querySelector('#'+ Chkbox_paso);
    let tarea_modificada = tareas[IndiceFinalizado].tarea;
    let tarea_completada = "";
    const id_modificado = id;

    if(chk_box.checked){
        tarea_completada = true
        tareas.splice(IndiceFinalizado,1)
        PushTarea (id_modificado,tarea_modificada,tarea_completada);

    } else {
        tarea_completada = false
        tareas.splice(IndiceFinalizado,1)
        PushTarea (id_modificado,tarea_modificada,tarea_completada);
    }
    Renderizar_info();
}

/* funcion para Tareas eliminadas */

let TareaEliminada = function(id){
    console.log ("Entre en las tareas eliminadas")
    const IndiceFinalizado = tareas.findIndex(tarea => tarea.id === id);
    tareas.splice(IndiceFinalizado,1)
    Renderizar_info();
}

/* Llamado inicial*/
Renderizar_info();

