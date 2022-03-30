/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { quote as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name, settingsV2 };

export const settings = {
	icon,
	example: {
		attributes: {
			citation: 'Julio Cortázar',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'In quoting others, we cite ourselves.' ),
				},
			},
		],
	},
	transforms,
	edit,
	save,
	deprecated,
};

let settings = settingsV1;
if ( process.env.IS_GUTENBERG_PLUGIN ) {
	settings = window?.__experimentalEnableQuoteBlockV2
		? settingsV2
		: settingsV1;
}
export { settings };
