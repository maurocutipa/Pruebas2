import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { locale, addLocale } from 'primereact/api';
import { Worker } from '@react-pdf-viewer/core';

import { store } from './store/index.js';
import { AppRouter } from './router';

import './styles/index.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

addLocale('es', {
  startsWith: 'Comience con',
  contains: 'Contenga',
  notContains: 'No contenga',
  endsWith: 'Termine con',
  equals: 'Igual a',
  notEquals: 'Diferente a',
  noFilter: 'Sin filtro',
  lt: 'Menor que',
  lte: 'Menor o igual a',
  gt: 'Mayor que',
  gte: 'Mayor o igual a',
  dateIs: 'Fecha igual a',
  dateIsNot: 'Fecha diferente a',
  dateBefore: 'Fecha antes de',
  dateAfter: 'Fecha después de',
  custom: 'Personalizar',
  clear: 'Limpiar',
  apply: 'Aplicar',
  matchAll: 'Coincidir todo',
  matchAny: 'Coincidir con cualquiera',
  addRule: 'Agregar regla',
  removeRule: 'Eliminar regla',
  accept: 'Sí',
  reject: 'No',
  choose: 'Escoger',
  upload: 'Subir',
  cancel: 'Cancelar',
  fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  today: 'Hoy',
  now: 'Ahora',
  weekHeader: 'Sem',
  firstDayOfWeek: 1,
  showMonthAfterYear: false,
  dateFormat: 'dd/mm/yy',
  weak: 'Débil',
  medium: 'Medio',
  strong: 'Fuerte',
  passwordPrompt: 'Escriba una contraseña',
  emptyFilterMessage: 'Sin opciones disponibles',
  emptyMessage: 'No se han encontrado resultados',
  aria: {
    trueLabel: 'Verdadero',
    falseLabel: 'Falso',
    nullLabel: 'No seleccionado',
    star: '1 estrella',
    stars: '{star} estrellas',
    selectAll: 'Seleccionar todos',
    unselectAll: 'Deseleccionar todos',
    close: 'Cerrar',
    previous: 'Anterior',
    next: 'Siguiente',
    navigation: 'Navegación',
    scrollTop: 'Desplazarse hacia arriba',
    moveTop: 'Mover arriba',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    moveBottom: 'Desplazarse hacia abajo',
    moveToTarget: 'Mover al objetivo',
    moveToSource: 'Mover al origen',
    moveAllToTarget: 'Mover todo al objetivo',
    moveAllToSource: 'Mover todo al origen',
    pageLabel: 'Página {page}',
    firstPageLabel: 'Primera Página',
    lastPageLabel: 'Última Página',
    nextPageLabel: 'Siguiente Página',
    previousPageLabel: 'Página Anterior',
    rowsPerPageLabel: 'Filas por página',
    jumpToPageDropdownLabel: 'Ir al menú desplegable de página',
    jumpToPageInputLabel: 'Ir a la entrada de página',
    selectRow: 'Seleccionar fila',
    unselectRow: 'Desmarcar fila',
    expandRow: 'Expandir Fila',
    collapseRow: 'Reducir Fila',
    showFilterMenu: 'Mostrar menú del filtro',
    hideFilterMenu: 'Ocultar menú del filtro',
    filterOperator: 'Operador de filtro',
    filterConstraint: 'Restricción de filtro',
    editRow: 'Editar fila',
    saveEdit: 'Guardar editado',
    cancelEdit: 'Cancelar editado',
    listView: 'Vista de lista',
    gridView: 'Vista de cuadrícula',
    slide: 'Deslizar',
    slideNumber: '{slideNumber}',
    zoomImage: 'Ampliar imagen',
    zoomIn: 'Ampliar',
    zoomOut: 'Reducir',
    rotateRight: 'Girar a la derecha',
    rotateLeft: 'Girar a la izquierda',
  },
});

const value = {
  pt: {
    inputtext: { root: { autoComplete: 'off', className: '' } },
    selectbutton: {
      button: ({ context }) => ({
        className: context.selected ? 'btn-blue-mpa' : undefined,
      }),
    },
    calendar: {
      dropdownButton: {
        root: { className: 'btn-blue-mpa' },
      },
    },
    steps: {
      action: { className: 'hover:bg-white' },
    },
    confirmDialog: {
      rejectButton: { label: 'text-blue-mpa' },
    },
    confirmPopup: {
      root: { className: 'surface-100' },
      acceptButton: { root: { className: 'btn-blue-mpa' } },
      rejectButton: { root: { className: 'text-blue-mpa' } },
    },
    menu: {
      label: { className: 'text-gray-800 font-medium' },
      action: { className: 'hover:bg-gray-300' },
    },
    checkbox: {
      input: (value) => ({
        className: `${value.context.checked ? 'btn-blue-mpa' : undefined}`,
      }),
    },
  },
};

locale('es');
ReactDOM.createRoot(document.getElementById('root')).render(
  <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
    <PrimeReactProvider value={value}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </PrimeReactProvider>
  </Worker>
);
