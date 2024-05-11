export function getGroupName(groupName) {
  // Return null or a default value if groupName is empty or undefined
  if (!groupName) {
    return "";
  }

  const arr = groupName.trim().split(" ");
  const firstInitial = arr?.[0]?.charAt(0) || "";
  const secondInitial = arr?.[1]?.charAt(0) || "";
  return firstInitial + secondInitial;
}
export function capitalizeWords(str) {
  // Split the string into words
  const words = str.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
}
