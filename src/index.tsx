/**
 * Errors
 *
 * Shows error messages
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-09-24
 */

// Ouroboros modules
import events from '@ouroboros/events';
import { afindi, isObject } from '@ouroboros/tools';

// NPM modules
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Constants
const EVENT_NAME = 'oc_error_add';

// Types
export type ErrorsPositionType = 'bottom' | 'top';
export type ErrorsProps = {
	position: ErrorsPositionType
}
export type ErrorMessageType = {
	_id: string,
	content?: React.JSX.Element | React.JSX.Element[]
}

/**
 * Add Error
 *
 * Sends an error message to the Error component
 *
 * @name addError
 * @access public
 * @param error The string or object to display
 * @returns void
 */
export function addError(error: string | object): void {

	// Send the error to the component
	events.get(EVENT_NAME).trigger(error);
}

/**
 * Errors
 *
 * @name Errors
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Errors({ position = 'bottom' }: ErrorsProps) {

	// State
	const [ errors, errorsSet ] = useState<ErrorMessageType[]>([]);

	// Load effect
	useEffect(() => {

		// Subscribe to error messages
		const oErrorEvent = events.get(EVENT_NAME).subscribe(msg => {

			// Generate the new error ID
			const o: ErrorMessageType = { _id: uuidv4() }

			// If it's an object, add it as a preformatted message
			if(isObject(msg)) {
				o.content = <pre>{JSON.stringify(msg, null, 4)}</pre>
			} else {
				o.content = (msg as string).split('\n').map((s,i) => <p key={i}>{s}</p>);
			}

			// Add it to the end of the errors list
			errorsSet(l => {
				const lNew = [ ...l ];
				lNew.push(o);
				return lNew;
			});
		});

		// Unsubscribe
		return () => {
			oErrorEvent.unsubscribe();
		}

	}, []);

	// Remove an error by ID
	function remove(_id: string) {

		// Get the latest errors
		errorsSet(l => {

			// Find the index
			const i = afindi(l, '_id', _id);

			// If it exists
			if(i > -1) {
				const lNew = [ ...l ];
				lNew.splice(i, 1);
				return lNew;
			}

			// Else, return existing
			return l;
		});
	}

	// If we have no errors, do nothing
	if(errors.length === 0) {
		return null;
	}

	// Get the style from the position
	const oStyle = (position === 'bottom') ? { bottom: '0' } : { top: '0' }

	// Render all the current error messages
	return (
		<div id="oc_errors" style={oStyle}>
			{errors.map(o =>
				<div key={o._id} className="error flexColumns">
					<div className="text">
						{o.content}
					</div>
					<div className="close">
						<button onClick={() => remove(o._id)}>X</button>
					</div>
				</div>
			)}
		</div>
	)
}

// Valid props
Errors.propTypes = {
	position: PropTypes.oneOf([ 'bottom', 'top' ])
}