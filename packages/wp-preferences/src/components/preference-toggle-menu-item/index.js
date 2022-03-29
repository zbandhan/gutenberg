/**
 * WordPress dependencies
 */
import { speak } from '@wordpress/a11y';
import { MenuItem } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { check } from '@wordpress/icons';
import { store as preferencesStore } from '@wordpress/preferences';

export default function PreferenceToggleMenuItem( {
	scope,
	name,
	label,
	info,
	messageActivated,
	messageDeactivated,
	shortcut,
} ) {
	const isActive = useSelect(
		( select ) => !! select( preferencesStore ).get( scope, name ),
		[ name ]
	);
	const { toggle } = useDispatch( preferencesStore );
	const speakMessage = () => {
		if ( isActive ) {
			const message =
				messageDeactivated ||
				sprintf(
					/* translators: %s: preference name, e.g. 'Fullscreen mode' */
					__( 'Preference deactivated - %s' ),
					label
				);
			speak( message );
		} else {
			const message =
				messageActivated ||
				sprintf(
					/* translators: %s: preference name, e.g. 'Fullscreen mode' */
					__( 'Preference activated - %s' ),
					label
				);
			speak( message );
		}
	};

	return (
		<MenuItem
			icon={ isActive && check }
			isSelected={ isActive }
			onClick={ () => {
				toggle( scope, name );
				speakMessage();
			} }
			role="menuitemcheckbox"
			info={ info }
			shortcut={ shortcut }
		>
			{ label }
		</MenuItem>
	);
}