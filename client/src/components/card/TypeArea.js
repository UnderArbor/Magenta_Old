import React from 'react';
import Card from './Card';
import TypeHeader from './TypeHeader';
import { Draggable } from 'react-beautiful-dnd';

export default class TypeArea extends React.Component {
	// const TypeArea = ({ type, cards, indexBuffer, index, open, moveCards }) => {

	render() {
		const { type, cards, indexBuffer, index, open, moveCards } = this.props;
		console.log('cards: ', cards);
		return (
			<div className="typeGroup">
				{/* <Draggable>
					{(provided) => (
						<div
							data-type={type.name}
							className="typeArea"
							ref={provided.innerRef}
						> */}
				<TypeHeader type={type} index={index} />
				<hr className="typeBar" />
				{open ? (
					<div className="typeGroupContainer">
						{cards.map((card, cardIndex) => (
							<div
								key={Number(cardIndex) + Number(indexBuffer)}
								style={{
									display: 'flex',
									flexDirection: 'row',
								}}
							>
								{/* <div
									key={String(Number(cardIndex) + Number(indexBuffer)).concat(
										'left'
									)}
									data-type={type.name}
									data-index={Number(cardIndex)}
									className="cardDropZone leftCardDropZone"
								></div> */}
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
								{/* <div
									key={String(Number(cardIndex) + Number(indexBuffer)).concat(
										'right'
									)}
									data-type={type.name}
									data-index={Number(cardIndex) + 1}
									className="cardDropZone rightCardDropZone"
								></div> */}
							</div>
						))}
					</div>
				) : null}
				{/* </div>
					)}
				</Draggable> */}
			</div>
		);
	}
}
