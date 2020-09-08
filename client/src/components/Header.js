import React, { useState } from 'react';
import ColorPicker from './ColorPicker';

export const Header = () => {
	const style = getComputedStyle(document.documentElement);

	const [toggle, setToggle] = useState(false);
	return (
		<div className="header">
			<div className="home">
				<a>Home </a>
				<a>Social</a>
				<button className="colorButton" onClick={() => setToggle(!toggle)}>
					Toggle Colors
				</button>
			</div>
			{toggle ? (
				<div className="colorSelection">
					<ColorPicker
						color={style.getPropertyValue('--header-color')}
						title="Header"
						cssVar="--header-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--header-text-color')}
						title="H-text"
						cssVar="--header-text-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--main-bg-color')}
						title="Body"
						cssVar="--main-bg-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--secondary-color')}
						title="Secondary"
						cssVar="--secondary-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--backdrop-color')}
						title="Container"
						cssVar="--backdrop-color"
					/>
				</div>
			) : null}
		</div>
	);
};

export default Header;
