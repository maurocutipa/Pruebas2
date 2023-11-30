import {internalApi} from '.';

const URLS = {
  startSignature: '/restpki/start-signature',
  finishSignature: '/restpki/finish-signature',
};

export const startSignature = async (formData) => {
  try {
    const { data } = await internalApi.post(URLS.startSignature, formData);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const finishSignature = async (body) => {
  try {
    const { data } = await internalApi.post(URLS.finishSignature, body);

    return data;
  } catch (error) {
    console.log(error);
  }
};
