window.addEventListener("DOMContentLoaded", (event) => {
  const { userAgent } = navigator;
  if (
    userAgent.match(/chrome|chromium|crios/i) ||
    userAgent.match(/firefox|fxios/i)
  ) {
    console.log("Versión 1.0.0");
    getHash();
  } else {
    logout();
  }
});

const logout = () => {
  //localStorage.removeItem('tokenErre');
  location.href = "index.html";
};

const initiTitle = (title) => (document.title = title);

const getHash = async () => {
  document.documentElement.scrollTop = 0;
  let linkColor = document.querySelectorAll(".menu-links");
  let linkSidenav = document.querySelectorAll(".menu-sidenav");
  let content = $("#allContent");
  content
    .html(
      '<div class="spinner-border color-green" style="width: 6rem; height: 6rem;" role="status"></div>'
    )
    .addClass("mt-5 text-center");
  for (let index = 0; index < linkColor.length; index++) {
    let valueFor = linkColor[index];
    if (valueFor.getAttribute("href") === location.hash) {
      valueFor.classList.add("fondo-naranja");
    } else {
      valueFor.classList.remove("fondo-naranja");
    }
  }
  for (let index = 0; index < linkSidenav.length; index++) {
    let valueFor = linkSidenav[index];
    if (valueFor.dataset.href === location.hash) {
      valueFor.classList.add("fondo-naranja");
    } else {
      valueFor.classList.remove("fondo-naranja");
    }
  }
  switch (location.hash) {
    case "#dashboard":
      renderDashboard(content);
      break;
    case "#clientes":
      renderClientes(content);
      break;
    case "#demanda":
      renderDemanda(content);
      break;
    case "#expedientes":
      renderExpedientes(content);
      break;
    case "#DetalleClientes":
      break;
    case "#documentos":
      renderDocumentos(content);
      break;
    case "#bitacora":
      renderBitacora(content);
      break;
    default:
      logout();
  }
};

const requestAxios = async (method, url, data, withFile = false) => {
  try {
    let objeto = {
      method,
      url,
      headers: {
        Authorization: localStorage.getItem("tokenErre"),
        "content-type": "multipart/form-data",
      },
      data,
    };
    if (withFile === false) delete objeto.headers["content-type"];
    const peticion = await axios(objeto);
    return peticion.data;
  } catch (error) {
    return error.response.data;
  }
};

const showDetalle = (idDivMostrar, idDivOcultar) => {
  $(`#${idDivMostrar}`).removeClass("d-none");
  $(`#${idDivOcultar}`).addClass("d-none");
};

////////////////////////
///// DASHBOARD
////////////////////////
const renderDashboard = async (divContent) => {
  initiTitle("Dashboard");
  const html = `
  <div class="row">
    <div class="col-12 text-end">
      <div class="dropdown">
        <button class="btn color-negro px-3 py-2 fondo-verde boton-verde sombra1 color-azul dropdown-toggle border-0" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-sliders px-2"></i>
          Filtrar
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 py-4">
          <li><a class="dropdown-item" href="#">Total</a></li>
          <li><a class="dropdown-item" href="#">En Curso</a></li>
          <li><a class="dropdown-item" href="#">Cancelados</a></li>
          <li><a class="dropdown-item" href="#">No atendidos</a></li>
          <li><a class="dropdown-item" href="#">Por descargar</a></li>
          <li><a class="dropdown-item" href="#">Por atender</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 mb-5"> 
      <div class="card bg-white border-0 px-3 py-3 sombra-1">
        <h5 class="mb-4">Audiencias</h5>
        <div class="row">
          <div class="col-6">
            <span>Total</span>
          </div>
          <div class="col-5">
            <div class="progress mt-1">
              <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center">
            <i class="fa-solid fa-info" data-bs-toggle="tooltip-dashboard" data-bs-placement="top" data-bs-title="1233 / 47888"></i>
          </div>
          <div class="col-6">
            <span>En curso</span>
          </div>
          <div class="col-5">
            <div class="progress mt-1">
              <div class="progress-bar" role="progressbar" style="width: 5%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center">
            <i class="fa-solid fa-info"  data-bs-toggle="tooltip-dashboard" data-bs-placement="top" data-bs-title="1233 / 47888"></i>
          </div>
          <div class="col-6">
            <span>Cancelados</span>
          </div>
          <div class="col-5">
            <div class="progress mt-1">
              <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center">
            <i class="fa-solid fa-info" data-bs-toggle="tooltip-dashboard" data-bs-placement="top" data-bs-title="1233 / 47888"></i>
          </div>
          <div class="col-6">
            <span>No atendidos</span>
          </div>
          <div class="col-5">
            <div class="progress mt-1">
              <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center">
            <i class="fa-solid fa-info" data-bs-toggle="tooltip-dashboard" data-bs-placement="top" data-bs-title="1233 / 47888"></i>
          </div>
          <div class="col-6">
            <span>Por descargar</span>
          </div>
          <div class="col-5">
            <div class="progress mt-1">
              <div class="progress-bar" role="progressbar" style="width: 65%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center">
            <i class="fa-solid fa-info" data-bs-toggle="tooltip-dashboard" data-bs-placement="top" data-bs-title="1233 / 47888"></i>
          </div>
          <div class="col-6">
            <span>Por atender</span>
          </div>
          <div class="col-5">
            <div class="progress mt-1">
              <div class="progress-bar" role="progressbar" style="width: 85%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center">
            <i class="fa-solid fa-info" data-bs-toggle="tooltip-dashboard" data-bs-placement="top" data-bs-title="1233 / 47888"></i>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  divContent.removeClass("mt-5 text-center").html(html);
  // const getInfo = await requestAxios('GET', 'urlapizifris', {});
  // if(getInfo.code === 200) {
  //     console.log('Todo verde');
  // } else {
  //     console.log('Fallo');
  // }
};

////////////////////////
///// CLIENTES
////////////////////////
const renderClientes = async (divContent) => {
  initiTitle("Clientes");
  const html = `
  <div class="bg-white" id="divContenidoCliente">
    <div class="row px-5 pt-5">
      <div class="col-6">
        <h2>Clientes</h2>
      </div>
      <div class="col-6 text-end">
        <button  class="btn fondo-naranja boton-naranja" data-bs-toggle="modal" data-bs-target="#agregarCliente">
          Agregar nuevo
        </button>
      </div>
    </div>
    <hr class="mb-5">
    <div class="row pe-5 mb-5">
      <div class="col-12 text-end">
        <div class="dropdown">
          <button class="btn color-negro px-3 py-2 fondo-verde boton-verde sombra1 color-azul dropdown-toggle border-0" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-sliders px-2"></i>
            Filtrar
          </button>
          <ul class="dropdown-menu dropdown-menu-end border-0 py-4">
            <li><a class="dropdown-item" href="#">Cliente</a></li>
            <li><a class="dropdown-item" href="#">Procesos</a></li>
            <li><a class="dropdown-item" href="#">Procesos inactivos</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table text-center textos">
        <thead>
          <tr>
            <th style="min-width:300px; width:40%">Cliente</th>
            <th style="min-width:200px; width:25%">Trámite / Procesos</th>
            <th style="min-width:200px; width:25%">Tramites/Procesos inactivos</th>
            <th style="min-width:120px; width:10%">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-3">Aluguesa</td>
            <td class="py-3">5879</td>
            <td class="py-3">5879</td>
            <td>
              <button class="btn boton-azul fondo-azul2 text-white" onclick="showDetalle('detalleCliente','divContenidoCliente')">
                <i class="fa-solid fa-eye me-2"></i>
                Ver
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3">Aluguesa</td>
            <td class="py-3">5879</td>
            <td class="py-3">5879</td>
            <td>
              <button class="btn boton-azul fondo-azul2 text-white" onclick="showDetalle('detalleCliente','divContenidoCliente')">
                <i class="fa-solid fa-eye me-2"></i>
                Ver
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3">Aluguesa</td>
            <td class="py-3">5879</td>
            <td class="py-3">5879</td>
            <td>
              <button class="btn boton-azul fondo-azul2 text-white" onclick="showDetalle('detalleCliente','divContenidoCliente')">
                <i class="fa-solid fa-eye me-2"></i>
                Ver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!--Detalle Cliente-->
  
  <div id="detalleCliente" class="mb-5 px-3 d-none">
    <div class="bg-white">
      <div class="row px-5 pt-5 mt-5">
        <div class="col-6">
          <h2>Cliente</h2>
          </div>
          <div class="col-6 text-end">
            <button class="btn px-5 fondo-naranja boton-naranja" data-bs-toggle="modal" data-bs-target="#agregarCliente">
              Editar
              </button>
              </div>
              </div>
              <hr class="mb-5">
                <div class="row px-5">
                  <div class="col-2 fondo-gris rounded px-4 py-4 text-center">
                    <h2 class="py-3 fw-semibold">AL</h2>
                    </div>
                    <div class="col-10">
                      <span class="fw-semibold fs-5">Aluguesa</span>
                      <br>
                      <span>Correo electrónico:</span>
                      <span class="color-negro fw-normal fs-6">ejemplo@mail.com</span>
                      <span>Teléfono:</span>
                      <span class="color-negro fw-normal fs-6">879-654-279</span>
                      </div>
                      </div>
                      
                      <!--Domicilios-->
                      <div class="row px-5 pt-5 mb-5">
                        <div class="col-6">
                          <h3>Domicilios</h3>
                          </div>
                          <div class="col-6 text-end">
                            <button class="btn fondo-naranja boton-naranja" data-bs-toggle="modal" data-bs-target="#domicilioModal">
                              Agregar domicilio
                              </button>
                              </div>
                              </div>
                              <!--Tabla Domicilios-->
                              <div class="table-responsive">
                                <table class="table text-center textos">
                                  <thead>
                                    <tr>
                                      <th style="min-width:330px; width:33%">Domicilio</th>
                                      <th style="min-width:330px; width:33%">Tipo de domicilio</th>
                                      <th style="min-width:330px; width:33%">Opciones</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td class="py-3">Aluguesa</td>
                                          <td class="py-3">5879</td>
                                          <td class="py-3"><button class="btn gap-2 boton-azul fondo-azul2 text-white">
                                            <i class="fa-solid fa-pen px-2"></i><span>Editar</span>
                                            </button>
                                            </td>
                                            </tr>
                                            <tr>
                                              <td class="py-3">Aluguesa</td>
                                              <td class="py-3">4579</td>
                                              <td class="py-3"><button class="btn gap-2 boton-azul fondo-azul2 text-white">
                                                <i class="fa-solid fa-pen px-2"></i><span>Editar</span>
                                                </button>
                                                </td>
                                                </tr>
                                                <tr>
                                                  <td class="py-3">Aluguesa</td>
                                                  <td class="py-3">3248</td>
                                                  <td class="py-3">
                                                    <button class="btn boton-azul  gap-2 fondo-azul2 text-white">
                                                      <i class="fa-solid fa-pen px-2"></i><span>Editar</span>
                                                    </button>
                                                    </td>
                                                    </tr>
                                                    </tbody>
                                                    </table>
                                                    </div>
                                                    
                                                    <!--Tabla personas-->
                                                    <div class="mt-5 bg-white">
                                                      <!--Personas Titulo-->
                                                      <div class="row px-5 pt-5 mb-5">
                                                        <div class="col-4">
                                                          <h2>Personas</h2>
                                                          </div>
                                                          <div class="col-8 text-end">
                                                            <button class="btn fondo-naranja boton-naranja float-end" data-bs-toggle="modal" data-bs-target="#personaModal">
                                                              Agregar persona
                                                              </button>
      <div class="dropdown">
      <button class="btn fondo-verde boton-verde color-azul dropdown-toggle border-0 me-3" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-sliders px-2"></i> Filtrar 
      </button>
      <ul class="dropdown-menu border-0 py-4">
        <li><a class="dropdown-item" href="#">Nombre</a></li>
        <li><a class="dropdown-item" href="#">Correo electrónico</a></li>
        <li><a class="dropdown-item" href="#">Puesto</a></li>
      </ul>
      </div>
      </div>
              </div>
                <!--Tabla personas-->
                <div class="table-responsive">
                <table class="table text-center textos table-responsive">
                  <thead>
                    <tr>
                      <th style="min-width:300px; width:30%">Nombre</th>
                      <th style="min-width:300px; width:30%">Correo electrónico</th>
                      <th style="min-width:200px; width:20%">Telefono</th>
                      <th style="min-width:100px; width:10%">Puesto</th>
                      <th style="min-width:120px; width:10%">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="py-3">Aluguesa</td>
                      <td class="py-3">5879</td>
                      <td class="py-3">5879</td>
                      <td class="py-3">5879</td>
                      <td class="py-3"><button class="btn boton-azul fondo-azul2 text-white">
                        <i class="fa-solid fa-pen px-2 "></i><span class="fw-light">Editar</span>
                      </button></td>
                    </tr>
                    <tr>
                      <td class="py-3">Aluguesa</td>
                      <td class="py-3">4579</td>
                      <td class="py-3">4579</td>
                      <td class="py-3">4579</td>
                      <td class="py-3"><button class="btn gap-2 boton-azul2 fondo-azul2 text-white">
                        <i class="fa-solid fa-pen px-2"></i><span>Editar</span>
                      </button></td>
                    </tr>
                    <tr>
                      <td class="py-3">Aluguesa</td>
                      <td class="py-3">3248</td>
                      <td class="py-3">3248</td>
                      <td class="py-3">3248</td>
                      <td class="py-3"><button class="btn boton-azul fondo-azul2 text-white">
                        <i class="fa-solid fa-pen px-2"></i>><span>Editar</span>
                      </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
      
      <div class="mt-5 bg-white">
<!--Personas Titulo-->
  <div class="row px-5 pt-5 mb-5">
    <div class="col-4">
      <h2>Trámite / Proceso</h2>
      </div>
      <div class="col-8 text-end">
      <button class="btn fondo-naranja boton-naranja float-end" data-bs-toggle="modal" data-bs-target="#tramiteModal">
      Agregar trámite
    </button>
    <div class="dropdown">
    <button class="btn py-2 px-3 fondo-verde boton-verde color-azul dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-sliders px-2"></i> Filtrar 
    </button>
                  <ul class="dropdown-menu border-0 py-4">
                    <li><a class="dropdown-item" href="#">Nombre</a></li>
                    <li><a class="dropdown-item" href="#">Correo electrónico</a></li>
                    <li><a class="dropdown-item" href="#">Puesto</a></li>
                  </ul>
                </div>
      </div>
                <!--Tabla Tramite-->
                <div class="table-responsive">
                <table class="table text-center textos">
                  <thead>
                    <tr>
                      <th style="min-width:100px; width:10%">Cliente</th>
                      <th style="min-width:120px; width:10%">Autoridad</th>
                      <th style="min-width:100px; width:15%">Actores</th>
                      <th style="min-width:200px; width:15%">Demandado</th>
                      <th style="min-width:200px; width:10%">Número de expediente</th>
                      <th style="min-width:100px; width:10%">Importe Total</th>
                      <th style="min-width:100px; width:10%">Total contingencia</th>
                      <th style="min-width:100px; width:10%">Estatus</th>
                      <th style="min-width:120px; width:10%">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="py-3">Aluguesa</td>
                      <td class="py-3">Loremp ipsum</td>
                      <td class="py-3" class="color-naranja fw-semibold">Wesley James y otros</td>
                      <td class="py-3">Alberta Floys y otros</td>
                      <td class="py-3">2552/2015/15-A</td>
                      <td class="py-3">$53,400.00</td>
                      <td class="py-3">$13,200.00</td>
                      <td class="py-3"><span class="badge fondo-verde2 fs-6">Activo</span></td>
                      <td class="py-3"><button class="btn boton-azul  fondo-azul2 text-white">
                        <i class="fa-solid fa-eye px-2"></i><span>Ver</span>
                      </button></td>
                    </tr>                                
                  </tbody>
                </table>
                </div>
      </div>
      </div>

      <!--Modal Agregar Cliente-->
  <div class="modal textos fade" id="agregarCliente" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Cliente o prospecto</h1>
          <button class="btn-close" data-bs-dismiss="modal">
          </button>
        </div>
        <div class="modal-body px-4">
          <h5>Cliente o prospecto</h5>
          <div class="row mt-3">
            <div class="col-md-4 mb-4">                
              <label class="form-label fw-normal  color-negro">Cliente / Prospecto</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Cliente/Prospecto"/>                
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Tipo de cliente o prospecto</label>
              <select class="form-select">
                <option selected disabled>Seleccione una opción</option>
                <option value="1">Cliente</option>
                <option value="2">Persona física</option>
                <option value="3">Persona Moral</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Nombre comercial</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Nombre comercial"/>
            </div>
          </div>
          <div class="row mb-4">
            <h5>Persona Física</h5>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Nombre</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Nombre"/>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Apellido</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Apellido"/>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Teléfono</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Teléfono"/>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Correo electrónico</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Correo electrónico"/>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Domicilio fiscal</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio fiscal"/>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Domicilio convencional</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio convencional"/>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-normal color-negro">Domicilio de la fuente de trabajo</label>
              <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio de la fuente de trabajo"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn fondo-gris px-5" data-bs-dismiss="modal">Cancelar</button>
          <button class="btn fondo-naranja boton-naranja px-5">Agregar</button>
        </div>
      </div>
    </div>
  </div>

      <!-- Modal Agregar Domicilio-->

<div class="modal textos fade" id="domicilioModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar domicilio</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4">
        <h5 class="mt-3">Tipo de domicilio</h5>
        <div class="row mb-5 py-3">
          <div class="col-md-6 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de domicilio</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Seleccione una opción</option>
                <option value="1">Domicilio Fiscal</option>
                <option value="2">Domicilio convencional</option>
                <option value="3">Domicilio de la fuente de trabajo </option>
              </select>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2">Domicilio</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio"/>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn fondo-gris px-5" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn fondo-naranja boton-naranja px-5">Agregar</button>
      </div>
    </div>
  </div>
</div>

                  <!-- Modal persona -->
<div class="modal textos fade" id="personaModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar persona</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4">
        <div class="row mb-5 py-3">
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de persona</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Seleccione una opción</option>
                <option value="1">Peronsa moral</option>
                <option value="2">Persona física</option>
              </select>
            </div>
          </div>
          <h5 class="mt-2 py-2">Persona Física</h5>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Nombre</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Nombre"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Apellido</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Apellido"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Puesto</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Teléfono"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Teléfono</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Correo electrónico"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Correo electrónico</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio fiscal"/>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn fondo-gris px-5" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn fondo-naranja boton-naranja px-5">Agregar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Agregar Trámite-->

<div class="modal textos fade" id="tramiteModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar trámite o proceso</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4">
        <div class="row mb-5 py-3">
          <div class="col-md-4 ">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Cliente / Prospecto</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Cliente/Prospecto"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Proceso / Trámite</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Seleccione una opción</option>
                <option value="1">Opción 1</option>
                <option value="2">Opción 2</option>
                <option value="3">Opción 3</option>
              </select>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Fecha de intervención</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Seleccione una opción</option>
                <option value="1">Opción 1</option>
                <option value="2">Opción 2</option>
                <option value="3">Opción 3</option>
              </select>
            </div>
          </div>
          <h5 class="mt-2 py-2">Proceso / Trámite </h5>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Número de expediente</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Nombre"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Año</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Apellido"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Junta</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Teléfono"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Mesa</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Correo electrónico"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Nombre completo autoridad</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio fiscal"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Domicilio</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio convencional"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de expediente</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Seleccione una opción</option>
                <option value="1">Opción 1</option>
                <option value="2">Opción 2</option>
                <option value="3">Opción 3</option>
              </select>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Ubicación en físico</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio de la fuente de trabajo"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Código de barras</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio de la fuente de trabajo"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Número de proyecto</label>
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio de la fuente de trabajo"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-outline mb-4">
              <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Estado administrativo</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Seleccione una opción</option>
                <option value="1">Opción 1</option>
                <option value="2">Opción 2</option>
                <option value="3">Opción 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn fondo-gris px-5" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn fondo-naranja boton-naranja px-5">Agregar</button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
`;
  divContent.removeClass("mt-5 text-center").html(html);
  // const getInfo = await requestAxios('GET', 'urlapizifris', {});
  // if(getInfo.code === 200) {
  //     console.log('Todo verde');
  // } else {
  //     console.log('Fallo');
  // }
};

////////////////////////
///// DETALLE
////////////////////////

////////////////////////
///// DEMANDA
////////////////////////
const renderDemanda = async (divContent) => {
  initiTitle("Demanda");
  const html = `
  <div class="bg-white mt-4 container-fluid p-3">
  <div class="d-flex justify-content-between aligns-items-center mb-5 py-5 px-5 border-bottom">
    <div class="d-flex">
      <h2>Demanda</h2>
    </div>
</div>
<!-- Modal -->
<div class="px-4 textos">
<div class="row mb-5 py-3">
<div class="col-md-4 mb-3">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Cliente</label>
  <select class="form-select" aria-label="Default select example">
    <option selected>Seleccione una opción</option>
    <option value="1" >Cliente</option>
    <option value="2">Persona física</option>
    <option value="3">Persona Moral</option>
  </select>
</div>
</div>
<div class="col-md-4 mb-4">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Expediente</label>
  <select class="form-select" aria-label="Default select example">
    <option selected>Seleccione una opción</option>
    <option value="1">Cliente</option>
    <option value="2">Persona física</option>
    <option value="3">Persona Moral</option>
  </select>
</div>
</div>
<div class="col-md-4 mb-4">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de escrito</label>
  <select class="form-select" aria-label="Default select example">
    <option selected>Seleccione una opción</option>
    <option value="1">Cliente</option>
    <option value="2">Persona física</option>
    <option value="3">Persona Moral</option>
  </select>
</div>
</div>
<!--Inputs busqueda-->
<div class="d-flex justify-content-center px-4 gap-5">

<div class="col-md-2 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal color-negro" for="typeEmailX-2 ">Texto</label>
    <input type="text" id="typeEmailX-2" class="form-control border-0 fondo-gris form-control-lg fs-6 fw-normal" placeholder="Texto"/>
  </div>
</div>
<div class="col-md-2 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de promoción</label>
    <input type="text" id="typeEmailX-2" class="form-control border-0 fondo-gris form-control-lg fs-6 fw-normal" placeholder="Tipo de promoción"/>
  </div>
</div>
<div class="col-md-2 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de promoción</label>
    <input type="text" id="typeEmailX-2" class="form-control border-0 fondo-gris form-control-lg fs-6 fw-normal" placeholder="Tipo de promoción"/>
  </div>
</div>
<div class="col-md-2 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de promoción</label>
    <input type="text" id="typeEmailX-2" class="form-control border-0 fondo-gris form-control-lg fs-6 fw-normal" placeholder="Tipo de promoción"/>
  </div>
</div>
<div class="col-md-2 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Incidentes</label>
    <input type="text" id="typeEmailX-2" class="form-control border-0 fondo-gris form-control-lg fs-6 fw-normal" placeholder="Incidentes"/>
  </div>
</div>
</div>
<div class="col-12 mt-4 mb-4">
<h5 class="mt-3 mb-4">Complete los filtros para buscar información</h5>
</div>
<div class="col-md-2 mb-3">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Texto</label>
  <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Texto"/>
</div>
</div>
<div class="col-md-2 mb-3">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Sub texto</label>
  <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Sub texto"/>
</div>
</div>
<div class="col-md-2 mb-3">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Promociones</label>
  <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Promociones"/>
</div>
</div>
<div class="col-md-2 mb-3">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Texto</label>
  <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Texto"/>
</div>
</div>
<div class="col-md-2 mb-3">
<div class="form-outline mb-4">
  <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Sub texto</label>
  <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Sub texto"/>
</div>
</div>
<div class="col-md-2 mb-3">
<div class="mt-2 ">
  <br>
  <button class="btn btn-lg fs-6 color-negro  text-left fondo-verde boton-verde sombra1 color-azul border-0">
    <i class="fa-solid fa-sliders px-2"></i> Filtrar 
  </button>
</div>
</div>
<!--Section Results-->
<div class="col-12 mt-4 mb-4 py-3">
<h5 class="mt-3 mb-4 color-gris2 fs-6">Resultados de la búsqueda</h5>
<div class="">
  <div class="col-12 mb-3 border-bottom">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        Loremp ipsum tincidunt egestas, ultrices conge tortor
      </label>
  </div>
  </div>
<div class="col-12 mb-3 border-bottom">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
      Loremp ipsum tincidunt egestas, ultrices conge tortor
    </label>
</div>
</div>
<div class="col-12 mb-3 border-bottom">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
      Loremp ipsum tincidunt egestas, ultrices conge tortor
    </label>
</div>
</div>
</div>
</div>
</div>
</div>
<!--Editor section-->
<div class="container-fluid bg-white border py-2">
  <div class="d-flex justify-content-between aligns-items-center mb-5 py-5 px-5 border-bottom">
    <div class="d-flex">
      <h3>Escrito jurídico</h3>
    </div>
  <div class="d-grid gap-3 d-md-flex justify-content-md-end">
  <button type="button" class="btn gap-2 py-2 fondo-azul boton-naranja text-white" data-bs-toggle="modal" data-bs-target="#personaModal">
    <i class="fa-regular fa-file-lines px-2"></i><span>Cargar platilla</span>
</button>
  <button type="button" class="btn gap-2 py-2 fondo-azul boton-naranja text-white" data-bs-toggle="modal" data-bs-target="#personaModal">
    <i class="fa-solid fa-cloud-arrow-down px-2"></i><span>Descargar</span>
</button>
  <button type="button" class="btn gap-2 py-2 fondo-azul boton-naranja text-white" data-bs-toggle="modal" data-bs-target="#personaModal">
    <i class="fa-solid fa-font px-2"></i><span>Agregar texto</span>
</button>
  <button type="button" class="btn gap-2 py-2 fondo-naranja boton-naranja text-white" data-bs-toggle="modal" data-bs-target="#personaModal">
    <i class="fa-regular fa-file-word px-2"></i><span>Guardar como .doc</span>
</button>
  </div>
</div>
<h5 class="px-5 mb-4 fs-6">Aquí va el editor de texto</h5>
<div class="form-floating px-4">
  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 200px"></textarea>
  <label for="floatingTextarea2" class="px-5">Ingrese el texto</label>
</div>
</div>
</div>
  `;
  divContent.removeClass("mt-5 text-center").html(html);
  // const getInfo = await requestAxios('GET', 'urlapizifris', {});
  // if(getInfo.code === 200) {
  //     console.log('Todo verde');
  // } else {
  //     console.log('Fallo');
  // }
};

////////////////////////
///// EXPEDIENTES
////////////////////////
const renderExpedientes = async (divContent) => {
  initiTitle("Expedientes");
  const html = `
  <!--Titulo-->
  <div class="bg-white" id="divExpedientes">
  <div id="divExpedientes">
    <div class="d-flex justify-content-between aligns-items-center mb-5 py-5 px-5 border-bottom">
      <div class="d-flex">
        <h2>
          Expedientes
        </h2>
      </div>
  </div>
<!-- Section inputs -->
<div class="px-4 textos">
<div class="row mb-5 py-3">
<div class="col-md-3 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal color-negro" for="typeEmailX-2 ">Cliente</label>
    <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Nombre de cliente"/>
  </div>
</div>
<div class="col-md-3 mb-4">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Tipo de trámite / proceso</label>
    <select class="form-select" aria-label="Default select example">
      <option selected>Seleccione una opción</option>
      <option value="1">Cliente</option>
      <option value="2">Persona física</option>
      <option value="3">Persona Moral</option>
    </select>
  </div>
</div>
<div class="col-md-3 mb-4">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Subtipo</label>
    <select class="form-select" aria-label="Default select example">
      <option selected>Seleccione una opción</option>
      <option value="1">Cliente</option>
      <option value="2">Persona física</option>
      <option value="3">Persona Moral</option>
    </select>
  </div>
</div>
<div class="col-md-3 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal color-negro" for="typeEmailX-2 ">Número de expediente</label>
    <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="No. de expediente"/>
  </div>
</div>
<div class="col-md-3 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal color-negro" for="typeEmailX-2 ">Actor</label>
    <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Actor"/>
  </div>
</div>
<div class="col-md-3 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal color-negro" for="typeEmailX-2 ">Demandado</label>
    <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Demandado"/>
  </div>
</div>
<div class="col-md-3 mb-3">
  <div class="form-outline mb-4">
    <label class="form-label fw-normal color-negro" for="typeEmailX-2 ">Autoridad</label>
    <input type="text" id="typeEmailX-2" class="form-control  form-control-lg fs-6 fw-normal" placeholder="Autoridad"/>
  </div>
</div>
<div class="col-md-3 mb-3">
    <div class="mt-2">
      <br>
      <button class="btn btn-lg fs-6 color-negro w-100 fondo-verde boton-verde sombra1 color-azul border-0">
        <i class="fa-solid fa-sliders px-2"></i> Filtrar 
      </button>
    </div>
</div>
</div>
  </div>
  <!--Editor section-->
    <div class="bg-white">
      <div class="row px-4 mb-5">
      <div class="col-6">
        <h5 class="mt-3 color-gris2 fs-6">Resultados de expedientes encontrados</h5>
      </div>
      <div class="col-6 text-end">
        <button  class="btn text-end gap-2 fondo-naranja boton-naranja" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="fa-regular fa-file-lines px-2"></i><span>Nuevo expediente</span>
        </button>
    </div>
      </div>
    </div>
                  <!--Tabla expedientes-->
                  <div class="table-responsive py-4">
                  <table class="table text-center textos">
                    <thead>
                      <tr>
                        <th style="min-width:200px;">Cliente</th>
                        <th style="min-width:200px;">Autoridad</th>
                        <th style="min-width:200px;">Actores</th>
                        <th style="min-width:200px;">Demandado</th>
                        <th style="min-width:200px;">Número de expediente</th>
                        <th style="min-width:120px;">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Aluguesa</td>
                        <td>Loremp ipsum</td>
                        <td class="color-naranja fw-semibold">Wesley James y otros</td>
                        <td>Alberta Floyd y otros</td>
                        <td>2552/2015/15-A</td>
                        <td>
                        <button class="btn boton-azul  gap-2 fondo-azul2 text-white" onclick="showDetalle('divGenerales','divExpedientes')">
                          <i class="fa-solid fa-eye px-2"></i><span>Ver</span>
                          </td>
                      </tr>
                      <tr>
                        <td>Aluguesa</td>
                        <td>Loremp ipsum</td>
                        <td>Wesley James y otros</td>
                        <td class="color-naranja fw-semibold">Alberta Floyd y otros</td>
                        <td>2552/2015/15-A</td>
                        <td>
                        <button type="button" class="btn boton-azul  gap-2 fondo-azul2 text-white" onclick="showDetalle('divGenerales' , 'divExpedientes')">
                          <i class="fa-solid fa-eye px-2"></i><span>Ver</span>
                      </td>
                      <tr>
                        <td>Aluguesa</td>
                        <td>Loremp ipsum</td>
                        <td class="color-naranja fw-semibold">Wesley James y otros</td>
                        <td>Alberta Floyd y otros</td>
                        <td>2552/2015/15-A</td>
                        <td><button type="button" class="btn boton-azul  gap-2 fondo-azul2 text-white" onclick="showDetalle('divGenerales' , 'divExpedientes')">
                          <i class="fa-solid fa-eye px-2"></i><span>Ver</span>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
  </div>
  </div>
  <!--Detalle expedientes-->
  <!--Titulo-->
  <div id="divGenerales" class="d-none">
    <div class="bg-white mt-4">
    <div class="row px-5">
      <div class="col-12 mb-5 mt-5">
        <h2 class="btn-azul fw-semibold">
          Expediente: 1212/2015/15-A SA DE CV vs Jorge Pérez López 
        </h2>
      </div>
  </div>
<!-- Generales Tabs -->
<div class="row px-5 mt-4">
<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-12 col-xxl-12">
<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
<li class="nav-item" role="presentation">
  <button class="nav-link active " id="pills-generales-tab" data-bs-toggle="pill" data-bs-target="#pills-generales" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Generales</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-acuerdos-tab" data-bs-toggle="pill" data-bs-target="#pills-acuerdos" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Acuerdos</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-acciones-tab" data-bs-toggle="pill" data-bs-target="#pills-acciones" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Acciones</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-excepciones-tab" data-bs-toggle="pill" data-bs-target="#pills-excepciones" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Excepciones</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-pruebas-tab" data-bs-toggle="pill" data-bs-target="#pills-pruebas" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Pruebas</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-resolucion-tab" data-bs-toggle="pill" data-bs-target="#pills-resolucion" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Resolución</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-conconciliacion-tab" data-bs-toggle="pill" data-bs-target="#pills-conciliacion" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Conciliación</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-reportes-tab" data-bs-toggle="pill" data-bs-target="#pills-reportes" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reportes</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-documentos-tab" data-bs-toggle="pill" data-bs-target="#pills-documentos" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Documentos</button>
</li>
</ul>
</div>
</div>
<!-- Content Tabs -->
<div class="tab-content" id="pills-tabContent">
<!-- Generales-->
  <div class="tab-pane fade show active" id="pills-generales" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
  <div class="row px-5 mt-4">
        <div class="col-6 py-2 mb-4"> 
          <h4>Generales</h4>
        </div>
        <div class="col-6 text-end pe-5">          
            <span class="font-17">Vigente</span>
            <button type="button" class="btn fondo-gris boton-azul ms-2">
              <span>Concluido</span>
            </button>
            <span class="font-17">Activo</span>
            <button type="button" class="btn fondo-gris boton-azul ms-2">
              <span>Inactivo</span>
            </button>
        </div>
      </div>
      <!--Sections-->
        
      <div class="container bg-white px-4">
       <div class="row">
         <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5">
           <div class="card bg-white py-3">
             <div class="d-flex justify-content-between aligns-items-center mb-5 py-3">
               <div class="d-flex">
                 <div class="mayus fondo-gris rounded px-4 py-4">
                   <h2 class="py-3 fw-semibold">AL</h2>
                 </div>
                 <p class="fw-semibold fs-5 px-5 ms-4 py-4">Aluguesa</p>
               </div>
               <i class="px-4 py-3 fa-solid fa-ellipsis-vertical"></i>
             </div>
             <div class="row px-5">
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Expediente:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">2552/2015/15-A</span>
               </div>
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Tribunal:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">Junta especial no. 15</span>
               </div>
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Actores:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">Magguie Romero</span>
               </div>
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Demandados:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">Juan Pérez</span>
               </div>
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Demanda inicial:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">25 Ene 2022</span>
               </div>
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Ampliación, modificación, aclaración, precisión:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">13 Jul 2022</span>
               </div>
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Demanda laboral:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">25 Ene 2022</span>
               </div>
               <div class="col-5">
                 <span  class="fw-normal color-gris2 fs-6">Fecha de presentación de demanda:</span>
               </div>
               <div class="col-7">
                 <span class="color-negro fw-normal fs-6 px-5">25 Ene 2022</span>
               </div>
             </div>
           </div>
         </div>
         <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5">
           <div class="card bg-white py-3">
             <div class="row px-4">
               <div class="col-12">
             <h5>Linea del tiempo / Riesgo</h5>
           </div>
         </div>
         <div class="col-12 px-4 mt-5 text-center">
           <img src="img/my-app.png" class="chart">
         </div>
       </div>
     </div>
     <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5">
       <div class="card py-3">
         <div class="row">
           <div class="col-12"></div>
           <div class="row mt-3 py-4 mb-5">
             <div class="col-8 px-5">
               <h2 class="fs-5 fw-semibold">Acumulado</h2>
             </div>
             <div class="col-4 text-end pe-5">
               <button class="btn fondo-naranja boton-naranja">
                   Agregar
                 </button>
               </div>
               <div class="col-12 px-5">
                 <span class="color-gris2">No hay registros</span>
                 <span class="fw-semibold px-4">0</span>
               </div>
             </div> 
             <div class="row  py-4 mb-5">
               <div class="col-8 ps-5">
                 <h2 class="fs-5 fw-semibold">Alias</h2>
               </div>
               <div class="col-4 text-end pe-5">
                 <button class="btn fondo-naranja boton-naranja">
                   Agregar
                 </button>
               </div>
               <div class="col-12 px-5">
                 <span class="color-gris2">No hay registros</span>
                 <span class="fw-semibold px-4">0</span>
               </div>
             </div>
             <div class="row  py-4 mb-5">
               <div class="col-8 ps-5">
                 <h2 class="fs-5 fw-semibold">Relacionado</h2>
               </div>
               <div class="col-4 text-end pe-5">
                 <button class="btn fondo-naranja boton-naranja">
                   Agregar
                 </button>
               </div>
               <div class="col-12 px-5">
                 <span class="color-gris2">Total de registros:</span>
                 <span class="fw-semibold px-4">4</span>
               </div>
             </div>
         </div>
         </div>
       </div>
       <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5">
         <div class="card bg-white py-3">
           <div class="px-4">
             <h5 >Conciliación y mediación</h5>
           </div>
           <div class="row px-4 mt-4 rounded">
             <div class="col-12 fondo-gris"> 
               <div class="row">
                 <div class="col-8">
                   <span class="fst-italic">Se ofrecio la cantidad de $40,000.00</span>
                 </div>
                 <div class="col-4 text-end"></div>
                 <div class="col-12 text-end pe-2 font-14">
                   <span>Fecha: 25 Ene 2022</span>
                   <p>Por:Antonio Ramiro</p>
                 </div>
               </div>
             </div>
             <div class="row mt-3 mb-2 ms-1">
               <div class="col-12 text-end ms-4">
                 <button type="button" class="btn fondo-naranja boton-naranja">
                   <span>Se acepta</span>
                 </button>
                 <button type="button" class="btn ms-2 fondo-naranja boton-naranja">
                   <span>No acepta</span>
                 </button>
               </div>
             </div>
             <div class="col-6 mb-3 fw-semibold">Representado: Actor</div>
             <div class="col-md-12 mb-4">
               <div class="form-outline">
                 <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Nombre</label>
                 <input type="email" class="form-control form-control-lg fs-6 fw-normal fondo-gris border-0" placeholder="Ramiro Antonio"/>
               </div>
             </div>
             <div class="col-md-12 mb-4">
               <div class="form-outline">
                 <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Ingresar cantidad</label>
                 <input type="email" class="form-control form-control-lg fs-6 fw-normal" placeholder="Ingresar cantidad"/>
                 <p class="fst-italic px-2 color-gris2 mt-2" >Escriba una cantidad, presione enter para guardar</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>

  <!-- Acuerdos-->
  <div class="tab-pane fade mb-4" id="pills-acuerdos" role="tabpanel" aria-labelledby="Acuerdos" tabindex="0">
  <div class="table-responsive py-4">
  <table class="table text-center textos mt-4">
    <thead>
      <tr>
        <th style="min-width:300px; ">#Actuación</th>
        <th style="min-width:300px; ">Fecha de presentación</th>
        <th style="min-width:200px; ">Fecha del acuerdo</th>
        <th style="min-width:300px; ">Nombre de la actuación</th>
        <th style="min-width:300px; ">Anexos</th>
        <th style="min-width:200px; ">Fecha de notificación</th>
        <th style="min-width:200px; ">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="py-3">Indemnización constitucional</td>
        <td class="py-3">Demanda Laboral</td>
        <td class="py-3">20/11/2021</td>
        <td class="py-3">Desahogo de pruebas</td>
        <td class="py-3">Salario diario por 90 días</td>
        <td class="py-3">90*</td>
        <td class="py-3">
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-file-arrow-down"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
        </td>
      </tr>
      <tr>
      <td class="py-3">Indemnización constitucional</td>
      <td class="py-3">Demanda Laboral</td>
      <td class="py-3">20/11/2021</td>
      <td class="py-3">Desahogo de pruebas</td>
      <td class="py-3">Salario diario por 90 días</td>
      <td class="py-3">90*</td>
      <td class="py-3">
      <button class="btn fondo-naranja fondo-azul2 text-white">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button class="btn fondo-naranja fondo-azul2 text-white">
        <i class="fa-solid fa-file-arrow-down"></i>
      </button>
      <button class="btn fondo-naranja fondo-azul2 text-white">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
      </td>
      </tr>
      <tr>
      <td class="py-3">Indemnización constitucional</td>
      <td class="py-3">Demanda Laboral</td>
      <td class="py-3">20/11/2021</td>
      <td class="py-3">Desahogo de pruebas</td>
      <td class="py-3">Salario diario por 90 días</td>
      <td class="py-3">90*</td>
      <td class="py-3">
      <button class="btn fondo-naranja fondo-azul2 text-white">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button class="btn fondo-naranja fondo-azul2 text-white">
        <i class="fa-solid fa-file-arrow-down"></i>
      </button>
      <button class="btn fondo-naranja fondo-azul2 text-white">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
      </td>
      </tr>
    </tbody>
  </table>
  </div> 
  </div>
  
  <!-- Acciones-->
  <div class="tab-pane fade mb-4" id="pills-acciones" role="tabpanel"  tabindex="0">
  <div class="table-responsive py-4">
  <table class="table text-center textos mt-4">
    <thead>
      <tr>
      <th style="min-width:100px;">Seleción</th>
      <th style="min-width:300px;">Acción</th>
      <th style="min-width:200px;">Salario</th>
      <th style="min-width:200px;">Fecha inicio</th>
      <th style="min-width:200px;">Fecha fin</th>
      <th style="min-width:300px;">Descipción operación</th>
      <th style="min-width:200px;">Operación</th>
      <th style="min-width:200px;">Total</th>
      <th style="min-width:200px;">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="py-3"><input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></td>
        <td class="py-3">Indemnización constitucional</td>
        <td>
          <input type="text"  class="form-control  form-control-lg fs-6 fw-normal" placeholder="Salario"/>
        </td>
        <td class="py-3">20/11/2021</td>
        <td class="py-3">16/01/2023</td>
        <td class="py-3">Salario diario por 90 días</td>
        <td class="py-3">90*</td>
        <td class="py-3">$0.00</td>
        <td class="py-3">
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-file-arrow-down"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
        </td>
      </tr>
      <tr>
      <td class="py-3"><input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></td>
        <td class="py-3">Indemnización constitucional</td>
        <td>
          <input type="text"  class="form-control  form-control-lg fs-6 fw-normal" placeholder="Salario"/>
        </td>
        <td class="py-3">20/11/2021</td>
        <td class="py-3">16/01/2023</td>
        <td class="py-3">Salario diario por 90 días</td>
        <td class="py-3">90*</td>
        <td class="py-3">$0.00</td>
        <td class="py-3">
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-file-arrow-down"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
        </td>
      </tr>
      <tr>
      <td class="py-3"><input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></td>
        <td class="py-3">Indemnización constitucional</td>
        <td>
          <input type="text"  class="form-control  form-control-lg fs-6 fw-normal" placeholder="Salario"/>
        </td>
        <td class="py-3">20/11/2021</td>
        <td class="py-3">16/01/2023</td>
        <td class="py-3">Salario diario por 90 días</td>
        <td class="py-3">90*</td>
        <td class="py-3">$0.00</td>
        <td class="py-3">
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-file-arrow-down"></i>
        </button>
        <button class="btn fondo-naranja fondo-azul2 text-white">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  </div>

  <!-- Excepciones-->
  <div class="tab-pane fade" id="pills-excepciones" role="tabpanel"  tabindex="0">
  <div class="auto-height"></div>
  </div>

  <!-- Pruebas-->
  <div class="tab-pane fade" id="pills-pruebas" role="tabpanel"  tabindex="0">
  <div class="auto-height"></div>
  </div>

  <!-- Resolucion-->
  <div class="tab-pane fade" id="pills-resolucion" role="tabpanel"  tabindex="0">
  <div class="auto-height"></div>
  </div>

  <!-- Conciliacion-->
  <div class="tab-pane fade " id="pills-conciliacion" role="tabpanel"  tabindex="0">
  <div class="top-50 start-50">
  <div class="col-12">
  <div class="card bg-white py-4">
    <div class="px-4">
      <h5 >Conciliación y mediación</h5>
    </div>
    <div class="row px-4 mt-4 rounded">
      <div class="col-12 fondo-gris"> 
        <div class="row">
          <div class="col-8">
            <span class="fst-italic">Se ofrecio la cantidad de $40,000.00</span>
          </div>
          <div class="col-4 text-end"></div>
          <div class="col-12 text-end pe-2 font-14">
            <span>Fecha: 25 Ene 2022</span>
            <p>Por:Antonio Ramiro</p>
          </div>
        </div>
      </div>
      <div class="row mt-3 mb-2 ms-1">
        <div class="col-12 text-end ms-4">
          <button type="button" class="btn fondo-naranja boton-naranja">
            <span>Se acepta</span>
          </button>
          <button type="button" class="btn ms-2 fondo-naranja boton-naranja">
            <span>No acepta</span>
          </button>
        </div>
      </div>
      <div class="col-6 mb-3 fw-semibold">Representado: Actor</div>
      <div class="col-md-12 mb-4">
        <div class="form-outline">
          <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Nombre</label>
          <input type="email" class="form-control form-control-lg fs-6 fw-normal fondo-gris border-0" placeholder="Ramiro Antonio"/>
        </div>
      </div>
      <div class="col-md-12 mb-4">
        <div class="form-outline">
          <label class="form-label fw-normal  color-negro" for="typeEmailX-2 ">Ingresar cantidad</label>
          <input type="email" class="form-control form-control-lg fs-6 fw-normal" placeholder="Ingresar cantidad"/>
          <p class="fst-italic px-2 color-gris2 mt-2" >Escriba una cantidad, presione enter para guardar</p>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
  </div>

  <!-- Reportes-->
  <div class="tab-pane fade" id="pills-reportes" role="tabpanel"  tabindex="0">
  <div class="auto-height"></div>
  </div>

  <!-- Documentos-->
  <div class="tab-pane fade" id="pills-documentos" role="tabpanel"  tabindex="0">
  <div class="table-responsive py-4">
                  <table class="table text-center textos">
                    <thead>
                      <tr>
                        <th style="min-width:200px widht:20%;">Documento</th>
                        <th style="min-width:200px widht:10%;">No. Expediente</th>
                        <th style="min-width:200px widht:10%;">Fecha inicio</th>
                        <th style="min-width:200px widht:10%;">Fecha Final</th>
                        <th style="min-width:200px widht:10%;">Acción</th>
                        <th style="min-width:120px widht:10%;">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Contrato individual de trabajo</td>
                        <td>12/20220/14-A</td>
                        <td>01/02/2018</td>
                        <td class="color-gris2">Sin Fecha</td>
                        <td>2552/2015/15-A</td>
                        <td>
                        <button class="btn boton-azul  gap-2 fondo-azul2 text-white" onclick="showDetalle('divGenerales','divExpedientes')">
                          <i class="fa-solid fa-eye px-2"></i><span>Ver</span>
                          </td>
                      </tr>
                      <tr>
                      <td>Contrato individual de trabajo</td>
                      <td>12/20220/14-A</td>
                      <td>01/02/2018</td>
                      <td class="color-gris2">Sin Fecha</td>
                      <td>2552/2015/15-A</td>
                      <td>
                      <button class="btn boton-azul  gap-2 fondo-azul2 text-white" onclick="showDetalle('divGenerales','divExpedientes')">
                        <i class="fa-solid fa-eye px-2"></i><span>Ver</span>
                        </td>
                      <tr>
                        <td>Contrato individual de trabajo</td>
                        <td>12/20220/14-A</td>
                        <td>01/02/2018</td>
                        <td class="color-gris2">Sin Fecha</td>
                        <td>2552/2015/15-A</td>
                        <td>
                        <button class="btn boton-azul  gap-2 fondo-azul2 text-white" onclick="showDetalle('divGenerales','divExpedientes')">
                          <i class="fa-solid fa-eye px-2"></i><span>Ver</span>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
  </div>
</div>
</div>
</div>


  `;
  divContent.removeClass("mt-5 text-center").html(html);
  // const getInfo = await requestAxios('GET', 'urlapizifris', {});
  // if(getInfo.code === 200) {
  //     console.log('Todo verde');
  // } else {
  //     console.log('Fallo');
  // }
};

////////////////////////
///// BITÁCORA
////////////////////////

const renderBitacora = async (divContent) => {
  initiTitle("Bitácora");
  const html = `
  <!--Titulo-->
  <div class="bg-white">
    <div id="">
    <!--Tabs end-->
      <div class="row px-5 pt-5">
        <div class="col-6">
        <h2>Bitácora Audiencias</h2>
        </div>
          <div class="col-6 text-end">
          <ul class="nav nav-pills mt-3 justify-content-end" id="pills-tab">
            <li class="nav-item dropdown">
    <a class="nav-link nav-verde  dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
    <i class="fa-solid fa-sliders px-2"></i>
    Filtrar por tipo
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Expediente personal</a></li>
      <li><a class="dropdown-item" href="#">Expediente de seguridad social</a></li>
      <li><a class="dropdown-item" href="#">Expediente de personalidad</a></li>
    </ul>
  </li>
            <li class="nav-item dropdown">
    <a class="nav-link  nav-verde dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
    <i class="fa-solid fa-sliders px-2"></i>
    Filtrar
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Expediente personal</a></li>
      <li><a class="dropdown-item" href="#">Expediente de seguridad social</a></li>
      <li><a class="dropdown-item" href="#">Expediente de personalidad</a></li>
    </ul>
  </li>    
  <li class="nav-item" role="presentation">
  <button class="nav-link active"  data-bs-toggle="modal" data-bs-target="#agregarTarea" aria-controls="pills-contact" aria-selected="false">Agregar tarea</button>
</li>
</ul>
        </div>
        <div class="row">
        <div class="col-4 mb-3">
        <span class="badge fondo-gris fs-6">Semana del 1 al 7 de Diciembre 2021</span>
        </div>
        </div>    
                          <hr class="mb-5">
                          <div class"table-responsive">
                          <div class="table-responsive py-4">
  <table class="table text-center textos mt-4 mb-4">
    <thead>
      <tr>
        <th style="min-width:300px; ">Cliente</th>
        <th style="min-width:300px; ">Lugar</th>
        <th style="min-width:200px; ">Junta/Tribunal</th>
        <th style="min-width:300px; ">Día</th>
        <th style="min-width:300px; ">Hora</th>
        <th style="min-width:200px; ">Tipo</th>
        <th style="min-width:200px; ">Documentos</th>
        <th style="min-width:200px; ">Oferente</th>
        <th style="min-width:200px; ">A cargo</th>
        <th style="min-width:200px; ">Absolvente</th>
        <th style="min-width:200px; ">Citación</th>
        <th style="min-width:200px; ">Observaciones</th>
        <th style="min-width:200px; ">Notas</th>
        <th style="min-width:200px; ">Atiende</th>
        <th style="min-width:200px; ">Estatus</th>
        <th style="min-width:200px; ">Hora inicio</th>
        <th style="min-width:200px; ">Hora final</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="py-3">Aluguesa</td>
        <td class="py-3">GDL</td>
        <td class="py-3">Junta Especial #15</td>
        <td class="py-3">20/11/2021</td>
        <td class="py-3">1:00 pm</td>
        <td class="py-3">Desahogo de pruebas</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Observaciones 2</td>
        <td class="py-3">Notas 2</td>
        <td class="py-3">DAM</td>
        <td class="py-3"><span class="badge fondo-naranja2">Traspasar</span></td>
        <td class="py-3">10:42 am</td>
        <td class="py-3">02:24 pm</td>
        
      </tr>
      <tr>
      <td class="py-3">Aluguesa</td>
        <td class="py-3">GDL</td>
        <td class="py-3">Junta Especial #15</td>
        <td class="py-3">20/11/2021</td>
        <td class="py-3">1:00 pm</td>
        <td class="py-3">Desahogo de pruebas</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Loremp ipsum</td>
        <td class="py-3">Observaciones 2</td>
        <td class="py-3">Notas 2</td>
        <td class="py-3"><a class="btn fondo-azul3">Asignar</a></td>
        <td class="py-3"><span class="badge fondo-verde2">Atendido</span></td>
        <td class="py-3">10:42 am</td>
        <td class="py-3">02:24 pm</td>
      </tr>
      <tr>
      <td class="py-3">Aluguesa</td>
      <td class="py-3>GDL</td>
      <td class="py-3>GDL</td>
      <td class="py-3">Junta Especial #15</td>
      <td class="py-3">20/11/2021</td>
      <td class="py-3">1:00 pm</td>
      <td class="py-3">Desahogo de pruebas</td>
      <td class="py-3">Loremp ipsum</td>
      <td class="py-3">Loremp ipsum</td>
      <td class="py-3">Loremp ipsum</td>
      <td class="py-3">Loremp ipsum</td>
      <td class="py-3">Loremp ipsum</td>
      <td class="py-3">Observaciones 2</td>
      <td class="py-3">Notas 2</td>
      <td class="py-3"><a class="btn fondo-azul3">Asignar</a></td>
      <td class="py-3"><span class="badge fondo-rojo">Cancelado</span></td>
      <td class="py-3">10:42 am</td>
      <td class="py-3">02:24 pm</td>
      </tr>
    </tbody>
  </table>
  </div> 
                          </div>
                          </div>



                          <!--Modal Agregar Tarea-->
<div class="modal textos fade" id="agregarTarea" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Audiencias</h1>
        <button class="btn-close" data-bs-dismiss="modal">
        </button>
      </div>
      <div class="modal-body px-4">
        <div class="row mb-5 py-3">
        <div class="col-md-4 mb-3">
        <label class="form-label fw-normal color-negro">Cliente o prospecto</label>
        <select class="form-select">
          <option selected disabled>Seleccione una opción</option>
          <option value="1">Aluguesa</option>
          <option value="2">Alueguesa física</option>
          <option value="3">Aluguesa</option>
        </select>
      </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Expediente</label>
            <select class="form-select">
              <option selected disabled>Seleccione una opción</option>
              <option value="1">Cliente</option>
              <option value="2">Persona física</option>
              <option value="3">Persona Moral</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Hora y fecha</label>
            <select class="form-select">
              <option selected disabled>Seleccione hora y fecha</option>
              <option value="1">Cliente</option>
              <option value="2">Persona física</option>
              <option value="3">Persona Moral</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Domicilio de la audiencia</label>
            <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Domicilio de la audiencia"/>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Tipo de audiencia</label>
            <select class="form-select">
              <option selected disabled>Seleccione una opción</option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
              <option value="3">Opción 3</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Documentos necesarios</label>
            <select class="form-select">
              <option selected disabled>Seleccione una opción</option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
              <option value="3">Opción 3</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Oferente</label>
            <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Oferente"/>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">A cargo</label>
            <select class="form-select">
              <option selected disabled>Seleccione una opción</option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 3</option>
              <option value="3">Opción 1</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Absolvente / Tetigos</label>
            <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Absolvente / Testigos"/>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Citación</label>
            <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Citación"/>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Observaciones</label>
            <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Observaciones"/>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Notas</label>
            <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Notas"/>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Atiende</label>
            <select class="form-select">
              <option selected disabled>Seleccione una opción</option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
              <option value="3">Opción 3</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
        <button class="btn fondo-gris px-5" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn fondo-naranja boton-naranja px-5">Agregar</button>
      </div>
</div>
</div>
</div>

  `;
  divContent.removeClass("mt-5 text-center").html(html);
  // const getInfo = await requestAxios('GET', 'urlapizifris', {});
  // if(getInfo.code === 200) {
  //     console.log('Todo verde');
  // } else {
  //     console.log('Fallo');
  // }
};

////////////////////////
///// DOCUMENTOS
////////////////////////

const renderDocumentos = async (divContent) => {
  initiTitle("Documentos");
  const html = `
  <!--Titulo-->
  <div class="bg-white">
  <div id="contenidoDocumentos">
  <div class="row px-5 pt-5">
      <div class="col-6">
        <h2>Documentos</h2>
      </div>
      <div class="col-6 text-end">
        <button  class="btn fondo-naranja boton-naranja" data-bs-toggle="modal" data-bs-target="#agregarDocumento">
          Nuevo documento
        </button>
      </div>
    </div>
  <hr class="mb-5">

  <!-- Tabs -->
<div class="row px-5 mt-4 text-end">
<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
<li class="nav-item dropdown">
    <a class="nav-link active dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Expediente</a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Expediente personal</a></li>
      <li><a class="dropdown-item" href="#">Expediente de seguridad social</a></li>
      <li><a class="dropdown-item" href="#">Expediente de personalidad</a></li>
    </ul>
  </li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-tramites-tab" data-bs-toggle="pill" data-bs-target="#pills-tramites" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Trámites</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-escritos-tab" data-bs-toggle="pill" data-bs-target="#pills-escritos" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Escritos</button>
</li>
<li class="nav-item" role="presentation">
  <button class="nav-link" id="pills-varios-tab" data-bs-toggle="pill" data-bs-target="#pills-varios" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Varios</button>
</li>

</ul>
</div>
<div class="col-6 text-end">
<div class="dropdown">
          <button class="btn color-negro px-3 py-2 fondo-verde boton-verde sombra1 color-azul dropdown-toggle border-0" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-sliders px-2"></i>
            Filtrar
          </button>
          <ul class="dropdown-menu dropdown-menu-end border-0 py-4">
            <li><a class="dropdown-item" href="#">Expediente personal</a></li>
            <li><a class="dropdown-item" href="#">Expediente de seguridad social</a></li>
            <li><a class="dropdown-item" href="#">Expediente de personalidad</a></li>
          </ul>
        </div>
</div>
</div>
<div class="table-responsive mb-5">
<table class="table text-center textos mt-5">
        <thead>
          <tr>
            <th style="min-width:300px; width:40%">Nombre</th>
            <th style="min-width:200px; width:25%">Número de expediente</th>
            <th style="min-width:200px; width:25%">Fecha inicio</th>
            <th style="min-width:200px; width:25%">Fecha final</th>
            <th style="min-width:120px; width:10%">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-3">Contrato</td>
            <td class="py-3">1212/2020/14-A</td>
            <td class="py-3">01/02/2018</td>
            <td class="py-3">Sin fecha</td>
            <td>
              <button class="btn boton-azul fondo-azul2 text-white" onclick="showDetalle('detalleCliente','divContenidoCliente')">
                <i class="fa-solid fa-eye me-2"></i>
                Ver
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3">Recibo de nómina</td>
            <td class="py-3">1212/2020/14-A</td>
            <td class="py-3">01/02/2018</td>
            <td class="py-3">15/02/2018</td>
            <td>
              <button class="btn boton-azul fondo-azul2 text-white" onclick="showDetalle('detalleCliente','divContenidoCliente')">
                <i class="fa-solid fa-eye me-2"></i>
                Ver
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3">Contrato individual de trabajo</td>
            <td class="py-3">1212/2020/14-A</td>
            <td class="py-3">01/02/2018</td>
            <td class="py-3">15/02/2018</td>
            <td>
              <button class="btn boton-azul fondo-azul2 text-white" onclick="showDetalle('detalleCliente','divContenidoCliente')">
                <i class="fa-solid fa-eye me-2"></i>
                Ver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
</div>

</div>
</div>

<!--Modal Agregar documento-->
<div class="modal textos fade" id="agregarDocumento" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Carga de documentos</h1>
        <button class="btn-close" data-bs-dismiss="modal">
        </button>
      </div>
      <div class="modal-body px-4">
        <span>Seleccione la categoría y despues el archivo a subir</span>
        <div class="row mb-5 py-3">
        <div class="col-md-4 mb-3">
        <label class="form-label fw-normal color-negro">Categoría</label>
        <select class="form-select">
          <option selected disabled>Seleccione una opción</option>
          <option value="1">Cliente</option>
          <option value="2">Persona física</option>
          <option value="3">Persona Moral</option>
        </select>
      </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Subcategoría</label>
            <select class="form-select">
              <option selected disabled>Seleccione una opción</option>
              <option value="1">Cliente</option>
              <option value="2">Persona física</option>
              <option value="3">Persona Moral</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-normal color-negro">Tipo de expediente</label>
            <input type="text" class="form-control form-control-lg fs-6 fw-normal" placeholder="Tipo de expediente"/>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-md-12 mb-3 text-center">
          <h5>Arrastre un archivo o presione aquí para adjuntar</h5>
          <label >Tamaño máximo permitido</label>
          <input class="form-control  box py-5 text-center" type="file" id="formFileMultiple" multiple>
          </div>
          </div>
        <div class="row mb-4">
          <div class="col-md-12 mb-3">
          <label for="floatingTextarea2" >Observaciones</label>
          <textarea class="form-control" placeholder="Observaciones" id="floatingTextarea2" style="height: 100px"></textarea>
          </div>
          </div>
      <div class="modal-footer">
        <button class="btn fondo-gris px-5" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn fondo-naranja boton-naranja px-5">Agregar</button>
      </div>
</div>
</div>
</div>
</div>
  `;
  divContent.removeClass("mt-5 text-center").html(html);
  // const getInfo = await requestAxios('GET', 'urlapizifris', {});
  // if(getInfo.code === 200) {
  //     console.log('Todo verde');
  // } else {
  //     console.log('Fallo');
  // }
};
