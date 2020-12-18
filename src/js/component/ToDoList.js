import React from "react";

export class ToDoList extends React.Component {
	constructor() {
		super();
		this.state = {
			taskList: [],
			task: "",
			taskCounter: 0
		};
	}
	addList = e => {
		if (e.keyCode == 13) {
			let updatedTaskList = this.state.taskList; //Better to change the state through a local variable instead of doing it directly
			updatedTaskList.push(this.state.task);
			this.setState({ taskList: updatedTaskList }); //Updates the taskList array with the newly inputed task by the user
			let updatedCounter = this.state.taskCounter;
			updatedCounter++;
			this.setState({ taskCounter: updatedCounter }); //Increments the counter by +1 every time the user enters a task, the counter number is displayed
			//on the bottom of the lists
			let resetTask = this.state.task;
			resetTask = "";
			this.setState({ task: resetTask }); //Resets the task on the input bar so the user can freely type a new task without having to backspace or delete
		}
	};
	removeList = index => {
		let updatedTaskList = this.state.taskList;
		updatedTaskList.splice(index, 1);
		this.setState({ taskList: updatedTaskList });
		let updatedCounter = this.state.taskCounter;
		updatedCounter--;
		this.setState({ taskCounter: updatedCounter });
	};
	render() {
		return (
			<div>
				<h1>To Do List</h1>
				<div className="ToDoList">
					<div className="list-group list-group-flush">
						<input
							className="list-group-item"
							onChange={e =>
								this.setState({ task: e.target.value })
							}
							value={this.state.task}
							type="text"
							onKeyUp={e => this.addList(e)}
							placeholder="What needs to be done?"
						/>
					</div>
				</div>
				<div className="ToDoList paper">
					<ol className="list-group list-group-flush">
						{this.state.taskList.map((content, index) => {
							return (
								<li className="list-group-item" key={index}>
									{content}{" "}
									<span
										className="float-right"
										onClick={index =>
											this.removeList(index)
										}>
										<i className="fas fa-times" />
									</span>
								</li>
							);
						})}
					</ol>
					<p>{this.state.taskCounter} task(s) remaining.</p>
				</div>
			</div>
		);
	}
}
