import React from "react";

export class ToDoList extends React.Component {
	constructor() {
		super();
		this.state = {
			taskList: [],
			task: ""
		};
	}
	addList = e => {
		if (e.keyCode == 13) {
			let updatedTaskList = this.state.taskList; //Better to change the state through a local variable instead of doing it directly
			updatedTaskList.push(this.state.task);
			this.setState({ taskList: updatedTaskList });
		}
	};
	removeList = index => {
		let updatedTaskList = this.state.taskList;
		updatedTaskList.splice(index, 1);
		this.setState({ taskList: updatedTaskList });
	};
	render() {
		return (
			<div>
				<div className="ToDo">
					<input
						onChange={e => this.setState({ task: e.target.value })}
						value={this.state.task}
						type="text"
						onKeyUp={e => this.addList(e)}
					/>
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
										<i class="fas fa-times" />
									</span>
								</li>
							);
						})}
					</ol>
				</div>
			</div>
		);
	}
}
