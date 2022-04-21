/**
 * External dependencies
 */
import { has } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { hasBlockSupport } from '@wordpress/blocks';

/**
 * Filters registered block settings, extending attributes to include `isSection` and `sectionName`.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute( settings ) {
	if ( hasBlockSupport( settings, '__experimentalSection', false ) ) {
		// Allow blocks to specify their own section attribute definition with default value if needed.
		if ( ! has( settings.attributes, [ 'section' ] ) ) {
			settings.attributes = {
				...settings.attributes,
				section: {
					type: 'object',
				},
			};
		}
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'core/sections/addAttribute',
	addAttribute
);
