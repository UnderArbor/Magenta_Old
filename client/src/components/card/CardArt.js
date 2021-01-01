import React from 'react';

const CardArt = ({
	src,
	offset,
	zIndex,
	position,
	vOffset,
	className,
	name,
	typeIndex,
	typeName,
}) => {
	return (
		<img
			className={className}
			src={src}
			data-name={name}
			data-index={typeIndex}
			data-typename={typeName}
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
