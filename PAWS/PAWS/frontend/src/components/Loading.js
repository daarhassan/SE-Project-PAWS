import React from 'react';
import MainLogo from '../media/images/paws_main_logo.png';

export default function Loading() {
    return (
		<div className="loading">
            <div style={{width: '150px', margin: '0px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
				<img alt="Logo" src={MainLogo} style={{width: '75px', margin: '15px auto'}} />
				<div className="loader"></div>
			</div>
        </div>
    )
}