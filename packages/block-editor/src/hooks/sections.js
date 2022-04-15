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
		// Allow blocks to specify their own isSection attribute definition with default value if needed.
		if ( ! has( settings.attributes, [ 'isSection' ] ) ) {
			settings.attributes = {
				...settings.attributes,
				isSection: {
					type: 'boolean',
				},
			};
		}

		// Allow blocks to specify their own sectionName attribute definition with default value if needed.
		if ( ! has( settings.attributes, [ 'sectionName' ] ) ) {
			settings.attributes = {
				...settings.attributes,
				sectionName: {
					type: 'string',
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
