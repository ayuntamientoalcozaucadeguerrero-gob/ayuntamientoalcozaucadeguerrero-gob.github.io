// Script principal para la consulta de permisos
document.addEventListener('DOMContentLoaded', function() {
    
    // Funcion para obtener parametros de URL
    function obtenerParametroURL(parametro) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parametro);
    }
    
    // Funcion para mostrar mensaje de error
    function mostrarError(mensaje) {
        const contenedor = document.getElementById('contenido-permiso');
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="max-w-7xl mx-auto px-4 lg:px-8">
                    <div class="bg-white shadow-xl rounded-xl overflow-hidden">
                        <div class="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
                            <h3 class="text-lg font-bold">
                                <i class="bi bi-exclamation-triangle-fill mr-2"></i>
                                PERMISO NO ENCONTRADO
                            </h3>
                        </div>
                        <div class="p-8 text-center">
                            <div class="mb-6">
                                <i class="bi bi-file-earmark-x text-gray-400 text-6xl"></i>
                            </div>
                            <h4 class="text-xl font-semibold text-gray-800 mb-4">
                                El permiso solicitado no existe
                            </h4>
                            <p class="text-gray-600 mb-6">
                                ${mensaje}
                            </p>
                            <div class="space-y-4">
                                <a href="tramites.html" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                                    <i class="bi bi-arrow-left mr-2"></i>
                                    Realizar nueva busqueda
                                </a>
                                <div class="text-sm text-gray-500">
                                    <p>Si considera que esto es un error, contactenos:</p>
                                    <a href="https://wa.me/+527551022649" class="text-green-600 hover:text-green-700 font-medium">
                                        <i class="bi bi-whatsapp mr-1"></i>
                                        WhatsApp: +52 755 102 2649
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // Funcion para verificar si un permiso esta vencido
    function estaVencido(fechaVigencia) {
        const fechaActual = new Date();
        const fechaVencimiento = new Date(fechaVigencia);
        
        // Normalizar las fechas para comparar solo año, mes y día
        fechaActual.setHours(0, 0, 0, 0);
        fechaVencimiento.setHours(0, 0, 0, 0);
        
        return fechaVencimiento < fechaActual;
    }

    // Funcion para mostrar permiso
    function mostrarPermiso(permiso) {
        const contenedor = document.getElementById('contenido-permiso');
        if (contenedor) {
            // Verificar automáticamente si el permiso está vencido por fecha
            const permisoVencido = estaVencido(permiso.fechaVigencia);
            
            // Determinar el color y texto del estado basado en la fecha de vigencia
            const estadoColor = permisoVencido ? 'text-red-600' : 'text-green-600';
            const estadoTexto = permisoVencido ? 'VENCIDO' : 'VIGENTE';
            const estadoIcono = permisoVencido ? 'bi-exclamation-triangle-fill text-red-500' : 'bi-shield-check text-blue-500';
            const estadoBadge = permisoVencido ? 'bg-red-500' : 'bg-green-500';
            
            contenedor.innerHTML = `
                ${permisoVencido ? `
                <div class="max-w-7xl mx-auto px-4 lg:px-8 mb-4">
                    <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                        <div class="flex items-center">
                            <i class="bi bi-exclamation-triangle-fill text-red-500 text-xl mr-3"></i>
                            <div>
                                <h4 class="text-red-800 font-semibold">¡Permiso Vencido!</h4>
                                <p class="text-red-600 text-sm">Este permiso ha expirado el ${formatearFecha(permiso.fechaVigencia)}. No es válido para circular.</p>
                            </div>
                        </div>
                    </div>
                </div>
                ` : ''}
                <div class="max-w-7xl mx-auto px-4 lg:px-8">
                    <div class="bg-white shadow-xl rounded-xl overflow-hidden">
                        <div class="p-6 bg-gradient-to-r ${permisoVencido ? 'from-red-500 to-red-600' : 'from-blue-500 to-blue-600'} text-white flex items-center justify-between">
                            <h3 class="text-lg font-bold">
                                <i class="${estadoIcono} mr-2"></i>
                                PERMISO ${permisoVencido ? 'VENCIDO' : 'CERTIFICADO'}
                            </h3>
                            <span class="${estadoBadge} px-3 py-1 rounded-full text-sm font-semibold">
                                ${estadoTexto} ${permisoVencido ? '❌' : '✓'}
                            </span>
                        </div>
                        
                        <div class="p-6">
                            <!-- Imagen del certificado -->
                            <div class="text-center mb-6">
                                <img src="${permiso.imagen}" 
                                     alt="Certificado de permiso ${permiso.folio}" 
                                     class="rounded-lg shadow-md mx-auto" 
                                     style="max-width: 100%; width: 600px;"
                                     onerror="this.src='images/img-permiso-certificado.png'">
                            </div>
                            
                            <!-- Detalles del permiso -->
                            <div class="p-6 rounded-lg shadow-inner bg-gray-50">
                                <h4 class="text-xl font-semibold text-gray-800 mb-4 text-center border-b pb-2">
                                    Detalles del Permiso
                                </h4>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Folio -->
                                    <div class="flex items-start">
                                        <i class="bi bi-file-text text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Folio:</label>
                                            <p class="text-gray-800 font-semibold">${permiso.folio}</p>
                                        </div>
                                    </div>
                                    ${permiso.nombre ? `
                                    <!-- Nombre del titular -->
                                    <div class="flex items-start md:col-span-2">
                                        <i class="bi bi-person-fill text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Nombre del titular:</label>
                                            <p class="text-gray-800 font-semibold">${permiso.nombre}</p>
                                        </div>
                                    </div>
                                    ` : ''}
                                    
                                    <!-- Estatus -->
                                    <div class="flex items-start">
                                        <i class="bi bi-check-circle-fill text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Estatus:</label>
                                            <p class="${estadoColor} font-semibold uppercase">${estadoTexto}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Marca -->
                                    <div class="flex items-start">
                                        <i class="bi bi-car-front text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Marca:</label>
                                            <p class="text-gray-800 truncate">${permiso.marca}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Linea -->
                                    <div class="flex items-start">
                                        <i class="bi bi-tags text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Linea:</label>
                                            <p class="text-gray-800 truncate">${permiso.linea}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Modelo -->
                                    <div class="flex items-start">
                                        <i class="bi bi-calendar text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Modelo:</label>
                                            <p class="text-gray-800 truncate">${permiso.modelo}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Color -->
                                    <div class="flex items-start">
                                        <i class="bi bi-palette text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Color:</label>
                                            <p class="text-gray-800 truncate">${permiso.color}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Numero de Serie -->
                                    <div class="flex items-start">
                                        <i class="bi bi-upc-scan text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Numero de Serie:</label>
                                            <p class="text-gray-800 break-words font-mono text-sm">${permiso.numeroSerie}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Numero de Motor -->
                                    <div class="flex items-start">
                                        <i class="bi bi-gear-fill text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Numero de Motor:</label>
                                            <p class="text-gray-800 break-words font-mono text-sm">${permiso.numeroMotor}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Fecha de Vigencia -->
                                    <div class="flex items-start md:col-span-2">
                                        <i class="bi bi-calendar2-check-fill text-gray-500 text-xl mr-3 mt-1"></i>
                                        <div class="w-full">
                                            <label class="text-gray-700 font-medium block mb-1">Fecha de Vigencia:</label>
                                            <p class="text-gray-800 font-semibold">${formatearFecha(permiso.fechaVigencia)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Acciones -->
                            <div class="mt-6 text-center space-y-4">
                                <button onclick="window.print()" class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                                    <i class="bi bi-printer mr-2"></i>
                                    Imprimir Certificado
                                </button>
                                <br>
                                <a href="tramites.html" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                                    <i class="bi bi-arrow-left mr-2"></i>
                                    Realizar nueva busqueda
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // Funcion para formatear fecha
    function formatearFecha(fecha) {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-MX', opciones);
    }
    
    // Logica principal
    const folioConsulta = obtenerParametroURL('folio');
    
    if (folioConsulta) {
        // Validar formato del folio
        if (!validarFormatoFolio(folioConsulta)) {
            mostrarError(`El folio "${folioConsulta}" no tiene un formato valido. Debe seguir el formato: ALCO-XXXXX`);
            return;
        }
        
        // Buscar el permiso
        const permiso = buscarPermiso(folioConsulta);
        
        if (permiso) {
            mostrarPermiso(permiso);
            // Actualizar el titulo de la pagina
            document.title = `Permiso ${permiso.folio} - H. Municipio de Alcozauca de Guerrero`;
        } else {
            mostrarError(`No se encontro ningun permiso con el folio "${folioConsulta}". Verifique que el numero de folio sea correcto.`);
        }
    } else {
        mostrarError('No se especifico un folio para consultar. Por favor, realice una busqueda desde la pagina de tramites.');
    }
});