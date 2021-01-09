import React from 'react';
// import { ReactSortable } from 'react-sortablejs';
import { DragDropContext } from 'react-beautiful-dnd';
import TypeArea from './TypeArea';

// export const CardArea = ({ types, columnCount }) => {
export default class CardArea extends React.Component {
	render() {
		const { types, columnCount } = this.props;
		var cardAreaName = 'cardArea2';
		var indexBuffer = 0;
		if (columnCount === 1) {
			cardAreaName = 'cardArea1';
		} else if (columnCount === 2) {
			cardAreaName = 'cardArea2';
		} else if (columnCount === 3) {
			cardAreaName = 'cardArea3';
		}
		return (
			<div
				className={cardAreaName}
				style={{
					padding: '8px',
				}}
			>
				{/* <ReactSortable
				list={types}
				setList={moveTypes}
				ghostClass={'ghost'}
				animation={1000}
				easing={'cubic-bezier(0.16, 1, 0.3, 1)'}
			> */}
				<DragDropContext>
					{/* {types.map((type, index) => {
					indexBuffer += type.cards.length;
					return (
						<TypeArea
							key={type.name.concat('open')}
							type={type}
							cards={type.cards}
							indexBuffer={indexBuffer - type.cards.length}
							index={Number(index)}
							open={type.open}
							moveCards={moveCards}
						/>
					);
				})} */}
				</DragDropContext>
				{/* </ReactSortable> */}
			</div>
		);
	}
}
