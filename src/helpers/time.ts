export const isOverEighteen = (birthDateString: string): boolean => {
  const birthDate = new Date(birthDateString);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age >= 18;
};
