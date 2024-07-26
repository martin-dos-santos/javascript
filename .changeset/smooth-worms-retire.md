---
"@clerk/clerk-js": minor
"@clerk/clerk-react": minor
"@clerk/types": minor
---

Extended the UserButton component to support custom menu items:

- Introduced `UserButton.MenuItems` as a child component to wrap custom menu items
- Introduced `UserButton.Link` for custom link items
- Introduced `UserButton.Action` for custom action items
- Implemented support for reordering existing items like `manageAccount` and `signOut`

New usage example:

```jsx
<UserButton>
  <UserButton.MenuItems>
    <UserButton.Link label='Terms' labelIcon={<Icon />} href='/terms' />
    <UserButton.Action label='Help' labelIcon={<Icon />} open='help' /> // Opens help page in UserProfileModal
    <UserButton.Action label='manageAccount' labelIcon={<Icon />} />
    <UserButton.Action label='Chat Modal' labelIcon={<Icon />} onClick={() => setModal(true)} />
  </UserButton.MenuItems>
</UserButton>