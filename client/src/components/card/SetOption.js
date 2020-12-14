import React from 'react';

const SetOption = ({ set, index, image, changeCardSet }) => {
	return (
		<div>
			<div
				className="setOption"
				style={{ top: `${index * 36}px` }}
				key={set.setName.concat(index)}
				onMouseOver={() => {
					image.current.src = set.cardImage;
					image.current.classList.remove('hidden');
				}}
				onMouseLeave={() => image.current.classList.add('hidden')}
				onClick={() => changeCardSet(set)}
			>
				{set.setName}
			</div>
		</div>
	);
};
export default SetOption;
