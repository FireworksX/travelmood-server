export function hasNewValue(rolesA: (string | number)[], rolesB: (string | number)[]): boolean {
  let hasNew = false;

  rolesB.forEach(val => {
    if (!hasNew) {
      hasNew = !rolesA.includes(val);
    }
  });

  return hasNew;
}
