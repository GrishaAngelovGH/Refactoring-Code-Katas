import { expect } from "chai"
import Workflow from "./workflow-kata.js"

describe("Workflow", () => {
  let workflow

  beforeEach(() => {
    workflow = new Workflow()
  })

  it("should add tasks successfully", () => {
    workflow.addTask(1, "Task 1", "High", "2025-04-01", [2], [101])
    expect(workflow.tasks.length).to.equal(1)
    expect(workflow.tasks[0].name).to.equal("Task 1")
  })

  it("should add resources successfully", () => {
    workflow.addResource(101, "Developer A", "Human", 1)
    expect(workflow.resources.length).to.equal(1)
    expect(workflow.resources[0].name).to.equal("Developer A")
  })

  it("should allocate resources to a task", () => {
    workflow.addResource(101, "Developer A", "Human", 1)
    workflow.addTask(1, "Task 1", "High", "2025-04-01", [], [101])
    workflow.allocateResources(1)
    const task = workflow.tasks[0]
    expect(task.assignedResources.length).to.equal(1)
    expect(task.assignedResources[0]).to.equal(101)
  })

  it("should throw an error if resource is fully allocated", () => {
    workflow.addResource(101, "Developer A", "Human", 1)
    workflow.addTask(1, "Task 1", "High", "2025-04-01", [], [101])
    workflow.addTask(2, "Task 2", "Medium", "2025-04-02", [], [101])
    workflow.allocateResources(1)
    expect(() => workflow.allocateResources(2)).to.throw(/fully allocated/)
  })

  it("should update task progress and status", () => {
    workflow.addTask(1, "Task 1", "High", "2025-04-01")
    workflow.updateTaskProgress(1, 50)
    expect(workflow.tasks[0].progress).to.equal(50)
    workflow.updateTaskProgress(1, 100)
    expect(workflow.tasks[0].status).to.equal("Completed")
  })

  it("should generate a detailed report", () => {
    workflow.addResource(101, "Developer A", "Human", 1)
    workflow.addTask(1, "Task 1", "High", "2025-04-01", [], [101])
    workflow.allocateResources(1)
    workflow.updateTaskProgress(1, 100)
    const report = workflow.generateReport()
    expect(report.length).to.equal(1)
    expect(report[0].name).to.equal("Task 1")
    expect(report[0].status).to.equal("Completed")
    expect(report[0].assignedResources[0]).to.equal("Developer A")
  })

  it("should remove tasks and release resources", () => {
    workflow.addResource(101, "Developer A", "Human", 1)
    workflow.addTask(1, "Task 1", "High", "2025-04-01", [], [101])
    workflow.allocateResources(1)
    workflow.removeTask(1)
    expect(workflow.tasks.length).to.equal(0)
    expect(workflow.resources[0].allocated).to.equal(0)
  })

  it("should remove resources and unassign them from tasks", () => {
    workflow.addResource(101, "Developer A", "Human", 1)
    workflow.addTask(1, "Task 1", "High", "2025-04-01", [], [101])
    workflow.allocateResources(1)
    workflow.removeResource(101)
    expect(workflow.resources.length).to.equal(0)
    expect(workflow.tasks[0].assignedResources.length).to.equal(0)
  })
})