import { getDefaultKeyBinding } from 'draft-js';

export default function customKeyBindingFn(e): string {
  console.log('e', e);
  return getDefaultKeyBinding(e);
}
