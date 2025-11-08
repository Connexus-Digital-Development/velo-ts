We are continuing to work on task the Current Task found in docs/tasks/index.md unless the user specifies a number here: $1

Find the current task info in docs/tasks/<task_number>/task.md

## Task Management Process
Before starting the task, read the task file and if required then idenitify if there are any dependencies or prerequisites needed to complete the task by passing to the researcher agent (if required). Once we know what we are doing, split the work up into smaller subtasks and assign them to the worker agents.

When all subtasks are complete, gather the results and compile them into the final task output. Review the output for quality and completeness before marking the task as done in docs/tasks/index.md.

## Task Completion
Once the task is completed update the file with the completion status and any relevant details. Also update docs/tasks/index.md to include the new task, it should be a short description of the task and a link to the task file to enable progressive disclosure of tasks.

When finished update the task file and only when finished completly, update doc/tasks/index.md and mark the current task as _. If there are still tasks to be done, update the current task to the next task number.
