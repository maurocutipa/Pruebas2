export const downloadFile = function (archivo, nombre) {
  const link = document.createElement('a');
  link.href = archivo;
  link.target = '_blank';
  link.download = nombre;

  document.body.appendChild(link);

  link.click();

  link.parentNode.removeChild(link);
};
