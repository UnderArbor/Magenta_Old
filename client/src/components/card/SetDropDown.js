import React, { useRef, useEffect } from 'react';
import SetOption from './SetOption';

const SetDropDown = ({ sets, image, setOpenSets, changeCardSet }) => {
	const setDropDown = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (setDropDown.current && !setDropDown.current.contains(event.target)) {
				setOpenSets(false);
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setDropDown, setOpenSets]);
	return (
		<div
			ref={setDropDown}
			className={sets.length > 10 ? 'setDropDown overflowY' : 'setDropDown'}
		>
			{sets.map((set, index) => (
				<SetOption
					set={set}
					key={index}
					index={index}
					image={image}
					changeCardSet={changeCardSet}
				/>
			))}
		</div>
	);
};

export default SetDropDown;
