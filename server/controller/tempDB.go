package controller

import "fmt"

type Task struct {
	Title        string `json:"title"`
	TimeInMinute int    `json:"time"`
	Content      string `json:"content"`
}

type Tasks struct {
	Tasks []Task `json:"tasks"`
}

func GenerateTemplateTask() []Task {
	const time = 60
	const task_amount = 10
	var tasks []Task
	for i := range task_amount {
		task := Task{
			Title:        fmt.Sprintf("Il faut faire des choses pour la tâche %d", i),
			TimeInMinute: time,
			Content:      fmt.Sprintf("Le contend de la task %d", i),
		}
		tasks = append(tasks, task)
	}
	return tasks
}
