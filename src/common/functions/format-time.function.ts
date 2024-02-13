export function formatTime(time: string): string {
  // Розділити час на години та хвилини
  const [hours, minutes] = time.split(':');

  // Перетворити години та хвилини на числа
  const hoursNumber = parseInt(hours, 10);

  // Перевірити, чи потрібно додати "0" перед годинами
  const formattedHours = hoursNumber < 10 ? `0${hoursNumber}` : hours;

  // Повернути форматований час
  return `${formattedHours}:${minutes}`;
}
