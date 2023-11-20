/* eslint-disable react/prop-types */
export const InvalidFieldMessage = ({ formik, name }) => {
  return (
    <>
      {formik.touched[name] && formik.errors[name] ? (
        <small className='p-error'>{formik.errors[name]}</small>
      ) : null}
    </>
  );
};
