class Workflow {
  constructor() {
    this.tasks = []
    this.resources = []
  }

  addTask(id, name, priority, deadline, dependencies = [], requiredResources = []) {
    if (!id || !name || !priority || !deadline) {
      throw new Error("Missing required fields.")
    }
    this.tasks.push({
      id,
      name,
      priority,
      deadline,
      dependencies,
      requiredResources,
      assignedResources: [],
      status: "Pending",
      progress: 0
    })
  }

  addResource(id, name, type, capacity) {
    if (!id || !name || !type || capacity <= 0) {
      throw new Error("Invalid resource details.")
    }
    this.resources.push({ id, name, type, capacity, allocated: 0 })
  }

  allocateResources(taskId) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error("Task not found.")
    task.requiredResources.forEach((reqResId) => {
      const resource = this.resources.find((r) => r.id === reqResId)
      if (!resource) throw new Error(`Resource ${reqResId} not found.`)
      if (resource.allocated >= resource.capacity) {
        throw new Error(`Resource ${resource.name} is fully allocated.`)
      }
      task.assignedResources.push(reqResId)
      resource.allocated += 1
    })
  }

  updateTaskProgress(taskId, progress) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error("Task not found.")
    if (progress < 0 || progress > 100) throw new Error("Progress must be between 0 and 100.")
    task.progress = progress
    if (progress === 100) {
      task.status = "Completed"
    }
  }

  getTaskDependencies(taskId) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) throw new Error("Task not found.")
    return task.dependencies.map((depId) => this.tasks.find((t) => t.id === depId))
  }

  generateReport() {
    const report = this.tasks.map((task) => ({
      name: task.name,
      status: task.status,
      progress: task.progress,
      assignedResources: task.assignedResources.map(
        (resId) => this.resources.find((r) => r.id === resId)?.name
      )
    }))
    return report
  }

  removeTask(taskId) {
    const taskIndex = this.tasks.findIndex((t) => t.id === taskId)
    if (taskIndex === -1) throw new Error("Task not found.")
    const task = this.tasks[taskIndex]
    task.assignedResources.forEach((resId) => {
      const resource = this.resources.find((r) => r.id === resId)
      if (resource) resource.allocated -= 1
    })
    this.tasks.splice(taskIndex, 1)
  }

  removeResource(resourceId) {
    const resourceIndex = this.resources.findIndex((r) => r.id === resourceId)
    if (resourceIndex === -1) throw new Error("Resource not found.")
    const resource = this.resources[resourceIndex]
    this.tasks.forEach((task) => {
      task.assignedResources = task.assignedResources.filter((resId) => resId !== resourceId)
    })
    this.resources.splice(resourceIndex, 1)
  }
}

export default Workflow