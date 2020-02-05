import React from 'react';

const Chip = ({ tags }) => 
        <div className="tags-input">
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <span>{tag}</span>
                        {/* <i className="material-icons">close</i> */}
                    </li>
                ))}
            </ul>
        </div>

export default Chip;