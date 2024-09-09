
export const name = 'sync';

export const schedule = '* * * * *';

export function onTick() {
  console.log('🕒 Syncing data');
}