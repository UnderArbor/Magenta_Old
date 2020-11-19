import React from 'react';

const CardArt = ({ src, offset, zIndex, position, vOffset, className }) => {
	return (
		<img
			draggable="true"
			className={className}
			src={src}
			style={{
				left: `${offset}`,
				zIndex,
				position: `${position}`,
				top: `${vOffset}`,
			}}
			alt="Whoopsie"
		></img>
	);
};

CardArt.propTypes = {};

export default CardArt;
