import React from 'react';

const CardArt = ({
	src,
	offset,
	zIndex,
	position,
	vOffset,
	className,
	name,
}) => {
	return (
		<img
			draggable="true"
			className={className}
			src={src}
			data-name={name}
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
