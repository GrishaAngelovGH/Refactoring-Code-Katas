class Workflow {
  constructor() {
    this.tasks = []
    this.resources = []
  }

  addTask(id, name, priority, deadline, dependencies = [], requiredResources = []) {
    validateTask(id, name, priority, deadline)

    addNewTask(id, name, priority, deadline, dependencies, requiredResources, this.tasks)
  }

  addResource(id, name, type, capacity) {
    validateResource(id, name, type, capacity)

    addNewResource(id, name, type, capacity, this.resources)
  }

  allocateResources(taskId) {
    const task = getTaskById(taskId, this.tasks)

    task.requiredResources.forEach((reqResId) => {
      allocateResource(reqResId, task, this.resources)
    })
  }

  updateTaskProgress(taskId, progress) {
    const task = getTaskById(taskId, this.tasks)

    validateTaskProgess(progress)

    task.progress = progress

    if (progress === 100) {
      task.status = "Completed"
    }
  }

  getTaskDependencies(taskId) {
    const task = getTaskById(taskId)

    return task.dependencies.map((depId) => this.tasks.find((t) => t.id === depId))
  }

  generateReport() {
    const report = this.tasks.map(({ name, status, progress, assignedResources }) => ({
      name,
      status,
      progress,
      assignedResources: assignedResources.map(
        (resId) => this.resources.find((r) => r.id === resId)?.name
      )
    }))
    return report
  }

  removeTask(taskId) {
    const taskIndex = getTaskIndexById(taskId, this.tasks)

    const task = this.tasks[taskIndex]

    task.assignedResources.forEach((resId) => {
      const resource = this.resources.find((r) => r.id === resId)
      if (resource) resource.allocated -= 1
    })

    this.tasks.splice(taskIndex, 1)
  }

  removeResource(resourceId) {
    const resourceIndex = getResourceIndexById(resourceId, this.resources)

    this.tasks.forEach((task) => {
      task.assignedResources = task.assignedResources.filter((resId) => resId !== resourceId)
    })

    this.resources.splice(resourceIndex, 1)
  }
}

const validateResource = (id, name, type, capacity) => {
  if (!id || !name || !type || capacity <= 0) {
    throw new Error("Invalid resource details.")
  }
}

const validateTask = (id, name, priority, deadline) => {
  if (!id || !name || !priority || !deadline) {
    throw new Error("Missing required fields.")
  }
}

const addNewTask = (id, name, priority, deadline, dependencies, requiredResources, tasks) => {
  tasks.push({
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

const addNewResource = (id, name, type, capacity, resources) => {
  resources.push({ id, name, type, capacity, allocated: 0 })
}

const getTaskById = (taskId, tasks) => {
  const task = tasks.find((t) => t.id === taskId)

  if (!task) throw new Error("Task not found.")

  return task
}

const getResourceById = (reqResId, resources) => {
  const resource = resources.find((r) => r.id === reqResId)

  if (!resource) throw new Error(`Resource ${reqResId} not found.`)

  return resource
}

const allocateResource = (reqResId, task, resources) => {
  const resource = getResourceById(reqResId, resources)

  if (resource.allocated >= resource.capacity) {
    throw new Error(`Resource ${resource.name} is fully allocated.`)
  }

  task.assignedResources.push(reqResId)

  resource.allocated += 1
}

const validateTaskProgess = progress => {
  if (progress < 0 || progress > 100) {
    throw new Error("Progress must be between 0 and 100.")
  }
}

const getTaskIndexById = (taskId, tasks) => {
  const taskIndex = tasks.findIndex((t) => t.id === taskId)

  if (taskIndex === -1) throw new Error("Task not found.")

  return taskIndex
}

const getResourceIndexById = (resourceId, resources) => {
  const resourceIndex = resources.findIndex((r) => r.id === resourceId)

  if (resourceIndex === -1) throw new Error("Resource not found.")

  return resourceIndex
}

export default Workflow