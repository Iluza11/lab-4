
        // Ждем полной загрузки DOM
        document.addEventListener('DOMContentLoaded', function() {
            function updateTaskCount() {
                const taskCount = document.querySelectorAll('.task').length;
                const counterElement = document.getElementById('task-counter');
                if (counterElement) {
                    counterElement.textContent = taskCount;
                }
            }
            
            document.querySelector('#push').onclick = function() {
                const input = document.querySelector('#newtask input');
                const tasks = document.querySelector('#tasks');
                
                if(input.value.trim().length === 0){
                    alert("Введите задачу!");
                    return;
                }
                
                // Убираем сообщение о пустом списке
                const emptyMessage = tasks.querySelector('.empty');
                if(emptyMessage){
                    emptyMessage.remove();
                }
                
                // Создаем новую задачу
                const taskElement = document.createElement('div');
                taskElement.className = 'task';
                taskElement.innerHTML = `
                    <span>${input.value}</span>
                    <button class="delete"></button>
                `;
                
                // Добавляем задачу в контейнер
                tasks.appendChild(taskElement);
                
                // Очищаем поле ввода
                input.value = '';
                
                // Обновляем счетчик
                updateTaskCount();
                
                // Добавляем обработчик удаления для новой задачи
                const deleteButton = taskElement.querySelector('.delete');
                deleteButton.onclick = function() {
                    this.parentElement.remove();
                    updateTaskCount();
                    
                    // Если задач не осталось, показываем сообщение
                    if(tasks.children.length === 0){
                        const emptyDiv = document.createElement('div');
                        emptyDiv.className = 'empty';
                        emptyDiv.textContent = 'Добавьте свою первую задачу';
                        tasks.appendChild(emptyDiv);
                    }
                };
            }
            
            // Добавляем задачу по Enter
            document.querySelector('#newtask input').addEventListener('keypress', function(e){
                if(e.key === 'Enter'){
                    document.querySelector('#push').click();
                }
            });
            
            // Инициализируем счетчик
            updateTaskCount();
        });
