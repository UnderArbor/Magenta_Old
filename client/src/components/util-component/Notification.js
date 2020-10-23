import React from 'react';

const Notification = () => {
	return (
		<div
			style={{
				position: 'absolute',
				top: '-5px',
				right: '-5px',
				pointerEvents: 'none',
			}}
		>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
			/>
			<i
				className="fa fa-exclamation-circle"
				style={{
					color: 'red',
					zIndex: '2',
					fontSize: '16px',
				}}
			></i>
		</div>
	);
};

export default Notification;
