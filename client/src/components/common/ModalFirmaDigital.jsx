/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { BlockUI } from 'primereact/blockui';
import { InputText } from 'primereact/inputtext';

import { useAppSelector } from '@/store/hooks';
import { useEffect, useRef, useState } from 'react';
import { Steps } from 'primereact/steps';

import { LacunaWebPKI } from 'web-pki'

import axios from 'axios';

const firmaDigitalInitialState = {
	fileFirma: null,
	certificado: null,
};

const items = [
	{
		label: 'Detalles',
	},
	{
		label: 'Firma Digital',
	},
	{
		label: 'Confirmación',
	},
];

export const ModalFirmaDigital = ({ visible, setVisible, firmaData }) => {

	const [firmaDigitalForm, setFirmaDigitalForm] = useState({...firmaDigitalInitialState, fileFirma: firmaData});
	const [activeIndex, setActiveIndex] = useState(0);
	const [certificados, setCertificados] = useState([]);
	const [token, setToken] = useState('');

	const [blocked, setBlocked] = useState(false);

	const fileRef = useRef(null);

	const pki = new LacunaWebPKI()

	const { user } = useAppSelector((state) => state.auth);

	const accept = () => {
		if (!token || !firmaDigitalForm.certificado) return;
		pki.signWithRestPki({
			token: token,
			thumbprint: firmaDigitalForm.certificado
		}).success(() => {
			axios.post('http://localhost:4000/api/restpki/finish-signature', { token: token }).then(() => {
				setBlocked(false);
				setActiveIndex((prev) => prev + 1);
			})
		});
	};



	const handleInputChange = (ev) => {
		setFirmaDigitalForm({
			...firmaDigitalForm,
			[ev.target.name]: ev.target.value,
		});
	};

	const onHide = () => {
		setActiveIndex(0);
		setFirmaDigitalForm(firmaDigitalInitialState);
		setVisible(false);
	};

	const handleNextIndex = () => {
		if (activeIndex >= 2) {
			return;
		}
		setActiveIndex((prev) => prev + 1);
		console.log(activeIndex);
		if (activeIndex + 1 === 1) startFirma();

	};

	const handlePrevIndex = () => {
		if (activeIndex <= 0) {
			return;
		}

		setActiveIndex((prev) => prev - 1);
	};

	const handleUploadFile = (e) => {
		setFirmaDigitalForm({
			...firmaDigitalForm,
			fileFirma: e.target.files[0],
		});
	};


	const startFirma = () => {
		setBlocked(true);
		if (firmaDigitalForm.fileFirma) {
			const data = new FormData();
			data.append('fileFirma', firmaDigitalForm.fileFirma);
			axios.post('http://localhost:4000/api/restpki/start-signature', data).then((res) => {
				setToken(res.data.token);
				setBlocked(false);
			});
		}
	}

	const completeFirma = (event) => {
		confirmPopup({
			target: event.currentTarget,
			message: '¿Esta seguro de firmar el documento?',
			icon: 'pi pi-info-circle',
			accept,
		});
	};

	const finalizarFirma = () => {
		onHide();
	}

	const getCertificados = () => {
		pki.init({
			ready: () => pki.listCertificates({ filter: pki.filters.isWithinValidity }).success((certs) => {
				setCertificados(certs?.map(c => ({ label: c.subjectName, value: c.thumbprint })))
			})
		})
	}

	useEffect(() => {
		getCertificados()
	}, [])

	return (
		<>
			<BlockUI blocked={blocked} fullScreen template={
				<ProgressSpinner style={{ width: '10em', height: '10em' }} strokeWidth="3" />
			} />
			<Dialog
				draggable={false}
				header={`Realizar firma digital`}
				visible={visible}
				onHide={onHide}
				className='md:w-6 w-8'
			>
				<Steps model={items} activeIndex={activeIndex} readOnly />
				<form className='mx-4 mt-6'>
					{activeIndex === 0 && (
						<section className='mx-2'>
							<div className='mb-5'>
								<label htmlFor='usuario'>Usuario</label>
								<InputText
									id='usuario'
									name='usuario'
									className='w-full mt-2'
									disabled={true}
									value={user.username}
								/>
							</div>

							<div className='mb-5'>
								<label htmlFor='competencia'>Documento a firmar</label>
								<br />
								<input type="file" name="asdasd" id="asdasdasd" ref={fileRef} onChange={handleUploadFile} />
							</div>
						</section>
					)}

					{activeIndex === 1 && (
						<section className='mx-2'>
							<div className='mb-5'>
								<h3>Archivos a Firmar</h3>
								<label htmlFor='archivoFirmar'>Seleccione un Certificado*</label>
								<Dropdown
									id='certificado'
									name='certificado'
									className='w-full mt-2'
									value={firmaDigitalForm.certificado}
									onChange={handleInputChange}
									options={certificados}
									optionLabel='label'
									optionValue='value'
								/>

								<div className='mt-5'>
									<Button
										size='small'
										label='Firmar Archivos'
										className='btn-blue-mpa mr-2'
										type='button'
										onClick={completeFirma}
									/>

									<Button
										size='small'
										label='Actualizar Certificados'
										className='bg-bluegray-100 text-gray-900 border-bluegray-100 hover:bg-bluegray-200'
										type='button'
										onClick={getCertificados}
									/>
								</div>
							</div>
						</section>
					)}

					{activeIndex === 2 && (
						<section className='mx-2 my-6'>
							<div className='mb-5'>
								<div className=''>
									<h3>Resumen</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, fugiat! Fuga, ipsam. Quidem ducimus, expedita nam iure recusandae amet exercitationem rem, magni fugit a aspernatur? Quia ex minus maiores exercitationem!</p>
								</div>
							</div>
						</section>
					)}

					<div className='flex justify-content-between'>
						<div>
							{activeIndex !== 0 && (
								<Button
									icon='pi pi-chevron-left'
									iconPos='left'
									label='Anterior'
									className='text-lightblue-mpa'
									type='button'
									link
									onClick={handlePrevIndex}
								/>
							)}
						</div>

						<div>
							{activeIndex !== 2 && (
								<Button
									icon='pi pi-chevron-right'
									iconPos='right'
									label='Siguiente'
									className='text-lightblue-mpa'
									type='button'
									link
									onClick={handleNextIndex}
								/>
							)}
							{activeIndex === 2 && (
								<Button
									label='Finalizar Pase'
									className='btn-blue-mpa'
									type='button'
									onClick={finalizarFirma}
								/>
							)}
						</div>
					</div>
				</form>
				<ConfirmPopup />
			</Dialog>
		</>
	);
};