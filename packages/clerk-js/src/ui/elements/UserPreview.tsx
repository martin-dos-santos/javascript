import type { ExternalAccountResource, UserPreviewId, UserResource } from '@clerk/types';
import React from 'react';

import { getFullName, getIdentifier } from '../../utils/user';
import { useOptions } from '../contexts';
import type { LocalizationKey } from '../customizables';
import { descriptors, Flex, Text, useLocalizations } from '../customizables';
import type { PropsOfComponent, ThemableCssProp } from '../styledSystem';
import { UserAvatar } from './UserAvatar';

export type UserPreviewProps = Omit<PropsOfComponent<typeof Flex>, 'title' | 'elementId'> & {
  size?: 'lg' | 'md' | 'sm';
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  imageUrl?: string | null;
  rounded?: boolean;
  elementId?: UserPreviewId;
  avatarSx?: ThemableCssProp;
  title?: LocalizationKey | string;
  subtitle?: LocalizationKey | string;
  showAvatar?: boolean;
} & (
    | {
        user?: Partial<UserResource>;
        externalAccount?: null | undefined;
      }
    | {
        user?: null | undefined;
        externalAccount?: Partial<ExternalAccountResource>;
      }
  );

export const UserPreview = (props: UserPreviewProps) => {
  const {
    user,
    externalAccount,
    size = 'md',
    showAvatar = true,
    icon,
    rounded = true,
    imageUrl: imageUrlProp,
    badge,
    elementId,
    sx,
    title,
    subtitle,
    avatarSx,
    ...rest
  } = props;
  const { experimental_enableClerkImages } = useOptions();
  const { t } = useLocalizations();
  const name = getFullName({ ...user }) || getFullName({ ...externalAccount });
  const identifier = getIdentifier({ ...user }) || externalAccount?.accountIdentifier?.();
  const localizedTitle = t(title);

  const externalAccountImageUrl = experimental_enableClerkImages
    ? externalAccount?.experimental_imageUrl
    : externalAccount?.avatarUrl;
  const userImageUrl = experimental_enableClerkImages ? user?.experimental_imageUrl : user?.profileImageUrl;
  const imageUrl = imageUrlProp || userImageUrl || externalAccountImageUrl;

  return (
    <Flex
      elementDescriptor={descriptors.userPreview}
      elementId={descriptors.userPreview.setId(elementId)}
      gap={4}
      align='center'
      sx={[{ minWidth: '0px', width: '100%' }, sx]}
      {...rest}
    >
      {showAvatar && (
        <Flex
          elementDescriptor={descriptors.userPreviewAvatarContainer}
          elementId={descriptors.userPreviewAvatarContainer.setId(elementId)}
          justify='center'
          sx={{ position: 'relative' }}
        >
          <UserAvatar
            boxElementDescriptor={descriptors.userPreviewAvatarBox}
            imageElementDescriptor={descriptors.userPreviewAvatarImage}
            {...user}
            {...externalAccount}
            name={name}
            imageUrl={imageUrl}
            size={t => ({ sm: t.sizes.$8, md: t.sizes.$11, lg: t.sizes.$12x5 }[size])}
            optimize
            sx={avatarSx}
            rounded={rounded}
          />

          {icon && <Flex sx={{ position: 'absolute', left: 0, bottom: 0 }}>{icon}</Flex>}
        </Flex>
      )}

      <Flex
        elementDescriptor={descriptors.userPreviewTextContainer}
        elementId={descriptors.userPreviewTextContainer.setId(elementId)}
        direction='col'
        justify='center'
        sx={{ minWidth: '0px', textAlign: 'left' }}
      >
        <Text
          elementDescriptor={descriptors.userPreviewMainIdentifier}
          elementId={descriptors.userPreviewMainIdentifier.setId(elementId)}
          variant={size === 'md' ? 'regularMedium' : 'smallMedium'}
          colorScheme='inherit'
          sx={theme => ({ display: 'flex', gap: theme.sizes.$1 })}
        >
          <Text
            as='span'
            colorScheme='inherit'
            truncate
            sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}
          >
            {localizedTitle || name || identifier}
          </Text>

          {badge}
        </Text>

        {(subtitle || (name && identifier)) && (
          <Text
            elementDescriptor={descriptors.userPreviewSecondaryIdentifier}
            elementId={descriptors.userPreviewSecondaryIdentifier.setId(elementId)}
            variant='smallRegular'
            colorScheme='neutral'
            truncate
            localizationKey={subtitle || identifier}
          />
        )}
      </Flex>
    </Flex>
  );
};
