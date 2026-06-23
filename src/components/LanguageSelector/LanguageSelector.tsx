import './style.scss'
import React from 'react';

const LanguageSelector: React.FC = () => {
    return (
        <div className="language-selector">
            <div className="justabox">
                <div className="option">
                    <input id="pt" type="radio" name="type" value="pt" checked />
                    <label htmlFor="pt" className='pt-lang label' />
                </div>
                <div className="option">
                    <input id="en" type="radio" name="type" value="en" checked />
                    <label htmlFor="en" className='en-lang label' />
                </div>
            </div>
        </div>
    );
};

export default LanguageSelector;
