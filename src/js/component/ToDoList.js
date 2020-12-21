import React from "react";

export class ToDoList extends React.Component {
	constructor() {
		super();
		this.state = {
			taskList: [],
			task: "",
			taskCounter: 0
		};
		this.url = "https://assets.breatheco.de/apis/fake/todos/user/dojam";
	}
	componentDidMount() {
		fetch(this.url)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(jsonifiedResponse =>
				this.setState({ taskList: jsonifiedResponse })
			)
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}
	addList = e => {
		if (e.keyCode == 13) {
			let updatedCounter = this.state.taskCounter;
			updatedCounter++;
			this.setState({ taskCounter: updatedCounter }); //Increments the counter by +1 every time the user enters a task, the counter number is displayed
			//on the bottom of the lists

			let resetTask = this.state.task;
			resetTask = "";
			this.setState({ task: resetTask }); //Resets the task on the input bar so the user can freely type a new task without having to backspace or delete

			if (this.state.task) {
				var newListObject = { label: this.state.task, done: false };
				var updatedList = this.state.taskList.concat(newListObject);
				this.setState({ taskList: updatedList });
				fetch(this.url, {
					method: "PUT", // or 'POST'
					body: JSON.stringify(updatedList), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response =>
						console.log("Success:", JSON.stringify(response))
					)
					.catch(error => console.error("Error:", error));
			}
		}
	};
	removeList = index => {
		let updatedTaskList = this.state.taskList;
		updatedTaskList.splice(index, 1);
		this.setState({ taskList: updatedTaskList });

		let updatedCounter = this.state.taskCounter;
		updatedCounter--;
		this.setState({ taskCounter: updatedCounter });

		fetch(this.url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(updatedTaskList), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.catch(error => console.error("Error:", error));
	};
	render() {
		return (
			<div>
				<h1>To Do List:</h1>
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
								<li
									className="list-group-item listText"
									key={index}>
									{content.label}{" "}
									<span
										className="float-right"
										onClick={() => this.removeList(index)}>
										<i
											className="fas fa-times"
											style={{ color: "red " }}
										/>
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
