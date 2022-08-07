const updateGeneralProgress = () => {
  const todos = [...Object.values(todoList.todoList)];
  const completedPercentage =
    Math.round(
      (todos.filter(todo => todo.isCompleted).length * 100) / todos.length
    ) || 0;
  generalProgressIndicator.setAttribute(
    'style',
    `--value: ${Math.round(113 - 1.13 * completedPercentage)};`
  );
  let currentPercentage = parseInt(generalProgressValue.innerText.slice(0, -1));
  const progress = setInterval(() => {
    if (currentPercentage === completedPercentage) {
      clearInterval(progress);
    } else {
      currentPercentage < completedPercentage
        ? currentPercentage++
        : currentPercentage--;
      generalProgressValue.innerText = `${currentPercentage}%`;
    }
  }, 10);
};
