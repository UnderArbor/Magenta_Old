import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getSets from '../../utils/functions/getSets';
import SetDropDown from './SetDropDown';

import blackImage from '../../utils/images/Black.png';
import { changeCardSet } from '../../actions/deck';

const Settings = ({
	name,
	set,
	settingX,
	settingY,
	setSettings,
	changeCardSet,
	manaContainer,
	colorDisp,
	openSettings,
}) => {
	const [sets, setSets] = useState([]);
	const [openSets, setOpenSets] = useState(false);
	const [imageCoords, setImageCoords] = useState({
		top: Number(120),
		left: Number(364),
	});
	const [settingCoords, setSettingCoords] = useState({
		top: settingY,
		left: settingX,
	});
	const setImage = useRef(null);
	const settingWindow = useRef(null);

	useEffect(() => {
		async function getData() {
			const newSets = await getSets(name);
			setSets(newSets);
		}
		getData();
	}, [name]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				settingWindow.current &&
				!settingWindow.current.contains(event.target)
			) {
				setSettings(false);

				let cardArt = document.querySelectorAll('.cardArtContainer');
				cardArt.forEach(function (item) {
					item.style.opacity = '1';
				});

				if (colorDisp) {
					manaContainer.current.classList.remove('superhidden');
				}
				openSettings.current.classList.add('hidden');
				var cardImages = document.getElementsByClassName('cardInfo');
				for (var i = 0; i < cardImages.length; ++i) {
					if (
						name ===
						cardImages[i].childNodes[0].childNodes[
							cardImages[i].childNodes[0].childNodes.length - 1
						].childNodes[0].innerHTML
					) {
						cardImages[i].childNodes[0].classList.remove('noHover');
					} else {
						cardImages[i].classList.remove('noHover');
					}
				}
			}
		}
		if (settingCoords.left + 360 > window.innerWidth) {
			// eslint-disable-next-line
			settingX = settingCoords.left - 471;
			setSettingCoords({
				left: settingCoords.left - 471,
				top: settingCoords.top,
			});
		}

		if (settingX + 360 + imageCoords.left > window.innerWidth) {
			setImageCoords({ left: Number(-244) });
		} else {
			setImageCoords({ left: Number(364) });
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [settingWindow]);

	const updateCard = (setInfo) => {
		changeCardSet(setInfo, name);
	};

	return (
		<div
			ref={settingWindow}
			className="settingSelector"
			style={{ top: settingCoords.top, left: settingCoords.left }}
		>
			<div>
				<p className="settingName">{name}</p>
				<hr className="settingBar" />
			</div>
			<div className="setSelector">
				<p>Set: </p>
				<input className="setInput" placeholder={set}></input>
				<button
					className="setDropButton"
					onClick={() => setOpenSets(!openSets)}
				>
					Down
				</button>

				{openSets ? (
					<SetDropDown
						sets={sets}
						image={setImage}
						setOpenSets={setOpenSets}
						changeCardSet={updateCard}
					/>
				) : null}
			</div>
			<img
				ref={setImage}
				draggable="false"
				className="cardImage small hidden"
				style={{ left: `${imageCoords.left}px`, top: `${imageCoords.top}px` }}
				src={blackImage}
				alt="Doopsie"
			></img>

			<hr className="settingBar" />
		</div>
	);
};

Settings.propTypes = {
	changeCardSet: PropTypes.func.isRequired,
};

export default connect(null, { changeCardSet })(Settings);
