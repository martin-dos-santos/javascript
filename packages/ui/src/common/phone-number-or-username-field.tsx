import type * as Common from '@clerk/elements/common';
import * as React from 'react';
import { ToggleButton } from 'react-aria-components';

import { link } from '~/primitives/link';

import { PhoneNumberField } from './phone-number-field';
import { UsernameField } from './username-field';

export function PhoneNumberOrUsernameField({
  className,
  name = undefined,
  labelPhoneNumber = 'Phone number',
  labelUsername = 'Username',
  locationBasedCountryIso,
  toggleLabelPhoneNumber = 'Use phone',
  toggleLabelUsername = 'Use username',
  toggleDescription = 'Toggle between phone and username.',
  ...props
}: {
  labelUsername?: React.ReactNode;
  labelPhoneNumber?: React.ReactNode;
  locationBasedCountryIso: React.ComponentProps<typeof PhoneNumberField>['locationBasedCountryIso'];
  toggleLabelPhoneNumber?: string;
  toggleLabelUsername?: string;
  toggleDescription?: string;
} & Omit<React.ComponentProps<typeof Common.Input>, 'type'>) {
  const [showUsernameField, setShowUsernameField] = React.useState(false);

  const toggle = (
    <ToggleButton
      isSelected={showUsernameField}
      onChange={setShowUsernameField}
      className={link({ size: 'sm', disabled: props.disabled, focusVisible: 'data-attribute' })}
    >
      <span className='sr-only'>{toggleDescription}</span>
      {showUsernameField ? toggleLabelPhoneNumber : toggleLabelUsername}
    </ToggleButton>
  );

  return showUsernameField ? (
    <UsernameField
      {...props}
      name={name}
      label={labelUsername}
      alternativeFieldTrigger={toggle}
    />
  ) : (
    <PhoneNumberField
      name={name}
      label={labelPhoneNumber}
      locationBasedCountryIso={locationBasedCountryIso}
      alternativeFieldTrigger={toggle}
      {...props}
    />
  );
}
