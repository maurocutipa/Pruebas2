export const toastSuccess = (toast, detail) => {
  toast.current.show({
    severity: 'success',
    summary: 'Éxito',
    detail,
    life: 3000,
  });
};

export const toastError = (toast, detail) => {
  toast.current.show({
    severity: 'error',
    summary: 'Error',
    detail,
    life: 3000,
  });
};
