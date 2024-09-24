/**
 * Errors
 *
 * Shows error messages
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-09-24
 */
import PropTypes from 'prop-types';
import React from 'react';
export type ErrorsPositionType = 'bottom' | 'top';
export type ErrorsProps = {
    position: ErrorsPositionType;
};
export type ErrorMessageType = {
    _id: string;
    content?: React.JSX.Element | React.JSX.Element[];
};
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
export declare function addError(error: string | object): void;
/**
 * Errors
 *
 * @name Errors
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Errors({ position }: ErrorsProps): React.JSX.Element | null;
declare namespace Errors {
    var propTypes: {
        position: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        position: string;
    };
}
export default Errors;
