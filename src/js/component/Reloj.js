import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

const Reloj = () => {
	const [hora, setHora] = useState(0);
	const [horaAtras, setHoraAtras] = useState(0);
	const [preHoraAtras, setPreHoraAtras] = useState(0);
	const [cuentaArriba, setCuentaArriba] = useState(true);
	const [cuentaAbajo, setCuentaAbajo] = useState(false);
	const [mostrarForm, setMostrarForm] = useState(false);
	const [alarma, setAlarma] = useState(null);
	const [preAlarma, setPreAlarma] = useState(null);
	const [mostrarAlarma, setMostrarAlarma] = useState(false);
	const [unaAlarma, setUnaAlarma] = useState(false);
	const [seVeArriba, setSeVeArriba] = useState(true);
	// cuando se ve arriba es true se ve el contador para PushSubscription, cuando es falso se ve el contador hacia abajo

	const comenzar = () => {
		if (seVeArriba) {
			setCuentaArriba(true);
		}
		if (!seVeArriba) {
			setCuentaAbajo(true);
		}
	};

	const detener = () => {
		if (seVeArriba) {
			setCuentaArriba(false);
		}
		if (!seVeArriba) {
			setCuentaAbajo(false);
		}
	};

	const reinicar = () => {
		if (seVeArriba) {
			setHora(0);
			setUnaAlarma(false);
			setCuentaArriba(true);
		}
		if (!seVeArriba) {
			setHoraAtras(preHoraAtras);
			setUnaAlarma(false);
			setCuentaAbajo(true);
		}
	};

	const numerosImprimir = () => {
		if (seVeArriba) {
			let numerosImprimir = [];
			numerosImprimir = hora.toString().split("");
			if (numerosImprimir.length < 6) {
				let agregar = 6 - numerosImprimir.length;
				for (let i = agregar; i > 0; i--) {
					numerosImprimir.unshift("0");
				}
			}
			return numerosImprimir;
		}

		if (!seVeArriba) {
			let numerosImprimir = [];
			numerosImprimir = horaAtras.toString().split("");
			if (numerosImprimir.length < 6) {
				let agregar = 6 - numerosImprimir.length;
				for (let i = agregar; i > 0; i--) {
					numerosImprimir.unshift("0");
				}
			}
			return numerosImprimir;
		}
	};

	const llegadaAlNumero = () => {
		if (seVeArriba) {
			if ((hora - 1).toString() === alarma && !unaAlarma) {
				setUnaAlarma(true);
				alert(`Se alcanzo el numero ${alarma}`);
			}
		}
		if (!seVeArriba) {
			if ((horaAtras + 1).toString() === alarma && !unaAlarma) {
				setUnaAlarma(true);
				alert(`Se alcanzo el numero ${alarma}`);
			}
		}
	};

	useEffect(() => {
		if (cuentaArriba) {
			setTimeout(() => setHora(preHora => preHora + 1), 1000);
		}
		if (cuentaAbajo && horaAtras > 0) {
			setTimeout(() => setHoraAtras(preHora => preHora - 1), 1000);
		}
	}, [hora, horaAtras, cuentaArriba, cuentaAbajo]);

	return (
		<div className="contenido">
			<div className="reloj">
				<i className="far fa-clock"></i>

				{seVeArriba && (
					<div onChange={llegadaAlNumero()}>
						<span>{numerosImprimir()[0]}</span>
						<span>{numerosImprimir()[1]}</span>
						<span>{numerosImprimir()[2]}</span>
						<span>{numerosImprimir()[3]}</span>
						<span>{numerosImprimir()[4]}</span>
						<span>{numerosImprimir()[5]}</span>
					</div>
				)}

				{!seVeArriba && (
					<div onChange={llegadaAlNumero()}>
						<span>{numerosImprimir()[0]}</span>
						<span>{numerosImprimir()[1]}</span>
						<span>{numerosImprimir()[2]}</span>
						<span>{numerosImprimir()[3]}</span>
						<span>{numerosImprimir()[4]}</span>
						<span>{numerosImprimir()[5]}</span>
					</div>
				)}
			</div>

			<button onClick={comenzar}>Iniciar</button>
			<button onClick={detener}>Pausar</button>
			<button onClick={reinicar}>Reiniciar</button>
			<button onClick={() => setMostrarAlarma(true)}>
				Alarma en numero
			</button>
			{seVeArriba ? (
				<button onClick={() => setMostrarForm(true)}>
					Cuenta Atras
				</button>
			) : (
				<button
					onClick={() => {
						setHora(0);
						setSeVeArriba(true);
						setCuentaArriba(true);
					}}>
					Cuenta Arriba
				</button>
			)}

			{mostrarAlarma && (
				<div>
					<label>Numero para alarma</label>
					<input
						type="text"
						required
						onChange={e => setPreAlarma(e.target.value)}
					/>
					<button
						onClick={() => {
							setAlarma(preAlarma);
							setMostrarAlarma(false);
							setUnaAlarma(false);
						}}>
						Registrar numero para alarma
					</button>
				</div>
			)}

			{mostrarForm && (
				<div>
					<label>Que numero manao</label>
					<input
						type="text"
						required
						onChange={e => setPreHoraAtras(e.target.value)}
					/>
					<button
						onClick={() => {
							setSeVeArriba(false);
							setMostrarForm(false);
							setCuentaArriba(false);
							setHora(0);
							setUnaAlarma(false);
							setHoraAtras(preHoraAtras);
							setCuentaAbajo(true);
						}}>
						Inicio Cuenta Atras
					</button>
				</div>
			)}
		</div>
	);
};

export default Reloj;
