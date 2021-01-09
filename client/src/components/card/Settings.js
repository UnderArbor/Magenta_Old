import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getSets from '../../utils/functions/getSets';
import SetDropDown from './SetDropDown';

import blackImage from '../../utils/images/Black.png';
import spinnerGif from '../../utils/gifs/spinner.gif';
import { changeCardSet } from '../../actions/deck';

const Settings = ({
	name,
	set,
	settingX,
	settingY,
	setSettings,
	changeCardSet,
	settingsRef,
	settingsIconRef,
}) => {
	const [sets, setSets] = useState({ setList: [], loading: false });
	const [filterSets, setFilterSets] = useState([]);
	const [openSets, setOpenSets] = useState(false);
	const [imageCoords, setImageCoords] = useState({
		top: Number(120),
		left: Number(364),
	});
	const [userQuery, setUserQuery] = useState('');

	const setImage = useRef(null);
	const settingWindow = useRef(null);

	useEffect(() => {
		async function getData() {
			setSets({ ...sets, loading: true });
			const newSets = await getSets(name);
			setSets({ ...sets, setList: newSets, loading: false });
			setFilterSets(newSets);
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

				let cardArt = document.querySelectorAll('.cardInfo');
				cardArt.forEach(function (item) {
					item.style.opacity = '1';
				});

				settingsRef.current.classList.remove('settingsHover');
				settingsIconRef.current.classList.remove('settingsIconHover');
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
				var typeHeaders = document.getElementsByClassName('typeHeader');
				for (var j = 0; j < typeHeaders.length; ++j) {
					typeHeaders[j].classList.remove('noHover');
					typeHeaders[j].style.opacity = '1';
				}
			}
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

		// eslint-disable-next-line
	}, [settingWindow, settingsRef]);

	useEffect(() => {
		if (userQuery !== '' && sets.loading === false) {
			var recommendArray = [];
			for (var i = 0; i < sets.setList.length; ++i) {
				if (
					sets.setList[i].setName
						.toUpperCase()
						.startsWith(userQuery.toUpperCase())
				) {
					recommendArray.push(sets.setList[i]);
				}
			}
			setFilterSets(recommendArray);
			setOpenSets(true);
		} else {
			setOpenSets(false);
		}
	}, [userQuery, sets.loading]);

	const updateCard = (setInfo) => {
		changeCardSet(setInfo, name);
	};

	return (
		<div
			ref={settingWindow}
			className="settingSelector"
			style={{ top: settingY + 'px', left: settingX + 'px' }}
		>
			<div>
				<p className="settingName">{name}</p>
				<hr className="settingBar" />
			</div>
			<div className="setSelector">
				<p>Set: </p>
				<input
					className="setInput"
					type="text"
					placeholder={set}
					value={userQuery}
					onChange={(e) => {
						setUserQuery(e.target.value);
					}}
					required
				></input>
				{sets.loading ? (
					<img
						className="loadingSpinner"
						src={spinnerGif}
						alt="loading..."
					></img>
				) : null}
				<button
					className="setDropButton"
					onClick={() => {
						setOpenSets(!openSets);
					}}
				>
					...
				</button>

				{openSets ? (
					<SetDropDown
						sets={filterSets}
						image={setImage}
						setOpenSets={setOpenSets}
						changeCardSet={updateCard}
						userQuery={userQuery}
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
