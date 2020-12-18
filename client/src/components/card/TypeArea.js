import React from 'react';
import Card from './Card';
import TypeHeader from './TypeHeader';

const TypeArea = ({ type, cards, indexBuffer, index }) => {
	const cardHolderClass = `cardContainer cardHolder hidden ${type.name}`;
	return (
		<div className="typeArea" style={{ width: '100%', float: 'left' }}>
			<TypeHeader type={type} index={index} />
			<hr className="typeBar" />
			<div className="typeGroupContainer">
				{cards.map((card, cardIndex) => (
					<div
						key={Number(cardIndex) + Number(indexBuffer)}
						style={{
							display: 'flex',
							flexDirection: 'row',
						}}
					>
						<div data-index={cardIndex} className={cardHolderClass}></div>
						<div
							key={String(Number(cardIndex) + Number(indexBuffer)).concat(
								'left'
							)}
							data-type={type.name}
							data-index={Number(cardIndex)}
							className="cardDropZone leftCardDropZone"
						></div>
						<Card
							card={card}
							key={card.name}
							name={card.name}
							set={card.setName}
							index={cardIndex + indexBuffer}
							typeIndex={cardIndex}
							typeName={type.name}
							quantity={card.quantity}
							manaCost={card.manaCost}
							src={card.cardArt}
							src2={card.cardImage}
						/>
						<div
							key={String(Number(cardIndex) + Number(indexBuffer)).concat(
								'right'
							)}
							data-type={type.name}
							data-index={Number(cardIndex) + 1}
							className="cardDropZone rightCardDropZone"
						></div>
					</div>
				))}
				<div data-index={cards.length} className={cardHolderClass}></div>
			</div>
			<div className="dropZone" data-id={index + 1}></div>
		</div>
	);
};

export default TypeArea;
