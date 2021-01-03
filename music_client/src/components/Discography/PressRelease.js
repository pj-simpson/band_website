import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

const PressRelease = ({item}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
        <div className="press-release-toggle-container">
            <a className="press-release-toggle" role="button" onClick={toggle}>Press Release{' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrows-collapse" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"/>
                </svg>
            </a>
        </div>
      <Collapse isOpen={isOpen}>
        <p>
          {item.press_release}
          </p>
      </Collapse>
    </div>
  );
}

export default PressRelease;