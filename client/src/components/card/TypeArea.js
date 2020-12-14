import React from 'react';
import Card from './Card';
import TypeHeader from './TypeHeader';

const TypeArea = ({ type, cards, indexBuffer, index }) => {
	return (
		<div className="typeArea" style={{ width: '100%', float: 'left' }}>
			<TypeHeader type={type} index={index} />
			<hr style={{ marginBottom: '16px' }} className="normal" />
			<div className="typeGroupContainer">
				{cards.map((card, cardIndex) => (
					<div
						key={Number(cardIndex) + Number(indexBuffer)}
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '8px 0',
							marginRight: '9px',
						}}
					>
						<div
							key={Number(cardIndex) + Number(indexBuffer)}
							data-type={type.name}
							data-index={Number(cardIndex)}
							className="cardDropZone"
						></div>
						<Card
							card={card}
							key={card.name}
							name={card.name}
							set={card.setName}
							index={cardIndex + indexBuffer}
							quantity={card.quantity}
							manaCost={card.manaCost}
							src={card.cardArt}
							src2={card.cardImage}
						/>
					</div>
				))}
				<div
					key={type.name.concat('final')}
					data-type={type.name}
					data-index={cards.length}
					style={{ margin: '8px 0' }}
					className="cardDropZone"
				></div>
			</div>
			<div className="dropZone" data-id={index + 1}></div>
		</div>
	);
};

export default TypeArea;
